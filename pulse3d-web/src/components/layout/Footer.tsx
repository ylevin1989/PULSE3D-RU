import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import content from '../../data/content.json';

const Footer = () => {
    const { settings } = content as any;

    return (
        <footer className={styles.footer}>
            <div className={styles.footerMain}>
                <div className={styles.brandCol}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>
                            PULSE <span className={styles.logoAccent}>3D</span>
                        </span>
                    </div>
                    <p className={styles.tagline}>
                        PULSE 3D — ритм твоего производства. От идеи до серии за 48 часов.
                    </p>
                    <div className={styles.socials}>
                        <a href={settings.telegramLink} target="_blank" className={styles.socialIcon} title="Telegram">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1 .22-1.62.15-.16 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.82 7.84-3.36 3.72-1.53 4.49-1.8 5-.18z" /></svg>
                        </a>
                        <a href={settings.whatsappLink} target="_blank" className={styles.socialIcon} title="WhatsApp">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.12.67 4.09 1.81 5.7L2.1 22l4.57-1.19c1.55.85 3.32 1.32 5.19 1.32 5.45 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2zm0 18.06c-1.8 0-3.48-.54-4.89-1.48l-.35-.2-2.73.71.72-2.66-.23-.37a8.04 8.04 0 0 1-1.25-4.25c0-4.43 3.61-8.05 8.05-8.05s8.05 3.61 8.05 8.05-3.61 8.05-8.05 8.05zm4.41-6.1c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.55.12c-.16.24-.63.78-.77.94s-.28.18-.53.05c-.24-.12-1.03-.38-1.97-1.21-.73-.65-1.22-1.45-1.37-1.7-.15-.24-.01-.38.11-.5.1-.1.24-.24.36-.36.12-.12.16-.2.24-.33.08-.13.04-.24-.02-.36s-.55-1.32-.75-1.81c-.2-.48-.4-.41-.55-.41h-.47c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62c.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.21-.57.21-1.06.14-1.16-.06-.11-.23-.17-.46-.29z" /></svg>
                        </a>
                        <a href={settings.youtubeLink} target="_blank" className={styles.socialIcon} title="YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.78-1.78C18.23 5 12 5 12 5s-6.23 0-7.8.41c-.87.24-1.55.92-1.78 1.78C2 8.76 2 12 2 12s0 3.24.42 4.81c.23.86.91 1.54 1.78 1.78C5.77 19 12 19 12 19s6.23 0 7.8-.41c.87-.24 1.55-.92 1.78-1.78C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.96 14.73V9.27L14.7 12l-4.74 2.73z" /></svg>
                        </a>
                        <a href={settings.avitoLink} target="_blank" className={styles.socialIcon} title="Avito">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 15.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm6.5-6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm-11-2c-.828 0-1.5-.672-1.5-1.5S6.172 6 7 6s1.5.672 1.5 1.5S7.828 9 7 9z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={styles.linksCol}>
                    <h4 className={styles.colTitle}>Навигация</h4>
                    <Link href="/">Главная</Link>
                    <Link href="/pricing">Цены</Link>
                    <Link href="/tech">Оборудование</Link>
                    <Link href="/portfolio">Портфолио</Link>
                    <Link href="/contacts">Контакты</Link>
                </div>

                <div className={styles.contactsCol}>
                    <h4 className={styles.colTitle}>Контакты</h4>
                    <Link href="/contacts#map" className={styles.contactLink}>{settings.address}</Link>
                    <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className={styles.contactLink}>
                        {settings.contactPhone}
                    </a>
                    <a href={`mailto:${settings.contactEmail}`} className={styles.contactLink}>
                        {settings.contactEmail}
                    </a>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>© 2025 PULSE 3D. Все права защищены.</p>
                <div className={styles.io}>
                    Сделано в <a href={settings.agencyLink || '#'} target="_blank" className={styles.agencyLink}>{settings.agencyName || 'UNO Agency'}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
