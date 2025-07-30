import React from 'react';
import { Phone, Building } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider'; // Corrected Path
import { Employee } from './DirectorySection';
import { getRoleInfo } from './roleHelper';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { primaryName, role, theme: roleTheme } = getRoleInfo(employee);

  return (
    <div className={`rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 ${roleTheme.color} flex flex-col`}>
      <div className="p-4 flex-grow">
        <div className="flex items-start gap-3">
          <roleTheme.Icon size={20} className={`mt-1 flex-shrink-0 ${roleTheme.color.replace('border-', 'text-')}`} />
          <div>
            <h3 className="font-bold text-lg leading-tight">{primaryName}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{role}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {employee.Extension && (
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-gray-500 shrink-0" />
              <span className="font-semibold mr-1">Ext:</span>
              <span className="truncate">{employee.Extension}</span>
            </div>
          )}
           {employee.OfficeExtension && employee.OfficeExtension !== 'N/A' && (
            <div className="flex items-center">
              <Building size={14} className="mr-2 text-gray-500 shrink-0" />
              <span className="font-semibold mr-1">Office:</span>
              <span className="truncate">{employee.OfficeExtension}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};