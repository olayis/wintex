import { createTheme } from '@material-ui/core/styles';
import palette from './overrides/palette';
import typography from './overrides/typography';

const theme = createTheme({ palette, typography });

export default theme;
