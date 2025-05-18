import React from 'react';
import './DataField.css';

interface DataLabelProps {
    label: string;
    value: string | number | boolean | React.ReactNode;
}

const DataLabel: React.FC<DataLabelProps> = ({ label, value }) => {
    const displayValue = typeof value === 'boolean'
        ? (value ? 'Active' : 'Inactive')
        : value;

    return (
        <div className="data-field-row">
            <div className="data-field-label">{label}:</div>
            <div className="data-field-value">{displayValue}</div>
        </div>
    );
};

export default DataLabel;