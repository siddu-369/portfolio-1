/**
 * Base URL for all API requests.
 * - In development (Vite proxy): '' (relative, e.g. /api/chat)
 * - In production (Render): the full server URL set via VITE_API_URL env var
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? '';
