using AutoMapper;
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

            
            int commitNumber = await _vehicleService.UpdateVehicle(vehicle, vehicleId);

            if (commitNumber == 0)
            {
                return BadRequest("Vehicle could not be updated.");
            }

            return Ok("Vehicle updated successfully.");
        }
        catch (Exception ex)
        {
           
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}