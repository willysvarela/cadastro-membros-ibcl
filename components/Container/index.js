import React from 'react'
import PropTypes from 'prop-types'

import { Box, Container as ChakraContainer } from '@chakra-ui/layout'

const Container = props => {
    return (
        <Box minH="100vh" backgroundColor="blue.400" padding={{base: "0px", md: "150px"}}>
            <ChakraContainer backgroundColor="white" maxW="container.md">
                {props.children}
            </ChakraContainer>
        </Box>
    )
}

export default Container