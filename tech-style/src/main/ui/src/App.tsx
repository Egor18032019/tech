import React from 'react';
import BranchesMap from './BranchesMap';
import Form from './Form';
import './App.scss';
import {TownProvider} from "./PointReducer";
import Card from "./Card";
import Nav from "./components/Nav/Nav";

function App() {
    return (
       <>
        <Nav/>
            <div>
                
                <TownProvider>
                    <BranchesMap/>
                    <Card/>
                </TownProvider>
                <Form/>
            </div>
       </>      
    );
}

export default App;
