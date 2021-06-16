import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text, Button, Spacer } from '@chakra-ui/react'
import { ChatIcon, CheckCircleIcon } from '@chakra-ui/icons'

const SignUpInitialStep = props => {
    return (
        <Box textAlign="center">
            <Box>
                <Heading as="h1" size="2xl">CADASTRO DE MEMBRO IBCL</Heading>
                <Heading as="h2">2021</Heading>
            </Box>
            <Box marginTop="10px">
                <Text fontWeight="bold">
                    Você iniciará o cadastro de membros da Igreja Batista Central Leste. Antes de iniciar, por favor leia com atenção para que não hajam dúvidas durante o preenchimento dos dados.
                </Text>
            </Box>
            <Box marginTop="10px" textAlign="justify">
                <Text><CheckCircleIcon color="blue.300"/> O cadastro contém algumas etapas. É de suma importantância que você responda todos os dados corretamente em cada uma. </Text>  
                <Text><CheckCircleIcon color="blue.300"/> O cadastro é feito de forma mais confortável via computador / notebook. Porém, fique a vontade para preencher pelo celular. </Text>  
                <Text><CheckCircleIcon color="blue.300"/> Este cadastro é exclusivo para membros da IBCL. Caso não seja um membro e tenha interesse em visitar nossa igreja, por favor entre em contato e ficaremos muito felizes em tê-lo conosco! </Text>
            </Box>
            <Button colorScheme="green" size="sm"><ChatIcon/> {" "}Contato Via Whatsapp</Button>
            <Box marginTop="50px">
                <Text fontWeight="bold">Bom Cadastro!</Text>
                <Button marginTop="10px" colorScheme="blue" size="lg">Iniciar Preenchimento</Button>
            </Box>

        </Box>
    )
}

SignUpInitialStep.propTypes = {

}

export default SignUpInitialStep
