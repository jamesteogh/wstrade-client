import React, { useEffect, useState } from 'react';
import './stockStyle.css';
import { Select } from 'antd';
import axios from 'axios';

import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const AddStock = () => {
  const [watchList, setWatchList] = useState([
    'googl',
    'aapl',
    'tsla',
    'meta',
    'msft',
    'amzn',
    'adbe',
    'baba',
    'bac',
    'jpm',
    'bkng',
    'dis',
    'ma',
    'v',
    'lmt',
    'ilmn',
    'mcd',
    'jnj',
    'ba',
    'yum',
    'yumc',
    'unh',
    'crm',
    'cme',
    'tsm',
    'nvda',
  ]);

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  let user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (value) => {
    const options = {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
      params: {
        symbol: value,
        region: 'US',
      },
      headers: {
        'X-RapidAPI-Key': '8ca72c2bfcmshff4481557b59581p18b376jsn18cabd11d664',
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
      },
    };

    setLoading(true);
    axios
      .request(options)
      .then(async function (response) {
        setLoading(false);
        const data = {
          symbol: response.data.price.symbol,
          // currency: response.data.price.currency,
          shortName: response.data.price.shortName,
          regularMarketChange: response.data.price.regularMarketChange,
          regularMarketPrice: response.data.price.regularMarketPrice,
        };

        if (stocks.length) {
          let checkExist = stocks.filter((val) => val.symbol === data.symbol);

          if (checkExist.length) {
            return console.log('works');
          }
        }

        if (user) {
          const mongoRes = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
            {
              ...data,
              userId: user._id,
            }
          );
          console.log(mongoRes.data);
          return setStocks([...stocks, mongoRes.data.data]);
        }
        setStocks([...stocks, data]);
        console.log(response.data);
      })

      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  const deleteStock = async (symbol) => {
    if (user) {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/?symbol=${symbol}`
      );
      if (res.data.status === 200) {
        return getAllStocks();
      }
    };
    let filterStock = stocks.filter((val) => val.symbol !== symbol);

    setStocks(filterStock);
  };

  const getAllStocks = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts?userId=${user._id}`
    );
    console.log(res.data);
    if (res.data.data) {
      //  setStocks([]);
      setStocks(res.data.data);
    }
  };

  useEffect(() => {
    if (user) {
      getAllStocks();
    }
  }, []);

  const navigation = useNavigate();

  const onClickStock = (symbol) => {
    navigation(`/stock-detail-${symbol}`);
  };

  const StockCard = ({ data }) => {
    return (
      <div className='stock-card'>
        <div onClick={() => onClickStock(data.symbol)} style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
          <div className='stock-main'>
            <div className='stock-symbol'>
              {data.symbol}
            </div>
            <div className='stock-shortName'>
              {data.shortName}
            </div>
          </div>
          
          <div style={{ display: 'flex', marginRight: 80 }} onClick={() => onClickStock(data.symbol)}>
            <div className='stock-regular-market-container'>
              <div className='stock-market-change-title'>
                {data.regularMarketPrice.raw}
              </div>
              <div className='stock-market-change' style={{ color: data.regularMarketChange.raw < 0 ? 'red' : 'green', }}>
                {data.regularMarketChange.raw < 0
                  ? ` ${data.regularMarketChange.raw.toFixed(2)}`
                  : `+${data.regularMarketChange.raw.toFixed(2)}`}
              </div>
            </div>
          </div>
        </div>  
        <div onClick={() => deleteStock(data.symbol)} className='delete-stock'>
          X
        </div>
      </div>
    );
  };

  return (
    <div className='add-stock-container'>
      <div className='add-stock-btn'>
        <Select
          bordered={false}
          defaultValue='Add Stock'
          style={{
            height: '100%!important',
            width: '100%',
          }}
          onChange={handleChange}
        >
          {watchList.map((val, i) => (
            <Option key={i} value={val}>{val.toUpperCase()}</Option>
          ))}
        </Select>
      </div>
      {stocks.length
        ? stocks.map((val, i) => <StockCard data={val} key={i} />)
        : null}
      {loading ? (
        <div
          style={{
            padding: 10,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          {' '}
          <LoadingOutlined />
        </div>
      ) : null}
    </div>
  );
};

export default AddStock;

// stock logo api
// https://api.twelvedata.com/logo?symbol=msft&apikey=03123b25aa2f4028818b13c9ea66f3a2
// {
//   "meta": {
//   "symbol": "MSFT"
//   },
//   "url": "https://api.twelvedata.com/logo/microsoft.com"
//   }