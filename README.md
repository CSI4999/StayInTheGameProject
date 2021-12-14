# StayInTheGameProject

Project Description:
Senior Capstone Project - Oakland University, Fall 2020 By: Gabriel Gomer, Nikolaus Bergamin, Eric Chan, Thomas Fallon, Divyesh Goti, Joshua Marinkovski
This project consists of a website that provides users with a subscription access to a series of neural network bots that analyze market closing trends for user specifed securities, primarily stocks, and predict when to trade securities.
Disclaimer: The predictions provided by this application are for informational purposes only and should not be considered as actual financial advice. Consult a financial advisor before making any investment decisions.

Installation: 

Cd StayInTheGameProject
cd into api then cd stayinthegame then begin installation
Pip3 install the following:
from iexfinance.stocks import Stock, get_historical_data
import pandas as pd
from datetime import datetime
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import requests

Make sure to have the latest version of python installed. 
pip3 install iexfinance
pip3 install django
pip3 install djangorestframework
pip3 install datetime
pip3 install csrf_exempt
pip3 install requests


Npm install the following:
Cd StayInTheGameProject
Cd into web then cd stayinthegame then begin npm installation
https://reactjs-bot.github.io/react/docs/installation.html 
https://mui.com/getting-started/installation/ 
Npm install everything in between the quotations in blue
    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.3.0",
    "@material-ui/core": "^4.7.2",
    "@material-ui/lab": "^4.0.0-alpha.35",
    "@mui/icons-material": "^5.2.1",
    "@mui/material": "^5.0.2",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "@types/node": "^15.14.9",
    "@types/react": "^17.0.35",
    "@types/react-dom": "^17.0.11",
    "@types/react-router-dom": "^5.3.2",
    "@types/styled-components": "^5.1.15",
    "antd": "^4.16.13",
    "apexcharts": "^3.10.1",
    "axios": "^0.22.0",
    "cra-template": "^1.1.2",
    "i18next": "^19.9.2",
    "i18next-browser-languagedetector": "^6.1.2",
    "i18next-xhr-backend": "^3.2.2",
    "markdown-to-jsx": "^7.1.3",
    "material": "^0.4.3",
    "mui": "0.0.1",
    "react": "^17.0.2",
    "react-apexcharts": "^1.3.3",
    "react-awesome-reveal": "^3.8.1",
    "react-boilerplate": "^0.2.0",
    "react-dom": "^17.0.2",
    "react-i18next": "^11.14.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "4.0.3",
    "react-template": "^0.4.0",
    "recharts": "^2.1.4",
    "styled-components": "^5.3.3",
    "typescript": "^4.5.2",
    "web-vitals": "^1.1.2"

How to run code:

Clone the StayInTheGameProject from the repository
https://github.com/CSI4999/StayInTheGameProject

First open a cmd prompt or bash shell in the StayInTheGameProject filepath.
In the shell write 
cd api 
And then press enter

Then write
cd stayinthegame 
And press enter

Then write 
python3 manage.py runserver
And press enter to get the server running

Now open another shell and write
cd web
And then press enter

Then write
cd stayinthegame
And then press enter

Then write
npm start 
And then press enter

Errors:

You may encounter a react-scripts error. 
If you do write
npm install react-scripts --save
And hit enter
Wait for the download and then write 
npm start
And press enter


A page should open in your default browser.  It might take more than a minute, but the landing page should appear. You should then be able to navigate the site as you want. 
If there are problems with the page rendering please contact one of the team members to assist you.

Citation:
Single-Step Univariate Stock Market Prediction
https://www.relataly.com/stock-market-prediction-using-a-recurrent-neural-network/122/
Multi-Output Regression Model
https://www.relataly.com/time-series-forecasting-multi-step-regression-using-neural-networks-with-multiple-outputs-in-python/5800/

Bollinger Band Reference
https://www.youtube.com/watch?v=8PzQSgw0SpM&ab_channel=Algovibes

Landing Page:
https://github.com/Adrinlol/landy-react-template
Login SignUp and Dashboard:
https://mui.com/getting-started/templates/

DOI:
http://localhost:3000/
Takes you to the Stay in the Game Landing Page
http://localhost:3000/dashboard
Takes you to the Stay in the Game Dashboard where you can Search for Stock Ticker and get interactive charts, stock data, and ai recommendations.
http://127.0.0.1:8000/stayinthegame/candlestickdata/fetch?ticker=MSFT
Gives precise information required for a candlestick chart
http://127.0.0.1:8000/stayinthegame/stockdata/fetch?ticker=MSFT
Gives Precise closing price data for closing price chart
http://127.0.0.1:8000/stayinthegame/quotedata/fetch?ticker=MSFT
Gives precise data for latest stock info component
http://127.0.0.1:8000/stayinthegame/recommenddata/fetch?ticker=MSFT
Gives precise data for recommendation component
http://127.0.0.1:8000/stayinthegame/carddata/fetch?ticker=MSFT
Gives description and image of stock for card component
http://127.0.0.1:8000/stayinthegame/buyselldata/fetch?ticker=AAPL
Gives precise date on either buy or sell data to the recommendation component.

Contact:

Thomas Fallon
tqfallon@oakland.edu

Gabriel Gomer
ggomer@oakland.edu

