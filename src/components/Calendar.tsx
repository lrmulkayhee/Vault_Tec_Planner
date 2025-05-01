import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CalendarProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onTaskClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const navigateMonth = (direction: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const getTasksForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return tasks.filter(task => task.dueDate === dateStr);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsDetailsOpen(true);
    };

    const renderDay = (day: number) => {
        const tasksForDay = getTasksForDay(day);
        const hasHighPriority = tasksForDay.some(task => task.priority === 'high' && !task.completed);
        const hasMediumPriority = tasksForDay.some(task => task.priority === 'medium' && !task.completed);

        return (
            <div
                key={day}
                className={`min-h-[100px] border border-vault-green/30 p-2 ${hasHighPriority ? 'bg-destructive/10' : hasMediumPriority ? 'bg-vault-gold/10' : ''
                    }`}
            >
                <div className={`text-right mb-1 font-mono ${hasHighPriority ? 'text-destructive' : hasMediumPriority ? 'text-vault-gold' : 'text-vault-green-light'
                    }`}>
                    {day}
                </div>
                <div className="space-y-1">
                    {tasksForDay.map(task => (
                        <div
                            key={task.id}
                            onClick={() => handleTaskClick(task)}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${task.completed
                                    ? 'line-through bg-vault-green/20 text-vault-green/50'
                                    : task.priority === 'high'
                                        ? 'bg-destructive/20 text-destructive'
                                        : task.priority === 'medium'
                                            ? 'bg-vault-gold/20 text-vault-gold'
                                            : 'bg-vault-green/20 text-vault-green'
                                }`}
                        >
                            {task.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderCalendarDays = () => {
        const days = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Render days of week header
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={`header-${i}`} className="font-bold text-center py-2 text-vault-green-light">
                    {daysOfWeek[i]}
                </div>
            );
        }

        // Render empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="bg-terminal-bg/30 border border-vault-green/10"></div>);
        }

        // Render days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(renderDay(day));
        }

        // Fill remaining cells if needed
        const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
        for (let i = daysInMonth + firstDayOfMonth; i < totalCells; i++) {
            days.push(<div key={`empty-end-${i}`} className="bg-terminal-bg/30 border border-vault-green/10"></div>);
        }

        return days;
    };

    return (
        <div>
            <div className="terminal-container mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="terminal-header">
                        <CalendarIcon size={20} className="text-vault-green mr-2" />
                        <h2 className="tracking-wide">SCHEDULE</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={() => navigateMonth(-1)}
                            variant="outline"
                            size="sm"
                            className="border-vault-green text-vault-green hover:bg-vault-green/10"
                        >
                            <ChevronLeft size={16} />
                        </Button>

                        <h3 className="text-lg text-vault-green font-mono">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h3>

                        <Button
                            onClick={() => navigateMonth(1)}
                            variant="outline"
                            size="sm"
                            className="border-vault-green text-vault-green hover:bg-vault-green/10"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                </div>
            </div>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="terminal-container max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-vault-green text-xl">TASK DETAILS</DialogTitle>
                    </DialogHeader>

                    {selectedTask && (
                        <div className="space-y-4 mt-4">
                            <div>
                                <h3 className={`font-bold text-lg ${selectedTask.completed ? 'line-through text-vault-green/60' : 'text-vault-green'
                                    }`}>
                                    {selectedTask.title}
                                </h3>

                                {selectedTask.description && (
                                    <p className="text-vault-green-light mt-2">{selectedTask.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-vault-green-light">Due Date:</p>
                                    <p className="text-vault-green">
                                        {new Date(selectedTask.dueDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-vault-green-light">Priority:</p>
                                    <p className={`font-bold ${selectedTask.priority === 'high'
                                            ? 'text-destructive'
                                            : selectedTask.priority === 'medium'
                                                ? 'text-vault-gold'
                                                : 'text-vault-green'
                                        }`}>
                                        {selectedTask.priority.toUpperCase()}
                                    </p>
                                </div>

                                {selectedTask.category && (
                                    <div>
                                        <p className="text-vault-green-light">Category:</p>
                                        <p className="text-vault-green">{selectedTask.category}</p>
                                    </div>
                                )}

                                {selectedTask.estimatedTime && (
                                    <div>
                                        <p className="text-vault-green-light">Est. Time:</p>
                                        <p className="text-vault-green">{selectedTask.estimatedTime} minutes</p>
                                    </div>
                                )}
                            </div>

                            {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
                                <div>
                                    <p className="text-vault-green-light mb-2">Subtasks:</p>
                                    <div className="border border-vault-green/30 rounded p-2 space-y-1">
                                        {selectedTask.subtasks.map(subtask => (
                                            <div key={subtask.id} className="flex items-center">
                                                <div className={`h-2 w-2 rounded-full mr-2 ${subtask.completed ? 'bg-vault-green' : 'bg-vault-green/30'
                                                    }`} />
                                                <span className={subtask.completed ? 'line-through text-vault-green/50' : 'text-vault-green-light'}>
                                                    {subtask.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={() => {
                                        onTaskClick(selectedTask);
                                        setIsDetailsOpen(false);
                                    }}
                                    className="bg-vault-green text-black hover:bg-vault-green-light"
                                >
                                    EDIT TASK
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Calendar;