import { fetchWithAuth } from './client';
import type { Review, Session } from '@/types';

export async function enrollInSession(
  token: string,
  data: {
    mentorId: number;
    subjectId: number;
    sessionAt: string;
    durationMinutes?: number;
  },
): Promise<Session> {
  const res = await fetchWithAuth(`/api/v1/sessions/enrollment`, token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getUserEnrollments(token: string): Promise<Session[]> {
  const res = await fetchWithAuth(`/api/v1/sessions/enrollments`, token);

  return res.json();
}

/*-----------------
    Admin APIs
-----------------*/
export async function getBookings(token: string, page: number, size: number) {
  const res = await fetchWithAuth(
    `/api/v1/sessions?page=${page}&size=${size}`,
    token,
  );
  return res.json();
}

export async function confirmPayment(token: string, id: number) {
  return fetchWithAuth(`/api/v1/sessions/${id}/confirm-payment`, token, {
    method: 'PATCH',
  });
}

export async function markCompleted(token: string, id: number) {
  return fetchWithAuth(`/api/v1/sessions/${id}/complete`, token, {
    method: 'PATCH',
  });
}

export async function addMeetingLink(token: string, id: number, link: string) {
  return fetchWithAuth(`/api/v1/sessions/${id}/meeting-link`, token, {
    method: 'PATCH',
    body: JSON.stringify({ link }),
  });
}

export async function submitSessionReview(token: string, reviewData: Review) {
  const res = await fetchWithAuth(
    `/api/v1/sessions/${reviewData.sessionId}/review`,
    token,
    {
      method: 'PATCH',
      body: JSON.stringify(reviewData),
    },
  );

  return res.json();
}
