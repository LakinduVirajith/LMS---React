import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Building2,
  Calendar,
  GraduationCap,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react';
import type { Mentor } from '@/types';
import { SchedulingModal } from '@/components/SchedulingModel';
import { SignupDialog } from '@/components/SignUpDialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/react';
import { useNavigate } from 'react-router';

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;
  const hasSubjects = mentor.subjects.length > 0;
  const courseTitle = mentor.subjects[0]?.subjectName ?? '';
  const courseImageUrl = mentor.subjects[0]?.courseImageUrl ?? '';
  const bio = mentor.bio ?? '';
  const bioTooLong = bio.length > 180;

  const handleSchedule = () => {
    if (!isSignedIn) {
      setIsSignupDialogOpen(true);
      return;
    }
    setIsSchedulingModalOpen(true);
  };

  const navigateToProfile = (id: number) => navigate(`/tutors/${id}`);

  return (
    <>
      <Card className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow rounded-xl overflow-hidden">
        {/* Top Section */}
        <div className="flex flex-col p-6 gap-4 flex-1">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {courseTitle}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <ThumbsUp className="w-4 h-4 text-green-500" />
                <span>{mentor.positiveReviews}% Positive Reviews</span>
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigateToProfile(mentor.id)}
              >
                {mentor.profileImageUrl ? (
                  <img
                    src={mentor.profileImageUrl}
                    alt={mentorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                    {mentor.firstName.charAt(0)}
                  </div>
                )}
                <span className="text-gray-900 font-medium">{mentorName}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Building2 className="w-4 h-4" />
                <span>{mentor.company}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Tutor since {mentor.startYear}</span>
              </div>
            </div>

            <div className="w-24 h-24 rounded-lg overflow-hidden">
              {courseImageUrl ? (
                <img
                  src={courseImageUrl}
                  alt={courseTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    {courseTitle.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="text-gray-700 text-sm md:text-base flex-1">
            <p
              className={cn(
                'transition-all duration-300 ease-in-out',
                !isExpanded && bioTooLong ? 'line-clamp-3' : '',
              )}
            >
              {bio}
            </p>
            {bioTooLong && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-indigo-600 text-sm font-medium hover:underline"
              >
                {isExpanded ? 'See less' : 'See more'}
              </button>
            )}
          </div>

          {/* Highlights Section */}
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                <span>{mentor.totalEnrollments} Enrollments</span>
              </div>
              {mentor.isCertified && (
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Certified Teacher</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          <Button
            onClick={handleSchedule}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
            disabled={!hasSubjects}
            title={
              !hasSubjects
                ? 'No courses available for this mentor yet'
                : undefined
            }
          >
            {hasSubjects ? 'Schedule a Session' : 'No Courses Available'}
          </Button>
        </div>
      </Card>

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
