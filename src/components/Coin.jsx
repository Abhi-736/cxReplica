import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Link } from 'react-router-dom';
import Loader from'./Loading'
import { Heading, HStack, Img, Text, VStack, Box, Spinner, RadioGroup, Radio, Button } from '@chakra-ui/react';


const Coin = () => {
    const [aData, setAdata] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState('inr');
    const [page, setPage] = useState(1)

    const btns = new Array(132).fill(1);


    useEffect(() => {
        const Excfunc = async () => {
            try {
                let { data } = await axios.get(`${server}/coins//markets?vs_currency=${currency}&page=${page}`);
               
                setAdata(data);
               
                setLoading(false);
            }
            catch (error) { console.log(error) }
        }
        Excfunc()
    }, [page, currency])

    const cSymbol = currency == 'inr' ? '₹' : (currency == 'usd' ? '$' : 'Є')


    return (<Box w='full' h='auto'>{Loading ? (<Loader/>) :
        (<><RadioGroup onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
            </HStack>
        </RadioGroup>
            <HStack flexWrap={'wrap'} justify='space-evenly' spacing='3' p='4'> {aData.map((element) => <CCoin name={element.name} currencySymbol={cSymbol} key={element.id} id={element.id} rank={element.market_cap_rank} symbol={element.symbol} price={element.current_price} image={element.image} url={element.url} />)}</HStack>
            <HStack overflowX={'auto'} m='4' p='4' w='full' >{btns.map((element, index) => <Button s='sm' key={index} onClick={() => setPage(index + 1)}>{index + 1}</Button>)}</HStack></>)
    }</Box>)
}
const CCoin = ({ name, image, symbol, currencySymbol, id, price, rank }) => {

    return (<Link to={`/coin/${id}`} target='blank'><Box boxShadow={'-2px 2px 4px 0 #333'} border='2p solid white' borderRadius='20' display='block' transition={'all 0.4s'} css={{ '&:hover': { transform: 'scale(1.1)', backgroundColor: 'black' } }} h='auto' w='40' p='3' m='4'>
        <VStack justify={'center'} align='center' textAlign={'center'} h='auto' spacing='2'>
            <Img objectFit={'contain'} src={image}></Img>
            <Heading size='sm'>#{rank}  {symbol}</Heading>
            <Text fontSize='sm'>{name}</Text>
            <Text fontSize='sm'>{currencySymbol}{price}</Text>
        </VStack></Box></Link>)
}
export default Coin