import React from 'react';
import { MapPinIcon, Users, StarIcon, GlobeIcon, UserCog, UserSquare2, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';

const filters = ['All Staff', 'Provider', 'Team Lead / Manager', 'Medical Assistant', 'Virtual Assistant', 'Other Staff'];

const roleIcons: { [key: string]: JSX.Element } = {
    'Provider': <StarIcon size={16} className="mr-2" />,
    'Team Lead / Manager': <Shield size={16} className="mr-2" />,
    'Medical Assistant': <UserCog size={16} className="mr-2" />,
    'Virtual Assistant': <UserSquare2 size={16} className="mr-2" />,
    'Other Staff': <Users size={16} className="mr-2" />,
    'All Staff': <Users size={16} className="mr-2" />,
};

interface DirectorySidebarProps {
  locations: string[];
  activeLocation: string | null;
  setActiveLocation: (location: string | null) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const DirectorySidebar: React.FC<DirectorySidebarProps> = ({ locations, activeLocation, setActiveLocation, activeFilter, setActiveFilter }) => {
  return (
    <div className="w-64 border-r dark:border-gray-700 flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hidden lg:flex">
      <div className="flex flex-col min-h-0">
        <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider flex-shrink-0">Locations</h2>
        <div className="overflow-y-auto custom-scrollbar -mr-2 mb-4 max-h-[18rem]">
          <ul className="space-y-1 pr-2">
            <li><button onClick={() => setActiveLocation(null)} className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${!activeLocation ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><GlobeIcon size={16} className="mr-2 flex-shrink-0" />All Locations</button></li>
            {locations.map(location => <li key={location}><button onClick={() => setActiveLocation(location)} className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${activeLocation === location ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><MapPinIcon size={16} className="mr-2 flex-shrink-0" /><span className="truncate">{location}</span></button></li>)}
          </ul>
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">Filter By Role</h2>
          <ul className="space-y-1">
            {filters.map(filter => <li key={filter}><button onClick={() => setActiveFilter(filter)} className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${activeFilter === filter ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{roleIcons[filter]}{filter}</button></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DirectorySidebar;