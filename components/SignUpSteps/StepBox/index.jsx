import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Box, Button, Flex } from "@chakra-ui/react";

function StepBox({ component: Component, ...props }) {
  const [isProceedEnabled, setIsProceedEnabled] = useState(true);
  const methods = useForm();

  const handleClickNext = (values) => {
    props.onClickNext(values);
  };

  const handleClickBack = () => {
    props.onClickBack();
  };

  const handleSubmitForm = (values) => {
    handleClickNext(values);
  };

  const handleSubmitError = (error) => {
    console.log({ error });
  };
  const handleChangeProceed = (status) => {
    setIsProceedEnabled(status);
  };

  return (
    <Box display={props.show ? "block" : "none"}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitForm, handleSubmitError)}
        >
          <Box>
            {Component && (
              <Component
                memberData={props.memberData && props.memberData}
                onChangeProceed={handleChangeProceed}
              />
            )}
          </Box>
          <Flex marginTop="30px" justifyContent="space-between">
            {props.onClickBack ? (
              <Button onClick={handleClickBack}>Anterior</Button>
            ) : (
              <Box />
            )}
            {props.onClickNext && (
              <Button
                isLoading={methods.isSubmitting}
                type="submit"
                disabled={!isProceedEnabled}
              >
                {props.nextTitle || "Próximo"}
              </Button>
            )}
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
}

export default StepBox;
