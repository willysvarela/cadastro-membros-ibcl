import React from 'react'
import PropTypes from 'prop-types'

import { Box, Text } from '@chakra-ui/layout'

function CardHeader(props) {
    return (
        <Box>
            <Box textAlign="center">
                <Text>Cadastro de Membro IBCL</Text>
            </Box>
        </Box>
    )
}

CardHeader.propTypes = {

}

export default CardHeader
