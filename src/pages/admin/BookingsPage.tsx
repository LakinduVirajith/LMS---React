import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import {
  getBookings,
  confirmPayment,
  markCompleted,
  addMeetingLink,
} from '@/lib/api';
import type { Session } from '@/types';
import { useAuth } from '@clerk/react';
import { toast } from 'sonner';

const PAGE_SIZE = 10;

export default function BookingPage() {
  const { getToken } = useAuth();

  const [bookings, setBookings] = useState<Session[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [token, setToken] = useState<string | null>(null);

  const [linkInputs, setLinkInputs] = useState<{ [key: number]: string }>({});
  const [linkLoading, setLinkLoading] = useState<{ [key: number]: boolean }>(
    {},
  );

  /* ---------------- CENTRALIZED TOKEN HANDLER ---------------- */
  const fetchToken = useCallback(async () => {
    try {
      const t = await getToken({ template: 'lms-auth' });

      if (!t) throw new Error('Unauthorized');

      return t;
    } catch (err) {
      toast.error('Failed to retrieve token');
      console.error(err);
      return null;
    }
  }, [getToken]);

  useEffect(() => {
    fetchToken().then((t) => setToken(t));
  }, [fetchToken]);

  /* ---------------- FETCH BOOKINGS ---------------- */
  const fetchBookings = useCallback(
    async (pageNumber: number, initial = false) => {
      if (!token) return;

      try {
        if (initial) setLoading(true);
        else setLoadingMore(true);

        const data = await getBookings(token, pageNumber, PAGE_SIZE);

        let filtered = data.content;

        /* SEARCH FILTER */
        if (search) {
          filtered = filtered.filter(
            (b: Session) =>
              b.studentName.toLowerCase().includes(search.toLowerCase()) ||
              b.mentorName.toLowerCase().includes(search.toLowerCase()),
          );
        }

        /* STATUS FILTER */
        if (statusFilter !== 'ALL') {
          filtered = filtered.filter(
            (b: Session) => b.sessionStatus === statusFilter,
          );
        }

        /* PAGINATION */
        if (pageNumber === 0) {
          setBookings(filtered);
        } else {
          setBookings((prev) => [...prev, ...filtered]);
        }

        setHasMore(pageNumber + 1 < data.totalPages);
        setPage(pageNumber);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [token, search, statusFilter],
  );

  useEffect(() => {
    if (token) {
      fetchBookings(0, true);
    }
  }, [token, search, statusFilter, fetchBookings]);

  const handleConfirmPayment = async (id: number) => {
    if (!token) return;

    try {
      await confirmPayment(token, id);

      toast.success('Payment confirmed');

      fetchBookings(page, true);
    } catch {
      toast.error('Failed to confirm payment');
    }
  };

  const handleComplete = async (id: number) => {
    if (!token) return;

    try {
      await markCompleted(token, id);

      toast.success('Session completed');

      fetchBookings(page, true);
    } catch {
      toast.error('Failed to update session');
    }
  };

  const handleAddLink = async (id: number) => {
    if (!token || !linkInputs[id]) return;
    setLinkLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await addMeetingLink(token, id, linkInputs[id]);
      toast.success('Meeting link added');
      setLinkInputs((prev) => ({ ...prev, [id]: '' }));
      fetchBookings(page, true);
    } catch {
      toast.error('Failed to add meeting link');
    } finally {
      setLinkLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search student or mentor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <select
          className="border rounded-md px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Session ID</th>
              <th className="p-3">Student</th>
              <th className="p-3">Mentor</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Date</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Actions</th>
              <th className="p-3">Session</th>
              <th className="p-3">Metting</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="text-center p-6">
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            )}

            {!loading &&
              bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-3">{b.id}</td>

                  <td className="p-3">{b.studentName}</td>

                  <td className="p-3">{b.mentorName}</td>

                  <td className="p-3">{b.subjectName}</td>

                  <td className="p-3">
                    {new Date(b.sessionAt).toLocaleString()}
                  </td>

                  <td className="p-3">{b.durationMinutes} min</td>

                  {/* PAYMENT STATUS */}
                  <td className="p-3">
                    <Badge
                      variant={
                        b.paymentStatus === 'COMPLETED'
                          ? 'default'
                          : b.paymentStatus === 'CONFIRMED'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {b.paymentStatus}
                    </Badge>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    {b.paymentStatus === 'PENDING' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConfirmPayment(b.id)}
                      >
                        Confirm Payment
                      </Button>
                    )}

                    {b.paymentStatus === 'CONFIRMED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleComplete(b.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </td>

                  {/* SESSION STATUS */}
                  <td className="p-3">
                    <Badge
                      variant={
                        b.sessionStatus === 'COMPLETED'
                          ? 'default'
                          : b.sessionStatus === 'SCHEDULED'
                            ? 'secondary'
                            : b.sessionStatus === 'CANCELLED'
                              ? 'destructive'
                              : 'outline'
                      }
                    >
                      {b.sessionStatus}
                    </Badge>
                  </td>

                  {/* MEETING LINK */}
                  <td className="p-3">
                    <Input
                      placeholder="Add link"
                      className="max-w-xs"
                      value={linkInputs[b.id] ?? b.meetingLink ?? ''}
                      onChange={(e) =>
                        setLinkInputs((prev) => ({
                          ...prev,
                          [b.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddLink(b.id);
                      }}
                      disabled={linkLoading[b.id]}
                    />
                    {linkLoading[b.id] && (
                      <Loader2 className="animate-spin w-5 h-5" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => fetchBookings(page + 1)}
            disabled={loadingMore}
          >
            {loadingMore && <Loader2 className="animate-spin mr-2" />}
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
