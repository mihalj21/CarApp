using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using CarApp.Vehicle.Service;
using CarApp.Vehicle.Service.Common;
using CarApp.VehicleRepository;
using CarApp.VehicleRepository.Common;
using CarApp.WebApi.AutoMapper;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(); 


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthorization();


var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);


builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
   
    containerBuilder.RegisterType<VehicleService>().As<IVehicleService>().InstancePerLifetimeScope();
    containerBuilder.RegisterType<VehicleRepository>().As<IVehicleRepository>().InstancePerLifetimeScope();
    containerBuilder.RegisterInstance(mapper).As<IMapper>().SingleInstance();
});


builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5099); 
    options.ListenLocalhost(7256, listenOptions =>
    {
        listenOptions.UseHttps(); 
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); 

app.UseAuthorization();

app.MapControllers();

app.Run();