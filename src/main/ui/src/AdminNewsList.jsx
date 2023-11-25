import React, {useEffect, useState} from "react";
import {url, api, allNews, deleteNews} from "./Const";

function AdminNewsList() {
    const [news, setNews] = useState(null);

    useEffect(() => {
        console.log("NewsList")
        handleFindAllNews()
    }, []);

    const handleFindAllNews = async () => {

        const response = await fetch(url + api + "/news" + allNews, {
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
    const handleDeletePoint = async (id) => {

        const response = await fetch(url + api + "/news"  + "/" + id, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET",
            }

        });
    }


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
                        <button onClick={(event) => {
                            event.preventDefault()
                            console.log(event)
                            console.log(i.id)
                            handleDeletePoint(i.id)
                            handleFindAllNews()
                        }}> удалить
                        </button>
                    </li>
                ))}
            </ul>
            <span>следующее</span>
            <span>предыдущие</span>
        </div>
    )
};

export default AdminNewsList;
