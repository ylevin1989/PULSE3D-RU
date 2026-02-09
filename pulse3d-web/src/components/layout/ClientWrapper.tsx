"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/modals/ContactModal";
import TelegramWidget from "@/components/ui/TelegramWidget";
import content from '@/data/content.json';

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

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
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ContactModal />
            <TelegramWidget link={content.settings.telegramLink} />
        </>
    );
}
