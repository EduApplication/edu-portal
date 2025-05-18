import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DataField from '../ui/DataField';
import { UserDetailsDto } from '../../types/user';
import './UserForm.css';

interface UserViewFormProps {
    user: UserDetailsDto;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    isAdmin: boolean;
    error?: string;
}

const UserViewForm: React.FC<UserViewFormProps> = ({
    user,
    onEdit,
    onDelete,
    isDeleting,
    isAdmin,
    error
}) => {
    return (
        <Card className="user-form-card">
            <div className="user-form-section">
                <h2 className="user-form-subtitle">User Information</h2>

                {error && <div className="user-form-error">{error}</div>}

                <div className="user-form">
                    <DataField
                        label="First Name"
                        name="firstName"
                        value={user.firstName}
                        isEditing={false}
                    />

                    <DataField
                        label="Last Name"
                        name="lastName"
                        value={user.lastName}
                        isEditing={false}
                    />

                    <DataField
                        label="Email"
                        name="email"
                        value={user.email}
                        isEditing={false}
                    />

                    <DataField
                        label="Role"
                        name="roleName"
                        value={user.roleName}
                        isEditing={false}
                    />

                    <DataField
                        label="Phone Number"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        isEditing={false}
                    />

                    <DataField
                        label="Status"
                        name="isActive"
                        value={user.isActive}
                        isEditing={false}
                    />

                    <DataField
                        label="Created"
                        name="createdAt"
                        value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
                        isEditing={false}
                    />

                    {user.lastLogin && (
                        <DataField
                            label="Last Login"
                            name="lastLogin"
                            value={new Date(user.lastLogin).toLocaleString()}
                            isEditing={false}
                        />
                    )}

                    {user.roleName === 'Parent' && user.children && user.children.length > 0 && (
                        <div className="data-field-row">
                            <div className="data-field-label">Children:</div>
                            <div className="data-field-value">
                                <ul className="related-users-list">
                                    {user.children.map((child, index) => (
                                        <li key={index}>{child.firstName} {child.lastName}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {user.roleName === 'Student' && user.parents && user.parents.length > 0 && (
                        <div className="data-field-row">
                            <div className="data-field-label">Parents:</div>
                            <div className="data-field-value">
                                <ul className="related-users-list">
                                    {user.parents.map((parent, index) => (
                                        <li key={index}>{parent.firstName} {parent.lastName}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {user.roleName === 'Teacher' && user.tutorClassNames && user.tutorClassNames.length > 0 && (
                        <div className="data-field-row">
                            <div className="data-field-label">Classes:</div>
                            <div className="data-field-value">
                                <ul className="classes-list">
                                    {user.tutorClassNames.map((className, index) => (
                                        <li key={index}>{className}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="user-form-actions">
                            <Button
                                onClick={onEdit}
                            >
                                Edit User
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={onDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete User'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default UserViewForm;