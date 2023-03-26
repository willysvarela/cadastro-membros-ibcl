import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import AdminNavbar from '../AdminNavbar';
import Drawer from '../Drawer';

function Dashboard({ children }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user)
    return (
      <div>
        <a
          href="/api/auth/login"
          className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
        >
          Login
        </a>
      </div>
    );
  return (
    user && (
      <div className="grid grid-cols-[18%_82%]">
        <Drawer />
        <div>
          <AdminNavbar />
          <div className="container mx-auto px-4 w-100">{children}</div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
