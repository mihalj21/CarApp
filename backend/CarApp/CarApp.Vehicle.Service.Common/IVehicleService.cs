using CarApp.Common;

namespace CarApp.Vehicle.Service.Common;

public interface IVehicleService
{
    Task<IList<Model.Vehicle>> GetAllVehicle();
    Task PostVehicle (Model.Vehicle vehicle);
    Task DeleteVehicle(int id);
    
    Task<Model.Vehicle> GetVehicleById(int id);
    Task<Model.Vehicle> UpdateVehicle(Model.Vehicle vehicle, int id);
    Task<List<Model.Vehicle>> GetVehicleFilter(Filter filter, Paging paging, Sorting sorting);
}
