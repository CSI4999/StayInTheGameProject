import React from 'react';

import StockRow from './compnents/StockRow.js';
const changeStyle = {
    color: '#4caf50',
    fontSize: '0.8rem', 
    marginLeft: 5
}


function Table() {
    return (
        <div className="App">
            <div className="container">
               <div className="table md-5">
                   <thead>
                       <tr>
                           <th>Ticker</th>
                           <th>Price</th>
                           <th>Date</th>
                           <th>Time</th>
                       </tr>
                   </thead>
                   <tbody>
                       <StockRow ticker="aapl"/>
                       <StockRow ticker="goog"/>
                       <StockRow ticker="msft"/>
                       <StockRow ticker="tsla"/>
                   </tbody>
                                
                               
               </div>

            </div>
        </div>    
    )
}

export default Table;