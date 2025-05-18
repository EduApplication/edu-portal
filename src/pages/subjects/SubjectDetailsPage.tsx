import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getSubjectById, deleteSubject, removeTeacherFromSubject } from '../../api/subjects';
import { SubjectDetailsDto } from '../../types/subject';
import { useAuth } from '../../context/AuthContext';
import './SubjectDetailsPage.css';

const SubjectDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [subject, setSubject] = useState<SubjectDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);

    const { user } = useAuth();
    const isAdmin = user?.roleName === 'Administrator';

    useEffect(() => {
        const fetchSubjectDetails = async () => {
            if (!id) return;

            try {
                const data = await getSubjectById(id);
                setSubject(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load subject details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectDetails();
    }, [id]);

    const handleEdit = () => {
        if (!id) return;
        navigate(`/subjects/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!id) return;

        if (window.confirm('Are you sure you want to delete this subject?')) {
            setDeleting(true);
            try {
                await deleteSubject(id);
                navigate('/subjects');
            } catch (err: any) {
                setError('Failed to delete subject');
                console.error(err);
                setDeleting(false);
            }
        }
    };

    const handleRemoveTeacher = async (teacherId: string) => {
        if (!id) return;

        if (window.confirm('Are you sure you want to remove this teacher from the subject?')) {
            try {
                await removeTeacherFromSubject(id, teacherId);

                if (subject) {
                    setSubject({
                        ...subject,
                        teachers: subject.teachers.filter(t => t.id !== teacherId)
                    });
                }
            } catch (err: any) {
                setError('Failed to remove teacher');
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="subject-detail-loading">Loading...</div>
            </MainLayout>
        );
    }

    if (!subject) {
        return (
            <MainLayout>
                <div className="subject-detail-error">Subject not found</div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="subject-detail-header">
                <h1 className="subject-detail-title">{subject.name}</h1>
                <div className="subject-detail-actions">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/subjects')}
                    >
                        Back to Subjects
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

            {error && <div className="subject-detail-error">{error}</div>}

            <div className="subject-detail-content">
                <Card className="subject-detail-card">
                    <div className="subject-detail-section">
                        <h2 className="subject-detail-subtitle">Details</h2>
                        <div className="subject-detail-row">
                            <div className="subject-detail-label">Name:</div>
                            <div className="subject-detail-value">{subject.name}</div>
                        </div>
                        <div className="subject-detail-row">
                            <div className="subject-detail-label">Description:</div>
                            <div className="subject-detail-value">{subject.description}</div>
                        </div>
                        <div className="subject-detail-row">
                            <div className="subject-detail-label">Status:</div>
                            <div className="subject-detail-value">{subject.isActive ? 'Active' : 'Inactive'}</div>
                        </div>
                    </div>
                </Card>

                <Card className="subject-teachers-card">
                    <h2 className="subject-detail-subtitle">Teachers</h2>

                    {subject.teachers.length === 0 ? (
                        <div className="no-teachers">No teachers assigned to this subject</div>
                    ) : (
                        <div className="teachers-list">
                            {subject.teachers.map(teacher => (
                                <div key={teacher.id} className="teacher-item">
                                    <div className="teacher-info">
                                        <div className="teacher-name">{teacher.firstName} {teacher.lastName}</div>
                                        <div className="teacher-email">{teacher.email}</div>
                                    </div>

                                    {isAdmin && (
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleRemoveTeacher(teacher.id)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {isAdmin && (
                        <div className="add-teacher-button">
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/subjects/${id}/add-teacher`)}
                            >
                                Add Teacher
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </MainLayout>
    );
};

export default SubjectDetailsPage;