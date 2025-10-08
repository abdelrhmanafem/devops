
import React, { useState, useCallback } from 'react';
import { CloudRunService, GeminiAnalysis } from '../types';
import { analyzeServiceHealth } from '../services/geminiService';
import { BotIcon } from './icons';

interface ServiceDetailModalProps {
  service: CloudRunService | null;
  isOpen: boolean;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
    </div>
);

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, isOpen, onClose }) => {
    const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!service) return;
        setIsAnalyzing(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeServiceHealth(service);
            setAnalysis(result);
        } catch (e) {
            console.error("Failed to analyze service:", e);
            setError("Failed to get analysis. Please check your API key and try again.");
        } finally {
            setIsAnalyzing(false);
        }
    }, [service]);
    
    if (!isOpen || !service) {
        return null;
    }
    
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-8 border border-gray-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                style={{ animation: 'fade-in-scale 0.3s forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                         <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                         <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">{service.url}</a>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-200 mb-4">Gemini Health Analysis</h3>
                    <button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing}
                        className="w-full flex justify-center items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed"
                    >
                         <BotIcon className="w-5 h-5" />
                         <span>{isAnalyzing ? 'Analyzing...' : 'Analyze with Gemini'}</span>
                    </button>
                    <div className="mt-4 min-h-[100px]">
                        {isAnalyzing && <LoadingSpinner />}
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        {analysis && (
                             <div className="space-y-4 text-gray-300">
                                 <div>
                                     <h4 className="font-semibold text-gray-100">Summary:</h4>
                                     <p className="text-sm">{analysis.summary}</p>
                                 </div>
                                 <div>
                                     <h4 className="font-semibold text-gray-100">Recommendations:</h4>
                                     <ul className="list-disc list-inside space-y-1 text-sm">
                                         {analysis.recommendations.map((rec, index) => (
                                             <li key={index}>{rec}</li>
                                         ))}
                                     </ul>
                                 </div>
                             </div>
                        )}
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
