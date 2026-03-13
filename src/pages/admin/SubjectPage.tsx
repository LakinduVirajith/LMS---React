import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/react';
import { toast } from 'sonner';

import { deleteSubject, getSubjects } from '@/lib/api';
import type { Subject } from '@/types';
import { Loader2, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAGE_SIZE = 6;

export default function SubjectPage() {
  const { getToken } = useAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // CENTRALIZED TOKEN HANDLER
  const fetchToken = useCallback(async () => {
    if (!getToken) return null;
    try {
      const t = await getToken();
      if (!t) throw new Error('Unauthorized');
      return t;
    } catch (err) {
      toast.error('Failed to retrieve token');
      console.error(err);
      return null;
    }
  }, [getToken]);

  // INITIAL TOKEN FETCH
  useEffect(() => {
    fetchToken().then((t) => setToken(t));
  }, [fetchToken]);

  // FETCH SUBJECTS
  const fetchSubjects = useCallback(
    async (pageNumber: number, initial = false) => {
      if (!token) return;

      try {
        if (initial) setLoading(true);
        else setLoadingMore(true);

        const data = await getSubjects(token, pageNumber, PAGE_SIZE);

        if (initial) setSubjects(data.content);
        else setSubjects((prev) => [...prev, ...data.content]);

        setHasMore(pageNumber + 1 < data.totalPages);
        setPage(pageNumber);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load subjects');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [token],
  );

  // INITIAL LOAD
  useEffect(() => {
    if (token) fetchSubjects(0, true);
  }, [token, fetchSubjects]);

  const handleLoadMore = () => {
    fetchSubjects(page + 1);
  };

  const handleEdit = (subject: Subject) => {
    toast.info(
      `Edit functionality is not implemented yet. Subject ID: ${subject.id}`,
      {
        description:
          'This is a placeholder. In a real app, this would navigate to an edit page or open a modal.',
      },
    );
  };

  const handleDelete = async (subject: Subject) => {
    if (!token) return;

    try {
      await deleteSubject(token, subject.id);
      setSubjects((prev) => prev.filter((s) => s.id !== subject.id));
      toast.success('Subject deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete subject');
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading subjects...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Subjects</h1>

      {subjects.length === 0 ? (
        <div className="text-gray-500">No subjects found</div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{subject.subjectName}</h2>

                {subject.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    {subject.description}
                  </p>
                )}

                <div className="text-sm text-gray-400 mt-3">
                  Mentor: {subject.mentorName} (ID: {subject.mentorId})
                </div>

                {subject.courseImageUrl && (
                  <div className="flex justify-center my-4">
                    <img
                      src={subject.courseImageUrl}
                      alt={subject.subjectName}
                      className="w-60 h-60 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => handleEdit(subject)}>
                  <Pencil size={16} /> Edit
                </Button>

                <Button
                  onClick={() => handleDelete(subject)}
                  variant="secondary"
                >
                  <Trash size={16} /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore && <Loader2 className="animate-spin w-5 h-5" />}
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
