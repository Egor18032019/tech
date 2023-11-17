import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import BranchesMap from './BranchesMap';
import WhitMapCardForm from './WhitMapCardForm';
import './App.scss';
import {PointProvider} from "./PointReducer";
import Card from "./Card";
import Form from "./Form";
import Nav from "./component/Nav/Nav";

function App() {
    return (
        <>
            <Nav/>
            <div>
                <BranchesMap/>
                <Card/>
                <Form/>
            </div>
        </>
    );
}

export default App;
