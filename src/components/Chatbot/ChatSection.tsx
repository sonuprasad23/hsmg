import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeProvider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SendIcon, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

const ChatSection: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome-msg', text: "Hello! I'm Luis, your directory assistant. How can I help you today?", sender: 'assistant' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isThinking) return;
    if (eventSourceRef.current) eventSourceRef.current.close();

    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMessageId, text: '', sender: 'assistant' }]);
    
    setIsThinking(true);
    setInputValue('');

    const question = encodeURIComponent(inputValue);
    const eventSource = new EventSource(`/api/ask-luis?question=${question}`);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        setIsThinking(false);
        eventSource.close();
        return;
      }
      const data = JSON.parse(event.data);
      if (data.chunk) {
        setMessages(prev => prev.map(msg => msg.id === assistantMessageId ? { ...msg, text: msg.text + data.chunk } : msg));
      } else if (data.error) {
        setMessages(prev => prev.map(msg => msg.id === assistantMessageId ? { ...msg, text: data.error } : msg));
        setIsThinking(false);
        eventSource.close();
      }
    };
    eventSource.onerror = () => {
      setMessages(prev => prev.map(msg => msg.id === assistantMessageId ? { ...msg, text: 'Sorry, a connection error occurred.' } : msg));
      setIsThinking(false);
      eventSource.close();
    };
  };

  const markdownComponents = {
    table: ({ node, ...props }: any) => <div className="overflow-x-auto my-2 rounded-lg border border-gray-200 dark:border-gray-700"><table className="w-full text-sm text-left" {...props} /></div>,
    thead: ({ node, ...props }: any) => <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-400 uppercase" {...props} />,
    th: ({ node, ...props }: any) => <th className="px-4 py-3" {...props} />,
    td: ({ node, ...props }: any) => <td className="px-4 py-3" {...props} />,
    tr: ({ node, ...props }: any) => <tr className="border-b dark:border-gray-700 even:bg-gray-50/50 dark:even:bg-gray-800/50" {...props} />,
    code: ({ node, ...props }: any) => <code className="px-2 py-1 mx-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-mono text-sm" {...props} />,
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {messages.map(message => (
            <div key={message.id} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'assistant' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-white"/></div>}
              <div className={`prose dark:prose-invert max-w-none inline-block px-4 py-2 rounded-xl ${message.sender === 'user' ? 'bg-blue-600 text-white prose-p:text-white prose-strong:text-white' : isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {message.text === '' && isThinking ? (
                    <div className="flex items-center justify-center space-x-1 py-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{message.text}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t dark:border-gray-700 flex-shrink-0">
          <div className="flex">
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 p-3 border dark:border-gray-600 dark:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ask Luis a question..." disabled={isThinking}/>
            <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 disabled:bg-blue-400" disabled={isThinking || !inputValue.trim()}><SendIcon size={20}/></button>
          </div>
        </div>
    </div>
  );
};

export default ChatSection;