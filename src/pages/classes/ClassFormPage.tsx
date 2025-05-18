import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { createClass, getClassById, updateClass } from '../../api/classes';
import { CreateClassDto } from '../../types/class';
import './ClassFormPage.css';

const ClassFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateClassDto>({
        name: '',
        year: 0,
        section: '',
        classTeacherId: ''
    });

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const fetchClass = async () => {
                try {
                    const data = await getClassById(id!);
                    setFormData({
                        name: data.name,
                        year: data.year,
                        section: data.section,
                        classTeacherId: data.classTeacherId
                    });
                    setError('');
                } catch (err: any) {
                    setError('Failed to load class details');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchClass();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (isEditMode) {
                await updateClass(id!, formData);
            } else {
                await createClass(formData);
            }
            navigate('/classes');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save class');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="class-form-loading">Loading...</div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="class-form-header">
                <h1 className="class-form-title">
                    {isEditMode ? 'Edit Class' : 'Create New Class'}
                </h1>
            </div>

            <Card className="class-form-card">
                {error && <div className="class-form-error">{error}</div>}

                <form onSubmit={handleSubmit} className="class-form">
                    <TextField
                        label="Class Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Year"
                        name="year"
                        type="number"
                        value={formData.year.toString()}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Section"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Class Teacher ID"
                        name="classTeacherId"
                        value={formData.classTeacherId}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <div className="class-form-actions">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/classes')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Card>
        </MainLayout>
    );
};

export default ClassFormPage;