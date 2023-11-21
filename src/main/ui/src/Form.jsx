
import React, {useState} from "react";
import "./Form.scss";
import sendPost from "./ServiceCalls";
import FormField from "./FormField";
import {useContextMap} from "./PointReducer";

const Form = () => {
    const {coordinates} = useContextMap();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({message: "", type: ""});
    const [image, setImage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);

        try {
            await sendPost("creat", formData);
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
        <div className="form-container">
            <form
                onSubmit={handleSubmit}
                className="upload-form"
                encType="multipart/form-data"
            >
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
                </div>
                {/*TODO Осман поправь тут ))*/}
                <div className="form-group">
                    <label htmlFor={"pointCoordinates"}>{"Координаты точки:"}</label>
                    <input type={"text"} id={"pointCoordinates"} name={"pointCoordinates"} className={"form-control"}
                           value={coordinates} readOnly={true}/>
                </div>


                <FormField
                    label="Описание нарушения:"
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    value={""}
                    isDisabled={false}
                />
                <div className="form-group">
                    <button type="submit" className="btn-upload" disabled={isSubmitting}>
                        Загрузить
                    </button>
                </div>
            </form>
            <div className="form__photo">
                 <img className="img_upload"   src={`${image}`} />
                {/*<img className="img_upload"   src="https://th.bing.com/th/id/OIP.8ZewQ5pH3-DwDX3OKhpY2AAAAA?w=474&h=572&rs=1&pid=ImgDetMain"/>*/}
            </div>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Form;
