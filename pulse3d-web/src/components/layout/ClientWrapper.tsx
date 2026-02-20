"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/modals/ContactModal";
import TelegramWidget from "@/components/ui/TelegramWidget";

export default function ClientWrapper({
    children,
    settings,
}: {
    children: React.ReactNode;
    settings: any;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) {
            document.body.classList.add('is-admin');
        } else {
            document.body.classList.remove('is-admin');
        }
    }, [isAdmin]);

    if (isAdmin) {
        return (
            <div className="admin-root-wrapper">
                <main>{children}</main>
            </div>
        );
    }

    return (
        <>
            <div className="bg-grid"></div>
            <Navbar settings={settings} />
            <main>{children}</main>
            <Footer settings={settings} />
            <ContactModal />
            <TelegramWidget link={settings.telegramLink} />
        </>
    );
}