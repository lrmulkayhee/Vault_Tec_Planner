import React from 'react';
import { CalendarRange, ListTodo, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="terminal-container mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-vault-green animate-pulse"></div>
                    <h1 className="text-vault-green text-2xl font-bold typing-effect">VAULT-TEC PLANNER</h1>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <NavItem
                        path="/"
                        icon={<ListTodo size={18} />}
                        label="TASKS"
                        isActive={isActive('/')}
                    />
                    <NavItem
                        path="/calendar"
                        icon={<CalendarRange size={18} />}
                        label="CALENDAR"
                        isActive={isActive('/calendar')}
                    />
                    <NavItem
                        path="/settings"
                        icon={<Settings size={18} />}
                        label="SETTINGS"
                        isActive={isActive('/settings')}
                    />
                    <NavItem
                        path="/profile"
                        icon={<User size={18} />}
                        label="PROFILE"
                        isActive={isActive('/profile')}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-vault-green animate-terminal-blink"></div>
                    <span className="text-sm text-vault-green-light">CONN. ESTABLISHED</span>
                </div>
            </div>

            <div className="md:hidden flex justify-around mt-4 border-t border-vault-green pt-4">
                <NavItem
                    path="/"
                    icon={<ListTodo size={18} />}
                    label="TASKS"
                    isActive={isActive('/')}
                    mobile
                />
                <NavItem
                    path="/calendar"
                    icon={<CalendarRange size={18} />}
                    label="CALENDAR"
                    isActive={isActive('/calendar')}
                    mobile
                />
                <NavItem
                    path="/settings"
                    icon={<Settings size={18} />}
                    label="SETTINGS"
                    isActive={isActive('/settings')}
                    mobile
                />
                <NavItem
                    path="/profile"
                    icon={<User size={18} />}
                    label="PROFILE"
                    isActive={isActive('/profile')}
                    mobile
                />
            </div>
        </nav>
    );
};

interface NavItemProps {
    path: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    mobile?: boolean;
}

const NavItem = ({ path, icon, label, isActive, mobile = false }: NavItemProps) => {
    return (
        <Link
            to={path}
            className={`flex ${mobile ? 'flex-col' : ''} items-center space-x-1 transition-all duration-200 ${isActive
                    ? 'text-vault-green font-bold'
                    : 'text-vault-green-light hover:text-vault-green'
                }`}
        >
            <div className={`${isActive ? 'animate-pulse' : ''}`}>
                {icon}
            </div>
            <span className={`${mobile ? 'text-xs mt-1' : 'text-sm'}`}>{label}</span>
        </Link>
    );
};

export default Navbar;