// API configuration constants

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    // Fallback to same-origin (e.g. https://diklat-amar.id) if env is missing or points to unresolvable subdomain
    if (!envUrl || envUrl.includes("api.diklat-amar.id")) {
      return window.location.origin;
    }
    return envUrl.replace(/\/api\/?$/, "");
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://diklat-backend:3090";
  return envUrl.replace(/\/api\/?$/, "");
};

export const API_BASE_URL = getBaseUrl();
export const APP_TOKEN = process.env.NEXT_PUBLIC_APP_TOKEN ?? "";