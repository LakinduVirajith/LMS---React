import { NavLink } from 'react-router';
import { Users, BookOpen, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuItems = [
    {
      name: 'Mentors',
      icon: Users,
      children: [
        { name: 'View Mentors', path: '/admin/mentors' },
        { name: 'Create Mentor', path: '/admin/mentors/create' },
      ],
    },
    {
      name: 'Subjects',
      icon: BookOpen,
      children: [
        { name: 'View Subjects', path: '/admin/subjects/view' },
        { name: 'Create Subject', path: '/admin/subjects/create' },
      ],
    },
    {
      name: 'Bookings',
      icon: Calendar,
      children: [{ name: 'View Bookings', path: '/admin/bookings' }],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col border-r fixed left-0 top-0">
      {/* HEADER */}
      <div className="px-6 py-6 border-b border-slate-700">
        <h2 className="text-xl font-bold tracking-wide">LMS Admin</h2>
        <p className="text-sm text-slate-400">Management Panel</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name}>
              {/* Parent Menu */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item.name ? null : item.name)
                }
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </div>

                <span className="text-xs">
                  {openMenu === item.name ? '−' : '+'}
                </span>
              </button>

              {/* Sub Routes */}
              {openMenu === item.name && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
        © {new Date().getFullYear()} LMS
      </div>
    </aside>
  );
}
