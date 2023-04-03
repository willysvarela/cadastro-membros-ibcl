/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import dateToString from '../../../utils/date';
import MemberPhotosData from '../../MemberDetails/MemberPhotosData';
import api from '../../../utils/api';
import Modal from '../../Modal';
import InputMarry from '../InputMarry/InputMarry';
import { API_STATUS } from '../../../utils/constants';

const DEFAULT_FORM_STATE = {
  marry_date: '2001-01-01',
  photo_url: null,
  member: []
};

function MarryModal({ isOpen, marry, onClose }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR('/api/admin/member', fetcher);
  const [apiStatus, setApiStatus] = useState(API_STATUS.NONE);
  const [husbandName, sethusbandName] = useState('');
  const [husband, setHusband] = useState(null);
  const [wifeName, setWifeName] = useState('');
  const [wife, setWife] = useState(null);

  const [form, setForm] = useState(DEFAULT_FORM_STATE);
  useEffect(() => {
    setWifeName(wife?.name);
    sethusbandName(husband?.name);
  }, [husband, wife]);

  useEffect(() => {
    if (marry) {
      setForm({
        marry_date: dateToString(new Date(Date.parse(marry.marry_date))),
        photo_url: marry.photo_url,
        member: marry.member,
        id: marry.id
      });
      setHusband(marry.member.find((item) => item.gender === 'M'));
      setWife(marry.member.find((item) => item.gender === 'F'));
    } else {
      setForm(DEFAULT_FORM_STATE);
      setWife(null);
      setHusband(null);
    }
  }, [marry]);

  const handleChangeHusband = (e) => {
    sethusbandName(e.target.value);
  };

  const handleSelectHusband = (selected) => {
    setHusband(selected);

    setForm((oldForm) => ({ ...oldForm, member: [wife, selected] }));
  };

  const handleChangeWife = (e) => {
    setWifeName(e.target.value);
  };

  const handleSelectWife = (selected) => {
    setWife(selected);
    setForm((oldForm) => ({ ...oldForm, member: [selected, husband] }));
  };

  const handleSave = async () => {
    let response;
    setApiStatus(API_STATUS.LOADING);
    try {
      if (marry) {
        response = await api.put('/api/admin/marry', {
          ...form
        });
      } else {
        response = await api.post('/api/admin/marry', {
          ...form
        });
      }
      if (response.status === 200) {
        setApiStatus(API_STATUS.SUCCESSFUL);
        onClose();
      } else setApiStatus(API_STATUS.ERROR);
    } catch (e) {
      console.log(e);
      setApiStatus(API_STATUS.ERROR);
    }
  };

  const handleDelete = async () => {
    setApiStatus(API_STATUS.LOADING);
    try {
      await api.delete(`/api/admin/marry/${form.id}`);
      setApiStatus(API_STATUS.SUCCESSFUL);
      onClose();
    } catch (e) {
      console.log(e);
      setApiStatus(API_STATUS.ERROR);
    }
  };

  const handleConfirmPhoto = (photoUrl) => {
    setForm((oldForm) => ({ ...oldForm, photo_url: photoUrl }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center">
        <h2 className="text-xl">{marry ? 'Atualizar' : 'Novo'} Casamento</h2>
        {marry && (
          <button
            className={` ${
              apiStatus === API_STATUS.LOADING && 'loading'
            } btn btn-error ml-5`}
            type="button"
            onClick={handleDelete}
          >
            Deletar
          </button>
        )}
      </div>
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
              disabled={!!marry}
            />
            <InputMarry
              title="Esposa"
              value={wifeName}
              items={data}
              onChange={handleChangeWife}
              onSelect={handleSelectWife}
              gender="F"
              disabled={!!marry}
            />
          </div>
          <div className="my-5">
            <MemberPhotosData
              title="Foto do Casal"
              member={marry}
              onConfirm={handleConfirmPhoto}
            />
          </div>
          <div className="flex justify-end mt-10 btn-group">
            <button
              className={` ${
                apiStatus === API_STATUS.LOADING && 'loading'
              } btn btn-secondary`}
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={` ${
                apiStatus === API_STATUS.LOADING && 'loading'
              } btn btn-primary`}
              type="button"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default MarryModal;
