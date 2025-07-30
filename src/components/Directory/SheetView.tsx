import React from 'react';
import { XIcon, Loader, AlertCircle, Sheet } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider'; // CORRECTED PATH

interface SheetViewProps {
  rawData: string[][];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSelect: (name: string) => void;
}

// This new, dedicated component creates the styled "pills".
const RolePill: React.FC<{ name: string; role: string; onSelect: (name: string) => void; }> = ({ name, role, onSelect }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    let styleClasses = '';

    const baseStyle = 'px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer';

    switch (role) {
        case 'Provider':
            styleClasses = `bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/80 focus:ring-blue-500`;
            break;
        case 'Team Lead / Manager':
             styleClasses = name.toLowerCase().includes('virtual')
                ? `bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700 hover:bg-cyan-200 dark:hover:bg-cyan-900/80 focus:ring-cyan-500`
                : `bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-900/80 focus:ring-purple-500`;
            break;
        case 'MA':
            styleClasses = `bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/80 focus:ring-green-500`;
            break;
        case 'VA':
            styleClasses = `bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700 hover:bg-indigo-200 dark:hover:bg-indigo-900/80 focus:ring-indigo-500`;
            break;
        case 'Other Staff':
            styleClasses = `bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700 hover:bg-orange-200 dark:hover:bg-orange-900/80 focus:ring-orange-500`;
            break;
        default:
            styleClasses = `bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500`;
    }
    
    const displayName = role === 'Other Staff' ? name.split('-')[0].trim() : name;

    return (
        <button onClick={() => onSelect(displayName)} className={`${baseStyle} ${styleClasses}`}>
            {displayName}
        </button>
    );
};


export const SheetView: React.FC<SheetViewProps> = ({ rawData, isLoading, error, onClose, onSelect }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const headers = rawData.length > 0 ? rawData[0] : [];
    const dataRows = rawData.length > 1 ? rawData.slice(1) : [];

    const renderCellContent = (cell: string, columnIndex: number) => {
        if (!cell || cell.trim() === '-') {
            return <span className="text-gray-400 dark:text-gray-600">-</span>;
        }

        switch (columnIndex) {
            case 1: return <RolePill name={cell} role="Provider" onSelect={onSelect} />;
            case 2: return <RolePill name={cell} role="MA" onSelect={onSelect} />;
            case 4: return <RolePill name={cell} role="Team Lead / Manager" onSelect={onSelect} />;
            case 5: return /^[a-zA-Z]+-\s*\d+$/.test(cell) ? <RolePill name={cell} role="Other Staff" onSelect={onSelect} /> : <span>{cell}</span>;
            case 6: return <RolePill name={cell} role="VA" onSelect={onSelect} />;
            default: return <span>{cell}</span>;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 flex flex-col backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
            <header className={`flex-shrink-0 p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center bg-white dark:bg-gray-800`}>
                <h2 className="text-lg font-bold flex items-center gap-2"><Sheet size={20} className="text-blue-500"/> Directory Sheet View</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <XIcon size={24} />
                </button>
            </header>

            <div className="flex-1 overflow-auto custom-scrollbar">
                {isLoading && <div className="flex justify-center items-center h-full"><Loader className="animate-spin text-blue-500" size={48} /></div>}
                {error && <div className="text-center p-12 text-red-500"><AlertCircle className="mx-auto mb-4" size={48} /><h3 className="text-xl font-semibold">Failed to load data</h3><p>{error}</p></div>}
                
                {!isLoading && !error && rawData.length > 0 && (
                    <div className="p-4 sm:p-6 lg:p-8">
                        <table className="w-full min-w-[1400px] border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    {headers.map(h => (
                                        <th key={h} className={`p-3 text-sm font-semibold uppercase tracking-wider text-left sticky top-0 z-10 ${isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100'}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataRows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/70'}`}>
                                        {Array.from({ length: 8 }).map((_, cellIndex) => {
                                            const cell = row[cellIndex] || '';
                                            return (
                                                <td key={cellIndex} className={`p-3 text-sm truncate border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                    {renderCellContent(cell, cellIndex)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};