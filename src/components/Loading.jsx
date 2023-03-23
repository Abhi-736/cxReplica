import React from 'react'
import {VStack,Spinner,Box} from '@chakra-ui/react'
const Loading = () => {
  return (
    <VStack h="90vh" justifyContent={"center"}>
    <Box transform={"scale(3)"}>
      <Spinner size={"xl"} />
    </Box>
  </VStack>
  )
}

export default Loading