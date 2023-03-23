import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index.js';
import { Heading, HStack, Img, Text, VStack, Box,Spinner } from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';
import Loader from './Loading';


const Exchanges = () => {
    const [aData, setAdata] = useState([]);
    const [Loading, setLoading] = useState(true)
    const[Error,setError]= useState(false)


    useEffect(() => {
        const Excfunc = async () => {
            try {
                let { data } = await axios.get(`${server}/exchanges`);
               
                setAdata(data);
               
                setLoading(false)
            }
            catch (error) {
                setLoading(false);
                setError(true) }
        }
        Excfunc()
    }, [])

if (Error) return(<ErrorComponent/>)
    return (<Box w='auto' h='auto'>{Loading ? ( <Loader/>) : (
        <HStack flexWrap={'wrap'} justify='space-evenly' spacing='3' p='4'> {aData.map((element) => <ECoin name={element.name} rank={element.trust_score_rank} country={element.country} image={element.image} url={element.url} key={element.id} />)}</HStack>
    )}</Box>
    )}
const ECoin = ({ name, country, image, url, key, rank }) => {

    return (<a href={url} target='_blank'><Box boxShadow={'-2px 2px 4px 0 #333'} border='2p solid white' borderRadius='20' transition={'all 0.4s'} css={{ '&:hover': { transform: 'scale(1.1)', backgroundColor: 'black' } }} h='auto' w='40' p='4' m='4'>
        <VStack justify={'center'} align='center' textAlign={'center'} h='auto' spacing='2'>
            <Img objectFit={'contain'} size='large' w='50%' src={image}></Img>
            <Heading >{rank}</Heading>
            <Heading size='sm' noOfLines={'one'}>{name}</Heading>
            <Text fontSize='sm'>{country}</Text>
        </VStack></Box></a>)
}
export default Exchanges
