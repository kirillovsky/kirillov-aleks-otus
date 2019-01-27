import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/es/styles';
import theme from './js/theme/theme'
import ApplicationBar from './js/ui/bar/ApplicationBar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApplicationBar/>
      </MuiThemeProvider>
    );
  }
}

export default App;
