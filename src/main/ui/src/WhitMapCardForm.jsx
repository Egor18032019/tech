import {BrowserRouter, Route} from "react-router-dom";
import {PointProvider} from "./PointReducer";
import BranchesMap from "./BranchesMap";
import Card from "./Card";
import Form from "./Form";
import React from "react";


function WhitMapCardForm( ) {

    return (
        <div>
                <BranchesMap/>
                <Card/>
                <Form/>
        </div>
    );
}
export default WhitMapCardForm;
