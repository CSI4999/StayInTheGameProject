import { useTheme } from '@emotion/react';
import * as React from 'react';
import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchCandlestick } from '../../api/api';

// options template
const top100Coins = []
function createData(date, open, high, low, close, volume, change, changePercent) {
    return { date, open, high, low, close, volume, change, changePercent };
}
export default function CandlestickChart({ symbol }) {
    const [ticker, setTicker] = React.useState(symbol)
    const [candlestickData, setCandlestickData] = React.useState([])
    const [barData, setBarData] = React.useState([])
    const theme = useTheme();
    React.useEffect(() => {
        fetchCandlestick(symbol).then(({ data }) => {
            setCandlestickData(data.map(record => ({
                // date: record[0], open: record[1], high: record[2], low: record[3], close: record[4],
                // volume: record[5], change: record[6], changePercenttime: record[7]
                x: new Date(record[0]),
                y: [record[1], record[2], record[3], record[4]]
            })))
            setBarData(data.map(record => ({y: record[6], x: new Date(record[0])})))
        }).catch(error => {
            console.log(error)
            setCandlestickData({})
        })
    }, [symbol])
    React.useEffect(() => {
        console.log(candlestickData)
    }, [candlestickData])

    return (
        <div class="chart-box">
            <div id="chart-candlestick">
                <ReactApexChart options={{
                    chart: {
                        type: 'candlestick',
                        height: 290,
                        id: 'candles',
                        toolbar: {
                            autoSelected: 'pan',
                            show: false
                        },
                        zoom: {
                            enabled: false
                        },
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                            }
                        }
                    },
                    xaxis: {
                        type: 'datetime'
                    }
                }} series={[{ data: candlestickData }]} type="candlestick" height={290} />
            </div>
            <div id="chart-bar">
                <ReactApexChart options={{
                    chart: {
                        height: 160,
                        type: 'bar',
                        brush: {
                            enabled: true,
                            target: 'candles'
                        },
                        selection: {
                            enabled: true,
                            xaxis: {
                                min:candlestickData.map(e => e.x).reduce((a, e) => e < a ? e : a, Date.now()),
                                max: new Date().getTime()
                            },
                            fill: {
                                color: '#ccc',
                                opacity: 0.4
                            },
                            stroke: {
                                color: '#0D47A1',
                            }
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '80%',
                            colors: {
                                ranges: [{
                                    from: -1000,
                                    to: 0,
                                    color: '#F15B46'
                                }, {
                                    from: 1,
                                    to: 10000,
                                    color: '#FEB019'
                                }],

                            },
                        }
                    },
                    stroke: {
                        width: 0
                    },
                    xaxis: {
                        type: 'datetime',
                        axisBorder: {
                            offsetX: 13
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    }
                }} series={[{
                    name: 'volume',
                    data: barData
                }]} type="bar" height={160} />
            </div>
        </div>
    )
}


