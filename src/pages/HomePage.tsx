import { MentorCard } from '@/components/MentorCard';
import { Button } from '@/components/ui/button';
import { getMentors } from '@/lib/api';
import type { Mentor } from '@/types';
import { useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMentors() {
      try {
        setLoading(true);
        const data = await getMentors();
        setMentors(data.content);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMentors();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-6 py-24 flex flex-col items-center text-center space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Find Your SkillMentor
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-200">
            Empower your career with personalized mentorship. AWS Developer
            Associate, Interview Prep, and more.
          </p>

          {isSignedIn ? (
            <Link to="/dashboard">
              <Button
                size="lg"
                className="mt-6 px-8 py-4 text-xl bg-white text-indigo-600 hover:bg-gray-100"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                size="lg"
                className="mt-6 px-8 py-4 text-xl bg-white text-indigo-600 hover:bg-gray-100"
              >
                Sign Up to See All Tutors
              </Button>
            </Link>
          )}
        </div>
        {/* Optional decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 opacity-30 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 opacity-30 rounded-full mix-blend-multiply animate-pulse"></div>
      </section>

      {/* Mentors Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          Schedule a Call
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Loading mentors...
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No mentors available yet.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </section>

      {/* Call-to-action Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to Upskill?
          </h3>
          <p className="mb-6 text-lg md:text-xl text-gray-200">
            Join thousands of students accelerating their careers with expert
            mentors.
          </p>
          <Link to={isSignedIn ? '/dashboard' : '/login'}>
            <Button
              size="lg"
              className="px-8 py-4 text-xl bg-white text-indigo-600 hover:bg-gray-100"
            >
              {isSignedIn ? 'Go to Dashboard' : 'Sign Up Now'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
