import React, { Component } from 'react';
import stock from './components/stock.js';





class StockRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    applyData(data) {
        this.setState({
            data: data
        })
    }

    componentDidMount() {
        const url = `${iex.base_url}/stock/${this.props.ticker}intraday-prices?chartLast=1&token=${iex.api_token}`
        //stock.latestPrice(this.props.ticker, this.applyData.bind(this))
    
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                data: data[data.length = 1]
            })
        })
    }



     render() {
         return (
             <tr>
                <td>{this.props.ticker}</td>
                <td>{this.state.data.close}</td>
                <td>{this.state.data.date}</td>
                <td>{this.state.data.label}</td>

             </tr>
    

         )
    }
}

export default StockRow;