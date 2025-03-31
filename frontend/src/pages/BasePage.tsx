import { ReactNode } from "react";

interface PageProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

/**
 * Page component that acts as a container for page content
 * Properly fills available space and provides consistent padding
 */
const Page = ({ children, title, className = "" }: PageProps) => {
    return (
        <div className={`flex flex-col flex-1 w-full h-full ${className}`}>
            {title && (
                <header className="px-6 pt-6">
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                </header>
            )}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow p-6 h-full text-black">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Page;
