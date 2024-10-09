import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { vehicleStore } from '../../stores/vehicleStore'; 
import styles from './filterPage.module.css'; 

const FilterPage = observer(() => {

  const [filters, setFilters] = useState({
    makeId: '',
    name: '',
    abrv: '',
    pageSize: 10,
    pageNumber: 1,
    orderBy: 'name',  
    sortOrder: 'ASC'    
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    await vehicleStore.fetchFilteredVehicles(filters); 
  };

  return (
    <div className={styles.filterPageContainer}>
      <h2>Filter, Sort, and Paginate Vehicles</h2>
      <form className={styles.filterForm} onSubmit={handleFilterSubmit}>
  <div className={styles.formRow}>
    <div className={styles.formGroup}>
      <label htmlFor="makeId">Make ID</label>
      <input
        type="number"
        id="makeId"
        name="makeId"
        value={filters.makeId}
        onChange={handleInputChange}
        placeholder="Enter Make ID"
        className={styles.formInput}
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={filters.name}
        onChange={handleInputChange}
        placeholder="Enter Vehicle Name"
        className={styles.formInput}
      />
    </div>
  </div>

  <div className={styles.formRow}>
    <div className={styles.formGroup}>
      <label htmlFor="abrv">Abbreviation</label>
      <input
        type="text"
        id="abrv"
        name="abrv"
        value={filters.abrv}
        onChange={handleInputChange}
        placeholder="Enter Abbreviation"
        className={styles.formInput}
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="pageSize">Page Size</label>
      <input
        type="number"
        id="pageSize"
        name="pageSize"
        value={filters.pageSize}
        onChange={handleInputChange}
        placeholder="Enter Page Size"
        className={styles.formInput}
      />
    </div>
  </div>

  <div className={styles.formRow}>
    <div className={styles.formGroup}>
      <label htmlFor="pageNumber">Page Number</label>
      <input
        type="number"
        id="pageNumber"
        name="pageNumber"
        value={filters.pageNumber}
        onChange={handleInputChange}
        placeholder="Enter Page Number"
        className={styles.formInput}
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="orderBy">Order By</label>
      <select
        id="orderBy"
        name="orderBy"
        value={filters.orderBy}
        onChange={handleInputChange}
        className={styles.formSelect}
      >
        <option value="name">Name</option>
        <option value="makeId">Make ID</option>
      </select>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="sortOrder">Sort Order</label>
      <select
        id="sortOrder"
        name="sortOrder"
        value={filters.sortOrder}
        onChange={handleInputChange}
        className={styles.formSelect}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  </div>

  <button type="submit" className={styles.filterButton}>
    Apply Filters
  </button>
</form>


      <div className={styles.vehicleList}>
        {vehicleStore.isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {vehicleStore.filteredVehicles.map((vehicle) => (
              <li key={vehicle.id}>
                {vehicle.name} ({vehicle.abrv}) - Make ID: {vehicle.makeId}
              </li>
            ))}
          </ul>
        )}
      </div> 
    </div>
  );
});

export default FilterPage;
