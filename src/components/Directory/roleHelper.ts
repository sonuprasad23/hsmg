import { Employee } from './DirectorySection';
import { User, Shield, UserCog, UserSquare2, Bot, Users } from 'lucide-react';

export const getRoleInfo = (employee: Employee) => {
    switch (employee.role) {
        case 'Team Lead / Manager':
            return {
                primaryName: employee['Team Leads/Manager'],
                role: 'Team Lead / Manager',
                theme: { color: 'border-purple-500', Icon: Shield }
            };
        case 'Provider':
            return {
                primaryName: employee.Provider,
                role: 'Provider',
                theme: { color: 'border-blue-500', Icon: User }
            };
        case 'Medical Assistant':
            return {
                primaryName: employee.MA,
                role: 'Medical Assistant',
                theme: { color: 'border-green-500', Icon: UserCog }
            };
        case 'Virtual Assistant':
            return {
                primaryName: employee.VA,
                role: 'Virtual Assistant',
                theme: { color: 'border-indigo-500', Icon: UserSquare2 }
            };
        case 'Other Staff':
             return {
                primaryName: employee.OtherStaffName,
                role: 'Other Staff',
                theme: { color: 'border-orange-500', Icon: Users }
            };
        default:
            return {
                primaryName: 'Unknown Staff',
                role: 'Staff',
                theme: { color: 'border-gray-400', Icon: User }
            };
    }
};