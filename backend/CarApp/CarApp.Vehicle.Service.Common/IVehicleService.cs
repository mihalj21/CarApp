namespace CarApp.Vehicle.Service.Common;

public interface IVehicleService
{
    Task<IList<Model.Vehicle>> GetAllVehicle();
    Task PostVehicle (Model.Vehicle vehicle);
    Task DeleteVehicle(int id);
    
    Task<Model.Vehicle> GetVehicleById(int id);
    Task<int> UpdateVehicle(Model.Vehicle vehicle, int id);
}
