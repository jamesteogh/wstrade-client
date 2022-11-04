import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.css';
import Chart from 'chart.js/auto';
import moment from 'moment';
import Button from 'react-bootstrap/Button'


const StockDetail = () => {
  const [stockDetail, setStockDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useParams();
  const [dayArray, setDayArray] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [hourArray, setHourArray] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('1h');

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

    // setLoading(true);
    axios
      .request(options)
      .then(async function (response) {
        const res = await axios.get(
          `https://api.twelvedata.com/logo?symbol=${symbol}&apikey=03123b25aa2f4028818b13c9ea66f3a2`
        );


        setLoading(false);
        const data = {
          symbol: response.data.price.symbol,
          dayHigh: response.data.summaryDetail.dayHigh,
          dayLow: response.data.summaryDetail.dayLow,
          marketCap: response.data.summaryDetail.marketCap,
          PE: response.data.summaryDetail.trailingPE,
          volume24Hr: response.data.price.regularMarketVolume,
          currentPrice: response.data.price.regularMarketPrice,
          percentChangePrice: response.data.price.regularMarketChangePercent,
          logo: res.data.url,
        };

        console.log(res.data);
        setStockDetail(data);

        //console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        //setLoading(false);
      });
  };

  useEffect(() => {
    if (symbol) {
      getStockDetail();
    }
  }, []);

  const chartRef = useRef();

  const onSelectFilter = async (filterName) => {
    //    setLoading(true);
    setSelectedFilter(filterName);
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',

        data: {
          // labels: label.reverse(),

          datasets: [
            {
              label: `${symbol} Price`,
              data: filterData(),

              fill: true,
              backgroundColor: 'rgba(174, 305, 105, 0.4)',
              // borderWidth: 1,
            },
          ],
          // borderColor: 'orange',
        },

        options: {
          backgroundColor: 'tomato',
          animation: { duration: 2000 },
          responsive: true,
          maintainAspectRatio: false,
          lineHeightAnnotation: {
            always: true,
            hover: false,
            lineHeight: 1.5,
          },

          scales: {},
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [selectedFilter, loading]);

  const getChartData = async () => {
    //  setLoading(true);
    setSelectedFilter('1h');

    try {
      const monthRes = await axios.get(
        `https://api.twelvedata.com/time_series?interval=1month&apikey=a027c8e6ba294b0eae6c31c57fda393f&symbol=${symbol}
      `
      );

      const dayResponse = await axios.get(
        `https://api.twelvedata.com/time_series?interval=1day&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol=${symbol}
      `
      );
      const hourRes = await axios.get(
        `https://api.twelvedata.com/time_series?interval=1h&outputsize:24&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol=${symbol}
        `
      );

      // console.log('MonthRes', monthRes.data);
      console.log('dayResponse', dayResponse.data);
      console.log('hourRes', hourRes.data);

      const monthArray = [];
      const dayArray = [];
      const hourArray = [];
      const labelsArray = [];
      //   console.log(hourRes.data);
      setLoading(false);

      if (monthRes.data) {
        for (var week of monthRes.data.values) {
          labelsArray.push(moment(week.datetime).format('LT'));

          const obj = {
            x: week.datetime,
            y: Number(week.close),
          };
          monthArray.push(obj);
        }
        if (monthArray.length === monthRes.data.values.length) {
          setMonthArray(monthArray.reverse());

          //setLabel(labelsArray);
        }
      }

      if (dayResponse.data) {
        for (var day of dayResponse.data.values) {
          const obj = {
            x: day.datetime,
            y: Number(day.close),
          };
          dayArray.push(obj);
        }
        if (dayArray.length === dayResponse.data.values.length) {
          setDayArray(dayArray.reverse());
          //setLabel(labelsArray);
        }
      }

      if (hourRes.data) {
        for (var hour of hourRes.data.values) {
          const obj = {
            x: hour.datetime,
            y: Number(hour.close),
          };
          hourArray.push(obj);
        }
        if (hourArray.length === hourRes.data.values.length) {
          setHourArray(hourArray.reverse());
          //setLabel(labelsArray);
        }
      }
    } catch (err) {
      console.log(err.message);
    }

    // console.log(res.data);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className='stock-detail-container'>
      {stockDetail ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10px',
            backgroundColor: '#fff',
            alignItems: 'center',
          }}
        >
          <div className='symbol-header'>{stockDetail.symbol}</div>
            <div className='logo' style={{
                // width: 80,
                height: 46,
                borderRadius: 35,
                backgroundColor: '#f8f8f8',
              }}>
              <img src={stockDetail.logo} style={{ width: '100%', height: '100%' }}/>
            </div>
          <div
            style={{
              borderBottom: 0,
              borderRight: 0,
              display: 'flex',
              marginRight: 20,
            }}
          >
            <label>Current Price</label>
            <div className='value'>${stockDetail.currentPrice.raw}</div>
          </div>
        </div>
      ) : null}

      <div className='chart-container'>
        <canvas ref={chartRef} id='myChart' width={250} height={400}></canvas>
        <div className='filter-graph'>
          <div
            onClick={() => onSelectFilter('1h')}
            style={{
              backgroundColor:
                selectedFilter === '1h' ? 'rgba(0,0,0,0.1)' : '#fff',
            }}
            className='filter-box'
          >
            Hour
          </div>
          <div
            onClick={() => onSelectFilter('1day')}
            style={{
              backgroundColor:
                selectedFilter === '1day' ? 'rgba(0,0,0,0.1)' : '#fff',
            }}
            className='filter-box'
          >
            Day
          </div>
          <div
            onClick={() => onSelectFilter('1month')}
            style={{
              backgroundColor:
                selectedFilter === '1month' ? 'rgba(0,0,0,0.1)' : '#fff',
            }}
            className='filter-box'
          >
            Year
          </div>
        </div>
      </div>

      {stockDetail ? (
        <div className='stock-information'>
          <div className='info-box'>
            <label>% Change in 24h</label>
            <div
              className='value'
              style={{
                color: stockDetail.percentChangePrice.raw < 0 ? 'red' : 'green',
              }}
            >
              {stockDetail.percentChangePrice.raw < 0
                ? stockDetail.percentChangePrice.fmt
                : `+${stockDetail.percentChangePrice.raw.toFixed(2)}`}
            </div>
          </div>
          <div className='info-box'>
            <label>Market Cap</label>
            <div className='value'>
              {stockDetail.marketCap ? stockDetail.marketCap.fmt : '-'}
            </div>
          </div>
          <div className='info-box'>
            <label>High 24h</label>
            <div className='value'>${stockDetail.dayHigh.fmt}</div>
          </div>
          <div className='info-box'>
            <label>Low 24h</label>
            <div className='value'>${stockDetail.dayLow.fmt}</div>
          </div>
          <div className='info-box'>
            <label>Volume 24h</label>
            <div className='value'>{stockDetail.volume24Hr.fmt}</div>
          </div>
          <div className='info-box'>
            <label>PE</label>
            <div className='value'>
              {stockDetail.PE ? stockDetail.PE.fmt : '-'}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: 10,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 10px',
          }}
        >
          {' '}
          <LoadingOutlined />
        </div>
      )}
    </div>
  );
};

export default StockDetail

// stock logo api
// https://api.twelvedata.com/logo?symbol=msft&apikey=03123b25aa2f4028818b13c9ea66f3a2

// result

// {
//   "meta": {
//   "symbol": "MSFT"
//   },
//   "url": "https://api.twelvedata.com/logo/microsoft.com"
//   }