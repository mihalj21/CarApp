using CarApp.Common;
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

    public  async Task DeleteVehicle(int id)
    {
        await _repository.DeleteVehicle(id);
    }

    public  async Task<Model.Vehicle> GetVehicleById(int id)
    {
        return await _repository.GetVehicleById(id);
    }

    public async Task<int> UpdateVehicle(Model.Vehicle vehicle, int id)
    {
        return await _repository.UpdateVehicle(vehicle, id);
    }

    public async Task<List<Model.Vehicle>> GetVehicleFilter(Filter filter, Paging paging, Sorting sorting)
    {
        return await _repository.GetVehicleFilter(filter, paging, sorting);
    }
}