const headerHeight = $('#content').offset().top;

function redrawTrack() {
  const frameHeight = 34 * ((window.innerHeight - headerHeight) / $('[data-js-slide]').eq(0).outerHeight());
  const scroll1 = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  const scroll2 = scroll1 * ($('[data-js-track]').outerHeight() - frameHeight);
  $('[data-js-track-frame]').css('height', frameHeight);
  $('[data-js-track-frame]').css('margin-top', scroll2);
  return;
}
window.addEventListener('load', redrawTrack);

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
window.addEventListener('scroll', function () {
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
});

$('[data-js-slide-cont]').resizable({
  alsoResize: '[data-js-slide-cont]',
  minHeight: 496,
  maxHeight: window.innerHeight - headerHeight - 52,
  handles: 's',
  classes: {
    'ui-resizable': '',
    'ui-resizable-s': 'absolute right-0 bottom-0 left-0 h-4 cursor-ns-resize',
  },
  stop: function () {
    redrawTrack();
    resizeCharts();
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
  $this.parent().siblings('[data-js-accordion-item]').find('[data-js-accordion-toggle]').next().slideUp(150);
  $this.parent().siblings('[data-js-accordion-item]').find('[data-js-accordion-toggle] svg').removeClass('rotate-90');
});

//charts
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
    // tickMarkFormatter: (timestamp, tickMarkType, locale) => {
    //   const date = new Date(timestamp * 1000);
    //   return date.toLocaleString('en-US', { hour: 'numeric', timeZone: 'UTC' });
    // },
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
    dateFormat: 'MMM dd, yy',
    // timeFormatter: function (timestamp) {
    //   const date = new Date(timestamp * 1000);
    //   return date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: '2-digit', timeZone: 'UTC' }) + '  ' + date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
    // },
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
function resizeCharts() {
  console.log(candleCharts);
  for (var key in candleCharts) {
    candleCharts[key].applyOptions({
      width: document.getElementById('chart-candle-' + key).offsetWidth,
      height: document.getElementById('chart-candle-' + key).offsetHeight,
    });
    candleCharts[key].timeScale().fitContent();
  }
  for (var key in areaCharts) {
    areaCharts[key].applyOptions({
      width: document.getElementById('chart-area-' + key).offsetWidth,
      height: document.getElementById('chart-area-' + key).offsetHeight,
    });
    areaCharts[key].timeScale().fitContent();
  }
}

const candleCharts = {};
const candleSeries = [];
const candleSeriesData = [];
// const candleChartMarkers = [
//   { time: candleSeriesData[5].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[9].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[13].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[17].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[24].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[28].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[33].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[38].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[42].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[44].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
//   { time: candleSeriesData[47].time, position: 'belowBar', color: '#6EE15B', text: '▲' },
// ];
const areaCharts = {};
const areaSeries = [];
const areaSeriesData = [];
const currentDate = new Date();
const previousDate = new Date();
previousDate.setMonth(previousDate.getMonth() - 6);
document.querySelectorAll('[data-js-slide]').forEach((item) => {
  const ticker = item.getAttribute('data-ticker');
  //chartSources.push(item.getAttribute('data-src'));
  fetch('json/' + ticker + '.json')
    .then((response) => response.json())
    .then((json) => {
      candleSeriesData[ticker] = [];
      areaSeriesData[ticker] = [];
      //const reversed = json.reverse();
      json.reverse().forEach(function (item) {
        const date = new Date(item.Trading_Date);
        if (date > previousDate) {
          candleSeriesData[ticker].unshift({
            time: item.Trading_Date,
            open: item.open_price,
            high: item.high_price,
            low: item.low_price,
            close: item.price,
          });
          areaSeriesData[ticker].unshift({
            time: item.Trading_Date,
            value: item.RT,
          });
        } else {
          return;
        }
      });

      //const candleContainer = item.querySelector('#chart-candle-' + ticker);
      const candleContainer = document.getElementById('chart-candle-' + ticker);
      candleContainer.classList.add('overflow-hidden');
      candleCharts[ticker] = LightweightCharts.createChart(candleContainer, chartOptions);
      candleSeries[ticker] = candleCharts[ticker].addCandlestickSeries(candleSeriesOptions);
      candleSeries[ticker].setData(candleSeriesData[ticker]);
      candleCharts[ticker].timeScale().fitContent();

      //const areaContainer = item.querySelector('#chart-area-' + ticker);
      const areaContainer = document.getElementById('chart-area-' + ticker);
      areaContainer.classList.add('overflow-hidden');
      areaCharts[ticker] = LightweightCharts.createChart(areaContainer, chartOptions);
      areaSeries[ticker] = areaCharts[ticker].addAreaSeries(areaSeriesOptions);
      areaSeries[ticker].setData(areaSeriesData[ticker]);
      areaCharts[ticker].timeScale().fitContent();
    });
});

// tooltip
$('[data-js-tooltip]').each(function () {
  $(this)
    .prev()
    .on('mouseenter', function () {
      const offset = $(this).parent().offset().left - $(this).offset().left + 6;
      $(this)
        .next()
        .css('margin-right', offset + 'px');
    });
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
