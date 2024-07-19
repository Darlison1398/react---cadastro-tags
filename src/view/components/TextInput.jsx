import React from 'react';

const TextInput = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="form-group mb-3">
            <label>{label}</label>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextInput;