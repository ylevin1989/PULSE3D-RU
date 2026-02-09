'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

interface ModalTriggerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    data?: any;
    onClick?: () => void;
}

const ModalTrigger = ({ children, className, style, data, onClick }: ModalTriggerProps) => {
    const { openModal } = useModal();

    const handleClick = () => {
        if (onClick) onClick();
        openModal(data);
    };

    return (
        <button onClick={handleClick} className={className} style={style}>
            {children}
        </button>
    );
};

export default ModalTrigger;
