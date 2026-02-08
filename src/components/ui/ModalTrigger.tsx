'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

interface ModalTriggerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    data?: any;
}

const ModalTrigger = ({ children, className, style, data }: ModalTriggerProps) => {
    const { openModal } = useModal();

    return (
        <button onClick={() => openModal(data)} className={className} style={style}>
            {children}
        </button>
    );
};

export default ModalTrigger;
