import './index.css';

import { applyMiddleware, combineReducers, createStore } from "redux";

import App from './main';
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducers";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { ThemeProvider } from '@mui/material/styles';
import theme from './mui-theme';

const rootReducer = combineReducers({
  data: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
