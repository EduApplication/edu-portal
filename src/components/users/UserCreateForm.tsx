import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DataField from '../ui/DataField';
import { CreateUserDto } from '../../types/user';
import './UserForm.css';

interface UserCreateFormProps {
    onSubmit: (data: CreateUserDto) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    error?: string;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({
    onSubmit,
    onCancel,
    isSubmitting,
    error
}) => {
    const [formData, setFormData] = useState<Partial<CreateUserDto>>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        roleId: 3 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'roleId') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData as CreateUserDto);
        }
    };

    const validateForm = (): boolean => {
        const requiredFields = ['email', 'firstName', 'lastName', 'password', 'roleId', 'phoneNumber'];
        return requiredFields.every(field =>
            formData[field as keyof CreateUserDto] !== undefined &&
            formData[field as keyof CreateUserDto] !== ''
        );
    };

    return (
        <Card className="user-form-card">
            <div className="user-form-section">
                <h2 className="user-form-subtitle">Create New User</h2>

                {error && <div className="user-form-error">{error}</div>}

                <form onSubmit={handleSubmit} className="user-form">
                    <DataField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        isEditing={true}
                        onChange={handleChange}
                    />

                    <DataField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        isEditing={true}
                        onChange={handleChange}
                    />

                    <DataField
                        label="Email"
                        name="email"
                        value={formData.email}
                        isEditing={true}
                        onChange={handleChange}
                        type="email"
                    />

                    <DataField
                        label="Password"
                        name="password"
                        value={formData.password}
                        isEditing={true}
                        onChange={handleChange}
                        type="text" 
                    />

                    <DataField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        isEditing={true}
                        onChange={handleChange}
                        type="tel"
                    />

                    <DataField
                        label="Role"
                        name="roleId"
                        value={formData.roleId?.toString() || '3'}
                        isEditing={true}
                        onChange={handleChange}
                        type="dropdown"
                        options={[
                            { value: '1', label: 'Administrator' },
                            { value: '2', label: 'Teacher' },
                            { value: '3', label: 'Student' },
                            { value: '4', label: 'Parent' }
                        ]}
                    />

                    <div className="user-form-actions">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !validateForm()}
                        >
                            {isSubmitting ? 'Creating...' : 'Create User'}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default UserCreateForm;