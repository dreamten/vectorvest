const copiedMsg = '<div data-copied="" class="absolute top-0 right-0 p-2 border-b border-l border-gray-900 bg-gray-800 text-sm text-white">Copied</div>';
const sourceButton = '<button type="button" data-source="" class="absolute top-0 right-0 p-2 border-b border-l border-gray-900 bg-gray-800 opacity-0 hover:text-white"><svg viewBox="0 0 16 16" class="w-4 h-4 fill-current"><path d="M3.3,11.7l-3-3c-0.4-0.4-0.4-1,0-1.4l3-3l1.4,1.4L2.4,8l2.3,2.3L3.3,11.7z"></path><path d="M12.7,11.7l-1.4-1.4L13.6,8l-2.3-2.3l1.4-1.4l3,3c0.4,0.4,0.4,1,0,1.4L12.7,11.7z"></path><path d="M6,15c-0.1,0-0.2,0-0.3-0.1c-0.5-0.2-0.8-0.7-0.6-1.3l4-12c0.2-0.5,0.7-0.8,1.3-0.6 c0.5,0.2,0.8,0.7,0.6,1.3l-4,12C6.8,14.7,6.4,15,6,15z"></path></svg></button>';

$('[data-preview]').addClass('relative');
$('[data-preview]').append(sourceButton);
$(document).on('click', '[data-source]', function () {
  const $prnt = $(this).parent();
  const $textarea = $('<textarea></textarea>');
  $(this).remove();
  $prnt.append(copiedMsg);
  $('body').append($textarea);
  $textarea.val($prnt.html()).select();
  document.execCommand('copy');
  $textarea.remove();
  setTimeout(() => {
    $prnt.find('[data-copied]').remove();
    $prnt.append(sourceButton);
  }, 3000);
});

if (document.getElementById('chart1')) {
  const chartOptions = {
    height: 160,
    layout: {
      textColor: '#6f7b8e',
      backgroundColor: 'transparent',
    },
    grid: {
      vertLines: {
        color: 'transparent',
      },
      horzLines: {
        color: '#2f3c4d',
        style: LightweightCharts.LineStyle.Dashed,
      },
    },
    crosshair: {
      vertLine: {
        style: 2,
        color: 'rgba(161, 177, 235, 0.4)',
        labelVisible: false,
      },
      horzLine: {
        visible: false,
        labelVisible: false,
      },
    },
    timeScale: {
      timeVisible: true,
      borderVisible: false,
      secondsVisible: false,
    },
    leftPriceScale: {
      visible: true,
      borderVisible: false,
      entireTextOnly: true,
    },
    rightPriceScale: {
      visible: false,
    },
    handleScroll: false,
    handleScale: false,
  };
  const areaSeriesData = [
    { time: 1556841600, value: 230.12 },
    { time: 1556841600 + 3600, value: 230.24 },
    { time: 1556841600 + 3600 * 2, value: 230.63 },
    { time: 1556841600 + 3600 * 3, value: 231.35 },
    { time: 1556841600 + 3600 * 4, value: 232.24 },
    { time: 1556841600 + 3600 * 5, value: 232.52 },
    { time: 1556841600 + 3600 * 6, value: 228.71 },
    { time: 1556841600 + 3600 * 7, value: 228.88 },
    { time: 1556841600 + 3600 * 8, value: 228.18 },
    { time: 1556841600 + 3600 * 9, value: 228.89 },
    { time: 1556841600 + 3600 * 10, value: 229.05 },
    { time: 1556841600 + 3600 * 11, value: 229.46 },
    { time: 1556841600 + 3600 * 12, value: 230.98 },
    { time: 1556841600 + 3600 * 13, value: 231.71 },
    { time: 1556841600 + 3600 * 14, value: 232.8 },
    { time: 1556841600 + 3600 * 15, value: 233.1 },
    { time: 1556841600 + 3600 * 16, value: 232.9 },
    { time: 1556841600 + 3600 * 17, value: 232.9 },
    { time: 1556841600 + 3600 * 18, value: 232.76 },
    { time: 1556841600 + 3600 * 19, value: 232.41 },
    { time: 1556841600 + 3600 * 20, value: 231.2 },
    { time: 1556841600 + 3600 * 21, value: 230.83 },
    { time: 1556841600 + 3600 * 22, value: 230.57 },
    { time: 1556841600 + 3600 * 23, value: 231.49 },
    { time: 1556841600 + 3600 * 24, value: 231.5 },
  ];
  const areaSeriesOptions = {
    lineWidth: 1.5,
    lineColor: '#00C064',
    lastValueVisible: false,
    priceLineVisible: false,
    crosshairMarkerRadius: 2,
    crosshairMarkerBorderColor: '#ffffff',
    crosshairMarkerBackgroundColor: '#1b2430',
    topColor: 'rgba(00, 192, 100, 0.2)',
    bottomColor: 'rgba(00, 192, 100, 0.0)',
  };
  const charts = ['chart1', 'chart2', 'chart3'];
  charts.forEach(function (item, index) {
    const container = document.getElementById(item);
    const chart = LightweightCharts.createChart(container, chartOptions);
    const series = chart.addAreaSeries(areaSeriesOptions);
    series.setData(areaSeriesData);
    chart.timeScale().fitContent();
    container.classList.add('relative');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-tooltip hidden -mt-4 py-1.5 px-2 rounded bg-gray-1000 whitespace-nowrap text-xxs pointer-events-none -translate-x-1/2 -translate-y-full';
    container.appendChild(tooltip);
    chart.subscribeCrosshairMove(function (param) {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > container.clientWidth || param.point.y < 0 || param.point.y > container.clientHeight) {
        //tooltip.style.display = 'none';
      } else {
        const price = param.seriesPrices.get(series);
        const coordinateTop = series.priceToCoordinate(price);
        const coordinateLeft = chart.timeScale().timeToCoordinate(param.time);
        tooltip.style.display = 'block';
        tooltip.innerHTML = '<div class="mt-0.5 text-xs text-white">' + price + '</div>' + unixTimestampToString(param.time);
        tooltip.innerHTML += '<div class="absolute top-full left-1/2 border-6 border-transparent border-t-gray-1000 -translate-x-1/2"></div>';
        tooltip.style.top = coordinateTop + 'px';
        //tooltip.style.left = 50 + param.point.x + 'px';
        tooltip.style.left = 50 + coordinateLeft + 'px';
      }
    });
  });

  function unixTimestampToString(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString([], { timeZone: 'UTC', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
