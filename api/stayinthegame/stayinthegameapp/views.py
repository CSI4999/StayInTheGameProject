from iexfinance.stocks import Stock, get_historical_data
import pandas as pd
from datetime import datetime
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import pprint

IEX_API_TOKEN = 'pk_5285253cdc634617bde2f7c4d153ee23'

@csrf_exempt
def fetch_stock_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    start = datetime(2020, 9, 12)
    today = datetime.today().date()
    historical_data_df = get_historical_data(ticker, start, today, output_format='pandas', token=IEX_API_TOKEN)
    historical_data_df['close'] = historical_data_df.close.astype(float)
    historical_data_df = historical_data_df[['close']].to_records()
    data = list(historical_data_df)
    data = [[pd.to_datetime(record[0]), record[1]] for record in data]
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)

@csrf_exempt
def fetch_quote_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    quote_df = stock.get_quote()
    quote_df = quote_df[['change', 'changePercent','iexVolume', 'iexRealtimePrice']].to_records()
    data = list(quote_df)
    data = [[record[0], record[1], record[2], record[3], record[4]] for record in data]
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)

@csrf_exempt
def fetch_candlestick_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    start = datetime(2020, 9, 12)
    today = datetime.today().date()
    historical_data_df = get_historical_data(ticker, start, today, output_format='pandas', token=IEX_API_TOKEN)
    historical_data_df = historical_data_df[['open', 'high', 'low', 'close', 'volume', 'change', 'changePercent']].to_records()
    data = list(historical_data_df)
    data = [[pd.to_datetime(record[0]), record[1], record[2], record[3], record[4], record[5], record[6]] for record in data]
    return JsonResponse(data=data, status=status.HTTP_200_OKm safe=False)

def neural_network():
    IEX_API_TOKEN = 'pk_5285253cdc634617bde2f7c4d153ee23'
    ticker = 'AAPL'
    stock = Stock(ticker, token=IEX_API_TOKEN)
    start = datetime(2010, 9, 12)
    today = datetime.today().date()
    historical_data_df = get_historical_data(ticker, start, today, output_format='pandas', token=IEX_API_TOKEN)
    historical_data_df['close'] = historical_data_df.close.astype(float)
    historical_data_df['open'] = historical_data_df.open.astype(float)
    historical_data_df['high'] = historical_data_df.high.astype(float)
    historical_data_df['low'] = historical_data_df.low.astype(float)
    historical_data_df['volume'] = historical_data_df.volume.astype(float)
    historical_data_df['change'] = historical_data_df.change.astype(float)
    historical_data_df['changePercent'] = historical_data_df.changePercent.astype(float)
    historical_data_df = historical_data_df[['close','open', 'high', 'low', 'volume', 'change', 'changePercent']]
    np_filter_unscaled = np.array(historical_data_df)
    np_filter_unscaled = np.array(historical_data_df)
    #np_filter_unscaled = np.reshape(np_unscaled, (df_filter.shape[0], -1))
    print(np_filter_unscaled.shape)


    np_c_unscaled = np.array(historical_data_df['close']).reshape(-1, 1)
    scaler_train = MinMaxScaler()
    np_scaled = scaler_train.fit_transform(np_filter_unscaled)
        
    # Create a separate scaler for a single column
    scaler_pred = MinMaxScaler()
    np_scaled_c = scaler_pred.fit_transform(np_c_unscaled)
