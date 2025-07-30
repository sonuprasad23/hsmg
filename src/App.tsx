import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import DirectorySection from './components/Directory/DirectorySection';
import ChatSection from './components/Chatbot/ChatSection';
import MADashboard from './components/Dashboard/MADashboard';
import FAQSection from './components/FAQ/FAQSection';
import ThemeProvider from './context/ThemeProvider';
import ThemeToggle from './components/Layout/ThemeToggle';
import { PanelLeftClose, PanelLeftOpen, MenuIcon } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('directory');
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'directory':
        return <DirectorySection />;
      case 'luisChatbot':
        return <ChatSection />;
      case 'maAssignment':
        return <MADashboard />;
      case 'faq':
        return <FAQSection />;
      default:
        return <DirectorySection />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <button className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md" onClick={() => setIsMobileSidebarOpen(true)}>
          <MenuIcon className="h-6 w-6" />
        </button>
        
        <div className={`${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 fixed lg:static inset-y-0 left-0 z-40 ${isNavSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onCloseSidebar={() => setIsMobileSidebarOpen(false)}
            />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsNavSidebarOpen(!isNavSidebarOpen)} className="hidden lg:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isNavSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
              </button>
              <h1 className="text-xl font-bold">Hillside Dashboard</h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}