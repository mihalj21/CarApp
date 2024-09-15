using CarApp.Vehicle.Service.Common;
using CarApp.VehicleRepository.Common;

namespace CarApp.Vehicle.Service;


public class VehicleService: IVehicleService
{

    
    private readonly IVehicleRepository _repository;

    public VehicleService(IVehicleRepository _repository)
    {
        this._repository = _repository;
    }



    public async  Task<IList<Model.Vehicle>> GetAllVehicle()
    {
        return await _repository.GetAllVehicle();
    }

    public async Task PostVehicle(Model.Vehicle vehicle)
    {
        await _repository.PostVehicle(vehicle);
    }

    public Task DeleteVehicle(int id)
    {
        throw new NotImplementedException();
    }
}