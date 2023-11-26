import {BrowserRouter, Route} from "react-router-dom";
import {PointProvider} from "./PointReducer";
import BranchesMap from "./BranchesMap";
import Card from "./Card";
import Form from "./Form";
import React from "react";

import {creatPoint} from "./Const";

function WhitMapCardForm() {

    return (
        <div>
            <BranchesMap/>
            <Card/>
            <Form
                endpoint={creatPoint}
            />
        </div>
    );
}

export default WhitMapCardForm;
