import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PhotoCapture from '../PhotoCapture';

function MemberPhotosData({ member, onClose }) {
  console.log({ member });
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <h2 className="text-xl">Foto do Membro</h2>
        <PhotoCapture defaultImage={member.photo_url} />
      </FormProvider>
      <hr />
    </div>
  );
}

export default MemberPhotosData;
