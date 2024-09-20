import React, { useState } from 'react';
import styles from './editPage.module.css'; 
import { vehicleStore } from '../../stores/vehicleStore';
import { observer } from 'mobx-react-lite';

const VehicleUpdateComponent = observer(({ vehicle, onClose }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState({ ...vehicle });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log("Updated vehicle data before sending to store:", updatedVehicle);  
    await vehicleStore.updateVehicle(vehicle.id, updatedVehicle);
    onClose(); 
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <h2>Edit Vehicle</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedVehicle.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Abrv</label>
          <input
            type="text"
            name="abrv"
            value={updatedVehicle.abrv}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Make ID</label>
          <input
            type="number"
            name="makeId"
            value={updatedVehicle.makeId}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleUpdate} className={styles.updateButton}>Update Vehicle</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

export default VehicleUpdateComponent;