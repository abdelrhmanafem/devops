
import { MOCK_SERVICES } from '../constants';
import { CloudRunService } from '../types';

export const fetchCloudRunServices = async (): Promise<CloudRunService[]> => {
  console.log('Fetching Cloud Run services...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Fetched services:', MOCK_SERVICES);
  return MOCK_SERVICES;
};
