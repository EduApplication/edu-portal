import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import UserCreateForm from '../../components/users/UserCreateForm';
import UserViewForm from '../../components/users/UserViewForm';
import UserEditForm from '../../components/users/UserEditForm';
import { getUserById, deleteUser, updateUser, createUser } from '../../api/users';
import { UserDetailsDto, CreateUserDto, UpdateUserDto } from '../../types/user';
import { useAuth } from '../../context/AuthContext';
import './UserDetailsPage.css';

const UserDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const isCreateMode = location.pathname === '/users/new';

    const [user, setUser] = useState<UserDetailsDto | null>(null);
    const [loading, setLoading] = useState(!isCreateMode);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.roleName === 'Administrator';

    useEffect(() => {
        if (!isCreateMode && id) {
            fetchUserDetails();
        }
    }, [id, isCreateMode]);

    const fetchUserDetails = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const data = await getUserById(id);
            setUser(data);
            setError('');
        } catch (err: any) {
            setError('Failed to load user details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCreateUser = async (userData: CreateUserDto) => {
        setSaving(true);
        try {
            await createUser(userData);
            navigate('/users');
        } catch (err: any) {
            setError('Failed to create user');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateUser = async (userData: UpdateUserDto) => {
        if (!id) return;

        setSaving(true);
        try {
            await updateUser(id, userData);
            await fetchUserDetails();
            setIsEditing(false);
            setError('');
        } catch (err: any) {
            setError('Failed to update user');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (isCreateMode) {
            navigate('/users');
        } else {
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;

        if (window.confirm('Are you sure you want to delete this user?')) {
            setDeleting(true);
            try {
                await deleteUser(id);
                navigate('/users');
            } catch (err: any) {
                setError('Failed to delete user');
                console.error(err);
                setDeleting(false);
            }
        }
    };

    if (loading && !isCreateMode) {
        return (
            <MainLayout>
                <div className="user-detail-loading">Loading...</div>
            </MainLayout>
        );
    }

    if (!user && !isCreateMode) {
        return (
            <MainLayout>
                <div className="user-detail-error">User not found</div>
            </MainLayout>
        );
    }

    const getPageTitle = (): string => {
        if (isCreateMode) {
            return 'Create New User';
        }
        if (isEditing && user) {
            return `Edit User: ${user.firstName} ${user.lastName}`;
        }
        return user ? `${user.firstName} ${user.lastName}` : '';
    };

    return (
        <MainLayout>
            <div className="user-detail-header">
                <h1 className="user-detail-title">{getPageTitle()}</h1>
                <div className="user-detail-actions">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/users')}
                    >
                        Back to Users
                    </Button>
                </div>
            </div>

            {isCreateMode ? (
                <UserCreateForm
                    onSubmit={handleCreateUser}
                    onCancel={handleCancel}
                    isSubmitting={saving}
                    error={error}
                />
            ) : isEditing && user ? (
                <UserEditForm
                    user={user}
                    onSubmit={handleUpdateUser}
                    onCancel={handleCancel}
                    isSubmitting={saving}
                    error={error}
                />
            ) : user && (
                <UserViewForm
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isDeleting={deleting}
                    isAdmin={isAdmin}
                    error={error}
                />
            )}
        </MainLayout>
    );
};

export default UserDetailsPage;