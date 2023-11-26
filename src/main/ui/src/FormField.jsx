import React, {useState} from 'react';

const FormField = ({label, type, id, name, className, value}) => {
    const [input, setInput] = useState(value);

    return (<div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} className={className} value={input}

                   onChange={(e) => {
                       setInput(e.target.value);
                   }}
            />
        </div>
    );
}
export default FormField;
