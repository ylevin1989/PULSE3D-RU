export const SITE_URL = 'https://pulse3d.ru';
export const SITE_NAME = 'PULSE 3D';
export const DEFAULT_OG_IMAGE = '/printer_business.png';

export function absoluteUrl(path: string): string {
    if (!path) return SITE_URL;
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

