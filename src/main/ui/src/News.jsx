import React, {useState} from "react";
import "./Form.scss";
import sendPost from "./ServiceCalls";
import FormField from "./FormField";
import {useContextMap} from "./PointReducer";
import {news, great} from "./Const";

const News = () => {
    const {coordinates} = useContextMap();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({message: "", type: ""});
    const [image, setImage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);

        try {
            await sendPost(news + great, formData);
            setNotification({
                message: "Данные успешно отправлены!",
                type: "success",
            });
        } catch (error) {
            setNotification({message: "Ошибка при отправке данных.", type: "fail"});
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
                setNotification({message: "", type: ""});
            }, 2000);
        }
    };
    const _handlePhotoChange = async (data) => {
        data.preventDefault();
        console.log("_handlePhotoChange");
        console.log(data);
        let reader = new FileReader();
        let file = data.target.files[0];
        // Запускает процесс чтения данных указанного Blob(file),
        // по завершении, аттрибут result будет содержать данные файла в виде data: URL.
        // Если так не делать то и содержать ничего небудет
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };
    return (
        <div className="news-container">
            <form
                onSubmit={handleSubmit}
                className="upload-form"
                encType="multipart/form-data"
            >
                <div className="form-group">
                    <label htmlFor={"pointCoordinates"}>{"Координаты точки:"}</label>
                    <input type={"text"} id={"pointCoordinates"} name={"pointCoordinates"} className={"form-control"}
                           value={coordinates} readOnly={true}/>
                </div>


                <FormField
                    label="Текст новости:"
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    value={""}
                    isDisabled={false}
                />
                <p>Период работ</p>
                <FormField
                    label="Начало"
                    type="text"
                    id="start"
                    name="start"
                    className="form-control"
                    value={""}
                    isDisabled={false}
                />
                <FormField
                    label="Окончание"
                    type="text"
                    id="end"
                    name="end"
                    className="form-control"
                    value={""}
                    isDisabled={false}
                />
                <div><p>Категории</p>
                    <input type={"checkbox"}/>
                    <label>Вода</label>
                    <input type={"checkbox"}/>
                    <label>Свет</label>
                    <input type={"checkbox"}/>
                    <label>Газ</label>
                    <input type={"checkbox"}/>
                    <label>Отопление</label>
                    <input type={"checkbox"}/>
                    <label>Улица</label>
                    <input type={"checkbox"}/>
                    <label>Вывоз ТКО</label>
                    <input type={"checkbox"}/>
                    <label>Место накопление ТКО</label>
                    <input type={"checkbox"}/>
                    <label>Ремонтные работы</label>
                    <input type={"checkbox"}/>
                    <label>Другое</label>
                </div>

                <div className="form-upload">
                    <input
                        label="Файл для загрузки:"
                        type="file"
                        id="file"
                        name="file"
                        className="form-control"
                        onChange={(e) => _handlePhotoChange(e)}
                    />

                    <label htmlFor="images" className="ad-form__drop-zone">
                        Загрузить фото...
                    </label>
                    <div className="form-group">
                        <button type="submit" className="btn-upload" disabled={isSubmitting}>
                            Отправить
                        </button>
                    </div>
                </div>
            </form>
            <div className="form__photo">
                <img className="img_upload" src={`${image}`}/>
                {/*<img className="img_upload"   src="https://th.bing.com/th/id/OIP.8ZewQ5pH3-DwDX3OKhpY2AAAAA?w=474&h=572&rs=1&pid=ImgDetMain"/>*/}
            </div>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    )
}

export default News;
