using CarApp.Common;
using CarApp.Model;
namespace CarApp.VehicleRepository.Common;

public interface IVehicleRepository
{
    Task<IList<Vehicle>> GetAllVehicle();
    Task PostVehicle (Vehicle vehicle);
    
    Task DeleteVehicle (int id); 
    
    Task<Vehicle> GetVehicleById(int id);

    Task<Vehicle> UpdateVehicle(Vehicle vehicle, int id);
    Task<List<Vehicle>> GetVehicleFilter(Filter filter, Paging paging, Sorting sorting);

}
