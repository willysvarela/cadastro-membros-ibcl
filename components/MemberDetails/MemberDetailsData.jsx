import { Flex, FormControl } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import React, { useEffect, forwardRef, useState } from 'react';

import classNames from 'classnames';
import api from '../../utils/api';
import { API_STATUS } from '../../utils/constants';

import { COLUMNS } from '../MembersTable/columns';

function MemberDetailsData({ member, onClose }) {
  const [apiStatus, setApiStatus] = useState(API_STATUS.NONE);

  const { register, reset, getValues } = useForm({
    defaultValues: {
      ...member
    }
  });
  useEffect(() => {
    reset({
      ...member
    });
  }, [member]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    const memberForm = getValues();
    try {
      const response = await api.post('/api/admin/member', {
        memberData: memberForm
      });
      if (response.status === 200) {
        setApiStatus(API_STATUS.SUCCESSFUL);
        onClose();
      } else setApiStatus(API_STATUS.ERROR);
    } catch (e) {
      console.log(e);
      setApiStatus(API_STATUS.ERROR);
    }
  };

  return (
    member && (
      <div>
        <Flex background="white" alignItems="center" p="10" flexDir="column">
          {Object.keys(member).map((field) => {
            const { onChange, onBlur, name, ref } = register(field);
            return (
              <MemberInput
                key={name}
                field={field}
                id={field}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
              />
            );
          })}
        </Flex>
        <div className="my-4 mx-10 flex justify-end">
          <div className="btn-group">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

const MemberInput = forwardRef(({ field, id, name, onChange, onBlur }, ref) => {
  const fieldMetaData = COLUMNS.find((COL) => COL.accessor === field);
  const isCheckbox = fieldMetaData.type === 'checkbox';

  return (
    <FormControl>
      <label htmlFor={id} className="label">
        {fieldMetaData ? fieldMetaData.Header : ''}
      </label>
      <input
        className={classNames({
          'input input-bordered w-full': !isCheckbox,
          checkbox: isCheckbox
        })}
        id={id}
        type={fieldMetaData.type}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        disabled={fieldMetaData.disabled}
      />
    </FormControl>
  );
});
export default MemberDetailsData;
