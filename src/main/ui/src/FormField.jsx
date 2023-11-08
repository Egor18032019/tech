import React from 'react';

const FormField = ({ label, type, id, name, className }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={name} className={className} />
    </div>
);

export default FormField;