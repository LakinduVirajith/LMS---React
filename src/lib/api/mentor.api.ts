import { fetchPublic, fetchWithAuth } from './client';
import type { Mentor } from '@/types';

export async function getMentors(
  page = 0,
  size = 10,
): Promise<{
  content: Mentor[];
  totalElements: number;
  totalPages: number;
}> {
  const res = await fetchPublic(`/api/v1/mentors?page=${page}&size=${size}`);

  return res.json();
}

export async function createMentor(
  token: string,
  mentorData: Omit<Mentor, 'id'>,
) {
  const res = await fetchWithAuth('/api/v1/mentors', token, {
    method: 'POST',
    body: JSON.stringify(mentorData),
  });

  return res.json();
}

export async function deleteMentor(token: string, mentorId: number) {
  await fetchWithAuth(`/api/v1/mentors/${mentorId}`, token, {
    method: 'DELETE',
  });

  return true;
}
