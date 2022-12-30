/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import useDisplayImage from "../../hooks/useDisplayImage";
import styled from "@emotion/styled";
import { Button, Flex, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import api from "../../utils/api";
import ReactLoading from "react-loading";
import { useFormContext } from "react-hook-form";

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

const PhotoCapture = ({ onConfirm, onCancel }) => {
  const inputRef = useRef(null);
  const { result, uploader } = useDisplayImage();
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue } = useFormContext();
  register("photoUrl", { required: true });
  const isImageUploaded = !!imagePath && !isLoading;

  const handleSelectImage = (e) => {
    setImage(e.target.files[0]);
    uploader(e);
  };

  const handleTakePhoto = () => {
    onCancel();
    inputRef.current.click();
  };
  const handleConfirmation = () => {
    //upload Image
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    api
      .post("/api/file", formData, {
        headers: { "Content-Type": "multpart/form-data" },
      })
      .then((res) => {
        setIsLoading(false);
        console.log({ data: res.data });
        setImagePath(res.data); //maybe remove this state?
        setValue("photoUrl", res.data);
        onConfirm(imagePath);
      })
      .catch((err) => {
        setIsLoading(false);
        setImagePath(null);
      });
    //set image url to imagePath
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

      {image && <StyledImage src={result} alt="sd" />}
      <StyledButtonContainer>
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
};

export default PhotoCapture;
