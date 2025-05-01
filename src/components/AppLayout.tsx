import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout: React.FC = () => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <Navbar />
                <Outlet />
            </div>

            <footer className="mt-12 py-4 border-t border-vault-green/30">
                <div className="container mx-auto px-4 text-center text-vault-green-light text-sm">
                    <p>VAULT-TEC PLANNER &copy; 2077 - All Rights Reserved</p>
                    <p className="mt-1">Vault-Tec: Revolutionizing safety for an uncertain future!</p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;