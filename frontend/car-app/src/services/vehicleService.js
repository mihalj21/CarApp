import axios from "axios";

const API_URL = "https://localhost:7256/Vehicle";

const getVehicles = () => {
    return axios.get(API_URL);
};  

const addVehicle = (vehicle) => {
    return axios.post(API_URL,vehicle);
}

const deleteVehicle = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

export const vehicleService = {
    getVehicles,
    addVehicle,
    deleteVehicle
}