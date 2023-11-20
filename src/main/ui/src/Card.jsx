import React, {useEffect, useState} from 'react';
import './Card.scss';
import {useContextMap} from "./PointReducer";
import {url} from "./Const";

const Card = () => {

   const [image, setImage] = useState(null);
    const {point} = useContextMap();
    useEffect(() => {
        if (point != null) {
            console.log("image " + point)
            setImage(handleLoadImage());
        }
    }, [point]);
    const handleLoadImage = async () => {
        const response = await fetch(url + "/api/image?name=" + point.pathToImage, {
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
                    <img src={`${image}`} className='img_card' />
                    {/* <img src="https://th.bing.com/th/id/OIP.1y93oak6GFrYGdaBYoe98wHaLc?rs=1&pid=ImgDetMain" className='img_card' /> */}
                </div>
            )}
        </div>
    );
};

export default Card;
