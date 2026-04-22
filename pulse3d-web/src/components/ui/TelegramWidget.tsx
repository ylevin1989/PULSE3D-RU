'use client';

import React from 'react';
import styles from './TelegramWidget.module.css';

interface TelegramWidgetProps {
    link?: string;
}

const TelegramWidget = ({ link }: TelegramWidgetProps) => {
    if (!link) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.widget}
            aria-label="Написать в MAX"
        >
            <img src="/icons/max-messenger-sign-logo.svg" alt="" width="32" height="32" />
            <div className={styles.tooltip}>Написать в MAX</div>
        </a>
    );
};

export default TelegramWidget;
