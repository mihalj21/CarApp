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
}