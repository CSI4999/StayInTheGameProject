import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'AAPL',
    'Apple Inc',
    '139.14',
    '-3.51',
    -2.46,
  ),
  createData(
    1,
    'TSLA',
    'Tesla, Inc.',
    '781.53',
    '+6.31',
    0.81,
  ),
  createData(
    2, 
  'Gold',
  'CFDs on Gold (USS / OZ)', 
  '1759.79', 
  '-10.03', 
  -0.55),
  createData(
    3,
    'NFLX',
    'Netflix, Inc.',
    '603.35',
    '-9.80',
    -1.60,
  ),
  createData(
    4,
    'NDX',
    'NASDAQ 100 Index',
    '14472.12',
    '-319.74',
    -2.16,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Portfolio</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Abbreviation</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Change</TableCell>
            <TableCell align="right">Change Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`Change%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more stocks
      </Link>
    </React.Fragment>
  );
}
