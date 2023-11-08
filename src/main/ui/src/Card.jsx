import React, {useState} from 'react';
import './Card.scss';
import {useContextMap} from "./PointReducer";

const Card = () => {

    const [places, setPlaces] = useState();
    const {point, points, originalPoints, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();


    return (
        <div className="card-container">

            {point && (
                <div className={`card card-${point.id}`}>
                   <p> {point.description}</p>
                </div>
            )}
        </div>
    );
};

export default Card;
