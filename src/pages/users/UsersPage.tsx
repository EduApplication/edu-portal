import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { UserDto } from '../../types/user';
import { getAllUsers } from '../../api/users';
import './UsersPage.css';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
            setError('');
        } catch (err: any) {
            setError('Failed to load users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = () => {
        navigate('/users/new');
    };

    return (
        <MainLayout>
            <div className="users-header">
                <h1 className="users-title">Users</h1>
                <Button onClick={handleCreateUser}>
                    Create User
                </Button>
            </div>

            {error && <div className="users-error">{error}</div>}

            {loading ? (
                <div className="users-loading">Loading...</div>
            ) : (
                <div className="users-list">
                    {users.map(user => (
                        <Card key={user.id} className="user-card">
                            <div className="user-card-content">
                                <div className="user-card-name">{user.firstName} {user.lastName}</div>
                                <div className="user-card-info">
                                    <span className="user-card-email">{user.email}</span>
                                    <span className="user-card-role">{user.roleName}</span>
                                </div>
                            </div>
                            <div className="user-card-actions">
                                <Button
                                    variant="outline"
                                    size="small"
                                    onClick={() => navigate(`/users/${user.id}`)}
                                >
                                    View
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </MainLayout>
    );
};

export default UsersPage;