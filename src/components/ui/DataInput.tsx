import React from 'react';
import './DataField.css';

interface DataInputProps {
    label: string;
    name: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const DataInput: React.FC<DataInputProps> = ({
    label,
    name,
    value,
    onChange,
    type = 'text'
}) => {
    return (
        <div className="data-field-row">
            <div className="data-field-label">{label}:</div>
            <div className="data-field-value">
                <input
                    type={type}
                    name={name}
                    value={value === undefined ? '' : String(value)}
                    onChange={onChange}
                    className="data-field-input"
                />
            </div>
        </div>
    );
};

export default DataInput;