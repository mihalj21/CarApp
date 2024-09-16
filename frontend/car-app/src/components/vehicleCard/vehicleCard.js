import React from 'react';
import styles from './vehicleCard.module.css'; 

const VehicleCard = ({ vehicle }) => {
  return (
    <div className={styles.vehicleCard}>
      <h3>{vehicle.name}</h3>
      <p><strong>Make:</strong> {vehicle.make}</p>
      <p><strong>Abrv:</strong> {vehicle.abrv}</p>
    </div>
  );
};

export default VehicleCard;