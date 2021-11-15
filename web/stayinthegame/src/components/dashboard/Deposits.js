import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

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
        on 16 November, 2021
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Recommendations
        </Link>
      </div>
    </React.Fragment>
  );
}
