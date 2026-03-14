import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { getMentorById } from '@/lib/api';
import type { Mentor } from '@/types';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useAuth } from '@clerk/react';
import { SignupDialog } from '@/components/SignUpDialog';
import { SchedulingModal } from '@/components/SchedulingModel';

export default function TutorProfilePage() {
  const { mentorId } = useParams<{ mentorId: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const fetchMentor = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMentorById(Number(mentorId));
      setMentor(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load mentor profile');
    } finally {
      setLoading(false);
    }
  }, [mentorId]);

  useEffect(() => {
    if (mentorId) fetchMentor();
  }, [mentorId, fetchMentor]);

  const handleSchedule = () => {
    if (!isSignedIn) {
      setIsSignupDialogOpen(true);
      return;
    }
    setIsSchedulingModalOpen(true);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!mentor) return <div className="text-center py-20">Mentor not found</div>;

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={mentor.profileImageUrl}
            alt={`${mentor.firstName} ${mentor.lastName}`}
            className="w-48 h-48 rounded-xl object-cover border-4 border-gray-200"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {mentor.firstName} {mentor.lastName}
              {mentor.isCertified && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Certified
                </span>
              )}
            </h1>
            <div className="text-lg text-gray-600">{mentor.title}</div>
            <div className="text-sm text-gray-500">
              {mentor.company} • {mentor.profession} • Since {mentor.startYear}
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-700">
                {mentor.positiveReviews || 0}% positive reviews
              </span>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">{mentor.bio}</p>
          <div className="mt-4 space-y-1 text-gray-600">
            <div>Experience: {mentor.experienceYears} years</div>
            <div>Specializations: {mentor.profession}</div>
          </div>
        </div>

        {/* SUBJECTS TAUGHT */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Subjects Taught</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentor.subjects.map((subject) => (
              <div
                key={subject.id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col"
              >
                {subject.courseImageUrl && (
                  <img
                    src={subject.courseImageUrl}
                    alt={subject.subjectName}
                    className="h-32 w-full object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{subject.subjectName}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {subject.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-700 text-sm">
                    {mentor.totalEnrollments || 0} students enrolled
                  </span>
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleSchedule}
                  >
                    Schedule Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border rounded-xl shadow-sm">
            <div className="text-2xl font-bold">
              {mentor.totalEnrollments || 0}
            </div>
            <div className="text-gray-600 text-sm">Students Taught</div>
          </div>
          <div className="p-4 border rounded-xl shadow-sm">
            <div className="text-2xl font-bold">{mentor.experienceYears}</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="p-4 border rounded-xl shadow-sm">
            <div className="text-2xl font-bold">
              {mentor.positiveReviews || 0}%
            </div>
            <div className="text-gray-600 text-sm">Positive Reviews</div>
          </div>
          <div className="p-4 border rounded-xl shadow-sm">
            <div className="text-2xl font-bold">{mentor.subjects.length}</div>
            <div className="text-gray-600 text-sm">Subjects Taught</div>
          </div>
        </div>
      </div>

      <SignupDialog
        isOpen={isSignupDialogOpen}
        onClose={() => setIsSignupDialogOpen(false)}
      />

      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
        mentor={mentor}
      />
    </>
  );
}
