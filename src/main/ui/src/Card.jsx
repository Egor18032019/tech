import React, {useEffect, useState} from 'react';
import './Card.scss';
import {useContextMap} from "./PointReducer";

const Card = () => {
    // const url = "http://localhost:8080/";
    const url = "";
    const [image, setImage] = useState(null);
    const {point} = useContextMap();
    useEffect(() => {
        if (point != null) {
            console.log("image " + point)
            setImage(handleLoadImage());
        }
    }, [point]);
    const handleLoadImage = async () => {
        const response = await fetch(url + "api/image?name=" + point.pathToImage, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET",
            }

        });
//todo убрать лишнее limit and ofset


        const data = await response;


        setImage(data.url)
    };


    return (
        <div className="card-container">

            {point && (
                <div className={`card card-${point.id}`}>
                    <p> {point.description}</p>
                    <img src={`${image}`}/>
                </div>
            )}
        </div>
    );
};

export default Card;