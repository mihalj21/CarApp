using CarApp.Model;

namespace CarApp.VehicleRepository.Common;

public interface IVehicleRepository
{
    Task<IList<Vehicle>> GetAllVehicle();
    Task PostVehicle (Vehicle vehicle);
}
