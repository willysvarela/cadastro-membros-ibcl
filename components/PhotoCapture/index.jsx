import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Flex, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import ReactLoading from 'react-loading';
import { useFormContext } from 'react-hook-form';
import api from '../../utils/api';
import useDisplayImage from '../../hooks/useDisplayImage';

const StyledImage = styled.img`
  height: 300px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 40px;
`;

function PhotoCapture({ onConfirm, onCancel, defaultImage }) {
  const inputRef = useRef(null);
  const { result, uploader } = useDisplayImage();
  const [image, setImage] = useState(defaultImage || '');
  const [imagePath, setImagePath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue } = useFormContext();
  register('photoUrl', { required: true });
  const isImageUploaded = !!imagePath && !isLoading;

  const handleSelectImage = (e) => {
    setImage(e.target.files[0]);
    uploader(e);
  };

  const handleTakePhoto = () => {
    if (onCancel) {
      onCancel();
    }
    inputRef.current.click();
  };
  const handleConfirmation = () => {
    // upload Image
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    api
      .post('/api/file', formData, {
        headers: { 'Content-Type': 'multpart/form-data' }
      })
      .then((res) => {
        setIsLoading(false);
        setImagePath(res.data); // maybe remove this state?
        setValue('photoUrl', res.data);
        onConfirm(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setImagePath(null);
        console.error(err);
      });
    // set image url to imagePath
  };

  return (
    <StyledDiv>
      <input
        id="input"
        type="file"
        ref={inputRef}
        accept="image/*;capture=camera;image/png,image/jpeg"
        onChange={handleSelectImage}
      />

      {image && <StyledImage src={result || defaultImage} alt="sd" />}
      <StyledButtonContainer className="my-5">
        <Button
          colorScheme="green"
          size="lg"
          onClick={handleConfirmation}
          disabled={!image || isImageUploaded}
        >
          Confirmar
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={handleTakePhoto}
          disabled={isImageUploaded}
        >
          Tirar outra
        </Button>
      </StyledButtonContainer>
      {isLoading && (
        <Flex direction="column" align="center" mt="10">
          <ReactLoading
            height="80px"
            type="spinningBubbles"
            width="80px"
            color="#123123"
          />
          <Text mt="10">Salvando Foto</Text>
        </Flex>
      )}
      {!!imagePath && !isLoading && (
        <Flex direction="column" align="center" mt="10">
          <CheckIcon width="80px" height="80px" color="green" />
          <Text mt="10">Foto salva</Text>
        </Flex>
      )}
    </StyledDiv>
  );
}

export default PhotoCapture;
