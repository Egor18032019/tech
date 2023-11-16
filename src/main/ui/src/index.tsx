import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {TownProvider} from "./PointReducer";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <TownProvider>
            <App/>
        </TownProvider>
    </React.StrictMode>
);
