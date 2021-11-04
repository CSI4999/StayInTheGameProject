import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { fetchQuote } from "../../api/api";
import { useTheme } from '@mui/material/styles';
// Generate Order Data
function createData(name, change, changePercent, iexVolume, iexRealtimePrice) {
  return { name, change, changePercent, iexVolume, iexRealtimePrice };
}

function preventDefault(event) {
  event.preventDefault();
}
export default function Orders({ symbol }) {
  const [ticker, setTicker] = React.useState(symbol)
  const [quoteData, setQuoteData] = React.useState([])
  const theme = useTheme();
  React.useEffect(() => {
    fetchQuote(symbol).then(({ data }) => {
      setQuoteData(data.map(record => ({
        name: record[0],
        change: record[1],
        changePercent: record[2],
        iexVolume: record[3],
        iexRealtimePrice: record[4]
      })))

    }).catch(error => {
      console.log(error)
      setQuoteData({})
    })
  },[symbol])
  React.useEffect(() => {
      console.log(quoteData)
  }, [quoteData])
  return (
    <React.Fragment>
      <Title>Latest Stock info</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>change</TableCell>
            <TableCell>changePercent</TableCell>
            <TableCell>iexVolume</TableCell>
            <TableCell align="right">RealtimePrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quoteData.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.change}</TableCell>
              <TableCell>{row.changePercent}</TableCell>
              <TableCell>{row.iexVolume}</TableCell>
              <TableCell align="right">{`$${row.iexRealtimePrice}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
