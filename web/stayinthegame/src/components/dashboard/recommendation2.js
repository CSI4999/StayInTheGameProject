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

function createData(name, ticker, latestPrice, openPrice, marketCap) {
  return {
    name,
    ticker, 
    latestPrice, 
    openPrice, 
    marketCap,
    history: [
      {
        date: '2020-01-05',
        buySell: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        buySell: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props ) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    <TableCell>Date</TableCell>
                    <TableCell>Buy/Sell</TableCell>
                    
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.buySell}</TableCell>
                      <TableCell align="right">
                        {historyRow.marketCap}
                      </TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    ticker: PropTypes.string.isRequired,
    latestPrice: PropTypes.number.isRequired,
    openPrice: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        //amount: PropTypes.number.isRequired,
        buySell: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    marketCap: PropTypes.number.isRequired,
  }).isRequired,
};







export default function Recommendation2() {

    const symbol1 = 'AAPL';
    const [recommendData, setRecommendData] = React.useState([])
    const theme = useTheme();
    React.useEffect(() => {
      fetchRecommend(symbol1).then(({ data }) => {
        setRecommendData(data.map(record => ({
          ticker: record[0],
          name: record[1],
          openPrice: record[2],
          marketCap: record[5],
          latestPrice: record[4]
        })))
    
      }).catch(error => {
        console.log(error)
        setRecommendData({})
      })
    }, [symbol1])
    React.useEffect(() => {
      }, [recommendData])
    
      const rows = [
        createData('Apple', 'AAPL', 149.73, 148.41, 2.46),
        createData('Microsoft', 'MSFT', 337, 333.81, 2.53),
        createData('Tesla', 'TSLA', 1029.03, 1047.80, 1.04),
        createData('Amazon', 'AMZN', 3525.15, 3485, 1.79),
        createData('Google', 'GOOGL', 2970, 2935, 1.98),
      ];

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
            <TableCell align="right">Market Cap (Trillions)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}

