import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../components/store/configureStore';
import App from '../components/containers/App';
import { BrowserRouter } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

const store = configureStore(window.__PRELOADED_STATE__);

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    htmlFontSize: 22,
    useNextVariants: true,
  },
});
// Create a new class name generator.
const generateClassName = createGenerateClassName();

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept('../components/containers/App', () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}