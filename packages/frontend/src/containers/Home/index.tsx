import React from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

import workboxLogo from 'assets/images/workbox-logo.png';
import { routes } from 'config';

const Home = () => {
  return (
    <Flex m="4rem auto" w={{ sm: "100%", lg: "50%" }} direction="column" alignItems="center">
      <Heading as="h1">Desk Reservation Platform</Heading>
      <Heading as="h2">Google Workbox</Heading>
      <img alt="Google Workbox logo" src={workboxLogo}></img>
      <Button><Link to={routes.RESERVATIONS}>Vai alle prenotazioni</Link></Button>
    </Flex>
  )
}

export default Home