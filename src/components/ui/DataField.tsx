import React from 'react';
import './DataField.css';

interface DataFieldProps {
    label: string;
    name: string;
    value: string | number | boolean | undefined;
    isEditing: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: 'text' | 'email' | 'tel' | 'dropdown';
    options?: { value: string; label: string }[];
    readOnly?: boolean;
}

const DataField: React.FC<DataFieldProps> = ({
    label,
    name,
    value,
    isEditing,
    onChange,
    type = 'text',
    options = [],
    readOnly = false
}) => {
    const displayValue = (): string => {
        if (value === undefined || value === null) return '';

        if (typeof value === 'boolean') {
            return value ? 'Active' : 'Inactive';
        }

        if (type === 'dropdown' && !isEditing && options.length > 0) {
            const option = options.find(opt => opt.value === value.toString());
            return option ? option.label : value.toString();
        }

        return value.toString();
    };

    return (
        <div className="data-field-row">
            <div className="data-field-label">{label}:</div>
            <div className="data-field-value">
                {isEditing && !readOnly ? (
                    <>
                        {type === 'dropdown' && options.length > 0 ? (
                            <select
                                name={name}
                                value={value?.toString() || ''}
                                onChange={onChange}
                                className="data-field-select"
                            >
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={name === 'password' ? 'password' : type}
                                name={name}
                                value={value?.toString() || ''}
                                onChange={onChange}
                                className="data-field-input"
                            />
                        )}
                    </>
                ) : (
                    <span className={readOnly ? 'data-field-readonly' : ''}>
            {displayValue()}
          </span>
                )}
            </div>
        </div>
    );
};

export default DataField;