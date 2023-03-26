import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PhotoCapture from '../PhotoCapture';

function MemberPhotosData({
  member,
  onConfirm,
  onCancel,
  title = 'Foto do Membro'
}) {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <h2 className="text-xl">{title}</h2>
        <PhotoCapture
          defaultImage={member?.photo_url}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </FormProvider>
      <hr />
    </div>
  );
}

export default MemberPhotosData;
