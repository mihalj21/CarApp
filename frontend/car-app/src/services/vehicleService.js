import axios from "axios";

const API_URL = 'https://localhost:7256/Vehicle';


  export const getVehicles = async () => {
    return axios.get(`${API_URL}/GetVehicle`);
  };
  
  export const addVehicle = async (vehicle) => {
    return axios.post(`${API_URL}/AddVehicle`, vehicle);
  };
  
  export const deleteVehicle = async (id) => {
    return axios.delete(`${API_URL}/DeleteVehicle/${id}`);
  };

export const VehicleService = {
    getVehicles,
    addVehicle,
    deleteVehicle
}