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
        ym?: (...args: any[]) => void;
        dataLayer?: any[];
        __YA_METRICA_COUNTER_ID__?: number;
    }
}

function ensureDataLayer() {
    if (typeof window === 'undefined') return null;
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
}

function detectMetricaCounterId(): number | null {
    if (typeof window === 'undefined') return null;
    if (window.__YA_METRICA_COUNTER_ID__) return window.__YA_METRICA_COUNTER_ID__;

    const fromInlineInit = Array.from(document.scripts)
        .map((script) => script.textContent || '')
        .map((code) => code.match(/ym\((\d+)\s*,\s*['"]init['"]/))
        .find(Boolean);

    if (fromInlineInit?.[1]) {
        const id = Number(fromInlineInit[1]);
        if (Number.isFinite(id) && id > 0) {
            window.__YA_METRICA_COUNTER_ID__ = id;
            return id;
        }
    }

    const fromTagSrc = Array.from(document.scripts)
        .map((script) => script.src || '')
        .map((src) => src.match(/mc\.yandex\.ru\/metrika\/tag\.js\?id=(\d+)/))
        .find(Boolean);

    if (fromTagSrc?.[1]) {
        const id = Number(fromTagSrc[1]);
        if (Number.isFinite(id) && id > 0) {
            window.__YA_METRICA_COUNTER_ID__ = id;
            return id;
        }
    }

    return null;
}

function trackMetricaGoal(goal: string, params?: Record<string, any>) {
    if (typeof window === 'undefined' || typeof window.ym === 'undefined') return;

    const counterId = detectMetricaCounterId();
    if (!counterId) return;

    if (params) {
        window.ym(counterId, 'reachGoal', goal, params);
        return;
    }

    window.ym(counterId, 'reachGoal', goal);
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
    const payload = {
        event: 'lead_form_start',
        lead_source: source,
    };

    if (dl) dl.push(payload);
    trackMetricaGoal('lead_form_start', { lead_source: source });
}

export function trackLeadSubmit(payload: LeadPayload) {
    const dl = ensureDataLayer();

    const value = normalizePrice(payload.price);
    const itemName = payload.tariff || 'Заявка на расчет';
    const eventPayload = {
        event: 'lead_form_submit',
        lead_source: payload.source,
        lead_has_file: Boolean(payload.hasFile),
        lead_tariff: payload.tariff || '',
        lead_value: value,
        lead_item_name: itemName,
    };

    if (dl) dl.push(eventPayload);
    trackMetricaGoal('lead_form_submit', {
        lead_source: payload.source,
        lead_has_file: Boolean(payload.hasFile),
        lead_tariff: payload.tariff || '',
        lead_value: value,
        lead_item_name: itemName,
    });
}
