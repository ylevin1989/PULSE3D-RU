'use client';

import React, { useState } from 'react';
import styles from './contacts.module.css';
import Link from 'next/link';
import contentData from '../../data/content.json';

const ContactsClient = () => {
    const settings = contentData.settings as any;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        description: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.startsWith('7') || numbers.startsWith('8')) {
            const clean = numbers.substring(1);
            let res = '+7 (';
            if (clean.length > 0) res += clean.substring(0, 3);
            if (clean.length > 3) res += ') ' + clean.substring(3, 6);
            if (clean.length > 6) res += '-' + clean.substring(6, 8);
            if (clean.length > 8) res += '-' + clean.substring(8, 10);
            return res;
        }
        return value;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData({ ...formData, phone: formatted });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const isPhoneValid = formData.phone.replace(/\D/g, '').length === 11;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPhoneValid) return;

        try {
            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('phone', formData.phone);
            dataToSend.append('description', formData.description);
            if (file) dataToSend.append('file', file);

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: dataToSend
            });

            if (response.ok) {
                alert('Заявка принята. Мы перезвоним вам в ближайшее время.');
                setFormData({ name: '', phone: '', description: '' });
                setFile(null);
            } else {
                alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            alert('Произошла ошибка связи с сервером.');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.contactsHero}>
                <span className={styles.heroSubtitle}>Communication Hub</span>
                <h1 className={styles.heroTitle}>СВЯЗЬ / <span style={{ color: '#94a3b8' }}>CONTACT</span></h1>
            </header>

            <div className={styles.mainGrid}>
                <div className={styles.infoCol}>
                    <div className={styles.contactBlock}>
                        <span className={styles.blockLabel}>Локация производства</span>
                        <p className={styles.addressText}>{settings.address}</p>
                    </div>

                    <div className={styles.contactBlock}>
                        <span className={styles.blockLabel}>Прямая линия</span>
                        <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className={styles.bigLink}>
                            {settings.contactPhone}
                        </a>
                        <a href={`mailto:${settings.contactEmail}`} className={styles.smallLink}>
                            {settings.contactEmail}
                        </a>
                    </div>

                    <div className={styles.contactBlock}>
                        <span className={styles.blockLabel}>Цифровые каналы</span>
                        <div className={styles.socialStack}>
                            <a href={settings.telegramChannelLink} target="_blank" className={styles.socialCard}>
                                <span>Telegram</span>
                                <strong>Our Channel</strong>
                            </a>
                            <a href={settings.whatsappLink} target="_blank" className={styles.socialCard}>
                                <span>WhatsApp</span>
                                <strong>Message Us</strong>
                            </a>
                            <a href={settings.youtubeLink} target="_blank" className={styles.socialCard}>
                                <span>YouTube</span>
                                <strong>Watch Process</strong>
                            </a>
                            <a href={settings.avitoLink} target="_blank" className={styles.socialCard}>
                                <span>Avito</span>
                                <strong>Our Store</strong>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.formPanel}>
                        <h2 className={styles.formTitle}>Запустить проект</h2>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Ваше имя</label>
                                <input
                                    type="text"
                                    placeholder="Иван Иванов"
                                    className={styles.textInput}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Телефон для связи</label>
                                <input
                                    type="text"
                                    placeholder="+7 (___) ___-__-__"
                                    className={styles.textInput}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Описание задачи / Материал</label>
                                <textarea
                                    rows={3}
                                    placeholder="Например: Шестерня редуктора, Nylon PA12, 10 шт."
                                    className={styles.textArea}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className={styles.fileControl}>
                                {file && (
                                    <div className={styles.fileDisplay}>
                                        <span>DOCUMENT: {file.name.toUpperCase()}</span>
                                    </div>
                                )}
                                <div className={styles.formActions}>
                                    <label className={styles.btnAttach}>
                                        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                        {file ? 'СМЕНИТЬ STL' : 'ПРИКРЕПИТЬ STL'}
                                    </label>
                                    <button
                                        type="submit"
                                        className={`${styles.btnSubmit} ${!isPhoneValid ? styles.disabled : ''}`}
                                        disabled={!isPhoneValid}
                                    >
                                        ОТПРАВИТЬ
                                    </button>
                                </div>
                                <p className={styles.privacyNotice}>
                                    Нажимая кнопку «ОТПРАВИТЬ», вы даете согласие на обработку персональных данных в соответствии с <Link href="/privacy">политикой конфиденциальности</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className={styles.mapWrapper} id="map">
                <div className={styles.mapTag}>PROD SITE / SPB / V.O.</div>
                <iframe
                    src={`https://yandex.ru/map-widget/v1/?ll=30.271099,59.932415&z=16&pt=30.271099,59.932415,pm2blm`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.05)' }}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default ContactsClient;
