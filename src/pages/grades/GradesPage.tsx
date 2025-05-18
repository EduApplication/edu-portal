import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import { getStudentGrades } from '../../api/grades';
import { StudentGradesBySubjectDto } from '../../types/grade';
import './GradesPage.css';

const GradesPage: React.FC = () => {
    const [gradesBySubject, setGradesBySubject] = useState<StudentGradesBySubjectDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const data = await getStudentGrades();
                setGradesBySubject(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load grades');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, []);

    const handleViewSubjectGrades = (subjectId: string) => {
        navigate(`/grades/subject/${subjectId}`);
    };

    return (
        <MainLayout>
            <div className="grades-header">
                <h1 className="grades-title">My Grades</h1>
            </div>

            {error && <div className="grades-error">{error}</div>}

            {loading ? (
                <div className="grades-loading">Loading...</div>
            ) : (
                <div className="grades-container">
                    {gradesBySubject.length === 0 ? (
                        <div className="grades-empty">No grades found</div>
                    ) : (
                        gradesBySubject.map((subject) => (
                            <Card key={subject.subjectId} className="grades-card">
                                <div className="grades-card-header">
                                    <h2 className="subject-name">{subject.subjectName}</h2>
                                    <div className="average-grade">
                                        Average: <span className="grade-value">{subject.averageGrade.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className="grades-list">
                                    {subject.grades.length === 0 ? (
                                        <p className="no-grades">No grades yet</p>
                                    ) : (
                                        <table className="grades-table">
                                            <thead>
                                            <tr>
                                                <th>Grade</th>
                                                <th>Type</th>
                                                <th>Date</th>
                                                <th>Teacher</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {subject.grades.map((grade) => (
                                                <tr key={grade.id}>
                                                    <td className="grade-cell">{grade.value}</td>
                                                    <td>{grade.gradeTypeName}</td>
                                                    <td>{new Date(grade.createdAt).toLocaleDateString()}</td>
                                                    <td>{grade.teacherName}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>

                                <div className="grades-card-footer">
                                    <button
                                        className="view-all-button"
                                        onClick={() => handleViewSubjectGrades(subject.subjectId)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default GradesPage;