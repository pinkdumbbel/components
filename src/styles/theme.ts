const color = {
  background: {
    white: '#FFFFFF',
    lightwhite: '#FAFAFA',
    lightgray: '#F7F7F7',
    lightyellow: '#f8f3e7',
    blue: '#4458FF',
    gray: '#E5E5E5',
    darkgray: '#606376A6',
    black: '#000000',
  },

  font: {
    white: '#FFFFFF',
    lightgray: '#E4E4E4',
    gray: '#A9A9A9',
    darkgray: '#727272',
    lightblack: '#5A5A5A',
    black: '#000000',
  },
  border: {
    lightgray: '#E1E1E1',
    red: '#F55859',
    darkblue: '#4B617A',
    black: '#000000',
  },
  button: {
    lightgray: '#F5F5F5',
    gray: '#D9D9D9',
    black: '#4A4A4A',
    darkbrown: '#4C4C4C',
  },
};

export const theme = {
  color,
};
export type Theme = typeof theme;
