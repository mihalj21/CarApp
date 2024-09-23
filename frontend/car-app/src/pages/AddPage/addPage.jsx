import styles from './addPage.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleStore } from '../../stores/vehicleStore';

export const AddVehiclePage = () => {

  const [vehicleData,setVehicleData] = useState({

    name: '',
    abrv: '',
    makeId: 0,
  })  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleStore.addVehicle(vehicleData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.addVehicleContainer}>
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={vehicleData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Abrv</label>
          <input 
            type="text" 
            name="abrv" 
            value={vehicleData.abrv} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Make ID</label>
          <input 
            type="number" 
            name="makeId" 
            value={vehicleData.makeId} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className={styles.buttonDiv}>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.addButton}>Add Vehicle</button>
        </div>
        <div className={styles.buttonContainer}>
         <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
        </div>
      </form>
    </div>
  );
};