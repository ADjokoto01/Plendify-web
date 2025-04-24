export const ENV_VARS = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.plendify.com",
  API_LOCAL_URL: import.meta.env.VITE_API_LOCAL_URL || "http://localhost:8080",
  EXCHANGE_RATE_API_KEY:
    import.meta.env.VITE_EXCHANGE_RATE_API_KEY ||
    "50e854080d8d92c479138e789c0bef24",
};

export const ENVIRONMENT = process.env.NODE_ENV;
export const isTesting = ENVIRONMENT === "test";
