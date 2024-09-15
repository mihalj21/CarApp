using AutoMapper;
using CarApp.WebApi.RestModels;

namespace CarApp.WebApi.AutoMapper;


public class MappingProfile: Profile 
{
    
    public MappingProfile()
    {
        CreateMap<Model.Vehicle, VehicleRest>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.MakeId, opt => opt.MapFrom(src => src.MakeId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Abrv, opt => opt.MapFrom(src => src.Abrv));

        
        CreateMap<VehicleRest, Model.Vehicle>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.MakeId, opt => opt.MapFrom(src => src.MakeId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Abrv, opt => opt.MapFrom(src => src.Abrv));

        CreateMap<VehicleCreateRest, Model.Vehicle>();
    }


    }
    
