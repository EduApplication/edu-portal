import React, { useState, useEffect } from 'react';
import { addDays, format, startOfWeek, endOfWeek, isToday, isSameDay } from 'date-fns';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import { getScheduleForCurrentUser } from '../../api/schedule';
import { LessonDto } from '../../types/lesson';
import { useAuth } from '../../context/AuthContext';
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [weekStart, setWeekStart] = useState<Date>(startOfWeek(currentDate, { weekStartsOn: 1 }));
    const [weekEnd, setWeekEnd] = useState<Date>(endOfWeek(currentDate, { weekStartsOn: 1 }));
    const [schedule, setSchedule] = useState<LessonDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { user } = useAuth();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const data = await getScheduleForCurrentUser(weekStart, weekEnd);
                setSchedule(data);
                setError('');
            } catch (err: any) {
                setError('Failed to load schedule');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [weekStart, weekEnd]);

    const handlePreviousWeek = () => {
        const newWeekStart = addDays(weekStart, -7);
        const newWeekEnd = addDays(weekEnd, -7);
        setWeekStart(newWeekStart);
        setWeekEnd(newWeekEnd);
    };

    const handleNextWeek = () => {
        const newWeekStart = addDays(weekStart, 7);
        const newWeekEnd = addDays(weekEnd, 7);
        setWeekStart(newWeekStart);
        setWeekEnd(newWeekEnd);
    };

    const handleCurrentWeek = () => {
        const today = new Date();
        setWeekStart(startOfWeek(today, { weekStartsOn: 1 }));
        setWeekEnd(endOfWeek(today, { weekStartsOn: 1 }));
    };

    const lessonsByDay = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStart, i);
        return {
            date: day,
            lessons: schedule.filter(lesson => {
                const lessonDate = new Date(lesson.startTime);
                return isSameDay(lessonDate, day);
            }).sort((a, b) => {
                return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
            })
        };
    });

    return (
        <MainLayout>
            <div className="schedule-header">
                <h1 className="schedule-title">Schedule</h1>

                <div className="schedule-navigation">
                    <button
                        className="schedule-nav-button"
                        onClick={handlePreviousWeek}
                    >
                        Previous Week
                    </button>
                    <button
                        className="schedule-nav-button current"
                        onClick={handleCurrentWeek}
                    >
                        Current Week
                    </button>
                    <button
                        className="schedule-nav-button"
                        onClick={handleNextWeek}
                    >
                        Next Week
                    </button>
                </div>

                <div className="schedule-date-range">
                    {format(weekStart, 'MMMM d, yyyy')} - {format(weekEnd, 'MMMM d, yyyy')}
                </div>
            </div>

            {error && <div className="schedule-error">{error}</div>}

            {loading ? (
                <div className="schedule-loading">Loading...</div>
            ) : (
                <div className="schedule-grid">
                    {lessonsByDay.map((daySchedule, index) => (
                        <Card
                            key={index}
                            className={`schedule-day ${isToday(daySchedule.date) ? 'today' : ''}`}
                        >
                            <div className="day-header">
                                <h2 className="day-name">{format(daySchedule.date, 'EEEE')}</h2>
                                <div className="day-date">{format(daySchedule.date, 'MMMM d')}</div>
                            </div>

                            <div className="day-lessons">
                                {daySchedule.lessons.length === 0 ? (
                                    <div className="no-lessons">No lessons</div>
                                ) : (
                                    daySchedule.lessons.map(lesson => (
                                        <div key={lesson.id} className="lesson-card">
                                            <div className="lesson-time">
                                                {format(new Date(lesson.startTime), 'HH:mm')} - {format(new Date(lesson.endTime), 'HH:mm')}
                                            </div>
                                            <div className="lesson-subject">{lesson.subjectName}</div>
                                            <div className="lesson-details">
                                                <span className="lesson-room">Room: {lesson.room}</span>
                                                {user?.roleName !== 'Teacher' && (
                                                    <span className="lesson-teacher">Teacher: {lesson.teacherName}</span>
                                                )}
                                                {user?.roleName !== 'Student' && user?.roleName !== 'Parent' && (
                                                    <span className="lesson-class">Class: {lesson.className}</span>
                                                )}
                                            </div>
                                            {lesson.topic && (
                                                <div className="lesson-topic">Topic: {lesson.topic}</div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </MainLayout>
    );
};

export default SchedulePage;