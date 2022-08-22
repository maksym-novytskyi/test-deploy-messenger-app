import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppComponent from "./Components/AppComponent/AppComponent";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <AppComponent />
      </Provider>
  </React.StrictMode>
);

