import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {fetchBuySell} from '../../api/api';

function preventDefault(event) {
  event.preventDefault();
}





export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Bot Recommendation</Title>
      <Typography component="p" variant="h4">
        Hold
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      on {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'})}, {new Date().getFullYear()}
      </Typography>
      
    </React.Fragment>
  );
}
