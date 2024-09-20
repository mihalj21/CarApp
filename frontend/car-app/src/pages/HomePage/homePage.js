import React, { useEffect,useState } from 'react';
import { observer } from 'mobx-react-lite';
import VehicleCard from '../../components/vehicleCard/vehicleCard';
import { vehicleStore } from '../../stores/vehicleStore';
import styles from '../HomePage/homePage.module.css';
import VehicleUpdateComponent from '../EditPage/editPage';
const HomePage = observer(() => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    
    vehicleStore.fetchVehicles();
  }, []);

  if (vehicleStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (vehicleStore.error) {
    return <div>{vehicleStore.error}</div>;
  }
  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle); 
  };

  const closeModal = () => {
    setSelectedVehicle(null); 
    console.log("Vehicles after update:", vehicleStore.vehicles);

  };

  return (
    <div className="vehicle-list">
      <h2>Vehicle List</h2>
      <div className={styles.container}>
      {vehicleStore.vehicles.map((vehicle, index) => (
  <VehicleCard key={`${vehicle.id}-${index}`} vehicle={vehicle} onEdit={handleEditVehicle} />
))}
      </div>
      {selectedVehicle && (
        <VehicleUpdateComponent vehicle={selectedVehicle} onClose={closeModal} />
      )}
    </div>
  );
});

export default HomePage;