import React, { useState } from 'react';
import './Form.scss';
import sendPost from './ServiceCalls';
import FormField from './FormField';

const Form = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);

        try {
            await sendPost('creat', formData);
            setNotification({ message: 'Данные успешно отправлены!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Ошибка при отправке данных.', type: 'fail' });
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
                setNotification({ message: '', type: '' })
            }, 2000);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="upload-form" encType="multipart/form-data">
                <FormField label="Файл для загрузки:" type="file" id="file" name="file" className="form-control" />
                <FormField label="Координаты точки:" type="text" id="pointCoordinates" name="pointCoordinates" className="form-control" />
                <FormField label="Описание нарушения:" type="text" id="description" name="description" className="form-control" />
                <div className="form-group">
                    <button type="submit" className="btn-upload" disabled={isSubmitting}>Загрузить</button>
                </div>
            </form>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default Form;
