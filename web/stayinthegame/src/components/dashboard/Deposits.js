import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {fetchBuySell} from '../../api/api';



function createData(buy, sell, date) {
  return {
    buy,
    sell,
    date
  };
}


export default function Deposits({ symbol }) {
  function BSH({symbol}) {
    const [open, setOpen] = React.useState(false);
    const [ticker, setTicker] = React.useState(symbol)
    const [buysellData, setBuySellData] = React.useState([])
    React.useEffect(() => {
      fetchBuySell(symbol).then(({ data }) => {
        setBuySellData(data.map(record => ({
          date: record[0],
          buy: record[1],
          sell: record[2],
        })))
        
      }).catch(error => {
        console.log(error)
        setBuySellData({})
      })
    }, [symbol])
    React.useEffect(() => {
      }, [buysellData])
    }


  return (
    


    <React.Fragment>
      <Title>Recommendation</Title>
      <Typography component="p" variant="h4">
        Hold
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      on {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'})}, {new Date().getFullYear()}
      </Typography>
      <Title>Bot Recommendation</Title>
      
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Buy: Price / Sell: Price
      </Typography>
      
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      on {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'})}, {new Date().getFullYear()}
      </Typography>
    </React.Fragment>
  );

}
