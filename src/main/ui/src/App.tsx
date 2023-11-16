import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import BranchesMap from './BranchesMap';
import WhitMapCardForm from './WhitMapCardForm';
import './App.scss';
import {TownProvider} from "./PointReducer";
import Card from "./Card";
import Form from "./Form";
import Nav from "./component/Nav/Nav";

function App() {
    return (
      <>
       <Nav/>
            <div>
                <TownProvider>
                    <BranchesMap/>
                    <Card/>
                    <Form/>
                </TownProvider>
            </div>
        </>
    );
}

export default App;
