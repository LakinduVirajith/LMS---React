import StatusPill from '@/components/StatusPill';
import { getUserEnrollments } from '@/lib/api';
import type { Enrollment } from '@/types';
import { useAuth, useUser } from '@clerk/react';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function DashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [enrollment, setEnrollment] = useState<Enrollment[]>([]);
  const router = useNavigate();

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

  if (!isLoaded) {
    return (
      <div className="container py-10">
        <div className="flex item-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    router('/login');
    return null;
  }

  if (!enrollment.length) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          My Enrollments
        </h1>
        <p className="text-muted-foreground">
          You have no enrollments yet. Browse mentors and book a session!
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Enrollments</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {enrollment.map((enroll) => (
          <div
            key={enroll.id}
            className="rounded-2xl p-6 relative overflow-hidden bg-linear-to-br from-blue-500 to-blue-600"
          >
            {/* STATUS PILL */}
            <div className="absolute top-4 right-4">
              <StatusPill status={enroll.paymentStatus} />
            </div>

            {/* PROFILE IMAGE */}
            <div className="size-24 rounded-full bg-white/10 mb-4">
              {enroll.mentorProfileImageUrl ? (
                <img
                  src={enroll.mentorProfileImageUrl}
                  alt={enroll.mentorName}
                  className="size-full rounded-full object-cover object-top"
                />
              ) : (
                <div className="size-full rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {enroll.mentorName.charAt(0)}
                </div>
              )}
            </div>

            {/* COURSE INFO */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white">
                {enroll.subjectName}
              </h2>
              <p className="text-blue-100/80">Mentor: {enroll.mentorName}</p>
              <div className="flex item-center text-blue-100/80 text-sm mt-2">
                <CalendarDays className="mr-2 h-4 w-4" />
                Next Session: {new Date(enroll.sessionAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
