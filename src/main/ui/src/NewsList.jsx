import React, {useEffect, useState} from "react";
import {url, api, allNews} from "./Const";

function NewsList() {
    const [news, setNews] = useState(null);

    useEffect(() => {
        console.log("NewsList")
        handleFindAllNews()
    }, []);

    const handleFindAllNews = async () => {

        const response = await fetch(url + api + allNews, {
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
        if (setNews) {
            setNews(data.newsList)
        }

    };


    return (<div className="news-container">
            <h1>Новости</h1>
            <ul>
                {/* Отображение новостей */}
                {news && news.map((i) => (
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

export default NewsList;
