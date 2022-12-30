import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import PhotoCapture from "../../PhotoCapture";

const SignUpStepPhoto = ({ onChangeProceed }) => {
  useEffect(() => {
    onChangeProceed(false);
    console.log(false);
  }, []);

  return (
    <Box>
      <Box>Captura de Foto</Box>
      <Box>
        <Grid
          templateColumns={{ sm: "repeat(6, 1fr)", md: "repeat(6, 1fr)" }}
          gap={6}
        >
          <GridItem colSpan={6}>
            <PhotoCapture
              onConfirm={() => onChangeProceed(true)}
              onCancel={() => onChangeProceed(false)}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpStepPhoto;
