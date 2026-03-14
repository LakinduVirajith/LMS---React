import StatusPill from '@/components/StatusPill';
import { getUserEnrollments, submitSessionReview } from '@/lib/api';
import type { Review, Session } from '@/types';
import { useAuth, useUser } from '@clerk/react';
import { CalendarDays, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import ReviewModal from '@/components/ReviewModal';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [enrollment, setEnrollment] = useState<Session[]>([]);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEnrollments() {
      if (!user) return;

      const token = await getToken({ template: 'lms-auth' });
      if (!token) return;

      try {
        const res = await getUserEnrollments(token);
        setEnrollment(res);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchEnrollments();
    }
  }, [isLoaded, isSignedIn, getToken, user]);

  const handleReviewSubmit = async (data: Review) => {
    try {
      const token = await getToken({ template: 'lms-auth' });
      if (!token) return;

      await submitSessionReview(token, data);

      toast.success('Review submitted successfully!');
      setReviewOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit review');
    }
  };

  if (!isLoaded) {
    return (
      <div className="container py-20 text-center text-lg">Loading...</div>
    );
  }

  if (!isSignedIn) {
    navigate('/login');
    return null;
  }

  if (!enrollment.length) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">My Sessions</h1>
        <p className="text-muted-foreground">
          You have no sessions yet. Browse mentors and book a session!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container p-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Sessions</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrollment.map((enroll) => {
            const sessionDate = new Date(enroll.sessionAt);

            return (
              <div
                key={enroll.id}
                className="rounded-2xl border shadow-sm hover:shadow-lg transition p-6 bg-white flex flex-col justify-between"
              >
                {/* HEADER */}
                <div className="flex flex-row justify-end gap-4 mb-4">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Session: </span>
                    <StatusPill status={enroll.sessionStatus} type="session" />
                  </div>

                  <div className="text-xs">
                    <span className="text-muted-foreground">Payment: </span>
                    <StatusPill status={enroll.paymentStatus} type="payment" />
                  </div>
                </div>

                {/* MENTOR */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                    {enroll.mentorProfileImageUrl ? (
                      <img
                        src={enroll.mentorProfileImageUrl}
                        alt={enroll.mentorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-lg font-semibold">
                        {enroll.mentorName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="font-semibold">{enroll.mentorName}</div>
                    <div className="text-sm text-muted-foreground">
                      {enroll.subjectName}
                    </div>
                  </div>
                </div>

                {/* SESSION TIME */}
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {sessionDate.toLocaleDateString()} •{' '}
                  {sessionDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>

                {/* ACTION BUTTON */}
                {enroll.sessionStatus === 'COMPLETED' && (
                  <Button
                    className="mt-auto flex items-center gap-2"
                    onClick={() => {
                      setSelectedSession(enroll.id);
                      setReviewOpen(true);
                    }}
                  >
                    <Star className="w-4 h-4" />
                    Add Review
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ReviewModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        sessionId={selectedSession}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}
