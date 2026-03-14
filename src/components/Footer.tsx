import { Link } from 'react-router';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import SkillMentorLogo from '@/assets/logo.webp';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {['Help center', 'Careers', 'Press'].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Join Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join</h3>
            <ul className="space-y-2">
              {[
                'SkillMentor for kids',
                'SkillMentor for business',
                'Become a tutor',
                'Become an ambassador',
              ].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Other</h3>
            <ul className="space-y-2">
              {['Privacy policy', 'Terms and conditions'].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <div className="flex space-x-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <Link
                  key={i}
                  to="/"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">Social</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img
              src={SkillMentorLogo}
              alt="SkillMentor Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold text-2xl">SkillMentor</span>
          </div>
          <p className="text-gray-400 text-sm text-center md:text-left">
            SkillMentor Inc. © 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
