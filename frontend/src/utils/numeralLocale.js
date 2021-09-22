import numeral from 'numeral';

export const nairaLocale = () => {
  // load a locale
  numeral.register('locale', 'ng', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't',
    },
    ordinal: (number) => {
      const b = number % 10;
      return ~~((number % 100) / 10) === 1
        ? 'th'
        : b === 1
        ? 'st'
        : b === 2
        ? 'nd'
        : b === 3
        ? 'rd'
        : 'th';
    },
    currency: {
      symbol: '₦',
    },
  });
  return 'ng';
};
