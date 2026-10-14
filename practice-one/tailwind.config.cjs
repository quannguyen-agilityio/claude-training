/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: 'Rubik',
        secondary: 'NotoSans',
        logo: 'DancingScript',
      },
      fontSize: {
        primary: ['14px', '17px'],
        secondary: ['13px', '15px'],
        tertiary: ['12px', '14px'],
        paragraph: ['15px', '25px'],
        md: ['16px', '19px'],
        lg: ['18px', '22px'],
        xl: ['25px', '28px'],
        '2xl': ['36px', '43px'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        comet: '#58667E',
        warning: '#F01E2C',
        bluewood: '#152041',
        'ebony-clay': '#222531',
        'storm-gray': '#757881',
        'azure-radiance': '#0D75FF',
        'link-water': '#F8FAFD',
        'athens-gray': '#E3E6EB',
        'blue-bayoux': '#414e82',
        'blue-yonder': '#8892B9',
      },
    },
  },
  plugins: [],
};
