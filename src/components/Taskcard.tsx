import React from 'react';
import { Calendar, Check, Clock, Edit, Trash } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onEdit, onDelete }) => {
    const getPriorityClass = () => {
        switch (task.priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="terminal-container mb-4 transition-all hover:shadow-lg hover:shadow-vault-green/20">
            <div className="flex justify-between">
                <div className="flex items-start space-x-3">
                    <button
                        onClick={() => onComplete(task.id)}
                        className={`mt-1 h-5 w-5 rounded-full border border-vault-green flex items-center justify-center ${task.completed ? 'bg-vault-green' : 'bg-transparent'
                            }`}
                    >
                        {task.completed && <Check size={12} className="text-black" />}
                    </button>

                    <div>
                        <h3 className={`font-bold ${task.completed ? 'line-through text-vault-green/60' : 'text-vault-green'}`}>
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="text-sm text-vault-green-light mt-1">
                                {task.description}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center mt-2 text-xs gap-3">
                            <div className="flex items-center">
                                <Calendar size={12} className="mr-1" />
                                <span>{formatDate(task.dueDate)}</span>
                            </div>

                            {task.estimatedTime && (
                                <div className="flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    <span>{task.estimatedTime} mins</span>
                                </div>
                            )}

                            <div className={`flex items-center ${getPriorityClass()}`}>
                                <span className="uppercase">{task.priority} Priority</span>
                            </div>

                            {task.category && (
                                <div className="bg-vault-blue/20 px-2 py-0.5 rounded text-vault-blue-light">
                                    {task.category}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-vault-green-light hover:text-vault-green transition-colors"
                        title="Edit Task"
                    >
                        <Edit size={16} />
                    </button>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-vault-green-light hover:text-destructive transition-colors"
                        title="Delete Task"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            </div>

            {task.subtasks && task.subtasks.length > 0 && (
                <div className="pl-8 mt-3 border-l border-vault-green/30">
                    {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center mt-2">
                            <button
                                onClick={() => {/* Handle subtask completion */ }}
                                className={`mr-2 h-4 w-4 rounded-full border border-vault-green flex items-center justify-center ${subtask.completed ? 'bg-vault-green' : 'bg-transparent'
                                    }`}
                            >
                                {subtask.completed && <Check size={10} className="text-black" />}
                            </button>
                            <span className={`text-sm ${subtask.completed ? 'line-through text-vault-green/50' : 'text-vault-green-light'}`}>
                                {subtask.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskCard;