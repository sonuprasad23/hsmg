import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const faqItems = [{
    question: 'How do I request time off?',
    answer: 'To request time off, please use the TimeOff system at least 2 weeks in advance. Login to the employee portal, navigate to "Time Off Requests" and follow the instructions. All requests must be approved by your supervisor.'
  }, {
    question: 'What is the protocol for handling patient complaints?',
    answer: 'All patient complaints should be documented and reported to the clinic manager immediately. Use the incident report form available in the EHR system. Be sure to collect all relevant details including date, time, and nature of the complaint.'
  }, {
    question: 'How do I access the electronic health records system remotely?',
    answer: 'Remote access to the EHR system requires secure VPN connection. Install the clinic VPN client on your device, connect using your credentials, then access the EHR through the secure portal. All remote access is logged and monitored.'
  }, {
    question: 'What is the procedure for ordering medical supplies?',
    answer: 'Medical supplies should be ordered through the inventory management system. Check current stock levels, create a requisition form, and submit for approval. Emergency orders must be approved by the clinic director.'
  }, {
    question: 'How do I schedule a room for a procedure?',
    answer: 'Rooms can be scheduled through the clinic calendar system. Login to the scheduling portal, select the appropriate room type, date and time, and enter the procedure details. Certain specialized rooms require additional approval.'
  }, {
    question: 'What are the lunch break policies?',
    answer: 'Staff are entitled to a 30-minute lunch break for shifts over 5 hours. Lunch breaks should be coordinated with your team to ensure adequate coverage. Use the time clock system to record your break times accurately.'
  }, {
    question: 'How do I report an equipment malfunction?',
    answer: 'Equipment malfunctions should be reported immediately using the maintenance request system. Tag the equipment as out of order, document the issue in detail, and submit the maintenance ticket. For critical equipment, also notify the department head.'
  }, {
    question: 'What is the process for referring patients to specialists?',
    answer: 'Patient referrals require completing the referral form in the EHR system. Include all relevant clinical information, reason for referral, and urgency level. The referral coordinator will process the request and contact the patient with appointment details.'
  }];
  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };
  const filteredFAQs = faqItems.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <input type="text" placeholder="Search FAQs..." className="w-full p-3 pl-10 border dark:border-gray-600 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? filteredFAQs.map((item, index) => <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                <button className="w-full text-left p-4 flex justify-between items-center focus:outline-none" onClick={() => toggleItem(index)}>
                  <span className="font-medium">{item.question}</span>
                  {openItems.includes(index) ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                </button>
                {openItems.includes(index) && <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 text-sm">
                    {item.answer}
                  </div>}
              </div>) : <div className="text-center py-10 text-gray-500">
              No FAQs found matching your search.
            </div>}
        </div>
      </div>
    </div>;
};
export default FAQSection;