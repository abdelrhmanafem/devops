
import React, { useState } from 'react';
import { generateGcloudCommand } from '../services/geminiService';
import { TerminalIcon } from './icons';

export const GcloudHelper: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [command, setCommand] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        
        setIsLoading(true);
        setError(null);
        setCommand('');

        try {
            const result = await generateGcloudCommand(prompt);
            setCommand(result);
        } catch (e) {
            console.error("Failed to generate command:", e);
            setError("Failed to generate command. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if(command) {
            navigator.clipboard.writeText(command);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
                <TerminalIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">gcloud Command Helper</h2>
            </div>
            <p className="text-gray-400 mb-4 text-sm">Describe what you want to do, and Gemini will generate the gcloud command.</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., update my-service to use 2 CPUs and 4Gi of memory"
                        className="flex-grow bg-gray-900 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            {command && (
                <div className="mt-4 bg-black rounded-md p-4 font-mono text-sm text-green-300 relative">
                    <code>{command}</code>
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1 bg-gray-700 rounded-md"
                        title="Copy to clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                </div>
            )}
        </div>
    );
};
