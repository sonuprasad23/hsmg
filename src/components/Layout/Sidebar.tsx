import React from 'react';
import { FolderIcon, MessageSquareIcon, CalendarIcon, HelpCircleIcon, XIcon } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onCloseSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, onCloseSidebar }) => {
  const navItems = [
    { id: 'directory', label: 'Directory', icon: <FolderIcon className="h-5 w-5" /> },
    { id: 'luisChatbot', label: 'Luis Chatbot', icon: <MessageSquareIcon className="h-5 w-5" /> },
    { id: 'maAssignment', label: 'MA Assignment', icon: <CalendarIcon className="h-5 w-5" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircleIcon className="h-5 w-5" /> }
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-md">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold">Hillside</h2>
        <button className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={onCloseSidebar}>
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${activeSection === item.id ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => {
                  setActiveSection(item.id);
                  onCloseSidebar();
                }}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">U</div>
            <div className="ml-3">
                <p className="font-medium">User Name</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clinic Staff</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;