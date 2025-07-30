import React from 'react';
import { EmployeeCard } from './EmployeeCard';
import { Employee } from './DirectorySection';
import { SearchX } from 'lucide-react';

interface DirectoryContentProps {
  employees: Employee[];
  activeLocation: string | null;
  activeFilter: string;
  searchQuery: string;
}

export const DirectoryContent: React.FC<DirectoryContentProps> = ({ employees, activeLocation, activeFilter, searchQuery }) => {
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' ||
      Object.values(employee).some(val => String(val).toLowerCase().includes(searchLower));
    
    const matchesLocation = !activeLocation || employee.Location === activeLocation;
    
    const matchesFilter = activeFilter === 'All Staff' || employee.role === activeFilter;
    
    return matchesSearch && matchesLocation && matchesFilter;
  });

  if (filteredEmployees.length === 0) {
    return (
        <div className="text-center py-20">
            <SearchX className="mx-auto text-gray-400" size={64} />
            <h3 className="text-xl font-semibold mt-4">No Results Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your search or filter criteria.
            </p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {filteredEmployees.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)}
    </div>
  );
};

export default DirectoryContent;