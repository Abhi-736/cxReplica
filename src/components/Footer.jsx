import { Stack, HStack, Input, VStack, Button, Img, Heading, Box, Text, Image } from '@chakra-ui/react'
import React from 'react';
import { AiOutlineSend, AiFillFacebook, AiFillInstagram, AiFillGithub } from 'react-icons/ai';
import img1 from '../assets/1.png';


const Footer = () => {
  return (<Box minH='40' w={'full'}>
    <Stack direction={['column', 'row']} w='full' color='whiteAlpha.800' background={'blackAlpha.800'} spacing='4' p='4'>
      <VStack w='full' p='4' borderRight={['none','solid 2px white']}>
        <HStack borderBottom={'2px solid white'} w='full' p='2'><Input placeholder='Write something' textDecoration={'none' } focusBorderColor='none' border='none' outline='none'></Input><Button variant={'ghost'} borderRadius={'0 200px 200px 0'}><AiOutlineSend size={'20'} /></Button></HStack>
      </VStack>
      <VStack w='full'  p='4' borderRight={['none','solid 2px white']}>
        <VStack justify={'center'}>
          <a href="https://abhi736.000webhostapp.com/"><Image borderRadius={'full'} boxSize='100' objectFit={'cover'} src={img1}></Image></a>
          <Text>Designed by </Text>
        </VStack>
      </VStack>
      <VStack w='full'>
        <VStack spacing='1' >
          <Heading size='lmd' >Social Media Links</Heading>
          <HStack w='full' justify={'space-between'}><Text size='sm'>Facebook</Text> <Button p='0' variant={'ghost'}><a href="https://www.facebook.com/736Abhishek"><AiFillFacebook size='20' /></a></Button></HStack>
          <HStack w='full' justify={'space-between'}><Text size='sm'>Instagram</Text> <Button p='0' variant='ghost' ><AiFillInstagram size='20' /></Button></HStack>
          <HStack w='full' justify={'space-between'}><Text size='sm'>Github</Text> <Button p='0' variant='ghost' > <a href='https://github.com/Abhi-736'><AiFillGithub size='20' /></a></Button></HStack>

        </VStack>
      </VStack>
    </Stack>
  </Box>
  )
}

export default Footer