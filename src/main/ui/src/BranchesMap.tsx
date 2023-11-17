import React, {useState, useRef, useContext, createContext} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";

import {useContextMap} from "./PointReducer";
import {url} from "./Const";

const BranchesMap = () => {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();
    const ref = useRef();
    const UserContext = createContext(points)
    type PointsData = {
        id: number;
        status: string;
        description: string;
        coordinates: number[];
        urlImage: string;
        createdAt: string;// date
    };


    const userLocation = [56.926761, 60.497874];
    type UserLocationData = number[];
    const [userCoords, setUserCoords] = useState<UserLocationData>(userLocation);


    const handleFindAllBranch = async () => {

        const response = await fetch(url + "/api/all?coordinates=60.497874,56.926760", {
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

        console.log("handleFindAllBranch")
        if (setPoints) {
            // for (let i = 0; i < data.points.length; i++) {
            //     data.points[i].coordinates = data.points[i].coordinates.slice(0, data.points[i].coordinates.length - 1).split(",").map(Number)
            //     console.log(data.points[i].coordinates)
            // }
            setPoints(data.points)
        }
        if (setOriginalPoints) {
            setOriginalPoints(data.points)
        }

    };
//todo запрос на получение гео позиции
    const handleFindUser = async () => {
        setUserCoords(userCoords);
        console.log("setPoint " + userCoords)
        if (setCoordinates) {
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
                        draggable={true}
                        geometry={userCoords} // перевернул координаты !
                        properties={{
                            draggable: true,
                            hintContent: "Вы здесь"
                        }}
                        options={{
                            iconImageSize: [30, 30],
                            draggable: true,
                            preset: "islands#redAttentionIcon",
                            hideIconOnBalloonOpen: false,
                            openEmptyHint: true
                        }}
                        onClick={() => {
                            console.log(userCoords.reverse());
                        }}
                        onMouseEnter={() => {

                            console.log(userCoords);
                        }}
                        onMouseLeave={() => {
                            console.log(Placemark);
                        }}
                        onDrag={() => {
                            console.log("onDrag");
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
                            geometry={i.coordinates}
                            properties={{
                                hintContent: i.description
                            }}

                            onClick={() => {
                                if (setPoint) {
                                    setPoint(i)
                                }
                                console.log(i.description);
                            }}
                            // onMouseEnter={() => {
                            //     console.log(i.coordinates);
                            // }}
                            // onMouseLeave={() => {
                            //     console.log(i.id);
                            // }}
                        />
                    ))}


                </Map>
                <button className = 'btn' onClick={handleFindUser}>
                    Найти себя
                </button>
                <button className = 'btn' onClick={handleFindAllBranch}>
                    Найти все точки
                </button>

            </YMaps>

            <div> Всего поинтов {points ? points.length : 0} </div>
        </div>
    );
};

export default BranchesMap;
