from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('stockdata/fetch', views.fetch_stock_data, name='fetchstockdata'),
    path('quotedata/fetch', views.fetch_quote_data, name='fetchquotedata'),
    path('candlestickdata/fetch', views.fetch_candlestick_data, name='fetchcandlestickdata'),
    path('recommenddata/fetch', views.fetch_recommend_data, name='fetchrecommenddata'),
    path('carddata/fetch', views.fetch_card_data, name='fetchcarddata'),
    path('buyselldata/fetch', views.buysell_data, name='fetchbuyselldata'),
]
