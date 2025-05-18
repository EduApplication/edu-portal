import React from 'react';
import './TextField.css';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
        label,
        error,
        fullWidth = false,
        className = '',
        ...props
    }) => {
    return (
        <div className={`text-field ${fullWidth ? 'text-field-full' : ''} ${className}`}>
            {label && <label className="text-field-label">{label}</label>}
            <input
                className={`text-field-input ${error ? 'text-field-error' : ''}`}
                {...props}
            />
            {error && <div className="text-field-error-text">{error}</div>}
        </div>
    );
};

export default TextField;