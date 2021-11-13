import axios from "axios";
import api from "../utils/routes.api";


export function fetchStock(ticker) {
    return (
        axios.get(api.fetch_stock, { params: { ticker } })
    )
}

export function fetchQuote(ticker) {
    return (
        axios.get(api.fetch_quote, { params: { ticker } })
    )
}

export function fetchCandlestick(ticker) {
    return (
        axios.get(api.fetch_candlestick, { params: { ticker } })
    )
}

export function fetchRecommend(ticker) {
    return (
        axios.get(api.fetch_recommend, { params: { ticker } })
    )
}
