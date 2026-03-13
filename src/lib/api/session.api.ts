import { fetchWithAuth } from './client';
import type { Enrollment } from '@/types';

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
