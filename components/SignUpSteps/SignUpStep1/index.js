import React from 'react'
import { useForm } from "react-hook-form"

import { Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'

import CardHeader from '../../CardHeader'
import { Button } from '@chakra-ui/react'

const SignUpStep1 = props => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
      } = useForm();

    const handleClickNext = () => {
        props.onClickNext();
    }

    const handleSubmitForm = (values) => {
        console.log(values);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <Box>
                    <FormControl id="name">
                        <FormLabel>Nome</FormLabel>
                        <Input id="name" type="text" {...register("name", {required: true})} />
                    </FormControl>
                </Box>
            <Button onClick={handleClickNext} isLoading={isSubmitting} type="submit">Próximo</Button>
            </form>
        </Box>
    )
}

export default SignUpStep1
