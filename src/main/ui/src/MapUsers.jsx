import React, {useState, useRef, useContext, createContext} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";

import {useContextMap} from "./PointReducer";
import {url} from "./Const";

const MapUsers = () => {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints} = useContextMap();
    const ref = useRef();


    const userLocation = [56.84783034470748,60.59675095312448];
    const [userCoords, setUserCoords] = useState(userLocation);


    const handleFindAllBranch = async () => {

        const response = await fetch(url + "/api/allPetition", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET",
            }

        });
//todo убрать лишнее limit and ofset

        const data = await response.json();


        if (setPoints) {

            setPoints(data.petitionList)
        }
        if (setOriginalPoints) {
            setOriginalPoints(data.petitionList)
        }

    };
//todo запрос на получение гео позиции
    const handleFindUser = async () => {

        setUserCoords(userCoords);
        if (setCoordinates) {
            console.log("setPoint " + userCoords)
            setCoordinates(userCoords)
        }
    };

    return (
        <div className="Map-container">
            <YMaps
                query={{
                    apikey: `03a21dbf-0bd0-4788-901d-53dabb409285`
                }}>

                <Map
                    modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                    state={{
                        center: userCoords, zoom: 10,
                        // включаем модули, отвечающие за всплывающие окна над геообъектами

                    }}
                    width="100%"
                    height="100%"
                    onLoad={() => {
                        console.log("onLoad");
                        handleFindAllBranch()
                        handleFindUser()
                    }}
                >
                    {/* Отображение местоположения пользователя */}
                    <Placemark
                        instanceRef={ref}
                        key={"me"}
                        geometry={userCoords} // перевернул координаты !
                        properties={{
                            hintContent: "Вы здесь"
                        }}
                        options={{
                            iconImageSize: [30, 30],
                            preset: "islands#redIcon",
                            hideIconOnBalloonOpen: false,
                            openEmptyHint: true,
                            draggable: true
                        }}
                        onDragEnd={() => {
                            // @ts-ignore
                            const coords = ref.current.geometry._coordinates;
                            if (setCoordinates) {
                                setCoordinates(coords)
                            }
                            console.log("onDragEnd " + coords);
                            setUserCoords(coords)
                        }}
                    />

                    {/* Отображение точек */}
                    {points && points.map((i) => (
                        <Placemark
                            key={i.id}
                            geometry={i.pointCoordinates}
                            properties={{
                                hintContent: i.description
                            }}

                            onClick={() => {
                                if (setPoint) {
                                    setPoint(i)
                                }
                                console.log(i.description);
                            }}

                        />
                    ))}


                </Map>
                <button className="btn" onClick={handleFindUser}>
                    Найти себя
                </button>
                <button className="btn" onClick={handleFindAllBranch}>
                    Найти все точки
                </button>
            </YMaps>

            <div className="str"> Всего поинтов {points ? points.length : 0} </div>
        </div>
    );
};

export default MapUsers;
