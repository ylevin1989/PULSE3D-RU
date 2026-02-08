'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import styles from './ContactModal.module.css';

const ContactModal = () => {
    const { isOpen, data, closeModal } = useModal();
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
        if (numbers.length > 0) {
            return '+7 (' + numbers.substring(0, 3);
        }
        return '';
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData({ ...formData, phone: formatted });
    };

    const isPhoneValid = formData.phone.replace(/\D/g, '').length === 11;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPhoneValid) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        try {
            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('phone', formData.phone);
            dataToSend.append('description', formData.description);
            if (data?.tariff) {
                dataToSend.append('tariff', data.tariff);
                dataToSend.append('price', data.price);
            }
            if (file) dataToSend.append('file', file);

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: dataToSend
            });

            if (response.ok) {
                alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                setFormData({ name: '', phone: '', description: '' });
                setFile(null);
                closeModal();
            } else {
                alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            alert('Произошла ошибка связи с сервером.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div className={styles.container}>
                <h2 className={styles.title}>Оставить заявку на расчет</h2>
                {data?.tariff && (
                    <div className={styles.tariffNotice}>
                        Выбран тариф: <strong>{data.tariff}</strong> ({data.price})
                    </div>
                )}
                <p className={styles.subtitle}>Заполните форму, и мы рассчитаем стоимость вашего проекта в течение часа.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Ваше имя</label>
                        <input
                            type="text"
                            placeholder="Введите имя"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Телефон</label>
                        <input
                            type="text"
                            placeholder="+7 (___) ___-__-__"
                            required
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            maxLength={18}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Описание задачи</label>
                        <textarea
                            rows={4}
                            placeholder="Опишите вашу деталь, материал или требования..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className={styles.fileSection}>
                        <label className={styles.fileLabel}>
                            <input
                                type="file"
                                className={styles.hiddenInput}
                                onChange={handleFileChange}
                                accept=".stl,.step,.stp,.iges,.3mf,.obj,.prt,.zip,.rar,.pdf"
                            />
                            <div className={styles.fileBtn}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.31 2.69 6 6 6s6-2.69 6-6V6h-1.5z" />
                                </svg>
                                {file ? 'Файл выбран' : 'Прикрепить файл'}
                            </div>
                        </label>
                        {file && <div className={styles.fileName}>{file.name}</div>}
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="submit"
                            className={`primary-button primary-button--filled ${!isPhoneValid ? styles.disabled : ''}`}
                            disabled={!isPhoneValid}
                        >
                            Отправить заявку
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ContactModal;
