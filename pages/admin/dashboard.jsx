import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr';
import MembersTable from '../../components/MembersTable';
import MemberDetails from '../../components/MemberDetails';
import AdminNavbar from '../../components/Admin/AdminNavbar';

function Dashboard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate } = useSWR('/api/admin/member', fetcher);

  const handleSelectMember = (selected) => {
    setSelectedMember(selected);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    mutate();
  };

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
      <div>
        <AdminNavbar />
        <div>
          <div className="container mx-auto px-4">
            <MembersTable onSelectMember={handleSelectMember} data={data} />
          </div>
          <div>
            <MemberDetails
              member={selectedMember}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
