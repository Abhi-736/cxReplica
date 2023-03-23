import { Box, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack w='full' h='70px' justify={['space-around', 'flex-start']} px={'3'} spacing='10' background={'black'} color={'whiteAlpha.800'} size='md'>
      <Button variant={'unstyled'} ><Link to='/'>Home</Link></Button>
      <Button variant={'unstyled'}><Link to='/coin'>Coin</Link></Button>
      <Button variant={'unstyled'}><Link to='/exchange'>Exchange</Link></Button>
    </HStack>
  )
}

export default Header