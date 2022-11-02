import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.css';
import Chart from 'chart.js/auto';
import moment from 'moment';

import { Line } from 'react-chartjs-2';
import { useCallback } from 'react';

const StockDetail = () => {
  const [stockDetail, setStockDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useParams();
  const [dayArray, setDayArray] = useState([]);


  const symbol = route.symbol.slice(1, route.symbol.length);
  const filterData = () => {
    if (selectedFilter === '1day') {
      return dayArray;
    } else if (selectedFilter === '1month') {
      return monthArray;
    } else if (selectedFilter === '1h') {
      return hourArray;
    }
  };

  const getStockDetail = async () => {
    const options = {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
      params: {
        symbol: symbol,
        region: 'US',
      },
      headers: {
        'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
      },
    };



  return (
    <h1>Stock Detail</h1>
  )
}

export default StockDetail