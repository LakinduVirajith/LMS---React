import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { deleteMentor, getMentors } from '@/lib/api';
import type { Mentor } from '@/types';
import { Loader2, Pencil, Search, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/react';

const PAGE_SIZE = 6;

export default function MentorPage() {
  const { getToken } = useAuth();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMentors = useCallback(async (pageNumber: number, search = '') => {
    try {
      if (pageNumber === 0) setLoading(true);
      else setLoadingMore(true);

      const data = await getMentors(pageNumber, PAGE_SIZE);

      const filtered = search
        ? data.content.filter(
            (m) =>
              m.firstName.toLowerCase().includes(search.toLowerCase()) ||
              m.lastName.toLowerCase().includes(search.toLowerCase()) ||
              m.email.toLowerCase().includes(search.toLowerCase()),
          )
        : data.content;

      if (pageNumber === 0) setMentors(filtered);
      else setMentors((prev) => [...prev, ...filtered]);

      setHasMore(pageNumber + 1 < data.totalPages);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load mentors');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchMentors(0, searchTerm);
  }, [fetchMentors, searchTerm]);

  const handleLoadMore = () => {
    fetchMentors(page + 1, searchTerm);
  };

  const handleEdit = (mentor: Mentor) => {
    toast.info(
      `Edit functionality is not implemented yet. Mentor ID: ${mentor.id}`,
      {
        description:
          'This is a placeholder. In a real app, this would navigate to an edit page or open a modal.',
      },
    );
  };

  const handleDelete = async (mentor: Mentor) => {
    const token = await getToken({ template: 'lms-auth' });
    if (!token) throw new Error('Unauthorized');

    try {
      await deleteMentor(token, mentor.id);
      setMentors((prev) => prev.filter((s) => s.id !== mentor.id));
      toast.success('Mentor deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete mentor');
    }
  };

  return (
    <div className="px-8">
      <h1 className="text-2xl font-bold mb-4">Mentors</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search mentors by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => fetchMentors(0, searchTerm)}>
          <Search size={16} />
        </Button>
      </div>

      {loading && <div className="text-gray-500">Loading mentors...</div>}

      {!loading && mentors.length === 0 && (
        <div className="text-gray-500">No mentors found</div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="border rounded-xl shadow-md bg-white hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            {/* IMAGE */}
            {mentor.profileImageUrl && (
              <div className="h-40 w-full overflow-hidden flex justify-center bg-gray-50">
                <img
                  src={mentor.profileImageUrl}
                  alt={`${mentor.firstName} ${mentor.lastName}`}
                  className="h-full object-cover"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {mentor.firstName} {mentor.lastName}
                </h2>

                <div className="text-sm text-gray-500 mt-1">{mentor.email}</div>

                {mentor.phoneNumber && (
                  <div className="text-sm text-gray-500">
                    {mentor.phoneNumber}
                  </div>
                )}

                {mentor.title && (
                  <div className="text-sm text-gray-500 mt-1">
                    {mentor.title}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => handleEdit(mentor)}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Pencil size={16} />
                  Edit
                </Button>

                <Button
                  onClick={() => handleDelete(mentor)}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
