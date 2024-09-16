import React from 'react';
import styles from './VehicleMakeLogo.module.css';

 const  VehicleMakeLogo = ({makeId}) => {

    const getLogo = (makeId) => {

        switch(makeId) {

            case 1:
                return '/logos/bmw.png';
            case 2:
              return '/logos/FORD.jpg'; 
            case 3:
              return '/logos/volkswagen.png';
            default:
              return '/logos/default.png';

        }
    };
    return (
      <img
      src={getLogo(makeId)}
      alt={`Make logo ${makeId}`}
      className={styles.vehicleLogo}
    />
    )

  }
  export default VehicleMakeLogo;
