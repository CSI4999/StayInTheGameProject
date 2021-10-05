import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

//Code for current date. Credit from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy;

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>How Much You've Made</Title>
      <Typography component="p" variant="h4">
        $100.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        As of Today
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
