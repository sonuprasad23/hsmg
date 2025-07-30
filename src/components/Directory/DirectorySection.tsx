import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DirectorySidebar from './DirectorySidebar';
import DirectoryContent from './DirectoryContent';
import { SheetView } from './SheetView';
import { Loader, AlertCircle, SearchIcon, Sheet } from 'lucide-react';

export interface Employee {
  id: string;
  [key: string]: any;
}

const DirectorySection: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rawData, setRawData] = useState<string[][]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All Staff');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetViewOpen, setIsSheetViewOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [processedRes, rawRes] = await Promise.all([
            axios.get('/api/data'),
            axios.get('/api/raw-data')
        ]);
        
        const data: Employee[] = processedRes.data;
        setEmployees(data);
        setRawData(rawRes.data);

        const uniqueLocations = [...new Set(data.map(emp => emp.Location).filter(Boolean))].sort();
        setLocations(uniqueLocations);
        if (uniqueLocations.length > 0 && !activeLocation) {
          setActiveLocation(uniqueLocations[0]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load directory data. Ensure the backend is running.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) return <div className="flex justify-center items-center h-full pt-20"><Loader className="animate-spin text-blue-500" size={48} /></div>;
    if (error) return <div className="text-center py-12 px-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"><AlertCircle className="mx-auto mb-4" size={48} /><h3 className="text-xl font-semibold mb-2">An Error Occurred</h3><p>{error}</p></div>;
    return <DirectoryContent employees={employees} activeLocation={activeLocation} activeFilter={activeFilter} searchQuery={searchQuery} />;
  }

  return (
    <>
      <div className="grid grid-cols-[256px_1fr] gap-6 items-start">
        <DirectorySidebar locations={locations} activeLocation={activeLocation} setActiveLocation={setActiveLocation} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <div className="min-w-0">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1">
              <input type="text" placeholder="Search by name, role, extension..." className="w-full p-3 pl-10 border dark:border-gray-600 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button onClick={() => setIsSheetViewOpen(true)} className="ml-4 p-3 flex items-center gap-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
                <Sheet size={16} /> View as Sheet
            </button>
          </div>
          <div>{renderContent()}</div>
        </div>
      </div>
      {isSheetViewOpen && <SheetView rawData={rawData} isLoading={isLoading} error={error} onClose={() => setIsSheetViewOpen(false)} onSelect={(name) => { setSearchQuery(name); setIsSheetViewOpen(false); }} />}
    </>
  );
};

export default DirectorySection;