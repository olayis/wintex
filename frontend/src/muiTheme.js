import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: '1.8rem',
    h2: '1.4rem',
    h3: '1.4rem',
  },
});

export default theme;
