module.exports = {
  prefix: 'shopkit-',
  theme: {
    extend: {
      opacity: {
        '10': '.1',
        '30': '.3'
      },
      fontSize: {
        base: '0.9375rem'
      },
      zIndex: {
        modal: 1000000001,
        overlay: 1000000000
      },
      padding: {
        '2': '0.5rem'
      }
    },
    colors: {
      white: '#fff',
      default: '#333333',

      primary: '#177EE6',
      'dark-primary': '#1574D3',
      secondary: '#273142',
      'light-gray': '#E9EBF0',
      light: '#58697F',
      lighter: '#D8DFEB',
      warning: '#E62F17',

      dark: '#C5CCD6',

      highlight: '#E62F17'
    }
  }
}
