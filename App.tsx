
import React, { useState, useEffect, useCallback } from 'react';
import { CloudRunService } from './types';
import { fetchCloudRunServices } from './services/gcpService';
import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { GcloudHelper } from './components/GcloudHelper';

const App: React.FC = () => {
  const [services, setServices] = useState<CloudRunService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<CloudRunService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCloudRunServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleSelectService = useCallback((service: CloudRunService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Add a delay to allow the modal to animate out before clearing the service
    setTimeout(() => {
        setSelectedService(null);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto p-4 sm:p-8">
        <div className="mb-8">
            <GcloudHelper />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-6">Cloud Run Services</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse h-64">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
                    <div className="h-10 bg-gray-700 rounded w-full"></div>
                </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={handleSelectService} />
            ))}
          </div>
        )}
      </main>
      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
