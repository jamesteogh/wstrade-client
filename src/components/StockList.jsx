// import React, { useEffect, useState, useContext } from 'react'
// import axios from "axios";
// import { WatchListContext } from '../context/watchListContext';

// const StockList = () => {
//     const [stocks, setStocks] = useState([]);
//     const {watchList} = useContext(WatchListContext)
//     console.log(watchList);
//     useEffect(() => {
//         const options = {
//             method: 'GET',
//             url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
//             params: {
//                 symbol: 'googl', 
//                 region: 'US'
//             },
//             headers: {
//                 'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
//                 'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
//             }
//             };
//             axios.request(options).then(function (response) {
//                 console.log(response.data);
//             }).catch(function (error) {
//                 console.error(error);
//             });
//     },[])

//   return (
//     <div>Stock List
//     </div>
//   )
// }

// export default StockList

// `Result ${response.data}`


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

// const StockList = () => {
//     const [stocks, setStocks] = useState([]);
//     useEffect(() => {
//         const options = {
//             method: 'GET',
//             url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
//             params: {symbol: 'googl', region: 'US'},
//             headers: {
//                 'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
//                 'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
//             }
//             };
//             axios.request(options).then(function (response) {
//                 console.log(response.data);
//             }).catch(function (error) {
//                 console.error(error);
//             });
//     },[])

//   return (
//     <div></div>
//   )
// }