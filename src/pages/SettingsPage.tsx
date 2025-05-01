import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
    const { toast } = useToast();

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated successfully.",
            variant: "default",
        });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="terminal-container">
                <div className="terminal-header mb-6">
                    <div className="h-4 w-4 rounded-full bg-vault-green mr-2"></div>
                    <h2 className="tracking-wide">SYSTEM SETTINGS</h2>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="username" className="text-vault-green">USERNAME</Label>
                                <Input
                                    id="username"
                                    defaultValue="Vault_Dweller"
                                    className="terminal-input mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-vault-green">EMAIL</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="overseer@vault-tec.com"
                                    className="terminal-input mt-1"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="defaultView" className="text-vault-green">DEFAULT VIEW</Label>
                                <select
                                    id="defaultView"
                                    defaultValue="tasks"
                                    className="terminal-input mt-1 w-full"
                                >
                                    <option value="tasks">Tasks List</option>
                                    <option value="calendar">Calendar</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="defaultPriority" className="text-vault-green">DEFAULT TASK PRIORITY</Label>
                                <select
                                    id="defaultPriority"
                                    defaultValue="medium"
                                    className="terminal-input mt-1 w-full"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-vault-green/30 pt-6">
                        <h3 className="text-vault-green font-bold mb-4">NOTIFICATIONS</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-vault-green font-medium">Task Reminders</p>
                                    <p className="text-sm text-vault-green-light">Receive notifications for upcoming tasks</p>
                                </div>
                                <Switch id="task-notifications" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-vault-green font-medium">Weekly Summary</p>
                                    <p className="text-sm text-vault-green-light">Get a weekly summary of your tasks</p>
                                </div>
                                <Switch id="weekly-summary" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-vault-green font-medium">System Updates</p>
                                    <p className="text-sm text-vault-green-light">Be notified about system maintenance and updates</p>
                                </div>
                                <Switch id="system-updates" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            className="bg-vault-green text-black hover:bg-vault-green-light"
                        >
                            <Save size={16} className="mr-2" />
                            SAVE SETTINGS
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;