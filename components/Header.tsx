
import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BotIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white tracking-wider">
            GCP DevOps Assistant
          </h1>
        </div>
      </div>
    </header>
  );
};
