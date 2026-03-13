import type { Enrollment, Mentor } from '@/types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (() => {
    throw new Error('API base URL is not defined in environment variables');
  })();

async function fetchWithAuth(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(
      `API request failed with status ${res.status}: ${res.statusText}`,
    );
  }
  return res;
}

// PUBLIC ROUTE WITHOUT AUTH
export async function getMentors(
  page: number = 0,
  size: number = 10,
): Promise<{ content: Mentor[]; totalElements: number; totalPages: number }> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/mentors?page=${page}&size=${size}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch mentors with status ${res.status}: ${res.statusText}`,
    );
  }

  return res.json();
}

// PROTECTED ROUTE WITH AUTH
export async function enrollInSession(
  token: string,
  data: {
    mentorId: number;
    subjectId: number;
    sessionAt: string;
    durationMinutes?: number;
  },
): Promise<Enrollment> {
  const res = await fetchWithAuth(`/api/v1/sessions/enrollment`, token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getUserEnrollments(token: string): Promise<Enrollment[]> {
  const res = await fetchWithAuth(`/api/v1/sessions/enrollments`, token);

  return res.json();
}
