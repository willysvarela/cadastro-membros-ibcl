import { Box } from '@chakra-ui/react';
import React from 'react'

import SignUpInitialStep from "./../SignUpSteps/SignUpInitialStep"

const MainCard = () => {
    return (
        <Box padding={{base: "30px 15px", md: "35px"}}>
            <SignUpInitialStep />            
        </Box>
    )
}

export default MainCard;
