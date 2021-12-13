from iexfinance.stocks import Stock, get_historical_data
import pandas as pd
from datetime import datetime
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import requests
import numpy as np

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
    quote_df = quote_df[['change', 'changePercent','volume', 'iexRealtimePrice']].to_records()
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
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)

def fetch_recommend_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    quote_df = stock.get_quote()
    quote_df = quote_df[['companyName','iexOpen','volume', 'latestPrice','marketCap']].to_records()
    data = list(quote_df)
    data = [[record[0], record[1], record[2], record[3], record[4], record[5]] for record in data]
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)
    
def fetch_card_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    img = stock.get_logo()
    company = stock.get_company()
    df = company[["CEO", 'website', 'description']].to_records()
    data = list(df)
    data = [[record[0], record[1], record[2], record[3]] for record in data]
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)

def buysell_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    start = datetime(2020, 9, 12)
    today = datetime.today().date()
    rec_data_df = get_historical_data(ticker, start, today, output_format='pandas', token=IEX_API_TOKEN)
    
    rec_data_df['SMA'] = rec_data_df.close.rolling(window=20).mean()
    rec_data_df['stddev'] = rec_data_df.close.rolling(window=20).std()
    rec_data_df['Upper'] = rec_data_df.SMA + 2* rec_data_df.stddev
    rec_data_df['Lower'] = rec_data_df.SMA - 2* rec_data_df.stddev
    rec_data_df['Buy_Signal'] = np.where(rec_data_df.Lower > rec_data_df.close, True, False)
    rec_data_df['Sell_Signal'] = np.where(rec_data_df.Upper < rec_data_df.close, True, False)
    rec_data_df = rec_data_df.dropna()

    buys = []
    sells = []
    open_pos = False

    for i in range(len(rec_data_df)):
        if rec_data_df.Lower[i] > rec_data_df.close[i]:
            if open_pos == False:
                buys.append(i)
                open_pos = True
        elif rec_data_df.Upper[i] < rec_data_df.close[i]:
            if open_pos:
                sells.append(i)
                open_pos = False
    
    merged = pd.concat([rec_data_df.iloc[buys].close, rec_data_df.iloc[sells].close], axis=1)
    merged.columns = ['Buys', 'Sells']
    merged = merged[['Buys', 'Sells']].to_records()
    #totalprofit = merged.shift(-1).Sells - merged.Buys
    #relprofits = (merged.shift(-1).Sells - merged.Buys)/merged.Buys
    #relprofits.mean()
    data = list(merged)
    data = [[pd.to_datetime(record[0]), record[1], record[2]] for record in data]
    data = data[-1]
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)
    


    # quote_df = quote_df[['change', 'changePercent','iexVolume', 'iexRealtimePrice']].to_records()
# def neural_network():
#     IEX_API_TOKEN = 'pk_5285253cdc634617bde2f7c4d153ee23'
#     ticker = 'AAPL'
#     stock = Stock(ticker, token=IEX_API_TOKEN)
#     start = datetime(2010, 9, 12)
#     today = datetime.today().date()
#     historical_data_df = get_historical_data(ticker, start, today, output_format='pandas', token=IEX_API_TOKEN)
#     historical_data_df['close'] = historical_data_df.close.astype(float)
#     historical_data_df['open'] = historical_data_df.open.astype(float)
#     historical_data_df['high'] = historical_data_df.high.astype(float)
#     historical_data_df['low'] = historical_data_df.low.astype(float)
#     historical_data_df['volume'] = historical_data_df.volume.astype(float)
#     historical_data_df['change'] = historical_data_df.change.astype(float)
#     historical_data_df['changePercent'] = historical_data_df.changePercent.astype(float)
#     historical_data_df = historical_data_df[['close','open', 'high', 'low', 'volume', 'change', 'changePercent']]
#     np_filter_unscaled = np.array(historical_data_df)
#     np_filter_unscaled = np.array(historical_data_df)
#     #np_filter_unscaled = np.reshape(np_unscaled, (df_filter.shape[0], -1))
#     print(np_filter_unscaled.shape)

################################################ Model is from https://www.relataly.com/stock-market-prediction-using-a-recurrent-neural-network/122/ ################################################

###     # Setting the timeframe for the data extraction
#today = date.today()
#date_today = today.strftime("%Y-%m-%d")
#date_start = '2010-01-01'

### Getting Apple quotes
#stockname = 'Apple'
#symbol = 'AAPL'

#### Remote data access
### import pandas_datareader as webreader
### df = webreader.DataReader(symbol, start=date_start, end=date_today, data_source="yahoo")
#import yfinance as yf # Used if webreader does not work: pip install yfinance
#df = yf.download(symbol, start=date_start, end=date_today)

### Taking a look at the shape of the dataset
#print(df.shape)
#df.head(5)

### Feature Selection - Only Close Data
#data = df.filter(['Close'])
#data_unscaled = data.values

### Get the number of rows to train the model on 80% of the data 
#training_data_length = math.ceil(len(data_unscaled) * 0.8)

### Transform features by scaling each feature to a range between 0 and 1
#mmscaler = MinMaxScaler(feature_range=(0, 1))
#np_data = mmscaler.fit_transform(data_unscaled)

### Set the sequence length - this is the timeframe used to make a single prediction
#sequence_length = 50

### Prediction Index
#index_Close = data.columns.get_loc("Close")
#print(index_Close)
### Split the training data into train and train data sets
### As a first step, we get the number of rows to train the model on 80% of the data 
#train_data_len = math.ceil(np_data.shape[0] * 0.8)

### Create the training and test data
#train_data = np_data[0:train_data_len, :]
#test_data = np_data[train_data_len - sequence_length:, :]

### The RNN needs data with the format of [samples, time steps, features]
### Here, we create N samples, sequence_length time steps per sample, and 6 features
#def partition_dataset(sequence_length, data):
#    x, y = [], []
#    data_len = data.shape[0]
#    for i in range(sequence_length, data_len):
#        x.append(data[i-sequence_length:i,:]) #contains sequence_length values 0-sequence_length * columsn
#        y.append(data[i, index_Close]) #contains the prediction values for validation (3rd column = Close),  for single-step prediction
#    
    ### Convert the x and y to numpy arrays
#    x = np.array(x)
#    y = np.array(y)
#    return x, y

### Generate training data and test data
#x_train, y_train = partition_dataset(sequence_length, train_data)
#x_test, y_test = partition_dataset(sequence_length, test_data)

### Print the shapes: the result is: (rows, training_sequence, features) (prediction value, )
#print(x_train.shape, y_train.shape)
#print(x_test.shape, y_test.shape)

### Validate that the prediction value and the input match up
# The last close price of the second input sample should equal the first prediction value
#print(x_test[1][sequence_length-1][index_Close])
#print(y_test[0])

###Configure the neural network model
#model = Sequential()

#neurons = sequence_length

### Model with sequence_length Neurons 
# inputshape = sequence_length Timestamps
#model.add(LSTM(neurons, return_sequences=True, input_shape=(x_train.shape[1], 1))) 
#model.add(LSTM(neurons, return_sequences=False))
#model.add(Dense(25, activation='relu'))
#model.add(Dense(1))

# Compile the model
#model.compile(optimizer='adam', loss='mean_squared_error')

### Training the model
#model.fit(x_train, y_train, batch_size=16, epochs=25)

###Get the predicted values and inverse the scaling
#predictions = model.predict(x_test)
#predictions = mmscaler.inverse_transform(predictions)

### Calculate the mean absolute error (MAE)
#mae = mean_absolute_error(predictions, y_test)
#print('MAE: ' + str(round(mae, 1)))

### Calculate the root mean squarred error (RMSE)
#rmse = np.sqrt(np.mean(predictions - y_test)**2)
#print('RMSE: ' + str(round(rmse, 1)))

### Get fresh data until today
#df_new = df.filter(['Close'])

### Get the last N day closing price values and scale the data to be values between 0 and 1
#last_days_scaled = mmscaler.transform(df_new[-sequence_length:].values)

### Create an empty list and Append past n days
#X_test = []
#X_test.append(last_days_scaled)

### Convert the X_test data set to a numpy array and reshape the data
#X_test = np.array(X_test)
#X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

### Get the predicted scaled price, undo the scaling and output the predictions
#pred_price = model.predict(X_test)
#pred_price_unscaled = mmscaler.inverse_transform(pred_price)

### Print last price and predicted price for the next day
#price_today = round(df_new['Close'][-1], 2)
#predicted_price = round(pred_price_unscaled.ravel()[0], 2)
#percent = round(100 - (predicted_price * 100)/price_today, 2)

#plus = '+'; minus = '-'
#print(f'The close price for {stockname} at {today} was {price_today}')
#print(f'The predicted close price is {predicted_price} ({plus if percent > 0 else minus}{percent}%)')

################################################ Model is from https://www.relataly.com/stock-market-prediction-using-a-recurrent-neural-network/122/ ################################################

    
def subscriptionPost(request):
    url = 'https://10.0.0.231:5000/updateStockInformation'
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    quote_df = stock.get_quote()
    
    myobj = {
    'stockName': stock,
    'currentPrice' : quote_df,
    }
    
    requests.post(url, data = myobj)
