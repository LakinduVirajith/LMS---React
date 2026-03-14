import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getMentors } from '@/lib/api';
import type { Mentor } from '@/types';
import { Input } from '@/components/ui/input';
import { useAuth } from '@clerk/react';
import { useNavigate } from 'react-router';
import TutorCard from '@/components/TutorCard';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const PAGE_SIZE = 6;

export default function TutorsPage() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMentors = useCallback(
    async (pageNumber: number, search = '') => {
      try {
        if (pageNumber === 0) setLoading(true);
        else setLoadingMore(true);

        const token = await getToken({ template: 'lms-auth' });
        if (!token) throw new Error('Unauthorized');

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
        toast.error('Failed to load tutors');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [getToken],
  );

  useEffect(() => {
    fetchMentors(0, searchTerm);
  }, [fetchMentors, searchTerm]);

  const handleLoadMore = () => {
    fetchMentors(page + 1, searchTerm);
  };

  const navigateToProfile = (id: number) => {
    navigate(`/tutors/${id}`);
  };

  return (
    <div className="p-12">
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search tutors by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => fetchMentors(0, searchTerm)}>
          <Search size={16} />
        </Button>
      </div>

      {loading && <div className="text-gray-500">Loading tutors...</div>}
      {!loading && mentors.length === 0 && (
        <div className="text-gray-500">No tutors found</div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <TutorCard
            key={mentor.id}
            mentor={mentor}
            onClick={navigateToProfile}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
