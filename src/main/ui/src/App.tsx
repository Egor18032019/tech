import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import WhitMapCardForm from './WhitMapCardForm';
import './App.scss';
import Nav from "./components/Nav/Nav";
import Admin from "./Admin";
import News from "./News";
import Contact from "./Contact";
import {PointProvider, useContextMap} from "./PointReducer";
import React, {useEffect, useState} from 'react';
import Form from "./Form";
import Petition from "./Petition";
import BranchesMap from "./BranchesMap";

function App() {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();


    return (
        <>


            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route path="/" element={<News/>}></Route>
                    <Route path="/map" element={<BranchesMap
                        //todo вынести в константы  пути !!!
                    />}></Route>
                    <Route path="/petition" element={<Petition/>}></Route>
                    <Route path="/admin" element={<Admin/>}></Route>
                    <Route path="/admin/map" element={<WhitMapCardForm/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
