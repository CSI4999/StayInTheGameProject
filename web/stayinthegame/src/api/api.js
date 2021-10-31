import axios from "axios";
import api from "../utils/routes.api";


export function fetchStock(ticker) {
    return(
        axios.get(api.fetch_stock, {params: {ticker}})
    )
}

export function fetchQuote(ticker){
    return(
        axios.get(api.fetch_quote, {params: {ticker}})
    )
}

export function fetchCandstick(ticker){
    return(
        axios.get(api.fetch_candlestick, {params: {ticker}})
    )
}
