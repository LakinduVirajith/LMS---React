import { fetchWithAuth } from './client';
import type { PageResponse, Subject, SubjectCreateRequest } from '@/types';

export async function createSubject(token: string, data: SubjectCreateRequest) {
  const res = await fetchWithAuth(`/api/v1/subjects`, token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create subject: ${res.status}`);
  }

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

  if (!res.ok) {
    throw new Error(`Failed to fetch subjects: ${res.status}`);
  }

  return res.json();
}

export async function deleteSubject(token: string, subjectId: number) {
  const res = await fetchWithAuth(`/api/v1/subjects/${subjectId}`, token, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete subject: ${res.status}`);
  }

  return true;
}
