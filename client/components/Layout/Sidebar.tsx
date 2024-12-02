// client/components/Layout/Sidebar.tsx
"use client";  // This makes the component a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserProfileCard from './UserProfileCard';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Transactions', href: '/transactions' },
    { name: 'Account Settings', href: '/account/settings' },
  ];

  return (
    <nav className="h-full w-1/3 bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Quantum</h2>
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`block py-2 px-4 rounded ${
                pathname === item.href ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <div className="mt-4 bg-gray-200 p-4">
        <h4>Copilot Kit</h4>
      </div>

      <hr className="my-4" />
      <UserProfileCard />
    </nav>
  );
};

export default Sidebar;
