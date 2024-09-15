namespace CarApp.Vehicle.Service.Common;

public interface IVehicleService
{
    Task<IList<Model.Vehicle>> GetAllVehicle();
    Task PostVehicle (Model.Vehicle vehicle);
    
}