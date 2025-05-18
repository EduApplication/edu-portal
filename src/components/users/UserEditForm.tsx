import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DataField from '../ui/DataField';
import { UserDetailsDto, UpdateUserDto } from '../../types/user';
import './UserForm.css';

interface UserEditFormProps {
    user: UserDetailsDto;
    onSubmit: (data: UpdateUserDto) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    error?: string;
}

const UserEditForm: React.FC<UserEditFormProps> = ({
    user,
    onSubmit,
    onCancel,
    isSubmitting,
    error
}) => {
    const [formData, setFormData] = useState<UpdateUserDto>({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData);
        }
    };

    const validateForm = (): boolean => {
        const requiredFields = ['email', 'firstName', 'lastName', 'phoneNumber'];
        return requiredFields.every(field =>
            formData[field as keyof UpdateUserDto] !== undefined &&
            formData[field as keyof UpdateUserDto] !== ''
        );
    };

    return (
        <Card className="user-form-card">
            <div className="user-form-section">
                <h2 className="user-form-subtitle">Edit User</h2>

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
                        value="••••••••"
                        isEditing={true}
                        readOnly={true}
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
                        name="roleName"
                        value={user.roleName}
                        isEditing={true}
                        readOnly={true}
                    />

                    <DataField
                        label="Status"
                        name="isActive"
                        value={user.isActive}
                        isEditing={false}
                        readOnly={true}
                    />

                    <DataField
                        label="Created"
                        name="createdAt"
                        value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
                        isEditing={false}
                        readOnly={true}
                    />

                    {user.lastLogin && (
                        <DataField
                            label="Last Login"
                            name="lastLogin"
                            value={new Date(user.lastLogin).toLocaleString()}
                            isEditing={false}
                            readOnly={true}
                        />
                    )}

                    <div className="user-form-actions">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !validateForm()}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default UserEditForm;