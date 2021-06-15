import { Box, Container, Input } from '@chakra-ui/react'

import MainCard from "../components/MainCard"

export default function Home() {
  return (
    <Box h="100vh" backgroundColor="blue.400" padding={{base: "0px", md: "150px"}}>
      <Container backgroundColor="white">
        <MainCard />
      </Container>
    </Box>
  )
}