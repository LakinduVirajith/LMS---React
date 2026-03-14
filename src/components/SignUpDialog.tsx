'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import AWSCertified1Img from '@/assets/aws-certified-1.webp';
import AWSCertified2Img from '@/assets/aws-certified-2.webp';
import AWSCertified3Img from '@/assets/aws-certified-3.webp';
import MicrosoftCertified1Img from '@/assets/microsoft-certified-1.webp';
import MicrosoftCertified2Img from '@/assets/microsoft-certified-2.webp';
import MicrosoftCertified3Img from '@/assets/microsoft-certified-3.webp';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupDialog({ isOpen, onClose }: SignupDialogProps) {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/login');
  };

  const images = [
    AWSCertified1Img,
    AWSCertified2Img,
    AWSCertified3Img,
    MicrosoftCertified3Img,
    MicrosoftCertified2Img,
    MicrosoftCertified1Img,
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 border-none rounded-3xl max-w-[500px] shadow-xl">
        <DialogTitle className="sr-only">Sign up to SkillMentor</DialogTitle>
        <DialogDescription className="sr-only">
          Sign up dialog to access SkillMentor's tutor booking features
        </DialogDescription>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-3 p-6 bg-gray-50">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden shadow-sm transform transition-transform hover:scale-105"
            >
              <img
                src={src}
                alt={`Certified ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Signup Content */}
        <div className="px-8 py-10 bg-white rounded-b-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-gray-900">
            Sign up to see all our amazing tutors
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Search through thousands of qualified SkillMentor tutors by accent,
            availability, and more!
          </p>
          <Button
            onClick={handleSignup}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all flex items-center justify-center gap-2"
          >
            Sign up <span className="text-xl">→</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
