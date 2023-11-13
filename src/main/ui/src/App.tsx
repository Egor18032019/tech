import React from 'react';
import BranchesMap from './BranchesMap';
import Form from './Form';
import './App.scss';
import {TownProvider} from "./PointReducer";
import Card from "./Card";

function App() {
    return (
        <div>
            <TownProvider>
                <BranchesMap/>
                <Card/>
                <Form/>
            </TownProvider>
        </div>
    );
}

export default App;
