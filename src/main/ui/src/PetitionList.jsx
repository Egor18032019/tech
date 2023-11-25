import React, {useEffect, useState} from "react";
import {url, api, allPetition} from "./Const";
import Petition from "./Petition";

function PetitionList() {
    const [petitions, setPetition] = useState(null);

    useEffect(() => {
        console.log("PetitionList")
        handleFindAllPetition()
    }, []);

    const handleFindAllPetition = async () => {

        const response = await fetch(url + api + allPetition, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET",
            }

        });
//todo убрать лишнее limit and ofset
//todo вынетси все /all отдельную функцию
        const data = await response.json();
        if (setPetition) {
            setPetition(data.petitionList)
        }

    };


    return (<div className="news-container">
            <h1>Обращение граждан </h1>
            <ul>
                {/* Отображение новостей */}
                {petitions && petitions.map((i) => (
                    <li key={i.id}>
                        <span>{i.status}</span>
                        <span>{i.coordinates}</span>
                        <span>{i.description}</span>
                        <span>{i.createdAt}</span>
                        <img className={"img_card"} width={"300px"} src={"/api/" + i.pathToImage}/>

                    </li>
                ))}
            </ul>
            <span>следующее</span>
            <span>предыдущие</span>

        </div>
    )
}
;

export default PetitionList;
