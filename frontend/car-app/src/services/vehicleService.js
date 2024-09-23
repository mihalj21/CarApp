import axios from "axios";

const API_URL = 'https://localhost:7256/Vehicle';


  export const getVehicles = async () => {
    return axios.get(`${API_URL}/GetVehicle`);
  };
  
  export const addVehicle = async (vehicle) => {
    return axios.post(`${API_URL}/PostVehicle`, vehicle);
  };
  
  export const deleteVehicle = async (id) => {
    return axios.delete(`${API_URL}/DeleteVehicle/${id}`);
  };

  export const updateVehicle = async (id, updatedData) => {
    const { name, abrv, makeId } = updatedData;
    
    const response = await axios.put(`${API_URL}/UpdateVehicles/${id}`, {
        name: name,
        abrv: abrv,
        makeId: makeId
    });
    console.log("API response after update:", response.data);  
    return response;
};


export const VehicleService = {
    getVehicles,
    addVehicle,
    deleteVehicle,
    updateVehicle
}