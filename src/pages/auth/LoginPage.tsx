import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { login as apiLogin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiLogin({ email, password });
            login(response);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <Card>
                    <h1 className="login-title">Sign in to EduPortal</h1>
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;