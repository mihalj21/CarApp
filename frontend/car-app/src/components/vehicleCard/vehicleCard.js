import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './vehicleCard.module.css'; 
import VehicleMakeLogo from '../../utils/VehicleMakeLogo/VehicleMakeLogo';
import { vehicleStore } from '../../stores/vehicleStore';

const VehicleCard = observer(({ vehicle, onEdit }) => {
  const handleDelete = () => {
    vehicleStore.deleteVehicle(vehicle.id);
  };

  const handleEdit = () => {
    onEdit(vehicle);
  };

  return (
    <div className={styles.vehicleCard}>
      <div className={styles.deleteDiv}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          <i className="fas fa-edit"></i>
        </button>
      </div>

      <div className={styles.informationDiv}>
        <div className={styles.logo}>
          <VehicleMakeLogo makeId={vehicle.makeId || 'defaultLogo'} />
        </div>

        <div className={styles.carInfo}>
          <h3>{vehicle.name || 'No Name'}</h3>
          <p><strong>Make:</strong> {vehicle.makeId || 'Unknown'}</p>
          <p><strong>Abrv:</strong> {vehicle.abrv || 'Unknown'}</p>
        </div>
      </div>
    </div>
  );
});

export default VehicleCard;
