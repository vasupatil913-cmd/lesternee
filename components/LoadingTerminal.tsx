import React, { useEffect, useState } from 'react';

export const LoadingTerminal: React.FC<{ message?: string }> = ({ message = "Establishing secure connection..." }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="font-mono text-emerald-500 text-lg mb-2">
        {'>'} {message}{dots}
      </div>
      <div className="w-64 h-1 bg-slate-800 rounded overflow-hidden">
        <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
