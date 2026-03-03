import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css';               // core css
import 'primeicons/primeicons.css';                              // icons
import 'primeflex/primeflex.css';                                // optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='637367337145-hf4g3mev8ac61ngbkjemvkbibnsj6ncp.apps.googleusercontent.com'>
    <Provider store={store}>
       <App />
    </Provider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
