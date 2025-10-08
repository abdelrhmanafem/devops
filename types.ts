
export interface CloudRunService {
  id: string;
  name: string;
  region: string;
  url: string;
  lastDeployed: string;
  status: 'OK' | 'Warning' | 'Error';
  cpuUtilization: number;
  memoryUtilization: number;
  errorRate: number;
  description: string;
}

export interface GeminiAnalysis {
    summary: string;
    recommendations: string[];
}
