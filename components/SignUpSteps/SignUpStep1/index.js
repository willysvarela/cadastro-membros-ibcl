import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { Text } from '@chakra-ui/layout'

import StepsBar from '../../StepsBar'

const SignUpStep1 = props => {
    return (
        <Box>
            <Box textAlign="center">
                <Text>Cadastro de Membro IBCL</Text>
                <StepsBar />
            </Box>
        </Box>
    )
}

SignUpStep1.propTypes = {

}

export default SignUpStep1
