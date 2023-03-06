const chartOptions = {
  handleScale: false,
  handleScroll: false,
  layout: {
    backgroundColor: 'transparent',
    fontFamily: '"Modern Era", Roboto, Ubuntu, Arial, sans-serif',
    textColor: '#6f7b8e',
  },
  grid: {
    vertLines: {
      color: '#1F2B37',
    },
    horzLines: {
      color: '#1F2B37',
    },
  },
  crosshair: {
    vertLine: {
      color: '#6f7b8e',
      labelBackgroundColor: '#1F2B37',
    },
    horzLine: {
      color: '#6f7b8e',
      labelBackgroundColor: '#1F2B37',
    },
  },
  timeScale: {
    borderVisible: false,
  },
  leftPriceScale: {
    visible: false,
  },
  rightPriceScale: {
    visible: true,
    borderVisible: false,
    entireTextOnly: true,
  },
  localization: {
    dateFormat: 'MMM dd, yyyy',
  },
};
const candleSeriesOptions = {
  upColor: '#131d28',
  downColor: '#D94A49',
  borderDownColor: '#D94A49',
  borderUpColor: '#00C064',
  wickDownColor: '#D94A49',
  wickUpColor: '#00C064',
  lastValueVisible: false,
  priceLineVisible: false,
};
const areaSeriesOptions = {
  lineWidth: 1.5,
  lineColor: '#D38301',
  lastValueVisible: false,
  priceLineVisible: false,
  topColor: 'rgba(211, 131, 1, 0.2)',
  bottomColor: 'rgba(211, 131, 1, 0.0)',
};
const candleSeriesData = [];
const areaSeriesData = [];

const currentDate = new Date();
const previousDate = new Date();
previousDate.setMonth(previousDate.getMonth() - 6);

fetch('json/AAPL.json')
  .then((response) => response.json())
  .then((json) => {
    const reversed = json.reverse();
    reversed.forEach(function (item) {
      const date = new Date(item.Trading_Date);
      if (date > previousDate) {
        candleSeriesData.unshift({
          time: item.Trading_Date,
          open: item.open_price,
          high: item.high_price,
          low: item.low_price,
          close: item.price,
        });
        areaSeriesData.unshift({
          time: item.Trading_Date,
          value: item.RT,
        });
      } else {
        return;
      }
    });

    const candleChart = LightweightCharts.createChart(document.getElementById('chart-candle-APPL'), chartOptions);
    const candleSeries = candleChart.addCandlestickSeries(candleSeriesOptions);
    candleSeries.setData(candleSeriesData);
    candleChart.timeScale().fitContent();

    const areaChart = LightweightCharts.createChart(document.getElementById('chart-area-APPL-RT'), chartOptions);
    const areaSeries = areaChart.addAreaSeries(areaSeriesOptions);
    areaSeries.setData(areaSeriesData);
    areaChart.timeScale().fitContent();
  });
