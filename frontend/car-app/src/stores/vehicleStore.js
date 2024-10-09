import { makeObservable, observable, action, runInAction, } from "mobx";
import { VehicleService} from "../services/vehicleService";


class VehicleStore{

  vehicles = [];
  filteredVehicles = [];
  isLoading = false;
  error = "";
  filterError = "";

  constructor(){

   makeObservable(this, {
    vehicles: observable,
    filteredVehicles: observable,
    isLoading: observable,
    error: observable,
    filterError:observable,
    fetchVehicles: action,
    addVehicle: action,
    deleteVehicle: action,
    updateVehicle:action,
    fetchFilteredVehicles: action
   });
  }

  async fetchVehicles() {
    this.isLoading = true;
    try {
        const response = await VehicleService.getVehicles();
        console.log("API response:", response);
        console.log(response);  
        runInAction(() => {
            this.vehicles = response.data;
            this.isLoading = false;
        });
    } catch (error) {
        console.error('Fetch error:', error);  
        runInAction(() => {
            this.error = "Failed to fetch";
            this.isLoading = false;
        });
    }
}

  async addVehicle(vehicle) {
    try {
        const response = await VehicleService.addVehicle(vehicle);
        runInAction(() => {
            this.vehicles.push(response.data);
        });
    } catch (error) {
        runInAction(() => {
            this.error = "Failed to add vehicle.";
        });
    }
}

async deleteVehicle(id) {
    try {
        await VehicleService.deleteVehicle(id);
        runInAction(() => {
            this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        });
    } catch (error) {
        runInAction(() => {
            this.error = "Failed to delete vehicle.";
        });
    }
}

async updateVehicle(id, updatedVehicle) {
  try {
    const response = await VehicleService.updateVehicle(id, updatedVehicle);
    if (response.data) {
      runInAction(() => {
        this.vehicles = this.vehicles.map(vehicle =>
          vehicle.id === id ? response.data : vehicle
        );
      });
    } else {
      await this.fetchVehicles();
    }
  } catch (error) {
    runInAction(() => {
      this.error = "Failed to update vehicle.";
    });
  }
}

async fetchFilteredVehicles(filters){
  this.isLoading = true;
  try{
    const response = await VehicleService.getFilteredVehicles(filters);
    console.log("matko",response);

    runInAction (() => {
      this.filteredVehicles = response.data;
      this.isLoading = false;

    });
  } catch{
    runInAction(() => {
      this.filterError = "Faile to fetch filtered vehicles";
      this.isLoading = false;
    });
  }
}

}






export const vehicleStore = new VehicleStore();