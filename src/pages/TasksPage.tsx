import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import { useToast } from '@/hooks/use-toast';

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        // Load tasks from localStorage or use mock data
        const savedTasks = localStorage.getItem('vault-tec-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            setTasks([
                {
                    id: '1',
                    title: 'Sample Task 1',
                    description: 'This is a sample task description.',
                    completed: false,
                    dueDate: '2023-12-31',
                    priority: 'high',
                    category: 'Work',
                    estimatedTime: 120,
                    subtasks: [],
                },
                {
                    id: '2',
                    title: 'Sample Task 2',
                    description: 'Another sample task description.',
                    completed: true,
                    dueDate: '2023-11-30',
                    priority: 'medium',
                    category: 'Personal',
                    estimatedTime: 60,
                    subtasks: [],
                },
            ]);
        }
    }, []);

    useEffect(() => {
        // Save tasks to localStorage whenever they change
        localStorage.setItem('vault-tec-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast({
            title: "Task Created",
            description: "Your new task has been added to the system.",
            variant: "default",
        });
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        toast({
            title: "Task Updated",
            description: "Your task has been successfully updated.",
            variant: "default",
        });
    };

    const handleDeleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        toast({
            title: "Task Deleted",
            description: "The task has been removed from your list.",
            variant: "default",
        });
    };

    const handleCompleteTask = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

        const task = tasks.find(t => t.id === id);
        const newStatus = task ? !task.completed : false;

        toast({
            title: newStatus ? "Task Completed" : "Task Reopened",
            description: newStatus
                ? "The task has been marked as completed."
                : "The task has been reopened.",
            variant: "default",
        });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <TaskList
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onCompleteTask={handleCompleteTask}
            />
        </div>
    );
};

export default TasksPage;