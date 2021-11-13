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
    return JsonResponse(data=data, status=status.HTTP_200_OK, safe=False)

def fetch_recommend_data(request):
    ticker = request.GET.get('ticker', 'SPY')
    stock = Stock(ticker, token=IEX_API_TOKEN)
    quote_df = stock.get_quote()
    quote_df = quote_df[['companyName','iexVolume', 'latestPrice']].to_records()
    data = list(quote_df)
    data = [[record(0), record[1], record[2], record[3]] for record in data]
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


#     np_c_unscaled = np.array(historical_data_df['close']).reshape(-1, 1)
#     scaler_train = MinMaxScaler()
#     np_scaled = scaler_train.fit_transform(np_filter_unscaled)
        
#     # Create a separate scaler for a single column
#     scaler_pred = MinMaxScaler()
#     np_scaled_c = scaler_pred.fit_transform(np_c_unscaled)

#     #Set the timframe used to make a single prediction
#     input_sequence_length = 50

#     #Setting the number of steps that the neural network predicts
#     output_sequence_length = 10

#     #Set the Prediction Index
#     index_Close = df_train.columns.get_loc("Close")

#     #Number of rows to trian the model on 80% of the data
#     train_data_length = math.ceil(np_scaled.shape[0] * 0.8)

#     #Creates the training data, then the test data
#     train_data = np_scaled[0:train_data_length, :]
#     test_data = np_scaled[train_data_length - input_sequence_length:, :]

#     #Creation of N samples, input_sequence_length time steps per sample, and f features
#     def partition_dataset(input_sequence_length, output_sequence_length, data):
#         x, y = [], []
#         data_len = data.shape[0]
#         for i in range(input_sequence_length, data_len - output_sequence_length):
#             x.append(data[i-input_sequence_length:i,:]) 
#             y.append(data[i:i + output_sequence_length, index_Close])
    
#         #Convert the x and y to numpy arrays
#         x = np.array(x)
#         y = np.array(y)
#         return x, y

#     #Generate training data and test data
#     x_train, y_train = partition_dataset(input_sequence_length, output_sequence_length, train_data)
#     x_test, y_test = partition_dataset(input_sequence_length, output_sequence_length, test_data)

#     #Configure the neural network model
#     model = Sequential()
#     n_output_neurons = output_sequence_length

#     #Model with n_neurons = inputshape Timestamps, each with x_train.shape[2] variables
#     n_input_neurons = x_train.shape[1] * x_train.shape[2]
#     print(n_input_neurons, x_train.shape[1], x_train.shape[2])
#     model.add(LSTM(n_input_neurons, return_sequences=True, input_shape=(x_train.shape[1], x_train.shape[2]))) 
#     model.add(LSTM(n_input_neurons, return_sequences=False))
#     model.add(Dense(20))
#     model.add(Dense(n_output_neurons))

#     #Compile the model
#     model.compile(optimizer='adam', loss='mse')

#     # Training the model
#     epochs = 10
#     batch_size = 16
#     early_stop = EarlyStopping(monitor='loss', patience=5, verbose=1)
#     history = model.fit(x_train, y_train, 
#                         batch_size=batch_size, 
#                         epochs=epochs,
#                         validation_data=(x_test, y_test)
#                     )
                    
#     # Get the predicted values
#     y_pred_scaled = model.predict(x_test)

#     # Unscale the predicted values
#     y_pred = scaler_pred.inverse_transform(y_pred_scaled)
#     y_test_unscaled = scaler_pred.inverse_transform(y_test).reshape(-1, output_sequence_length)
#     y_test_unscaled.shape

#     # Mean Absolute Error (MAE)
#     MAE = mean_absolute_error(y_test_unscaled, y_pred)
#     #print(f'Median Absolute Error (MAE): {np.round(MAE, 2)}')

#     # Mean Absolute Percentage Error (MAPE)
#     MAPE = np.mean((np.abs(np.subtract(y_test_unscaled, y_pred)/ y_test_unscaled))) * 100
#     #print(f'Mean Absolute Percentage Error (MAPE): {np.round(MAPE, 2)} %')

#     # Median Absolute Percentage Error (MDAPE)
#     MDAPE = np.median((np.abs(np.subtract(y_test_unscaled, y_pred)/ y_test_unscaled)) ) * 100
#     #print(f'Median Absolute Percentage Error (MDAPE): {np.round(MDAPE, 2)} %')

    




