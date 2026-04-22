'use client';

import React, { useState, useEffect } from 'react';
import { getContent, saveContentAction as saveContent, getLeads, deleteLead, getArticles, saveArticle, deleteArticle, initBlog } from './actions';
import styles from './admin.module.css';
import Image from 'next/image';
import Link from 'next/link';

const AdminPage = () => {
    const [content, setContent] = useState<any>(null);
    const [leads, setLeads] = useState<any[]>([]);
    const [articles, setArticles] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('leads'); // Default to leads
    const [editingArticle, setEditingArticle] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/login/check');
                if (response.ok) {
                    setIsAuthenticated(true);
                    await initBlog();
                    const data = await getContent();
                    setContent(data);
                    const leadsData = await getLeads();
                    setLeads(leadsData);
                    const articlesData = await getArticles();
                    setArticles(articlesData);
                }
            } catch (error) {
                console.error('Auth check failed');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameInput, password: passwordInput })
            });

            if (response.ok) {
                setIsAuthenticated(true);
                const data = await getContent();
                setContent(data);
                const leadsData = await getLeads();
                setLeads(leadsData);
                window.location.reload();
            } else {
                alert('Ошибка входа. Проверьте логин и пароль.');
            }
        } catch (error) {
            alert('Ошибка сервера');
        }
    };

    const handleDeleteLead = async (id: number) => {
        if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
            const res = await deleteLead(id);
            if (res.success) {
                setLeads(leads.filter(l => l.id !== id));
            }
        }
    };

    const handleSave = async () => {
        setSaving(true);
        await saveContent(content);
        setSaving(false);
        alert('Все изменения успешно сохранены!');
    };

    const handleSaveArticle = async (article: any) => {
        setSaving(true);
        const res = await saveArticle(article);
        if (res.success) {
            const data = await getArticles();
            setArticles(data);
            setEditingArticle(null);
            alert('Статья сохранена!');
        }
        setSaving(false);
    };

    const handleDeleteArticle = async (id: number) => {
        if (confirm('Удалить статью?')) {
            const res = await deleteArticle(id);
            if (res.success) {
                setArticles(articles.filter(a => a.id !== id));
            }
        }
    };

    const handleImageUpload = async (file: File, folder: string, callback: (url: string) => void) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (res.ok && data.url) {
                callback(data.url);
            } else {
                alert(`Ошибка загрузки: ${data.error || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Ошибка при загрузке изображения на сервер');
        }
    };

    if (loading) return <div className={styles.loginContainer}>Загрузка системы...</div>;

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <form className={styles.loginCard} onSubmit={handleLogin}>
                    <h2>PULSE ADMIN</h2>
                    <div className={styles.field}>
                        <label>Логин администратора</label>
                        <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="username"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Пароль доступа</label>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="primary-button primary-button--filled" style={{ width: '100%', marginTop: '20px' }}>
                        Авторизоваться
                    </button>
                </form>
            </div>
        );
    }

    const tabs = [
        { id: 'leads', label: 'Заявки' },
        { id: 'home', label: 'Главная' },
        { id: 'pricing', label: 'Цены' },
        { id: 'tech', label: 'Оборудование' },
        { id: 'portfolio', label: 'Кейсы' },
        { id: 'blog', label: 'Блог' },
        { id: 'settings', label: 'Настройки' },
    ];

    const stats = {
        totalLeads: leads.length,
        leadsToday: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
        withFiles: leads.filter(l => l.file_url).length,
        activeTariffs: content?.pricing?.tariffs?.length || 0
    };

    const ImageField = ({ label, value, folder, onChange }: any) => (
        <div className={styles.field}>
            <label>{label}</label>
            <div className={styles.imageUpload}>
                <div className={styles.imagePreview}>
                    {value ? <Image src={value} alt="Preview" width={80} height={80} /> : <span>Нет фото</span>}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className={styles.uploadTrigger}>
                        <input type="file" onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], folder, onChange);
                        }} />
                        <div className={styles.uploadBtn}>Загрузить файл</div>
                    </label>
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Или вставьте путь к изображению вручную..."
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <div className={styles.logo}>
                    <div className={styles.logoText}>Pulse 3D <span style={{ color: '#3b82f6', fontSize: '12px' }}>Admin</span></div>
                </div>
                <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </header>

            <div className={styles.adminLayout}>
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <Link href="/" className={styles.returnBtn}>
                            ← Вернуться на сайт
                        </Link>
                    </div>

                    <div className={styles.sidebarTitle}>Контент и данные</div>
                    <nav className={styles.navSection}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`${styles.navLink} ${activeTab === tab.id ? styles.activeNavLink : ''}`}
                            >
                                {tab.id === 'leads' && '📁 '}
                                {tab.id === 'home' && '🏠 '}
                                {tab.id === 'pricing' && '💰 '}
                                {tab.id === 'tech' && '⚙️ '}
                                {tab.id === 'portfolio' && '⭐ '}
                                {tab.id === 'blog' && '📝 '}
                                {tab.id === 'settings' && '🔧 '}
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className={styles.sidebarTitle}>Аккаунт</div>
                    <div className={styles.navSection}>
                        <button className={styles.navLink} onClick={() => {
                            document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            window.location.reload();
                        }}>
                            🚪 Выйти из системы
                        </button>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.sectionHeader}>
                        <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
                        {activeTab !== 'leads' && (
                            <button onClick={handleSave} className="primary-button primary-button--filled" disabled={saving}>
                                {saving ? '⚡ Сохранение...' : '💾 Сохранить изменения'}
                            </button>
                        )}
                    </div>

                    {activeTab === 'leads' && (
                        <>
                            <div className={styles.statsRow}>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Всего заявок</span>
                                    <span className={styles.statValue}>{stats.totalLeads}</span>
                                    <span className={styles.statTrend}>за всё время</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Новые сегодня</span>
                                    <span className={styles.statValue}>{stats.leadsToday}</span>
                                    <span className={styles.statTrend}>активность</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>С файлами (STL/ZIP)</span>
                                    <span className={styles.statValue}>{stats.withFiles}</span>
                                    <span className={styles.statTrend}>нужен расчет</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Активные тарифы</span>
                                    <span className={styles.statValue}>{stats.activeTariffs}</span>
                                    <span className={styles.statTrend}>в эфире</span>
                                </div>
                            </div>

                            <div className={styles.leadsList}>
                                {leads.length === 0 ? (
                                    <div className={styles.emptyLeads}>
                                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                                        Пока нет активных заявок.
                                    </div>
                                ) : (
                                    leads.map((lead) => (
                                        <div key={lead.id} className={styles.leadCard}>
                                            <div className={styles.leadMain}>
                                                <div className={styles.leadInfo}>
                                                    <div className={styles.leadHeader}>
                                                        <h3>👤 {lead.name}</h3>
                                                        <span className={styles.leadDate}>
                                                            📅 {new Date(lead.created_at).toLocaleString('ru-RU')}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                        <a href={`tel:${lead.phone}`} className={styles.leadPhone}>📞 {lead.phone}</a>
                                                        {lead.file_url && (
                                                            <div className={styles.leadFiles}>
                                                                📎 <strong>Вложение:</strong> <span className={styles.fileName}>{lead.file_url.split('_').slice(1).join('_')}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {lead.tariff && (
                                                        <div className={styles.leadTariff}>
                                                            🏷️ Тариф: <strong>{lead.tariff}</strong> ({lead.price})
                                                        </div>
                                                    )}
                                                    <div className={styles.leadDesc}>
                                                        <strong>Описание задачи:</strong><br />
                                                        {lead.description}
                                                    </div>
                                                </div>
                                                <button
                                                    className={styles.deleteLeadBtn}
                                                    onClick={() => handleDeleteLead(lead.id)}
                                                >
                                                    🗑️ Удалить
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'home' && (
                        <div className={styles.formContainer}>
                            <div className={styles.fieldGroup}>
                                <h3>Hero Секция (Первый экран)</h3>
                                <div className={styles.field}>
                                    <label>Главный заголовок (H1)</label>
                                    <input value={content.home.heroTitle || ''} onChange={(e) => setContent({ ...content, home: { ...content.home, heroTitle: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Подзаголовок / Описание</label>
                                    <textarea rows={4} value={content.home.heroDesc || ''} onChange={(e) => setContent({ ...content, home: { ...content.home, heroDesc: e.target.value } })} />
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Преимущества (USP)</h3>
                                <div className={styles.grid}>
                                    {content.home.usp.map((item: any, idx: number) => (
                                        <div key={idx} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4>Фактор #{idx + 1}</h4>
                                                <button className={styles.deleteBtn} onClick={() => {
                                                    const newUsp = content.home.usp.filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, home: { ...content.home, usp: newUsp } });
                                                }}>Удалить</button>
                                            </div>
                                            <div className={styles.field}>
                                                <label>Заголовок</label>
                                                <input value={item.title || ''} onChange={(e) => {
                                                    const newUsp = [...content.home.usp];
                                                    newUsp[idx].title = e.target.value;
                                                    setContent({ ...content, home: { ...content.home, usp: newUsp } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Описание</label>
                                                <textarea rows={2} value={item.desc || ''} onChange={(e) => {
                                                    const newUsp = [...content.home.usp];
                                                    newUsp[idx].desc = e.target.value;
                                                    setContent({ ...content, home: { ...content.home, usp: newUsp } });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.addBtn} style={{ marginTop: '24px' }} onClick={() => {
                                    setContent({ ...content, home: { ...content.home, usp: [...content.home.usp, { title: '', desc: '' }] } });
                                }}>+ Добавить фактор превосходства</div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Часто задаваемые вопросы (FAQ)</h3>
                                <div className={styles.grid}>
                                    {content.home.faq?.map((item: any, idx: number) => (
                                        <div key={idx} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4>Вопрос #{idx + 1}</h4>
                                                <button className={styles.deleteBtn} onClick={() => {
                                                    const newFaq = content.home.faq.filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, home: { ...content.home, faq: newFaq } });
                                                }}>Удалить</button>
                                            </div>
                                            <div className={styles.field}>
                                                <label>Вопрос</label>
                                                <input value={item.question || ''} onChange={(e) => {
                                                    const newFaq = [...content.home.faq];
                                                    newFaq[idx].question = e.target.value;
                                                    setContent({ ...content, home: { ...content.home, faq: newFaq } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Ответ</label>
                                                <textarea rows={3} value={item.answer || ''} onChange={(e) => {
                                                    const newFaq = [...content.home.faq];
                                                    newFaq[idx].answer = e.target.value;
                                                    setContent({ ...content, home: { ...content.home, faq: newFaq } });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.addBtn} style={{ marginTop: '24px' }} onClick={() => {
                                    const newFaq = content.home.faq ? [...content.home.faq] : [];
                                    newFaq.push({ question: '', answer: '' });
                                    setContent({ ...content, home: { ...content.home, faq: newFaq } });
                                }}>+ Добавить вопрос</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className={styles.formContainer}>
                            <div className={styles.fieldGroup}>
                                <h3>Тексты раздела Цены</h3>
                                <div className={styles.field}>
                                    <label>Заголовок раздела</label>
                                    <input value={content.pricing.introTitle || ''} onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, introTitle: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Вводный текст</label>
                                    <textarea rows={3} value={content.pricing.introText || ''} onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, introText: e.target.value } })} />
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Тарифные планы</h3>
                                <div className={styles.grid}>
                                    {content.pricing.tariffs.map((tariff: any, idx: number) => (
                                        <div key={idx} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4>Тариф: {tariff.name}</h4>
                                                <button className={styles.deleteBtn} onClick={() => {
                                                    const newTariffs = content.pricing.tariffs.filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newTariffs } });
                                                }}>Удалить</button>
                                            </div>
                                            <div className={styles.field}>
                                                <label>Название</label>
                                                <input value={tariff.name || ''} onChange={(e) => {
                                                    const newT = [...content.pricing.tariffs];
                                                    newT[idx].name = e.target.value;
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newT } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Цена (за час/грамм)</label>
                                                <input value={tariff.price || ''} onChange={(e) => {
                                                    const newT = [...content.pricing.tariffs];
                                                    newT[idx].price = e.target.value;
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newT } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Материалы</label>
                                                <input value={tariff.materials || ''} onChange={(e) => {
                                                    const newT = [...content.pricing.tariffs];
                                                    newT[idx].materials = e.target.value;
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newT } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Оборудование</label>
                                                <input value={tariff.equipment || ''} onChange={(e) => {
                                                    const newT = [...content.pricing.tariffs];
                                                    newT[idx].equipment = e.target.value;
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newT } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Область применения</label>
                                                <input value={tariff.usage || ''} onChange={(e) => {
                                                    const newT = [...content.pricing.tariffs];
                                                    newT[idx].usage = e.target.value;
                                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: newT } });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.addBtn} style={{ marginTop: '24px' }} onClick={() => {
                                    setContent({ ...content, pricing: { ...content.pricing, tariffs: [...content.pricing.tariffs, { name: 'Новый тариф', price: '0 ₽', materials: '', equipment: '', usage: '' }] } });
                                }}>+ Добавить тарифный план</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tech' && (
                        <div className={styles.formContainer}>
                            <div className={styles.fieldGroup}>
                                <h3>Управление оборудованием</h3>
                                <div className={styles.grid}>
                                    {content.tech.equipment.map((item: any, idx: number) => (
                                        <div key={idx} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4>Принтер: {item.name}</h4>
                                                <button className={styles.deleteBtn} onClick={() => {
                                                    const newE = content.tech.equipment.filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }}>Удалить</button>
                                            </div>
                                            <div className={styles.field}>
                                                <label>Модель принтера</label>
                                                <input value={item.name || ''} onChange={(e) => {
                                                    const newE = [...content.tech.equipment];
                                                    newE[idx].name = e.target.value;
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Количество в парке</label>
                                                <input value={item.qty || ''} onChange={(e) => {
                                                    const newE = [...content.tech.equipment];
                                                    newE[idx].qty = e.target.value;
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }} />
                                            </div>
                                            <ImageField
                                                label="Изображение принтера"
                                                value={item.image || ''}
                                                folder="equipment"
                                                onChange={(url: string) => {
                                                    const newE = [...content.tech.equipment];
                                                    newE[idx].image = url;
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }}
                                            />
                                            <div className={styles.field}>
                                                <label>Техническое описание</label>
                                                <textarea rows={3} value={item.desc || ''} onChange={(e) => {
                                                    const newE = [...content.tech.equipment];
                                                    newE[idx].desc = e.target.value;
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Специализация принтера</label>
                                                <input value={item.usage || ''} onChange={(e) => {
                                                    const newE = [...content.tech.equipment];
                                                    newE[idx].usage = e.target.value;
                                                    setContent({ ...content, tech: { ...content.tech, equipment: newE } });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.addBtn} style={{ marginTop: '24px' }} onClick={() => {
                                    setContent({ ...content, tech: { ...content.tech, equipment: [...content.tech.equipment, { name: 'Bambu Lab X', qty: '1 шт.', desc: '', usage: '', image: '' }] } });
                                }}>+ Добавить оборудование в парк</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'portfolio' && (
                        <div className={styles.formContainer}>
                            <div className={styles.fieldGroup}>
                                <h3>Проекты в портфолио</h3>
                                <div className={styles.grid}>
                                    {content.portfolio.works.map((work: any, idx: number) => (
                                        <div key={idx} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4>Проект: {work.title}</h4>
                                                <button className={styles.deleteBtn} onClick={() => {
                                                    const newW = content.portfolio.works.filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }}>Удалить</button>
                                            </div>
                                            <div className={styles.field}>
                                                <label>Название проекта</label>
                                                <input value={work.title || ''} onChange={(e) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].title = e.target.value;
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Slug (часть URL-адреса)</label>
                                                <input value={work.slug || ''} onChange={(e) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].slug = e.target.value;
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }} />
                                            </div>
                                            <ImageField
                                                label="Обложка проекта"
                                                value={work.image || ''}
                                                folder="cases"
                                                onChange={(url: string) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].image = url;
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }}
                                            />
                                            <div className={styles.field}>
                                                <label>Используемый материал</label>
                                                <input value={work.material || ''} onChange={(e) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].material = e.target.value;
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Краткий анонс</label>
                                                <textarea rows={2} value={work.desc || ''} onChange={(e) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].desc = e.target.value;
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Детали кейса (Вызов/Решение/Результат - каждая фраза с новой строки)</label>
                                                <textarea rows={6} value={work.details?.join('\n') || ''} onChange={(e) => {
                                                    const newW = [...content.portfolio.works];
                                                    newW[idx].details = e.target.value.split('\n');
                                                    setContent({ ...content, portfolio: { ...content.portfolio, works: newW } });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.addBtn} style={{ marginTop: '24px' }} onClick={() => {
                                    const newWork = { title: 'Новый проект', slug: 'new-case', image: '', material: '', desc: '', details: [] };
                                    setContent({ ...content, portfolio: { ...content.portfolio, works: [...content.portfolio.works, newWork] } });
                                }}>+ Опубликовать новый проект</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'blog' && (
                        <div className={styles.formContainer}>
                            <div className={styles.sectionActions}>
                                {!editingArticle ? (
                                    <button
                                        className="primary-button primary-button--filled"
                                        onClick={() => setEditingArticle({ title: '', slug: '', content: '', excerpt: '', image_url: '', category: 'Article' })}
                                    >
                                        + Написать статью
                                    </button>
                                ) : (
                                    <button
                                        className="primary-button"
                                        onClick={() => setEditingArticle(null)}
                                    >
                                        ← Назад к списку
                                    </button>
                                )}
                            </div>

                            {editingArticle ? (
                                <div className={styles.fieldGroup}>
                                    <h3>{editingArticle.id ? 'Редактирование статьи' : 'Новая статья'}</h3>
                                    <div className={styles.field}>
                                        <label>Заголовок статьи</label>
                                        <input
                                            value={editingArticle.title}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-а-я]/g, '') })}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>URL Slug (генерируется автоматически)</label>
                                        <input
                                            value={editingArticle.slug}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Категория</label>
                                        <select
                                            value={editingArticle.category}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                                            className={styles.select}
                                        >
                                            <option value="Article">Статья</option>
                                            <option value="Tech Doc">Тех. документация</option>
                                            <option value="News">Новости</option>
                                        </select>
                                    </div>
                                    <ImageField
                                        label="Обложка статьи"
                                        value={editingArticle.image_url}
                                        folder="blog"
                                        onChange={(url: string) => setEditingArticle({ ...editingArticle, image_url: url })}
                                    />
                                    <div className={styles.field}>
                                        <label>Краткое описание (для SEO и анонса)</label>
                                        <textarea
                                            rows={2}
                                            value={editingArticle.excerpt}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Контент статьи (Поддерживает HTML)</label>
                                        <textarea
                                            rows={15}
                                            value={editingArticle.content}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        className="primary-button primary-button--filled"
                                        onClick={() => handleSaveArticle(editingArticle)}
                                        disabled={saving}
                                        style={{ marginTop: '20px' }}
                                    >
                                        {saving ? 'Сохранение...' : 'Опубликовать статью'}
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {articles.map((article) => (
                                        <div key={article.id} className={styles.itemCard}>
                                            <div className={styles.itemHeader}>
                                                <h4 style={{ margin: 0 }}>{article.title}</h4>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className={styles.editBtn} onClick={() => setEditingArticle(article)}>✏️</button>
                                                    <button className={styles.deleteBtn} onClick={() => handleDeleteArticle(article.id)}>🗑️</button>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: '8px 0' }}>Slug: {article.slug}</p>
                                            <div className={styles.itemPreview}>
                                                {article.image_url && <Image src={article.image_url} alt="" width={100} height={60} style={{ borderRadius: '4px', objectFit: 'cover' }} />}
                                                <p style={{ fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {articles.length === 0 && <p>Статей пока нет.</p>}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className={styles.formContainer}>
                            <div className={styles.fieldGroup}>
                                <h3>Контактная информация</h3>
                                <div className={styles.field}>
                                    <label>Физический адрес</label>
                                    <input value={content.settings.address || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, address: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Контактный телефон</label>
                                    <input value={content.settings.contactPhone || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, contactPhone: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Основной Email</label>
                                    <input value={content.settings.contactEmail || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, contactEmail: e.target.value } })} />
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Социальные сети и ссылки</h3>
                                <div className={styles.grid}>
                                    <div className={styles.field}>
                                        <label>Телеграм (Прямая связь / Личный)</label>
                                        <input value={content.settings.telegramLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, telegramLink: e.target.value } })} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Телеграм-канал (Публичный)</label>
                                        <input value={content.settings.telegramChannelLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, telegramChannelLink: e.target.value } })} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Ссылка на WhatsApp</label>
                                        <input value={content.settings.whatsappLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, whatsappLink: e.target.value } })} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Ссылка на YouTube</label>
                                        <input value={content.settings.youtubeLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, youtubeLink: e.target.value } })} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Ссылка на MAX</label>
                                        <input value={content.settings.maxLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, maxLink: e.target.value } })} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Разработка и поддержка (Agency)</h3>
                                <div className={styles.field}>
                                    <label>Название агентства</label>
                                    <input value={content.settings.agencyName || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, agencyName: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Ссылка на сайт агентства</label>
                                    <input value={content.settings.agencyLink || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, agencyLink: e.target.value } })} />
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Интеграция с Telegram Bot</h3>
                                <div className={styles.field}>
                                    <label>Bot Token</label>
                                    <input type="password" value={content.settings.telegramToken || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, telegramToken: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Target Chat ID</label>
                                    <input value={content.settings.telegramChatId || ''} onChange={(e) => setContent({ ...content, settings: { ...content.settings, telegramChatId: e.target.value } })} />
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <h3>Метрика и Аналитика</h3>
                                <div className={styles.field}>
                                    <label>Yandex Metrica ID</label>
                                    <input
                                        placeholder="Например: 12345678"
                                        value={content.settings.yandexMetricaId || ''}
                                        onChange={(e) => setContent({ ...content, settings: { ...content.settings, yandexMetricaId: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
