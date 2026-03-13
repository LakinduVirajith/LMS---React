import Sidebar from '@/components/Sidebar';
import { useUser } from '@clerk/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function AdminLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      const roles = (user?.publicMetadata?.roles as string[]) || [];

      if (!roles.includes('ADMIN')) {
        navigate('/dashboard');
      }
    }
  }, [user, isLoaded]);

  if (!isLoaded || !user) return null;

  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
