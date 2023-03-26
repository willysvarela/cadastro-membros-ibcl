import React, { useState } from 'react';
import useSWR from 'swr';
import MembersTable from '../../components/MembersTable';
import MemberDetails from '../../components/MemberDetails';
import Dashboard from '../../components/Admin/Dashboard';

function Membros() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Dashboard>
      <div>
        <div className="container mx-auto px-4">
          {data && (
            <MembersTable onSelectMember={handleSelectMember} data={data} />
          )}
        </div>
        <div>
          <MemberDetails
            member={selectedMember}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </Dashboard>
  );
}

export default Membros;
