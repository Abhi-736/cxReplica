import React from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from '@chakra-ui/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Chart = ({arr, currency, date}) => {

const price=[];
const dates=[];

for(let i=0; i<arr.length; i++)
{
if(date=='inr'){
{dates.push(new Date(arr[i][0]).toLocaleTimeString())}}
else{dates.push(new Date(arr[i][0]).toLocaleDateString())};

price.push(arr[i][1])
}
console.log(`${price}`)

  return (<Box w='full' h='auto'>
    <Line w='full' options={{responsive:true}} 
     data={{labels:dates, 
     datasets:[{label:`Price in ${currency}`,data:price,  borderColor: "rgb(255,99,132)",
     backgroundColor: "rgba(255,99,132,0.5)",}]}}/>
     </Box>
  )
}

export default Chart