import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { getClassById, deleteClass } from '../../api/classes';
import { ClassDetailsDto } from '../../types/class';
import { hasRole } from '../../utils/auth';
import './ClassDetailsPage.css';

const ClassDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [classData, setClassData] = useState<ClassDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);

    const isAdmin = hasRole('Administrator');

    useEffect(() => {
        const fetchClassDetails = async () => {
            if (!id) return;

            try {
                const data = await getClassById(id);
                setClassData(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load class details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetails();
    }, [id]);

    const handleEdit = () => {
        if (!id) return;
        navigate(`/classes/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!id) return;

        if (window.confirm('Are you sure you want to delete this class?')) {
            setDeleting(true);
            try {
                await deleteClass(id);
                navigate('/classes');
            } catch (err: any) {
                setError('Failed to delete class');
                console.error(err);
                setDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="class-detail-loading">Loading...</div>
            </MainLayout>
        );
    }

    if (!classData) {
        return (
            <MainLayout>
                <div className="class-detail-error">Class not found</div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="class-detail-header">
                <h1 className="class-detail-title">{classData.name}</h1>
                <div className="class-detail-actions">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/classes')}
                    >
                        Back to Classes
                    </Button>

                    {isAdmin && (
                        <>
                            <Button onClick={handleEdit}>Edit</Button>
                            <Button
                                variant="secondary"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {error && <div className="class-detail-error">{error}</div>}

            <Card className="class-detail-card">
                <div className="class-detail-info">
                    <div className="class-detail-section">
                        <h2 className="class-detail-subtitle">Basic Information</h2>
                        <div className="class-detail-row">
                            <div className="class-detail-label">Class Name:</div>
                            <div className="class-detail-value">{classData.name}</div>
                        </div>
                        <div className="class-detail-row">
                            <div className="class-detail-label">Year:</div>
                            <div className="class-detail-value">{classData.year}</div>
                        </div>
                        <div className="class-detail-row">
                            <div className="class-detail-label">Section:</div>
                            <div className="class-detail-value">{classData.section}</div>
                        </div>
                        <div className="class-detail-row">
                            <div className="class-detail-label">Class Teacher:</div>
                            <div className="class-detail-value">
                                {`${classData.classTeacherFirstName} ${classData.classTeacherLastName}`}
                            </div>
                        </div>
                        <div className="class-detail-row">
                        <div className="class-detail-label">Status:</div>
                            <div className="class-detail-value">
                                {classData.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </MainLayout>
    );
};

export default ClassDetailsPage;