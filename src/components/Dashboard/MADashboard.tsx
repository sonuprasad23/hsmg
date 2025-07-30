import React, { useState } from 'react';
import { RefreshCwIcon, CalendarIcon, FilterIcon } from 'lucide-react';
const MADashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('assignment');
  const simulateDataFetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">MA Assignment Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Staff schedules and assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center" onClick={simulateDataFetch}>
            <RefreshCwIcon className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="border-b dark:border-gray-700">
          <nav className="flex">
            <button className={`px-4 py-3 font-medium text-sm focus:outline-none ${activeTab === 'assignment' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('assignment')}>
              Provider Assignment
            </button>
            <button className={`px-4 py-3 font-medium text-sm focus:outline-none ${activeTab === 'lunch' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('lunch')}>
              Lunch Schedule
            </button>
            <button className={`px-4 py-3 font-medium text-sm focus:outline-none ${activeTab === 'announcements' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('announcements')}>
              Announcements
            </button>
          </nav>
        </div>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium">Week of July 29, 2024</span>
            </div>
            <div className="flex items-center">
              <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4">
                <FilterIcon className="h-4 w-4 mr-1" />
                Filter
              </button>
              <select className="text-sm border dark:border-gray-600 dark:bg-gray-700 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Providers</option>
                <option>Doctors Only</option>
                <option>Nurses Only</option>
                <option>Medical Assistants</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            {activeTab === 'assignment' && <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Monday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tuesday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Wednesday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Thursday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Friday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[{
                provider: 'Dr. Mark Bentley DO',
                assignments: ['Andrea', 'Jasmine', 'OOO', 'Andrea', 'Jasmine', 'Andrea', 'Myla', 'Andrea', 'Myla', 'OOO'],
                notes: ''
              }, {
                provider: 'Roy Anderson',
                assignments: ['Jose', 'Alexis', 'Nadin', 'Alexis', 'Jose', 'Jose', 'Myla'],
                notes: ''
              }, {
                provider: 'Fatima Elmaanaoui',
                assignments: ['Andrea', 'Jose', 'Eashaan', 'Eashaan', 'Andrea'],
                notes: "Fatima's Last Appt is at 1:15 PM everyday"
              }, {
                provider: 'Mary Baker',
                assignments: ['Molly', 'Molly', 'Molly', 'OOO', 'OOO', 'OOO'],
                notes: ''
              }, {
                provider: 'Emily Sun',
                assignments: ['Marnie', 'Marnie', 'Marnie', 'Marnie', 'Molly', 'Marnie'],
                notes: ''
              }, {
                provider: 'Emily Gonzales',
                assignments: ['Mariana', 'Myla', 'Myla', 'OOO', 'OOO', 'OOO'],
                notes: ''
              }, {
                provider: 'Khushboo Surtani',
                assignments: ['Esther', 'Devang', 'Devang', 'Devang', 'Devang', 'Devang'],
                notes: ''
              }, {
                provider: 'Christen Richardson',
                assignments: ['OOO', 'OOO', 'OOO', 'OOO', 'OOO'],
                notes: ''
              }].map((row, index) => <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium bg-gray-50 dark:bg-gray-700">
                        {row.provider}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[0] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[0] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[0])}`}>
                            {row.assignments[0]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[1] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[1] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[1])}`}>
                            {row.assignments[1]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[2] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[2] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[2])}`}>
                            {row.assignments[2]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[3] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[3] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[3])}`}>
                            {row.assignments[3]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[4] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[4] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[4])}`}>
                            {row.assignments[4]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.notes}
                      </td>
                    </tr>)}
                </tbody>
              </table>}
            {activeTab === 'lunch' && <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Monday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tuesday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Wednesday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Thursday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Friday
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[{
                time: '11-12 Lunch',
                assignments: ['Alexis', 'Jose', '', '', '', ''],
                notes: 'Please go to Lunch on time'
              }, {
                time: '11:30-12:30 Lunch',
                assignments: ['Jasmine', 'Molly', 'Myla', '', '', ''],
                notes: 'Please complete End of Day tasklist before clocking out'
              }, {
                time: '12-1 Lunch',
                assignments: ['Marnie', 'Devang', 'Eashaan', '', '', ''],
                notes: 'Stress testing: August 7, 12, 13, 14, 19, 20, 21, 26, 27, 28'
              }].map((row, index) => <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium bg-gray-50 dark:bg-gray-700">
                        {row.time}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[0] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[0] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[0])}`}>
                            {row.assignments[0]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[1] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[1] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[1])}`}>
                            {row.assignments[1]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[2] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[2] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[2])}`}>
                            {row.assignments[2]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[3] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[3] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[3])}`}>
                            {row.assignments[3]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.assignments[4] && <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${row.assignments[4] === 'OOO' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' : getMAColor(row.assignments[4])}`}>
                            {row.assignments[4]}
                          </span>}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {row.notes}
                      </td>
                    </tr>)}
                </tbody>
              </table>}
            {activeTab === 'announcements' && <div className="space-y-4 p-2">
                <div className="p-4 border dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                    Important Reminder
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Please keep the nurse station clean! Clean up after
                    yourselves.
                  </p>
                </div>
                <div className="p-4 border dark:border-gray-700 rounded-lg">
                  <h3 className="font-bold mb-2">End of Day Procedures</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Please complete the following tasks before clocking out:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Clean and restock all exam rooms</li>
                    <li>Check supply levels and report any shortages</li>
                    <li>Ensure all patient charts are updated</li>
                    <li>Sanitize all work surfaces</li>
                    <li>Turn off equipment as appropriate</li>
                  </ul>
                </div>
                <div className="p-4 border dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2">
                    Upcoming Training
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    New EHR system training will be held on August 15th at 2:00
                    PM. Attendance is mandatory for all clinical staff.
                  </p>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
// Helper function to assign colors to different MAs
function getMAColor(name) {
  const colorMap = {
    Andrea: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Jasmine: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Jose: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Myla: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Alexis: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    Nadin: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
    Eashaan: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Molly: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    Marnie: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Mariana: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
    Esther: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
    Devang: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
    Mahmoud: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    Ayesha: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Austyn: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200'
  };
  return colorMap[name] || 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
}
export default MADashboard;