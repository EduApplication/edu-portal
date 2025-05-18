import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { getClassesForCurrentUser } from '../../api/classes';
import { ClassDto } from '../../types/class';
import { hasRole } from '../../utils/auth';
import './ClassesPage.css';

const ClassesPage: React.FC = () => {
    const [classes, setClasses] = useState<ClassDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const isAdmin = hasRole('Administrator');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getClassesForCurrentUser();
                setClasses(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load classes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleAddClass = () => {
        navigate('/classes/new');
    };

    const handleViewClass = (id: string) => {
        navigate(`/classes/${id}`);
    };

    return (
        <MainLayout>
            <div className="classes-header">
                <h1 className="classes-title">Classes</h1>
                {isAdmin && (
                    <Button onClick={handleAddClass}>Add New Class</Button>
                )}
            </div>

            {error && <div className="classes-error">{error}</div>}

            {loading ? (
                <div className="classes-loading">Loading...</div>
            ) : (
                <div className="classes-grid">
                    {classes.length === 0 ? (
                        <div className="classes-empty">No classes found</div>
                    ) : (
                        classes.map((cls) => (
                            <Card key={cls.id} className="class-card">
                                <div className="class-card-content">
                                    <h2 className="class-name">{cls.name}</h2>
                                    <div className="class-details">
                                        <p>Year: {cls.year}</p>
                                        <p>Section: {cls.section}</p>
                                        <p>Teacher: {`${cls.classTeacherFirstName} ${cls.classTeacherLastName}`}</p>
                                    </div>
                                    <div className="class-card-actions">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewClass(cls.id)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default ClassesPage;