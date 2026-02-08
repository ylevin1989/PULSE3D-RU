'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import content from '../../data/content.json';
import ModalTrigger from '../ui/ModalTrigger';

const Navbar = () => {
    const pathname = usePathname();
    const { settings } = content;

    const navLinks = [
        { name: 'ГЛАВНАЯ', path: '/' },
        { name: 'ЦЕНЫ', path: '/pricing' },
        { name: 'ОБОРУДОВАНИЕ', path: '/tech' },
        { name: 'ПОРТФОЛИО', path: '/portfolio' },
        { name: 'КОНТАКТЫ', path: '/contacts' },
    ];

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/logo_navy.png"
                    alt="PULSE 3D Logo"
                    width={300}
                    height={100}
                    priority
                    className={styles.logoImage}
                />
            </Link>

            <div className={styles.navLinks}>
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className={styles.navRight}>
                <div className={styles.headerPhone}>
                    <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className={styles.phoneLink}>
                        {settings.contactPhone}
                    </a>
                    <span className={styles.separator}> | </span>
                    <Link href="/contacts#map" className={styles.cityLink}>
                        {settings.address.split(',')[0]}
                    </Link>
                </div>
                <ModalTrigger className="primary-button primary-button--filled">
                    Отправить файл
                </ModalTrigger>
            </div>
        </nav>
    );
};

export default Navbar;
