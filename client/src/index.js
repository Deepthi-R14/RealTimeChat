import React, { StrictMode } from 'react';
import ReactDOM  from 'react-dom/client';

import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'));//public -> index.html only div(id="root") in body

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)
//ReactDOM.render(App, document.querySelector('#root')); //public -> index.html only div(id="root") in body
