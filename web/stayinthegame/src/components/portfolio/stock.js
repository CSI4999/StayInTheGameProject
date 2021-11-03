import iex from 'iex.js';
import { useCallback } from 'react';

export const stock = {

    latestPrice: (ticker, callback) => {
        fetch(stock.latestPriceURL(ticker))
        .then((response) => response.json())
        .then((data) =>  callback(stock.formatPriceData(data)))
    },

    latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&tokens=${iex.api_token}`
    },

    formatPriceData: (data) => {
        const stockData = data[data.length - 1]
            const formattedData = {}
            formattedData.price = stockData.close
            formattedData.date = stockData.data
            formattedData.time = stockData.label
            return formattedData

    }

}
