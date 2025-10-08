import React from 'react';
import { BotIcon, TerminalIcon, CheckCircleIcon } from './icons';

export const Instructions: React.FC = () => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-white">View Service Status</h3>
                        <p className="text-sm">Get an at-a-glance overview of your Cloud Run services, including key metrics like CPU, memory, and error rates.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <BotIcon className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-white">AI-Powered Analysis</h3>
                        <p className="text-sm">Select any service and use Gemini to perform a health analysis, providing a summary and actionable recommendations.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <TerminalIcon className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-white">Generate gcloud Commands</h3>
                        <p className="text-sm">Use the helper to translate natural language into precise `gcloud` commands, simplifying your workflow.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};