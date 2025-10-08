
import React from 'react';
import { CloudRunService } from '../types';
import { CpuIcon, MemoryIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from './icons';

interface ServiceCardProps {
  service: CloudRunService;
  onSelect: (service: CloudRunService) => void;
}

const statusStyles = {
  OK: {
    icon: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
    borderColor: 'border-green-500/50',
    textColor: 'text-green-400',
  },
  Warning: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />,
    borderColor: 'border-yellow-500/50',
    textColor: 'text-yellow-400',
  },
  Error: {
    icon: <XCircleIcon className="w-5 h-5 text-red-400" />,
    borderColor: 'border-red-500/50',
    textColor: 'text-red-400',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const { icon, borderColor, textColor } = statusStyles[service.status];

  return (
    <div className={`bg-gray-800 rounded-lg border ${borderColor} p-6 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/60`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-white">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.region}</p>
        </div>
        <div className={`flex items-center space-x-2 text-sm font-semibold ${textColor}`}>
          {icon}
          <span>{service.status}</span>
        </div>
      </div>
      
      <p className="text-gray-300 mt-4 text-sm">{service.description}</p>
      
      <div className="mt-6 flex justify-between items-center text-gray-300">
        <div className="flex items-center space-x-2" title="CPU Utilization">
          <CpuIcon className="w-5 h-5" />
          <span className="text-sm">{service.cpuUtilization}%</span>
        </div>
        <div className="flex items-center space-x-2" title="Memory Utilization">
          <MemoryIcon className="w-5 h-5" />
          <span className="text-sm">{service.memoryUtilization}%</span>
        </div>
        <div className="flex items-center space-x-2" title="Error Rate">
          <AlertTriangleIcon className="w-5 h-5" />
          <span className="text-sm">{service.errorRate}%</span>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
         <button
            onClick={() => onSelect(service)}
            className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-200"
          >
            View Details & Analyze
          </button>
      </div>
    </div>
  );
};
