import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import VehicleCard from '../../components/vehicleCard/vehicleCard';
import { vehicleStore } from '../../stores/vehicleStore';

const HomePage = observer(() => {
  useEffect(() => {
    
    vehicleStore.fetchVehicles();
  }, []);

  if (vehicleStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (vehicleStore.error) {
    return <div>{vehicleStore.error}</div>;
  }

  return (
    <div className="vehicle-list">
      <h2>Vehicle List</h2>
      <div>
        {vehicleStore.vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
});

export default HomePage;