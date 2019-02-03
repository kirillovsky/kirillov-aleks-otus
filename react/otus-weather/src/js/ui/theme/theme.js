import { createMuiTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/es/colors/index';

export default createMuiTheme({
  palette: {
    primary: amber
  },
  typography: {
    useNextVariants: true,
  },
});