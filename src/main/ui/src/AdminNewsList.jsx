import React, {useEffect, useState} from "react";
import {url, api, allNews, deleteNews} from "./Const";
import "./AdminNewsList.scss";

function AdminNewsList() {
    const [news, setNews] = useState(null);

    useEffect(() => {
        console.log("NewsList")
        handleFindAllNews()
        console.log(news)
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
        const data = await response.json();
        if (setNews) {
            setNews(data.newsList)
        }

    };
    const handleDeletePoint = async (id) => {

        const response = await fetch(url + api + "/news" + "/" + id, {
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
            <h1>Навигатор чистоты: Управление </h1>
            <ul className="news-list">
                <li className="news-list_cell header-news" key={"zero"}>
                    <span>Новость</span>
                    <span>Начало</span>
                    <span>Конец</span>
                    <span>Район</span>
                    <span>Ведомство</span>
                    <span>Фото</span>
                    <span>Категории</span>
                    <span>Действие</span>

                </li>
                {/* Отображение новостей */}
                {news && news.map((i) => (
                    <li className="news-list_cell" key={i.id}>
                        <span>{i.description}</span>
                        <span>{i.start}</span>
                        <span>{i.end}</span>
                        <span>{i.coordinates} Уралмаш</span>
                        <span>РЭМП Эльмаш</span>
                        <span>
                            <img className={"news-list_cell__img"} width={"100px"} src={"/api/" + i.pathToImage}
                                 alt={"фото"}/></span>
                        <span>
                             <span>Категории</span>
                            <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    console.log(event)
                                    console.log(i.id)
                                    handleDeletePoint(i.id)
                                    handleFindAllNews()
                                }}> удалить
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
            <span>следующее</span>
            <span>предыдущие</span>
        </div>
    )
};

export default AdminNewsList;
