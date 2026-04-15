'use client';

type LeadPayload = {
    source: 'modal' | 'contacts_page';
    name?: string;
    phone?: string;
    description?: string;
    tariff?: string;
    price?: string | number;
    hasFile?: boolean;
};

declare global {
    interface Window {
        dataLayer?: any[];
    }
}

function ensureDataLayer() {
    if (typeof window === 'undefined') return null;
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
}

function normalizePrice(price?: string | number): number {
    if (typeof price === 'number') return Number.isFinite(price) ? price : 0;
    if (!price) return 0;

    const normalized = price
        .toString()
        .replace(/[^\d.,]/g, '')
        .replace(',', '.');

    const parsed = parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function trackLeadFormOpen(source: LeadPayload['source']) {
    const dl = ensureDataLayer();
    if (!dl) return;

    dl.push({
        event: 'begin_checkout',
        ecommerce: {
            currencyCode: 'RUB',
            checkout: {
                actionField: {
                    step: 1,
                    option: source,
                },
            },
        },
    });
}

export function trackLeadSubmit(payload: LeadPayload) {
    const dl = ensureDataLayer();
    if (!dl) return;

    const value = normalizePrice(payload.price);
    const itemName = payload.tariff || 'Заявка на расчет';

    dl.push({
        event: 'generate_lead',
        lead_source: payload.source,
        lead_has_file: Boolean(payload.hasFile),
        lead_tariff: payload.tariff || '',
        lead_value: value,
    });

    // E-commerce format for Metrika dataLayer integration
    dl.push({
        ecommerce: {
            currencyCode: 'RUB',
            purchase: {
                actionField: {
                    id: `lead_${Date.now()}`,
                    revenue: value,
                    affiliation: 'pulse3d.ru',
                },
                products: [
                    {
                        id: payload.tariff || 'lead_request',
                        name: itemName,
                        category: 'lead',
                        quantity: 1,
                        price: value,
                        variant: payload.source,
                    },
                ],
            },
        },
    });
}
