'use client';

import React from 'react';
import styles from './TelegramWidget.module.css';

interface TelegramWidgetProps {
    link: string;
}

const TelegramWidget = ({ link }: TelegramWidgetProps) => {
    if (!link) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.widget}
            aria-label="Написать в Telegram"
        >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.19z" />
            </svg>
            <div className={styles.tooltip}>Написать нам</div>
        </a>
    );
};

export default TelegramWidget;
