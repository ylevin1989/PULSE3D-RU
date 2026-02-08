'use client';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import styles from './Navbar.module.css';
import content from '../../data/content.json';
import ModalTrigger from '../ui/ModalTrigger';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { settings } = content;

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'ГЛАВНАЯ', path: '/' },
        { name: 'ЦЕНЫ', path: '/pricing' },
        { name: 'ОБОРУДОВАНИЕ', path: '/tech' },
        { name: 'ПОРТФОЛИО', path: '/portfolio' },
        { name: 'КОНТАКТЫ', path: '/contacts' },
    ];

    return (
        <>
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

                <button
                    className={styles.burger}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ''}`}>
                <div className={styles.mobileContent}>
                    <div className={styles.mobileLinks}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`${styles.mobileLink} ${pathname === link.path ? styles.mobileActive : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.mobileFooter}>
                        <div className={styles.mobileContactItem}>
                            <Phone size={18} className={styles.contactIcon} />
                            <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}>
                                {settings.contactPhone}
                            </a>
                        </div>
                        <div className={styles.mobileContactItem}>
                            <MapPin size={18} className={styles.contactIcon} />
                            <span>{settings.address}</span>
                        </div>
                        <ModalTrigger className="primary-button primary-button--filled w-full">
                            Рассчитать проект
                        </ModalTrigger>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
