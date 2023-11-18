import {BrowserRouter, Route, Routes} from "react-router-dom";
import WhitMapCardForm from "./WhitMapCardForm";
import React from "react";
import App from "./App";
import {useContextMap} from "./PointReducer";

function Admin() {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();

    return (
        <div className="admin-container">
            <h1>Место админов</h1>
            <ul>
                {/* Отображение обращений */}
                {points && points.map((i) => (
                    <li>
                    <span>i.id</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
