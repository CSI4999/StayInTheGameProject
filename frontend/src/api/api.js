import axios from "axios";
import api from "../utils/routes.api";
export function fetchStock(ticker) {
    return(
        axios.get(api.fetch_stock, {params: {ticker}})

    )

}