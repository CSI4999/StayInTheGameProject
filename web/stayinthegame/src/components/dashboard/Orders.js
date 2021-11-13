import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
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
  }, [symbol])
  React.useEffect(() => {

  }, [quoteData])
  return (
    <React.Fragment>
      <Table size="small">
        <TableBody>
          {quoteData.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.change}</TableCell>
              <TableCell align="right">{row.changePercent}</TableCell>
              <TableCell align="right">{row.iexVolume}</TableCell>
              <TableCell align="right">{`${row.iexRealtimePrice}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
