import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
        children,
        variant = 'primary',
        size = 'medium',
        className = '',
        ...props
    }) => {
    return (
        <button
            className={`button button-${variant} button-${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;