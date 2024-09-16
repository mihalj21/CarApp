import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleService } from "../services/vehicleService";



class VehicleStore{

  vehicles = [];
  isLoading = false;
  error = "";

  constructor(){

   makeObservable(this, {
    vehicles: observable,
    isLoading: observable,
    error: observable,
    fetchVehicles: action,
    addVehicle: action,
    deleteVehicle: action,
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
}

export const vehicleStore = new VehicleStore();