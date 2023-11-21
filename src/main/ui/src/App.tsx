import {BrowserRouter, Routes, Route,NavLink } from "react-router-dom";
import WhitMapCardForm from './WhitMapCardForm';
import './App.scss';
import Nav from "./components/Nav/Nav";
import Admin from "./Admin";
import Contact from "./Contact";
import {PointProvider, useContextMap} from "./PointReducer";
import React, {useEffect, useState} from 'react';

function App() {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();


    return (
        <>


            <BrowserRouter>
            <Nav/>
                <Routes>
                    <Route path="/" element={<WhitMapCardForm

                    />}></Route>
                    <Route path="/admin" element={<Admin/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
