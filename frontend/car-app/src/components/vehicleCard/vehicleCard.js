import React from 'react';
import styles from './vehicleCard.module.css'; 
import { vehicleStore } from '../../stores/vehicleStore';
import VehicleMakeLogo from '../../utils/VehicleMakeLogo/VehicleMakeLogo';


const VehicleCard = ({ vehicle }) => {

  const handleDelete = () =>{
    vehicleStore.deleteVehicle(vehicle.id);
  };

  return (
    <div className={styles.vehicleCard}>

      <div className={styles.deleteDiv}>
       <button  className={styles.deleteButton} onClick={handleDelete}>
        <i class="fas fa-trash-alt"></i>
        </button>
      </div>

      <div className={styles.informationDiv}>

      <div className={styles.logo}> 
        <VehicleMakeLogo makeId={vehicle.makeId}></VehicleMakeLogo>
      </div>

      <div className={styles.carInfo}>
        <h3>{vehicle.name}</h3>
        <p><strong>Make:</strong> {vehicle.makeId}</p>
        <p><strong>Abrv:</strong> {vehicle.abrv}</p>
      </div>

      </div>
    </div>
  );
};

export default VehicleCard;