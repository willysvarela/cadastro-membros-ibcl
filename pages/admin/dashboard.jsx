import React from 'react';
import { Box, Button, ButtonGroup, Center, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import MembersTable from '../../components/MembersTable';

const Dashboard = () => {
    const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
        <Container maxW='container.xl'>
            <Flex alignItems='center' justifyContent='center' paddingBottom='20px' paddingTop='20px'>
                <Box>
                    <Heading>Dashboard</Heading>
                </Box>
                <Spacer />
                <Box>
                    
                        <h2>{user.name}</h2>
                    
                </Box>
                <ButtonGroup gap='2'>
                    <Button href="/api/auth/logout">Logout</Button>
                </ButtonGroup>
            </Flex>
            <Box>
                Body
                <MembersTable />
            </Box>
        </Container>
    )
  );
}

export default Dashboard