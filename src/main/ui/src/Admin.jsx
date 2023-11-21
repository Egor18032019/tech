import React, {useEffect, useState} from "react";
import {useContextMap} from "./PointReducer";
import {url} from "./Const";
import Draft from "./Draft";

function Admin() {
    const [places, setPlaces] = useState(null);
    const {page, setPage} = useContextMap();

    useEffect(() => {
        console.log("places")
        handleFindAllBranch()
    }, []);

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
        if (setPlaces) {
            setPlaces(data.points)
        }

    };

    const handleDeletePoint = async (id) => {

        const response = await fetch(url + "/api/" + id, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET",
            }

        });


    }


    if (page != "draft") {
        return <div className="admin-container">
            <h1>Место админов</h1>
            <ul>
                {/* Отображение обращений */}
                {places && places.map((i) => (
                    <li key={i.id}>
                        <span>{i.id}</span>
                        <span>{i.status}</span>
                        <span>{i.coordinates}</span>
                        <span>{i.description}</span>
                        <span>{i.createdAt}</span>
                        <img className={"img_card"} width={"300px"} src={"/api/"+i.pathToImage}/>
                        <button onClick={(event) => {
                            event.preventDefault()
                            console.log(event)
                            console.log(i.id)
                            handleDeletePoint(i.id)
                            handleFindAllBranch()
                        }}> удалить
                        </button>
                        <button onClick={(event) => {
                            event.preventDefault()
                            setPage("draft")
                            console.log(i.id)

                        }}> изменить
                        </button>
                    </li>
                ))}
            </ul>
            <span>prev</span>
            <span>next</span>

        </div>
    } else {
        return <Draft/>
    };
}

export default Admin;
