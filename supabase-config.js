/**
 * OmniTools Backend & Cloud Configuration
 */
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
window.NEXT_PUBLIC_BACKEND_URL = isLocalhost ? "http://localhost:3000" : (window.NEXT_PUBLIC_BACKEND_URL || "https://omnitools-backend.onrender.com");

window.SUPABASE_CONFIG = {
    url: "https://tcacczhndrefkzntwzmu.supabase.co",
    publishableKey: "sb_publishable_7HSpwMSbmawPPTmXXv44rg_m-gJYDRi",
    functionsUrl: "https://tcacczhndrefkzntwzmu.supabase.co/functions/v1/api",
    NEXT_PUBLIC_BACKEND_URL: window.NEXT_PUBLIC_BACKEND_URL
};
