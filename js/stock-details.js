const headerHeight = document.getElementById('content').getBoundingClientRect().top;

function redrawTrack() {
  const frameHeight = 34 * ((window.innerHeight - headerHeight) / $('[data-js-slide]').eq(0).outerHeight());
  const scroll1 = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  const scroll2 = scroll1 * ($('[data-js-track]').outerHeight() - frameHeight);
  $('[data-js-track-frame]').css('height', frameHeight);
  $('[data-js-track-frame]').css('margin-top', scroll2);
  return;
}
redrawTrack();

$('[data-js-track-item]').on('click', 'div', function (event) {
  if (event.target.tagName == 'DIV' || event.target.tagName == 'SPAN') {
    const index = $(this).parent().index();
    $('html, body').animate({ scrollTop: $('[data-js-slide]').eq(index).offset().top - headerHeight }, 300);
  }
});
$('[data-js-track-item]').on('click', 'button', function (event) {
  const $item = $(this).closest('[data-js-track-item]');
  $('[data-js-slide]').eq($item.index()).remove();
  $item.remove();
});
window.onkeydown = function (event) {
  if (event.keyCode == 38) {
    $('html, body')
      .stop()
      .animate({ scrollTop: window.scrollY - $('[data-js-slide]').eq(0).outerHeight() }, 150);
    return false;
  }
  if (event.keyCode == 40) {
    $('html, body')
      .stop()
      .animate({ scrollTop: window.scrollY + $('[data-js-slide]').eq(0).outerHeight() }, 150);
    return false;
  }
};
window.onscroll = function () {
  const slides = $('[data-js-slide]');
  $(slides.get().reverse()).each(function () {
    const $this = $(this);
    if (window.scrollY + headerHeight + 33 > $this.offset().top) {
      $('[data-js-track-item]').eq($this.index()).find('div').attr('aria-selected', true);
      $('[data-js-track-item]').eq($this.index()).siblings().find('div').attr('aria-selected', false);
      return false;
    }
  });
  redrawTrack();
};

$('[data-js-slide-cont]').resizable({
  alsoResize: '[data-js-slide-cont]',
  minHeight: 423,
  maxHeight: window.innerHeight - 202,
  handles: 's',
  classes: {
    'ui-resizable': '',
    'ui-resizable-s': 'absolute right-0 bottom-0 left-0 h-4 cursor-ns-resize',
  },
  stop: function () {
    redrawTrack();
    redrawCharts();
  },
});

$(document).on('click', '[data-js-tab]', function () {
  const $this = $(this);
  $this.addClass('border-blue-selected').addClass('font-bold').addClass('text-white').removeClass('border-gray-600');
  $this.siblings().removeClass('border-blue-selected').removeClass('font-bold').removeClass('text-white').addClass('border-gray-600');
  $($this.attr('data-js-tab')).removeClass('hidden').siblings().addClass('hidden');
});
$(document).on('click', '[data-js-accordion-toggle]', function () {
  const $this = $(this);
  $this.next().slideToggle(150);
  $('svg', $this).toggleClass('rotate-90');
});

//charts
function redrawCharts() {
  console.log('redrawCharts');
  candleChart.forEach(function (item) {
    item.applyOptions({
      width: document.getElementById('chart-price').offsetWidth,
      height: document.getElementById('chart-price').offsetHeight,
    });
    item.timeScale().fitContent();
  });
  areaChart.forEach(function (item) {
    item.applyOptions({
      width: document.getElementById('chart-rt').offsetWidth,
      height: document.getElementById('chart-rt').offsetHeight,
    });
    item.timeScale().fitContent();
  });
}
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
    tickMarkFormatter: (timestamp, tickMarkType, locale) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('en-US', { hour: 'numeric', timeZone: 'UTC' });
    },
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
    //dateFormat: 'MMM dd, yy',
    timeFormatter: function (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: '2-digit', timeZone: 'UTC' }) + '  ' + date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
    },
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
const candleSeriesData = [
  { time: 1556841600, open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
  { time: 1556841600 + 1800, open: 180.82, high: 181.4, low: 177.56, close: 178.75 },
  { time: 1556841600 + 1800 * 2, open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
  { time: 1556841600 + 1800 * 3, open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
  { time: 1556841600 + 1800 * 4, open: 177.52, high: 180.5, low: 176.83, close: 179.07 },
  { time: 1556841600 + 1800 * 5, open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
  { time: 1556841600 + 1800 * 6, open: 173.74, high: 175.99, low: 170.95, close: 173.2 },
  { time: 1556841600 + 1800 * 7, open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
  { time: 1556841600 + 1800 * 8, open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
  { time: 1556841600 + 1800 * 9, open: 176.84, high: 180.86, low: 175.9, close: 180.46 },
  { time: 1556841600 + 1800 * 10, open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
  { time: 1556841600 + 1800 * 11, open: 181.02, high: 182.41, low: 179.3, close: 182.19 },
  { time: 1556841600 + 1800 * 12, open: 181.93, high: 182.65, low: 180.05, close: 182.01 },
  { time: 1556841600 + 1800 * 13, open: 183.79, high: 187.68, low: 182.06, close: 187.23 },
  { time: 1556841600 + 1800 * 14, open: 187.13, high: 188.69, low: 185.72, close: 188.0 },
  { time: 1556841600 + 1800 * 15, open: 188.32, high: 188.48, low: 184.96, close: 185.99 },
  { time: 1556841600 + 1800 * 16, open: 185.23, high: 186.95, low: 179.02, close: 179.43 },
  { time: 1556841600 + 1800 * 17, open: 177.3, high: 181.62, low: 172.85, close: 179.0 },
  { time: 1556841600 + 1800 * 18, open: 182.61, high: 182.9, low: 179.15, close: 179.9 },
  { time: 1556841600 + 1800 * 19, open: 179.01, high: 179.67, low: 173.61, close: 177.36 },
  { time: 1556841600 + 1800 * 20, open: 173.99, high: 177.6, low: 173.51, close: 177.02 },
  { time: 1556841600 + 1800 * 21, open: 176.71, high: 178.88, low: 172.3, close: 173.59 },
  { time: 1556841600 + 1800 * 22, open: 169.25, high: 172.0, low: 167.0, close: 169.05 },
  { time: 1556841600 + 1800 * 23, open: 170.0, high: 170.93, low: 169.15, close: 169.3 },
  { time: 1556841600 + 1800 * 24, open: 169.39, high: 170.33, low: 168.47, close: 168.85 },
  { time: 1556841600 + 1800 * 25, open: 170.2, high: 172.39, low: 168.87, close: 169.82 },
  { time: 1556841600 + 1800 * 26, open: 169.11, high: 173.38, low: 168.82, close: 173.22 },
  { time: 1556841600 + 1800 * 27, open: 172.91, high: 177.65, low: 170.62, close: 177.43 },
  { time: 1556841600 + 1800 * 28, open: 176.8, high: 177.27, low: 174.92, close: 175.66 },
  { time: 1556841600 + 1800 * 29, open: 175.75, high: 180.37, low: 175.11, close: 180.32 },
  { time: 1556841600 + 1800 * 30, open: 183.29, high: 183.5, low: 179.35, close: 181.74 },
  { time: 1556841600 + 1800 * 31, open: 181.06, high: 182.23, low: 174.55, close: 175.3 },
  { time: 1556841600 + 1800 * 32, open: 173.5, high: 176.04, low: 170.46, close: 175.96 },
  { time: 1556841600 + 1800 * 33, open: 175.35, high: 178.36, low: 172.24, close: 172.79 },
  { time: 1556841600 + 1800 * 34, open: 173.39, high: 173.99, low: 167.73, close: 171.69 },
  { time: 1556841600 + 1800 * 35, open: 174.3, high: 175.6, low: 171.24, close: 172.21 },
  { time: 1556841600 + 1800 * 36, open: 173.75, high: 176.87, low: 172.81, close: 174.21 },
  { time: 1556841600 + 1800 * 37, open: 174.31, high: 174.91, low: 172.07, close: 173.87 },
  { time: 1556841600 + 1800 * 38, open: 172.98, high: 175.14, low: 171.95, close: 172.29 },
  { time: 1556841600 + 1800 * 39, open: 171.51, high: 171.99, low: 166.93, close: 167.97 },
  { time: 1556841600 + 1800 * 40, open: 168.9, high: 171.95, low: 168.5, close: 170.04 },
  { time: 1556841600 + 1800 * 41, open: 170.92, high: 174.95, low: 166.77, close: 167.56 },
  { time: 1556841600 + 1800 * 42, open: 166.28, high: 167.31, low: 162.23, close: 164.16 },
  { time: 1556841600 + 1800 * 43, open: 162.81, high: 167.96, low: 160.17, close: 160.48 },
  { time: 1556841600 + 1800 * 44, open: 160.16, high: 161.4, low: 158.09, close: 158.14 },
  { time: 1556841600 + 1800 * 45, open: 159.46, high: 168.28, low: 159.44, close: 168.28 },
  { time: 1556841600 + 1800 * 46, open: 166.44, high: 170.46, low: 163.36, close: 170.32 },
  { time: 1556841600 + 1800 * 47, open: 171.22, high: 173.12, low: 168.6, close: 170.22 },
  { time: 1556841600 + 1800 * 48, open: 171.47, high: 173.24, low: 170.65, close: 171.82 },
];
const areaSeriesOptions = {
  lineWidth: 1.5,
  lineColor: '#D38301',
  lastValueVisible: false,
  priceLineVisible: false,
  topColor: 'rgba(211, 131, 1, 0.2)',
  bottomColor: 'rgba(211, 131, 1, 0.0)',
};
const areaSeriesData = [
  { time: 1556841600, value: 230.12 },
  { time: 1556841600 + 1800, value: 230.24 },
  { time: 1556841600 + 1800 * 2, value: 230.63 },
  { time: 1556841600 + 1800 * 3, value: 231.35 },
  { time: 1556841600 + 1800 * 4, value: 232.24 },
  { time: 1556841600 + 1800 * 5, value: 232.52 },
  { time: 1556841600 + 1800 * 6, value: 228.71 },
  { time: 1556841600 + 1800 * 7, value: 228.88 },
  { time: 1556841600 + 1800 * 8, value: 228.18 },
  { time: 1556841600 + 1800 * 9, value: 228.89 },
  { time: 1556841600 + 1800 * 10, value: 229.05 },
  { time: 1556841600 + 1800 * 11, value: 229.46 },
  { time: 1556841600 + 1800 * 12, value: 230.98 },
  { time: 1556841600 + 1800 * 13, value: 231.71 },
  { time: 1556841600 + 1800 * 14, value: 232.8 },
  { time: 1556841600 + 1800 * 15, value: 233.1 },
  { time: 1556841600 + 1800 * 16, value: 232.9 },
  { time: 1556841600 + 1800 * 17, value: 232.9 },
  { time: 1556841600 + 1800 * 18, value: 232.76 },
  { time: 1556841600 + 1800 * 19, value: 232.41 },
  { time: 1556841600 + 1800 * 20, value: 231.2 },
  { time: 1556841600 + 1800 * 21, value: 230.83 },
  { time: 1556841600 + 1800 * 22, value: 230.57 },
  { time: 1556841600 + 1800 * 23, value: 231.49 },
  { time: 1556841600 + 1800 * 24, value: 231.5 },
  { time: 1556841600 + 1800 * 25, value: 232.24 },
  { time: 1556841600 + 1800 * 26, value: 232.52 },
  { time: 1556841600 + 1800 * 27, value: 228.71 },
  { time: 1556841600 + 1800 * 28, value: 228.88 },
  { time: 1556841600 + 1800 * 29, value: 228.89 },
  { time: 1556841600 + 1800 * 30, value: 229.05 },
  { time: 1556841600 + 1800 * 31, value: 229.46 },
  { time: 1556841600 + 1800 * 32, value: 230.98 },
  { time: 1556841600 + 1800 * 33, value: 231.71 },
  { time: 1556841600 + 1800 * 34, value: 232.8 },
  { time: 1556841600 + 1800 * 35, value: 233.1 },
  { time: 1556841600 + 1800 * 36, value: 232.9 },
  { time: 1556841600 + 1800 * 37, value: 232.9 },
  { time: 1556841600 + 1800 * 38, value: 232.76 },
  { time: 1556841600 + 1800 * 39, value: 232.41 },
  { time: 1556841600 + 1800 * 40, value: 232.9 },
  { time: 1556841600 + 1800 * 41, value: 232.76 },
  { time: 1556841600 + 1800 * 42, value: 232.41 },
  { time: 1556841600 + 1800 * 43, value: 231.2 },
  { time: 1556841600 + 1800 * 44, value: 230.83 },
  { time: 1556841600 + 1800 * 45, value: 232.9 },
  { time: 1556841600 + 1800 * 46, value: 232.76 },
  { time: 1556841600 + 1800 * 47, value: 232.41 },
  { time: 1556841600 + 1800 * 48, value: 231.2 },
];

const candleChartIds = ['chart-price', 'chart-price-2', 'chart-price-3', 'chart-price-4', 'chart-price-5'];
const candleChart = [];
const candleSeries = [];
const candleChartMarkers = [
  { time: candleSeriesData[5].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[9].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[13].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[17].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[24].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[28].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[33].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[38].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[42].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[44].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
  { time: candleSeriesData[47].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
];
candleChartIds.forEach(function (item, index) {
  const container = document.getElementById(item);
  container.classList.add('overflow-hidden');
  candleChart[index] = LightweightCharts.createChart(container, chartOptions);
  candleSeries[index] = candleChart[index].addCandlestickSeries(candleSeriesOptions);
  candleSeries[index].setData(candleSeriesData);
  candleSeries[index].setMarkers(candleChartMarkers);
  candleChart[index].timeScale().fitContent();
});
const areaChartIds = ['chart-rt', 'chart-rt-2', 'chart-rt-3', 'chart-rt-4', 'chart-rt-5'];
const areaChart = [];
const areaSeries = [];
areaChartIds.forEach(function (item, index) {
  const container = document.getElementById(item);
  container.classList.add('overflow-hidden');
  areaChart[index] = LightweightCharts.createChart(container, chartOptions);
  areaSeries[index] = areaChart[index].addAreaSeries(areaSeriesOptions);
  areaSeries[index].setData(areaSeriesData);
  areaChart[index].timeScale().fitContent();
});

// popover
$('[data-js-popover-open]').on('click', function (event) {
  event.preventDefault();
  const $this = $(this);
  const $target = $($this.attr('data-js-popover-open'));

  $target.removeClass('hidden');
  $this.attr('aria-pressed', true);

  if ($this.attr('data-js-popover-position') == 'auto') {
    return false;
  }
  if ($this.attr('data-js-popover-position') == 'left-top') {
    $target.css('top', $this.offset().top);
    $target.css('left', $this.offset().left - $target.outerWidth());
    return false;
  }
  $target.css('top', $this.offset().top + $this.outerHeight());
  $target.css('left', $this.offset().left - $target.outerWidth() + $this.outerWidth());
});
$('[data-js-popover-close]').on('click', function (event) {
  event.preventDefault();
  const $this = $(this);
  const $target = $($this.attr('data-js-popover-close'));

  $target.addClass('hidden');
  $('[data-js-popover-open="#' + $target.attr('id') + '"]').attr('aria-pressed', false);
});
$(document).on('click', function (evnt) {
  $('[data-js-popover]').each(function () {
    if (!$(this).is(evnt.target) && $(this).has(evnt.target).length === 0) {
      if (!$('[data-js-popover-open]').is(evnt.target) && $('[data-js-popover-open]').has(evnt.target).length === 0) {
        $(this).addClass('hidden');
        $('[data-js-popover-open="#' + $(this).attr('id') + '"]').attr('aria-pressed', false);
      }
    }
  });
});

// dropdown
$('[data-js-dropdown-value]').on('click', function (event) {
  event.preventDefault();
  const $this = $(this);
  const $container = $this.closest('[data-js-popover]');
  const $target = $container.siblings('[data-js-popover-open]');

  $container.addClass('hidden');
  $target.attr('aria-pressed', false);
  $target.text($this.attr('data-js-dropdown-value'));
});

// color selector
function intToHex(value) {
  return ('00' + parseInt(value).toString(16)).slice(-2);
}
$('#color-selector').on('click', '.aspect-square', function () {
  const $this = $(this);
  const color = $this.css('background-color');
  const hexValues = color.split('(')[1].split(')')[0].split(', ');
  $('#color-selector-r').text(hexValues[0]);
  $('#color-selector-g').text(hexValues[1]);
  $('#color-selector-b').text(hexValues[2]);
  $('#color-selector-hex').text('#' + intToHex(hexValues[0]) + intToHex(hexValues[1]) + intToHex(hexValues[2]));
  $this.addClass('relative ring-2 ring-white').siblings().removeClass('relative ring-2 ring-white');
  $('[data-js-popover-open="#color-selector"]').css('background-color', color);
  $('[data-js-popover-open="#chart-menu"]').siblings('svg').css('color', color);
  areaSeries.forEach(function (item) {
    item.applyOptions({
      lineColor: color,
      topColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)'),
      bottomColor: color.replace('rgb', 'rgba').replace(')', ', 0.0)'),
    });
  });
});

// parameters
$('#parameters-search').on('keyup', function () {
  const $this = $(this);
  const searchTerm = $this.val().toLowerCase();
  const $parameters = $this.parent().next().find('label');
  const $toggles = $this.parent().next().find('[data-js-accordion-toggle]');

  $('#parameters-search-clear').removeClass('invisible').prev().addClass('invisible');
  $parameters.each(function () {
    const label = $(this).find('span').text().toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      $(this).addClass('flex').removeClass('hidden');
    } else {
      $(this).addClass('hidden').removeClass('flex');
    }
  });

  if (searchTerm == '') {
    $('#parameters-search-clear').addClass('invisible').prev().removeClass('invisible');
    $('svg', $toggles).removeClass('rotate-90');
    $toggles.next().slideUp(150);
  } else {
    $('svg', $toggles).addClass('rotate-90');
    $toggles.next().slideDown(150);
  }
});
$('#parameters-search-clear').on('click', function () {
  $('#parameters-search').val('').trigger('keyup').focus();
});
$('#parameters').on('change', 'input[type="checkbox"]', function () {
  $('#parameters-layout-options').removeClass('hidden').addClass('grid');
  $('#parameters-layout-select button span').remove();
  $('#parameters-layout-select button').html($('#parameters-layout-select button').text() + '<span class="italic font-normal text-gray-400"> (changed)</span>');
});
$('#parameters-layout-reset').on('click', function () {
  $('#parameters-layout-options').addClass('hidden').removeClass('grid');
  $('#parameters-layout-select button span').remove();
});
