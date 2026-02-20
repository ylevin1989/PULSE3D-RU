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
        { name: 'ТЕХНОЛОГИИ', path: '/tech' },
        { name: 'КЕЙСЫ', path: '/portfolio' },
        { name: 'БЛОГ', path: '/blog' },
        { name: 'МЕРЧ', path: '/merch' },
        { name: 'О НАС', path: '/about' },
        { name: 'КОНТАКТЫ', path: '/contacts' },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>
                            PULSE <span className={styles.logoAccent}>3D</span>
                        </span>
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
                </div>
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
                        <ModalTrigger
                            className="primary-button primary-button--filled w-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Рассчитать проект
                        </ModalTrigger>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
