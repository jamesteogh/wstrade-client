import React, { useEffect, useState } from 'react'
import api from "../apis/api"
import axios from "axios";

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
            params: {symbol: 'googl', region: 'US'},
            headers: {
                'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
            };
            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
    },[])

  return (
    <div></div>
  )
}

export default StockList

// const StockList = () => {
//     const [stocks, setStocks] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await api.get("/get-financials", {
//                 params: {
//                     symbol: 'googl', 
//                     region: 'US'
//                 },
//                 headers: {
//                     'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
//                     'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
//                 }
//             })
//             console.log(response.data);
//         }
//         fetchData()
//     },[])

//   return (
//     <div></div>
//   )
// }