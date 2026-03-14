import { fetchWithAuth } from './client';
import type { PageResponse, Subject, SubjectCreateRequest } from '@/types';

export async function createSubject(token: string, data: SubjectCreateRequest) {
  const res = await fetchWithAuth(`/api/v1/subjects`, token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getSubjects(
  token: string,
  page: number = 0,
  size: number = 10,
): Promise<PageResponse<Subject>> {
  const res = await fetchWithAuth(
    `/api/v1/subjects?page=${page}&size=${size}`,
    token,
  );

  return res.json();
}

export async function deleteSubject(token: string, subjectId: number) {
  await fetchWithAuth(`/api/v1/subjects/${subjectId}`, token, {
    method: 'DELETE',
  });

  return true;
}
