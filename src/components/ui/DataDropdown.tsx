import React from 'react';
import './DataField.css';

interface OptionType {
    value: string;
    label: string;
}

interface DataDropdownProps {
    label: string;
    name: string;
    value: string | boolean | undefined;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: OptionType[];
}

const DataDropdown: React.FC<DataDropdownProps> = ({
    label,
    name,
    value,
    onChange,
    options
}) => {
    const stringValue = typeof value === 'boolean' ? String(value) : value;

    return (
        <div className="data-field-row">
            <div className="data-field-label">{label}:</div>
            <div className="data-field-value">
                <select
                    name={name}
                    value={stringValue}
                    onChange={onChange}
                    className="data-field-select"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DataDropdown;