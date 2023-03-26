import React from 'react'
import PropTypes from 'prop-types'
import Link from "next/link"

import { Box, Heading, Text, Button, Spacer } from '@chakra-ui/react'
import { ChatIcon, CheckCircleIcon } from '@chakra-ui/icons'
import StepsBar, {STEP_STATUS} from '../../StepsBar'

const DEMO_STEPS = [
    {stepIndex: 0, description: "Dados", status: STEP_STATUS.DONE },
    {stepIndex: 1, description: "Ministério", status: STEP_STATUS.DONE },
    {stepIndex: 2, description: "Habilidades", status: STEP_STATUS.DOING },
    {stepIndex: 3, description: "Habilidades", status: STEP_STATUS.HOLD },
    {stepIndex: 4, description: "Finalização", status: STEP_STATUS.HOLD }
];

function SignUpInitialStep(props) {
    return (
        <Box textAlign="center">
            <Box>
                <Heading as="h1" size="2xl">CADASTRO DE MEMBRO IBCL</Heading>
                <Heading as="h2">2023</Heading>
            </Box>
            <Box marginTop="10px">
                <Text fontWeight="bold">
                    Você iniciará o cadastro de membros da Igreja Batista Central Leste. Antes de iniciar, por favor leia com atenção para que não hajam dúvidas durante o preenchimento dos dados.
                </Text>
            </Box>
            <Box marginTop="10px" textAlign="justify">
                <Text><CheckCircleIcon color="blue.300"/> O cadastro contém algumas etapas. É de suma importantância que você responda todos os dados corretamente em cada uma. </Text>  
                <Box height="20px"/>
                <StepsBar steps={DEMO_STEPS} />
            </Box>
            <Box marginTop="30px" textAlign="justify">
                <Text><CheckCircleIcon color="blue.300"/> O cadastro é feito de forma mais confortável via computador / notebook. Porém, fique a vontade para preencher pelo celular. </Text>  
            </Box>
            <Box marginTop="10px" textAlign="justify">
                <Text><CheckCircleIcon color="blue.300"/> Este cadastro é exclusivo para membros da IBCL. Caso não seja um membro e tenha interesse em visitar nossa igreja, por favor entre em contato e ficaremos muito felizes em tê-lo conosco! </Text>
            </Box>
            
            <Button colorScheme="green" size="sm"><ChatIcon/> {" "}Contato Via Whatsapp</Button>
            <Box marginTop="50px">
                <Text fontWeight="bold">Bom Cadastro!</Text>
                <Link href="/signup">
                    <Button marginTop="10px" colorScheme="blue" size="lg">Iniciar Preenchimento</Button>
                </Link>
            </Box>

        </Box>
    )
}

SignUpInitialStep.propTypes = {

}

export default SignUpInitialStep
