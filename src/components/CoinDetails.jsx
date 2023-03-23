import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import { Container, VStack, Box, HStack, Img, Text, RadioGroup, Radio, StatLabel, StatNumber, Stat, StatHelpText, StatArrow, Badge, Progress, Button, } from '@chakra-ui/react';
import Loader from './Loading'
import Chart from './Chart.jsx'


const CoinDetails = () => {
    const [coinData, setCoinData] = useState([]);
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(false)
    const [currency, setCurrency] = useState('inr');
    const [date, setDate] = useState('24h');
    const [chartDetails, setchartDetails] = useState([])
    const dayArray = ['24h', '7d', '14d', '30d', '100d', '200d', '365d', 'max'];


    const symbol = currency === 'inr' ? '₹' : (currency === 'usd' ? '$' : 'Є')

    const param = useParams();

    useEffect(() => {
        try {
            let Funcdata = async () => {
                let { data } = await axios.get(`${server}/coins/${param.id}`);
                let { data: Details } = await axios.get(`${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${date}`)

                setCoinData(data);
                setchartDetails(Details.prices)
                
                setLoading(false)
            }; Funcdata()
        } catch (error) {
            setLoading(false);
            setError(error)
        }

    }, [param.id, date, currency])


    if (Error) { return <ErrorComponent error={Error} /> };
    return (<Box textAlign={'center'} w='full' p='4'> {Loading ? (<Loader />) :
        (<VStack w='full' align={'center'}>
            <Chart w='full' h='full' selfAlign={'center'} arr={chartDetails} date={date} currency={currency} />
            <HStack w='100%' overflowX={'auto'} p='3'>{dayArray.map((i, index) => <Button key={index} size='sm' onClick={() => setDate(i)}>{i}</Button>)}</HStack>

            <RadioGroup onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                </HStack>
            </RadioGroup>
            <Text align={'center'} fontSize='small'>Last updated on {Date(coinData.market_data.last_updated).split('G')[0]}</Text>

            <VStack width={'70%'} >
                <Img w='50' height='50' src={coinData.image['large']} ></Img>
                <Stat>
                    <StatLabel>
                        {coinData.name}
                    </StatLabel>
                    <StatNumber>{`${coinData.market_data.current_price[currency]}${symbol}`}</StatNumber>
                    <StatHelpText>
                        <StatArrow type={coinData.market_data.market_cap_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                        {coinData.market_data.market_cap_change_percentage_24h}
                    </StatHelpText>
                </Stat>
                <Badge fontSize={"2xl"}
                    bgColor={"blackAlpha.800"}
                    color={"white"}>#{coinData.market_data.market_cap_rank}
                </Badge>

                
            </VStack>

            <Box w={['full',"50%"]}  p="3">
            <CustomBar p='3' high={coinData.market_data.high_24h[currency]}
                    low={coinData.market_data.low_24h[currency]}
                    current={`${coinData.market_data.current_price[currency]}`} />

                <Item title={"Max Supply"} value={coinData.market_data.max_supply} />
                <Item
                    title={"Circulating Supply"}
                    value={coinData.market_data.circulating_supply}
                />
                <Item
                    title={"Market Cap"}
                    value={`${symbol}${coinData.market_data.market_cap[currency]}`}
                />
                <Item
                    title={"All Time Low"}
                    value={`${symbol}${coinData.market_data.atl[currency]}`}
                />
                <Item
                    title={"All Time High"}
                    value={`${symbol}${coinData.market_data.ath[currency]}`}
                />
            </Box>



        </VStack>
        )}
    </Box>

    )
}
/* Item */
const Item = ({ title, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
            {title}
        </Text>
        <Text>{value ? value : 'Na'}</Text>
    </HStack>
);

/* CustomBar */
const CustomBar = ({ high, low, current }) => {

    function bar(high, low, current) {
        const deviation = (high - low);
        const Cdeviation = (current - low);
        const result = (Cdeviation / deviation) * 100;
        return result
    }



    return (<VStack><Progress value={bar(high, low, current)} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme={"red"} />
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"} />
        </HStack></VStack>)

}

export default CoinDetails