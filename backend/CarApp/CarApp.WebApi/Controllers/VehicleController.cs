using AutoMapper;
using CarApp.Common;
using CarApp.Vehicle.Service.Common;
using CarApp.WebApi.RestModels;
using Microsoft.AspNetCore.Mvc;

namespace CarApp.WebApi.Controllers;

[ApiController]
[Route("[controller]")]

public class VehicleController: ControllerBase
{
    private readonly IVehicleService _vehicleService;
    private readonly IMapper _mapper;
    public VehicleController(IVehicleService vehicleService, IMapper mapper)
    {
        _vehicleService = vehicleService;
        _mapper = mapper;
    }

    [HttpGet("GetVehicle")]

    public async Task<ActionResult> Get()
    {
        try
        {
            var vehicles = await _vehicleService.GetAllVehicle();
            var restVehicles = _mapper.Map<IEnumerable<VehicleRest>>(vehicles);
            return Ok(restVehicles);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("PostVehicle")]
    public async Task<ActionResult> PostVehicle([FromBody] VehicleCreateRest vehicleRest)
    {
        try
        {
            
            var vehicle = _mapper.Map<Model.Vehicle>(vehicleRest);

            
            await _vehicleService.PostVehicle(vehicle);

           
            return Ok("Vehicle successfully created.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete("DeleteVehicle/{id}")]
    public async Task<ActionResult> DeleteVehicle(int id)
    {
        try
        {
            
            await _vehicleService.DeleteVehicle(id);
            return Ok($"Vehicle with ID {id} successfully deleted.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("GetCar")]
    
    public async Task<ActionResult> GetById(int id)
    {
        try
        {
           Model.Vehicle car =  await _vehicleService.GetVehicleById(id);
            return Ok(car);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPut("UpdateVehicles/{vehicleId:int}")]
    public async Task<IActionResult> Put(VehiclePostRest vehiclePost, int vehicleId)
    {
        if (vehiclePost == null)
        {
            return BadRequest("Invalid vehicle data.");
        }

        try
        {
            Model.Vehicle vehicle = _mapper.Map<Model.Vehicle>(vehiclePost);
            var updatedVehicle = await _vehicleService.UpdateVehicle(vehicle, vehicleId);

            if (updatedVehicle == null)
            {
                return BadRequest("Vehicle could not be updated.");
            }

            return Ok(updatedVehicle); // Return the updated vehicle
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpGet("GetAllFilterVehicles")]
    public async Task<IActionResult> GetVehiclesAsync(
        int? makeId = null, string? name = null, string? abrv = null, 
        DateTime? dateStart = null, DateTime? dateEnd = null, 
        int? pageSize = 20, int? pageNumber = 1, 
        string orderBy = "Name", string sortOrder = "ASC"
    )
    {
        
        Filter filter = new Filter(makeId, name, abrv, dateStart, dateEnd);
        Paging paging = new Paging((int)pageSize, (int)pageNumber);
        Sorting sorting = new Sorting(orderBy, sortOrder);

        // Call service to get the filtered vehicle list
        List<Model.Vehicle> vehicleResult = await _vehicleService.GetVehicleFilter(filter, paging, sorting);

        List<VehicleRest> vehicleRest = new List<VehicleRest>();
        _mapper.Map(vehicleResult, vehicleRest);

        if (vehicleRest == null || vehicleRest.Count == 0)
        {
            return NotFound("Vehicles not found");
        }

        return Ok(vehicleRest);
    }
}