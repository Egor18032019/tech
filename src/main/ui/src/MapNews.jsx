import React, {useState, useRef, useContext, createContext} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";

import {useContextMap} from "./PointReducer";
import {url} from "./Const";

const MapNews = () => {
    const ref = useRef();

    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints} = useContextMap();

    const userLocation = [56.84783034470748, 60.59675095312448];
    const [userCoords, setUserCoords] = useState(userLocation);


    const handleFindUser = async () => {
        setUserCoords(userCoords);
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


                </Map>
               <div>
                   <p>Район: <span>Верх-Исетский</span></p>
                   <p>Адрес: ул. <span>Молодежи, д.5</span></p>
               </div>

            </YMaps>

        </div>
    );
};

export default MapNews;
