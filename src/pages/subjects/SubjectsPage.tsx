import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getSubjectsForCurrentUser } from '../../api/subjects';
import { SubjectDto } from '../../types/subject';
import { useAuth } from '../../context/AuthContext';
import './SubjectsPage.css';

const SubjectsPage: React.FC = () => {
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.roleName === 'Administrator';

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjectsForCurrentUser();
                setSubjects(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load subjects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const handleAddSubject = () => {
        navigate('/subjects/new');
    };

    const handleViewSubject = (id: string) => {
        navigate(`/subjects/${id}`);
    };

    return (
        <MainLayout>
            <div className="subjects-header">
                <h1 className="subjects-title">Subjects</h1>
                {isAdmin && (
                    <Button onClick={handleAddSubject}>Add New Subject</Button>
                )}
            </div>

            {error && <div className="subjects-error">{error}</div>}

            {loading ? (
                <div className="subjects-loading">Loading...</div>
            ) : (
                <div className="subjects-grid">
                    {subjects.length === 0 ? (
                        <div className="subjects-empty">No subjects found</div>
                    ) : (
                        subjects.map((subject) => (
                            <Card key={subject.id} className="subject-card">
                                <div className="subject-card-content">
                                    <h2 className="subject-name">{subject.name}</h2>
                                    <p className="subject-description">{subject.description}</p>

                                    <div className="subject-teachers">
                                        {subject.teachers.length > 0 ? (
                                            <>
                                                <h3 className="teachers-title">Teachers:</h3>
                                                <ul className="teachers-list">
                                                    {subject.teachers.map((teacher) => (
                                                        <li key={teacher.id} className="teacher-item">
                                                            {teacher.firstName} {teacher.lastName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <p className="no-teachers">No teachers assigned</p>
                                        )}
                                    </div>

                                    <div className="subject-card-actions">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewSubject(subject.id)}
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

export default SubjectsPage;