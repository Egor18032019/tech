import BranchesMap from "./BranchesMap";
import Card from "./Card";
import Form from "./Form";
import React from "react";
import MapUsers from "./MapUsers";

import {great,petition} from "./Const";
function WhitMapCard() {

    return (

        <div>
            <Form
                endpoint={petition + great}
            />
            <MapUsers/>

        </div>

    );
}

export default WhitMapCard;
