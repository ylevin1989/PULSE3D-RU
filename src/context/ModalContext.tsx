'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isOpen: boolean;
    data: any;
    openModal: (data?: any) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<any>(null);

    const openModal = (modalData?: any) => {
        setData(modalData || null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setData(null);
    };

    return (
        <ModalContext.Provider value={{ isOpen, data, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
