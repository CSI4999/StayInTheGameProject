from iexfinance.stocks import Stock, get_historical_data
import pandas as pd
from datetime import datetime
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

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