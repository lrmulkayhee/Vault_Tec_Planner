import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import TaskCard from './Taskcard';
import TaskForm from './TaskForm';
import { Task, Priority } from '../types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
    tasks: Task[];
    onAddTask: (task: Task) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onCompleteTask: (id: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'dueDate' | 'priority' | 'title';

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
    onCompleteTask
}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [sortType, setSortType] = useState<SortType>('dueDate');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);

    const openNewTaskForm = () => {
        setEditingTask(undefined);
        setIsFormOpen(true);
    };

    const openEditTaskForm = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleSaveTask = (task: Task) => {
        if (editingTask) {
            onUpdateTask(task);
        } else {
            onAddTask(task);
        }
    };

    const categories = Array.from(new Set(tasks.map(task => task.category))).filter(Boolean);

    const filteredTasks = tasks
        .filter(task => {
            // Filter by status
            if (filterType === 'active' && task.completed) return false;
            if (filterType === 'completed' && !task.completed) return false;

            // Filter by category
            if (categoryFilter && task.category !== categoryFilter) return false;

            // Filter by priority
            if (priorityFilter && task.priority !== priorityFilter) return false;

            return true;
        })
        .sort((a, b) => {
            switch (sortType) {
                case 'dueDate':
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                case 'priority': {
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="terminal-header">
                    <div className="h-4 w-4 rounded-full bg-vault-green mr-2 animate-radiation-spin"></div>
                    <h2 className="tracking-wide">TASKS LIST</h2>
                    <span className="text-sm ml-2 text-vault-green-light">({filteredTasks.length})</span>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-vault-green text-vault-green hover:bg-vault-green/10">
                                <Filter size={16} className="mr-2" />
                                FILTER
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="terminal-container">
                            <DropdownMenuLabel className="text-vault-green">Filter By Status</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={`${filterType === 'all' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setFilterType('all')}
                                >
                                    All Tasks
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${filterType === 'active' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setFilterType('active')}
                                >
                                    Active Tasks
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${filterType === 'completed' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setFilterType('completed')}
                                >
                                    Completed Tasks
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator className="bg-vault-green/30" />

                            <DropdownMenuLabel className="text-vault-green">Sort By</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={`${sortType === 'dueDate' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setSortType('dueDate')}
                                >
                                    Due Date
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${sortType === 'priority' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setSortType('priority')}
                                >
                                    Priority
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${sortType === 'title' ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setSortType('title')}
                                >
                                    Title
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            {categories.length > 0 && (
                                <>
                                    <DropdownMenuSeparator className="bg-vault-green/30" />
                                    <DropdownMenuLabel className="text-vault-green">Category</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className={`${categoryFilter === null ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                            onClick={() => setCategoryFilter(null)}
                                        >
                                            All Categories
                                        </DropdownMenuItem>
                                        {categories.map(category => (
                                            <DropdownMenuItem
                                                key={category}
                                                className={`${categoryFilter === category ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                                onClick={() => setCategoryFilter(category)}
                                            >
                                                {category}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </>
                            )}

                            <DropdownMenuSeparator className="bg-vault-green/30" />
                            <DropdownMenuLabel className="text-vault-green">Priority</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className={`${priorityFilter === null ? 'bg-vault-green/20' : ''} text-vault-green-light hover:text-vault-green`}
                                    onClick={() => setPriorityFilter(null)}
                                >
                                    All Priorities
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${priorityFilter === 'high' ? 'bg-vault-green/20' : ''} text-destructive hover:text-destructive`}
                                    onClick={() => setPriorityFilter('high')}
                                >
                                    High Priority
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${priorityFilter === 'medium' ? 'bg-vault-green/20' : ''} text-vault-gold hover:text-vault-gold`}
                                    onClick={() => setPriorityFilter('medium')}
                                >
                                    Medium Priority
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className={`${priorityFilter === 'low' ? 'bg-vault-green/20' : ''} text-vault-green hover:text-vault-green`}
                                    onClick={() => setPriorityFilter('low')}
                                >
                                    Low Priority
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        onClick={openNewTaskForm}
                        className="bg-vault-green text-black hover:bg-vault-green-light"
                    >
                        <Plus size={16} className="mr-2" />
                        NEW TASK
                    </Button>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="terminal-container py-12 text-center">
                    <p className="text-vault-green-light mb-2">No tasks found matching your filters.</p>
                    <Button
                        onClick={openNewTaskForm}
                        className="bg-vault-green/20 text-vault-green hover:bg-vault-green/30"
                    >
                        <Plus size={16} className="mr-2" />
                        CREATE A NEW TASK
                    </Button>
                </div>
            ) : (
                <div>
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onComplete={onCompleteTask}
                            onEdit={openEditTaskForm}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </div>
            )}

            <TaskForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveTask}
                initialTask={editingTask}
            />
        </div>
    );
};

export default TaskList;