import React, { useState, useRef, useEffect, useCallback } from "react";
import './Form.scss';

const Form = () => {
    return (
        <div className="form-container">
            <form method="POST" encType="multipart/form-data" action="/api/create" className="upload-form">
                <div className="form-group">
                    <label htmlFor="file">Файл для загрузки:</label>
                    <input type="file" id="file" name="file" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="pointCoordinates">Координаты точки:</label>
                    <input type="text" id="pointCoordinates" name="pointCoordinates" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание нарушения:</label>
                    <input type="text" id="description" name="description" className="form-control" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-upload">Загрузить</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
