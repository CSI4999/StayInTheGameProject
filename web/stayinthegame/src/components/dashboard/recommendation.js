import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {fetchRecommend} from '../../api/api';
import {useTheme} from '@mui/material/styles';
import {fetchBuySell} from '../../api/api';

function createData(name, ticker, latestPrice, openPrice, marketCap, buy, sell, date) {
  return {
    name,
    ticker, 
    latestPrice, 
    openPrice, 
    marketCap,
    buy,
    sell,
    date
  };
}

var recStock1 = 'AAPL';
var recStock2 = 'DIS';
var recStock3 = 'NFLX';
var recStock4 = 'MSFT';
var recStock5 = 'GOOG';

function Row({symbol}) {
  const [open, setOpen] = React.useState(false);

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

  const [recommendData, setRecommendData] = React.useState([])
    const theme = useTheme();
    React.useEffect(() => {
      fetchRecommend(symbol).then(({ data }) => {
        setRecommendData(data.map(record => ({
          ticker: record[0],
          name: record[1],
          openPrice: record[2],
          marketCap: record[5],
          latestPrice: record[4],
        })))

      }).catch(error => {
        console.log(error)
        setRecommendData({})
      })
    }, [symbol])
    React.useEffect(() => {
      }, [recommendData])


  return (
    <React.Fragment>
          {recommendData.map((row) => (
      <TableRow key={row.name} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.ticker}</TableCell>
        <TableCell align="right">{row.latestPrice}</TableCell>
        <TableCell align="right">{row.openPrice}</TableCell>
        <TableCell align="right">{row.marketCap}</TableCell>
      </TableRow>
      ))}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Buy/Sell</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="right">  {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'})}, {new Date().getFullYear()} </TableCell>
                      <TableCell align="right"> Buy </TableCell>
                      <TableCell align="right"> {row.latestPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function Recommendation() {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Stock Name</TableCell>
            <TableCell align="left">Ticker</TableCell>
            <TableCell align="right">Latest Price</TableCell>
            <TableCell align="right">Open Price</TableCell>
            <TableCell align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <Row symbol={recStock1} />
            <Row symbol={recStock2} />
            <Row symbol={recStock3} />
            <Row symbol={recStock4} />
            <Row symbol={recStock5} />
          </TableBody>
      </Table>
    </TableContainer>
  );
}
