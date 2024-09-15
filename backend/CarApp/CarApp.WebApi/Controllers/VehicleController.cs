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
            var players = await _vehicleService.GetAllVehicle();
            var restPlayers = _mapper.Map<IEnumerable<VehicleRest>>(players);
            return Ok(restPlayers);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}