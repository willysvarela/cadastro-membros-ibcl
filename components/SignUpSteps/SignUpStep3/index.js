import React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Text } from '@chakra-ui/react'

const SignUpStep3 = props => {

    const handleClickNext = () => {
        props.onClickNext();
    }

    const handleClickBack = () => {
        props.onClickBack();
    }

    return (
        <Box>
            <Text>3</Text>
            <Button onClick={handleClickBack}>Anterior</Button>
            <Button onClick={handleClickNext}>Próximo</Button>
        </Box>
    )
}

SignUpStep3.propTypes = {

}

export default SignUpStep3
