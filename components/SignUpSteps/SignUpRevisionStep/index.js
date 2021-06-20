import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Link from "next/link"

import { Box, Grid, Heading, GridItem, Text, HStack } from '@chakra-ui/react'
import StepsBar, {STEP_STATUS} from '../../StepsBar'

import { FIELD_TITLE } from '../../../utils/constants'

const SignUpRevisionStep = props => {
    return (
        <Box>
            <Heading size="md" textAlign="center">Resumo do preenchimento</Heading>
            <Text textAlign="center">Confirme se as informações estão preenchidas corretamente antes de enviar os dados</Text>
            <Grid templateColumns="repeat(6, 1fr)" alignContent="flex-start">
                {props.memberData &&
                    Object.keys(FIELD_TITLE).map(fieldTitle => (
                        <GridItem key={fieldTitle} colSpan={6} marginTop="10px" borderBottom="1px solid #ccc3" alignItems="center">
                            <HStack spacing="15">
                                <Text fontWeight="bold">{FIELD_TITLE[fieldTitle]}: </Text>
                                <Text>{
                                    !Array.isArray(props.memberData[fieldTitle]) ? 
                                    props.memberData[fieldTitle] :
                                    props.memberData[fieldTitle].filter(value => value).map((value, i) => (value + ", "))
                                }</Text>
                            </HStack>
                        </GridItem>
                    ))
                }
            </Grid>
        </Box>
    )
}

SignUpRevisionStep.propTypes = {

}

export default SignUpRevisionStep
