/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import dateToString from '../../../utils/date';
import MemberPhotosData from '../../MemberDetails/MemberPhotosData';
import Modal from '../../Modal';
import PhotoCapture from '../../PhotoCapture';
import InputMarry from '../InputMarry/InputMarry';

function MarryModal({ isOpen, marry, onClose }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR('/api/admin/member', fetcher);
  const [husbandName, sethusbandName] = useState('');
  const [husband, setHusband] = useState(null);
  const [wifeName, setWifeName] = useState('');
  const [wife, setWife] = useState(null);

  const [form, setForm] = useState({
    marry_date: '2001-01-01',
    photo_url: null,
    members: []
  });

  useEffect(() => {
    if (marry) {
      setForm({
        marry_date: dateToString(new Date(Date.parse(marry.marry_date))),
        photo_url: marry.photo_url,
        members: marry.members
      });
    }
  }, [marry]);

  const handleChangeHusband = (e) => {
    sethusbandName(e.target.value);
  };

  const handleSelectHusband = (selected) => {
    setHusband(selected);
    sethusbandName(selected.name);
  };

  const handleChangeWife = (e) => {
    setWifeName(e.target.value);
  };

  const handleSelectWife = (selected) => {
    setWife(selected);
    setWifeName(selected.name);
  };

  const handleSave = () => {};

  const handleConfirmPhoto = (photoUrl) => {
    setForm((oldForm) => ({ ...oldForm, photo_url: photoUrl }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl">{marry ? 'Atualizar' : 'Novo'} Casamento</h2>
      <div className="py-10">
        <form>
          <div className="form-control">
            <label htmlFor="marry_date" className="label">
              Data de Casamento
            </label>
            <input
              id="marry_date"
              className="input input-primary"
              value={form.marry_date}
              type="date"
              onChange={(e) => {
                setForm((oldForm) => ({
                  ...oldForm,
                  marry_date: e.target.value
                }));
              }}
            />
          </div>
          <div>
            <InputMarry
              title="Marido"
              value={husbandName}
              items={data}
              onChange={handleChangeHusband}
              onSelect={handleSelectHusband}
              gender="M"
            />
            <InputMarry
              title="Esposa"
              value={wifeName}
              items={data}
              onChange={handleChangeWife}
              onSelect={handleSelectWife}
              gender="F"
            />
          </div>
          <div className="my-5">
            <MemberPhotosData
              title="Foto do Casal"
              onConfirm={handleConfirmPhoto}
            />
          </div>
          <div className="flex justify-end mt-10">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSave}
            >
              Salvar
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default MarryModal;
