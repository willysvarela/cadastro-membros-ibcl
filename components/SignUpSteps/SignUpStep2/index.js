import React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Text } from '@chakra-ui/react'

const SignUpStep2 = props => {

    const handleClickNext = () => {
        props.onClickNext();
    }

    const handleClickBack = () => {
        props.onClickBack();
    }

    return (
        <Box>
            <Text>2</Text>
            <Button onClick={handleClickBack}>Anterior</Button>
            <Button onClick={handleClickNext}>Próximo</Button>
        </Box>
    )
}

SignUpStep2.propTypes = {

}

export default SignUpStep2
