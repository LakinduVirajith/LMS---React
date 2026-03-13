import { fetchPublic } from './client';
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
