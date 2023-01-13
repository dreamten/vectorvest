/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./js/*.js', '*.html'],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      current: 'currentColor',
      transparent: 'transparent',
      gray: {
        0: '#f7f8f9',
        100: '#fafbfb',
        200: '#f2f3f5',
        300: '#d3d5da',
        400: '#8f9db0',
        500: '#6f7b8e',
        600: '#2f3c4d',
        700: '#1f2b37',
        800: '#1b2430',
        900: '#131d28',
        1000: '#0b141f',
      },
      blue: {
        100: '#f1f3fb',
        200: '#e4e8f8',
        300: '#c5cef1',
        400: '#a1b1eb',
        500: '#728ee4',
        600: '#0060dd',
        700: '#0055c5',
        800: '#004aab',
        900: '#003c8b',
        1000: '#002a62',
        selected: '#4976ff',
      },
      red: {
        DEFAULT: '#d94a49',
        hover: '#ffcdcb',
        text: '#c5443c',
        bg: 'rgba(171, 79, 75, 0.1)',
      },
      orange: {
        DEFAULT: '#ff8a00',
        bg: 'rgba(255, 138, 0, 0.1)',
      },
      green: {
        DEFAULT: '#00c064',
        hover: '#c8e7d1',
        text: '#247845',
        light: '#6ee15b',
        bg: 'rgba(66, 156, 92, 0.1)',
      },
      lime: {
        DEFAULT: '#c3ec4e',
      },
      yellow: {
        DEFAULT: '#febe2b',
        hover: '#d9bf34',
        text: '#735000',
        light: '#fbe94d',
        bg: 'rgba(169, 144, 57, 0.1)',
      },
    },
    fontSize: {
      h1xl: [
        '24px',
        {
          lineHeight: '1.166666666666667',
          fontWeight: '800',
        },
      ],
      h1l: [
        '22px',
        {
          lineHeight: '24px',
          fontWeight: '700',
        },
      ],
      h1: [
        '20px',
        {
          lineHeight: '22px',
          fontWeight: '800',
        },
      ],
      h2: ['18px', '20px'],
      h3: ['16px', '1.25'],
      h6: [
        '12px',
        {
          lineHeight: '1.166666666666667',
          fontWeight: '700',
          letterSpacing: '0.02em',
        },
      ],
      xl: ['16px', '1.25'],
      lg: ['15px', '1.2'],
      md: ['14px', '1.285714285714286'],
      sm: ['13px', '1.230769230769231'],
      xs: ['12px', '1.166666666666667'],
      xxs: ['11px', '1.272727272727273'],
    },
    extend: {
      screens: {
        sm: '600px',
        '2xl': '1440px',
      },
      spacing: {
        '2-px': '7px',
        '2.5-px': '9px',
        '3-px': '11px',
        '4-px': '15px',
        '5-px': '19px',
        30: '7.5rem',
      },
      zIndex: {
        header: '100',
        tooltip: '1000',
      },
      maxWidth: {
        '2xs': '16rem',
      },
      borderWidth: {
        6: '6px',
      },
      backgroundImage: {
        'button-secondary': 'linear-gradient(#2A3F56, #203144 33%)',
        'color-guard-pattern': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9"><circle cx="4.5" cy="4.5" r="1.5" fill="white" fill-opacity="0.05" /></svg>')`,
      },
      boxShadow: {
        widget: '0px 1px 2px rgba(0, 0, 0, 0.06)',
        button: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'button-hover': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 32px 0 0 rgba(0, 0, 0, 0.2)',
        'button-ter-hover': 'inset 0 32px 0 0 rgba(255, 255, 255, 0.05)',
        'button-arrow': '0px 0px 20px rgba(0, 0, 0, 0.7)',
        modal: '0px 10px 30px rgba(0, 0, 0, 0.5), 0px 5px 8px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Modern Era', 'sans-sarif'],
      },
    },
  },
  plugins: [],
};