import BranchesMap from "./BranchesMap";
import Card from "./Card";
import Form from "./Form";
import React from "react";
import MapUsers from "./MapUsers";
import Petition from "./Petition";
import {petition} from "./Const";
function WhitMapCard() {

    return (

        <div>
            <Form
                endpoint={petition}
            />
            <MapUsers/>
            <Card/>


        </div>

    );
}

export default WhitMapCard;
