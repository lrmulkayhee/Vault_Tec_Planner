import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';
import { useTasksContext } from '../contexts/TasksContext';

const CalendarPage: React.FC = () => {
    const { tasks, updateTask } = useTasksContext();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsFormOpen(true);
    };

    const handleSaveTask = (updatedTask: Task) => {
        updateTask(updatedTask);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Calendar tasks={tasks} onTaskClick={handleTaskClick} />

            <TaskForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveTask}
                initialTask={selectedTask}
            />
        </div>
    );
};

export default CalendarPage;