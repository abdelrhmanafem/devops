
import { CloudRunService } from './types';

export const MOCK_SERVICES: CloudRunService[] = [
  {
    id: '1',
    name: 'api-gateway-prod',
    region: 'us-central1',
    url: 'https://api-gateway-prod-xyz.a.run.app',
    lastDeployed: '2024-07-29T10:30:00Z',
    status: 'OK',
    cpuUtilization: 35,
    memoryUtilization: 55,
    errorRate: 0.1,
    description: 'Handles all incoming API traffic and routing.'
  },
  {
    id: '2',
    name: 'user-service-staging',
    region: 'us-east1',
    url: 'https://user-service-staging-xyz.a.run.app',
    lastDeployed: '2024-07-28T15:00:00Z',
    status: 'Warning',
    cpuUtilization: 85,
    memoryUtilization: 75,
    errorRate: 2.5,
    description: 'Manages user authentication and profiles for staging environment.'
  },
  {
    id: '3',
    name: 'payment-processor',
    region: 'europe-west1',
    url: 'https://payment-processor-xyz.a.run.app',
    lastDeployed: '2024-07-25T08:45:00Z',
    status: 'Error',
    cpuUtilization: 50,
    memoryUtilization: 92,
    errorRate: 8.7,
    description: 'Processes all payment transactions and subscriptions.'
  },
  {
    id: '4',
    name: 'image-resizer-worker',
    region: 'us-central1',
    url: 'https://image-resizer-worker-xyz.a.run.app',
    lastDeployed: '2024-07-29T11:00:00Z',
    status: 'OK',
    cpuUtilization: 15,
    memoryUtilization: 40,
    errorRate: 0.0,
    description: 'Asynchronous worker for resizing uploaded images.'
  },
];
