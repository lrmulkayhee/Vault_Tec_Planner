import React, { useEffect, useState } from 'react';
import { X, Plus, Calendar } from 'lucide-react';
import { Task, SubTask } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    initialTask?: Task;
}

const emptyTask: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    category: '',
    estimatedTime: '',
    subtasks: [],
};

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSave, initialTask }) => {
    const [task, setTask] = useState<Task>(emptyTask);
    const [subtaskTitle, setSubtaskTitle] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        } else {
            setTask({
                ...emptyTask,
                id: `task-${Date.now()}`,
            });
        }
    }, [initialTask, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const addSubtask = () => {
        if (!subtaskTitle.trim()) return;

        const newSubtask: SubTask = {
            id: `subtask-${Date.now()}`,
            title: subtaskTitle,
            completed: false,
        };

        setTask((prev) => ({
            ...prev,
            subtasks: [...prev.subtasks, newSubtask],
        }));

        setSubtaskTitle('');
    };

    const removeSubtask = (id: string) => {
        setTask((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((subtask) => subtask.id !== id),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(task);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="terminal-container max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-vault-green text-xl">
                        {initialTask ? 'EDIT TASK' : 'NEW TASK'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="title" className="text-vault-green">TITLE</Label>
                        <Input
                            id="title"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                            className="terminal-input mt-1"
                            placeholder="Enter task title..."
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="text-vault-green">DESCRIPTION</Label>
                        <textarea
                            id="description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="terminal-input mt-1 w-full h-24"
                            placeholder="Enter task description..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="dueDate" className="text-vault-green">DUE DATE</Label>
                            <div className="relative">
                                <Input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    value={task.dueDate}
                                    onChange={handleChange}
                                    className="terminal-input mt-1 pl-8"
                                />
                                <Calendar size={16} className="absolute left-2 top-[calc(50%+4px)] transform -translate-y-1/2 text-vault-green" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="priority" className="text-vault-green">PRIORITY</Label>
                            <select
                                id="priority"
                                name="priority"
                                value={task.priority}
                                onChange={handleChange}
                                className="terminal-input mt-1 w-full"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category" className="text-vault-green">CATEGORY</Label>
                            <Input
                                id="category"
                                name="category"
                                value={task.category}
                                onChange={handleChange}
                                className="terminal-input mt-1"
                                placeholder="e.g., Work, Personal..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="estimatedTime" className="text-vault-green">EST. TIME (MINS)</Label>
                            <Input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="number"
                                min="0"
                                value={task.estimatedTime}
                                onChange={handleChange}
                                className="terminal-input mt-1"
                                placeholder="e.g., 30"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="text-vault-green">SUBTASKS</Label>
                        <div className="flex mt-1">
                            <Input
                                value={subtaskTitle}
                                onChange={(e) => setSubtaskTitle(e.target.value)}
                                className="terminal-input flex-1"
                                placeholder="Add a subtask..."
                            />
                            <Button
                                type="button"
                                onClick={addSubtask}
                                className="ml-2 bg-vault-green text-black hover:bg-vault-green-light"
                            >
                                <Plus size={16} />
                            </Button>
                        </div>

                        <div className="mt-2 space-y-2">
                            {task.subtasks.map((subtask) => (
                                <div key={subtask.id} className="flex items-center justify-between bg-terminal-bg border border-vault-green/30 p-2 rounded">
                                    <span className="text-vault-green-light text-sm">{subtask.title}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSubtask(subtask.id)}
                                        className="text-vault-green-light hover:text-destructive"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-vault-green text-vault-green hover:bg-vault-green/10"
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            className="bg-vault-green text-black hover:bg-vault-green-light"
                        >
                            {initialTask ? 'UPDATE' : 'CREATE'} TASK
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskForm;