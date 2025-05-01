import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ProfilePage: React.FC = () => {
    const stats = {
        totalTasks: 24,
        completedTasks: 18,
        highPriorityTasks: 3,
        completionRate: 75,
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <div className="terminal-container">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-terminal-bg border-4 border-vault-green flex items-center justify-center mb-4">
                                <User size={48} className="text-vault-green" />
                            </div>

                            <h2 className="text-xl text-vault-green font-bold">Vault Dweller</h2>
                            <p className="text-vault-green-light">Vault 101 - Overseer</p>

                            <div className="w-full mt-6 space-y-2">
                                <p className="text-vault-green-light text-sm">User ID: VT-101-12345</p>
                                <p className="text-vault-green-light text-sm">Access Level: Administrator</p>
                                <p className="text-vault-green-light text-sm">Join Date: 09/25/2077</p>
                            </div>

                            <Button className="mt-6 w-full bg-vault-blue hover:bg-vault-blue-light text-white">
                                EDIT PROFILE
                            </Button>
                        </div>
                    </div>

                    <div className="terminal-container mt-6">
                        <h3 className="text-vault-green font-bold mb-4">PERSONAL INFO</h3>

                        <div className="space-y-3">
                            <div>
                                <p className="text-vault-green-light text-sm">Full Name</p>
                                <p className="text-vault-green">Vault Dweller</p>
                            </div>

                            <div>
                                <p className="text-vault-green-light text-sm">Email</p>
                                <p className="text-vault-green">overseer@vault-tec.com</p>
                            </div>

                            <div>
                                <p className="text-vault-green-light text-sm">Department</p>
                                <p className="text-vault-green">Administration</p>
                            </div>

                            <div>
                                <p className="text-vault-green-light text-sm">Position</p>
                                <p className="text-vault-green">Vault Overseer</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="terminal-container">
                        <h3 className="text-vault-green font-bold mb-4">PERFORMANCE STATS</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-vault-green-light">Task Completion Rate</p>
                                <div className="relative h-24 w-24 mx-auto">
                                    <div className="vault-progress w-24 h-24">
                                        <div
                                            className="vault-progress-fill"
                                            style={{ width: `${stats.completionRate}%` }}
                                        ></div>
                                        <div className="vault-progress-number text-2xl font-mono">
                                            {stats.completionRate}%
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-vault-green text-sm">
                                    {stats.completedTasks} of {stats.totalTasks} tasks completed
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-vault-green-light">High Priority</span>
                                        <span className="text-destructive">{stats.highPriorityTasks} tasks</span>
                                    </div>
                                    <Progress value={25} className="h-2 bg-terminal-bg" />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-vault-green-light">Medium Priority</span>
                                        <span className="text-vault-gold">8 tasks</span>
                                    </div>
                                    <Progress value={67} className="h-2 bg-terminal-bg" />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-vault-green-light">Low Priority</span>
                                        <span className="text-vault-green">13 tasks</span>
                                    </div>
                                    <Progress value={100} className="h-2 bg-terminal-bg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="terminal-container">
                        <h3 className="text-vault-green font-bold mb-4">RECENT ACTIVITY</h3>

                        <div className="space-y-3">
                            {[
                                { action: "Completed task: Water Purifier Maintenance", time: "Today, 10:23 AM" },
                                { action: "Created task: Security Patrol Schedule", time: "Yesterday, 4:15 PM" },
                                { action: "Edited task: Medical Supply Inventory", time: "Yesterday, 2:30 PM" },
                                { action: "Completed task: Monthly Food Ration Planning", time: "May 1, 8:45 AM" },
                                { action: "Created task: Social Event Planning", time: "April 28, 11:20 AM" },
                            ].map((activity, index) => (
                                <div key={index} className="flex justify-between items-center border-b border-vault-green/20 pb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 w-2 rounded-full bg-vault-green"></div>
                                        <p className="text-vault-green">{activity.action}</p>
                                    </div>
                                    <p className="text-vault-green-light text-sm">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="terminal-container">
                        <h3 className="text-vault-green font-bold mb-4">ACHIEVEMENTS</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {[
                                { name: "Task Master", icon: "🏆", description: "Completed 100+ tasks", unlocked: true },
                                { name: "Efficiency Expert", icon: "⚡", description: "Completed tasks before deadline", unlocked: true },
                                { name: "Organizer", icon: "📊", description: "Created 10+ categories", unlocked: true },
                                { name: "Perfectionist", icon: "✨", description: "100% completion rate for a month", unlocked: false },
                            ].map((achievement, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border ${achievement.unlocked
                                            ? "border-vault-gold bg-vault-gold/10"
                                            : "border-vault-green/30 bg-terminal-bg/50 opacity-60"
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{achievement.icon}</div>
                                    <h4 className={achievement.unlocked ? "text-vault-gold" : "text-vault-green-light"}>
                                        {achievement.name}
                                    </h4>
                                    <p className="text-xs mt-1 text-vault-green-light">
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;