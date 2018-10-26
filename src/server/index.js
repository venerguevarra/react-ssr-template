
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import configureStore from '../components/store/configureStore';
import App from '../components/containers/App';

import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    // Compile an initial state
    const preloadedState = {  };
    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString()

    // Create a sheetsManager instance.
    const sheetsManager = new Map();
    // Create a new class name generator.
    const generateClassName = createGenerateClassName();


    // Create a theme instance.
    const theme = createMuiTheme({
      palette: {
        primary: green,
        accent: red,
        type: 'light',
      },
      typography: {
        useNextVariants: true,
      }
    });

    // Render the component to a string
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
        </StaticRouter>
      </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
        <html lang="">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>Welcome to Razzle</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${
                assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                }
                ${
                process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
            </head>
            <body>
                <div id="root">${markup}</div>
                <style id="jss-server-side">${css}</style>
                <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
                </script>
            </body>
        </html>`
      );
    }
  });

export default server;