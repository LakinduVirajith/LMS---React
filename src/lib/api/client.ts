const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (() => {
    throw new Error('API base URL is not defined in environment variables');
  })();

export async function fetchWithAuth(
  endpoint: string,
  token: string,
  options: RequestInit = {},
) {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(
      `API request failed with status ${res.status}: ${res.statusText}`,
    );
  }

  return res;
}

export async function fetchPublic(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(
      `API request failed with status ${res.status}: ${res.statusText}`,
    );
  }

  return res;
}
