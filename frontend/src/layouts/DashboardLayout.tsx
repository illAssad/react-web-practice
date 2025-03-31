import { JSX, useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice.ts';
import { RootState } from "../store/types.ts";

interface DashboardButtonProps {
    label: string;
    to: string;
}

function DashboardButton({ label, to }: DashboardButtonProps) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(to)}
            className="w-full p-2 text-left rounded hover:bg-gray-700 transition"
        >
            {label}
        </button>
    );
}

export default function Layout(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Fixed on mobile, static on desktop */}
            <div
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <button
                    className="absolute top-4 right-4 lg:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold">Sidebar</h2>
                <ul className="mt-4 space-y-2">
                    <DashboardButton label="Dashboard" to="/" />
                    <DashboardButton label="Clients" to="/clients" />
                    <DashboardButton label="Settings" to="/settings" />
                    <li className="mt-auto">
                        <button
                            onClick={handleLogout}
                            className="w-full p-2 text-left rounded hover:bg-gray-700 transition flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
                {/* Mobile Menu Button */}
                <div className="p-4 bg-white shadow lg:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>

                <main className="flex-1 flex flex-col">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}