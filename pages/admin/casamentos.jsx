import React, { useState } from 'react';
import useSWR from 'swr';
import Dashboard from '../../components/Admin/Dashboard';
import MarryModal from '../../components/Admin/MarryModal';
import Card from '../../components/Card';
import { dateFormatToShow } from '../../utils/date';

function Casamentos() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    '/api/admin/marry',
    fetcher
  );

  const [selectedMarry, setSelectedMarry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error) {
    return error;
  }

  if (isLoading) {
    return <span>loading</span>;
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMarry(null);
    mutate();
  };

  const handleSelect = (marry) => {
    setSelectedMarry(marry);
    setIsModalOpen(true);
  };

  const handleNewMarry = () => {
    setSelectedMarry(null);
    setIsModalOpen(true);
  };

  return (
    <Dashboard>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNewMarry}
        >
          Novo
        </button>
      </div>
      <div className="container mx-auto my-10">
        <div className="flex flex-wrap">
          {data?.map((marry) => (
            <Card
              title={`${marry.member[0].name.split(' ')[0]} & ${
                marry.member[1].name.split(' ')[0]
              }`}
              description={dateFormatToShow(marry.marry_date)}
              onClick={() => handleSelect(marry)}
            />
          ))}
        </div>
      </div>
      <MarryModal
        isOpen={isModalOpen}
        onClose={handleClose}
        marry={selectedMarry}
      />
    </Dashboard>
  );
}

export default Casamentos;
