import React from 'react'
import { FormProvider, useForm } from "react-hook-form"

import { Box, Button, Flex } from '@chakra-ui/react'

const StepBox = ({component: Component, ...props}) => {
    const methods = useForm();

    const handleClickNext = (values) => {
        props.onClickNext(values);
    }

    const handleClickBack = () => {
        props.onClickBack();
    }

    const handleSubmitForm = (values) => {
        handleClickNext(values);
    }

    const handleSubmitError = (error) => {
        console.log({ error });
    }

    return (
        <Box display={props.show ? "block" : "none"}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmitForm, handleSubmitError)}>
                    <Box>
                        {Component && <Component memberData={props.memberData && props.memberData} />}
                    </Box>
                    <Flex marginTop="30px" justifyContent="space-between">
                        {props.onClickBack ? <Button onClick={handleClickBack}>Anterior</Button>: <Box></Box>}
                        {props.onClickNext && <Button isLoading={methods.isSubmitting} type="submit">{props.nextTitle || "Próximo"}</Button>}
                    </Flex>
                </form>
            </FormProvider>
        </Box>
    )
}

export default StepBox
