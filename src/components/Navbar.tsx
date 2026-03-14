import { cn } from '@/lib/utils';
import { SignInButton, useAuth, UserButton } from '@clerk/react';
import SkillMentorLogo from '@/assets/logo.webp';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-4 text-sm font-medium',
        mobile && 'flex-col items-start gap-4',
      )}
    >
      {[
        { name: 'Tutors', to: '/tutors' },
        { name: 'About Us', to: '/about' },
        { name: 'Resources', to: '/' },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => mobile && setIsOpen(false)}
          className={`
          relative inline-block px-4 py-2 rounded-full font-medium
          text-gray-200 hover:text-white transition-colors duration-300
          hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
          shadow-sm hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );

  const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={cn(
        'flex items-center gap-2',
        mobile && 'flex-col items-stretch gap-4 w-full',
      )}
    >
      {isSignedIn ? (
        <>
          <Link to="/dashboard" onClick={() => mobile && setIsOpen(false)}>
            <Button
              variant="outline"
              className={cn(
                'mx-2 px-4 py-2 rounded-full text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500 shadow-sm hover:shadow-lg',
                mobile && 'w-full',
              )}
            >
              Dashboard
            </Button>
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  'w-9 h-9 border-2 border-gray-600 hover:border-white rounded-full',
              },
            }}
          />
        </>
      ) : (
        <>
          <SignInButton
            forceRedirectUrl="/dashboard"
            mode="modal"
            appearance={{ elements: { formButtonPrimary: 'bg-primary' } }}
          >
            <Button
              className={cn(
                'mx-2 px-4 py-2 rounded-full text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 shadow-sm hover:shadow-lg',
                mobile && 'w-full',
              )}
            >
              Login
            </Button>
          </SignInButton>
          <Link to="/login">
            <Button
              className={cn(
                'px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-sm hover:shadow-lg',
                mobile && 'w-full',
              )}
            >
              Sign up
            </Button>
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 py-4 px-12 text-white w-full bg-black backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container flex flex-wrap h-14 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={SkillMentorLogo}
              alt="SkillMentor Logo"
              className="size-12 rounded-full"
            />
            <span className="font-semibold text-xl">SkillMentor</span>
          </Link>
          <div className="ml-6 hidden md:block">
            <NavItems />
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="border-primary">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="size-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black text-white p-6"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={SkillMentorLogo}
                      alt="SkillMentor Logo"
                      className="size-10 rounded-full"
                    />
                    <span className="font-semibold text-lg">SkillMentor</span>
                  </Link>
                </div>

                <div className="space-y-6 flex-1">
                  <NavItems mobile />
                </div>

                <div className="pt-6 border-t border-white/10">
                  <AuthButtons mobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
