using CarApp.Model;
using CarApp.VehicleRepository.Common;
using Npgsql;

namespace CarApp.VehicleRepository
{
    public class VehicleRepository : IVehicleRepository
    {
        public async Task<IList<Vehicle>> GetAllVehicle()
        {
            var vehicles = new List<Vehicle>();

            
            string connectionString = "Host=localhost;Port=5432;Database=CARS;Username=postgres;Password=mono";
            
            await using var connection = new NpgsqlConnection(connectionString);
            await using var command = new NpgsqlCommand(@"
        SELECT v.""Id"", v.""Name"", v.""Abrv"", v.""MakeId"", 
               vm.""Name"" AS ""MakeName"", vm.""Abrv"" AS ""MakeAbrv""
        FROM ""Vehicle"" v
        INNER JOIN ""VehicleMake"" vm ON v.""MakeId"" = vm.""Id"";", connection);

           
            await connection.OpenAsync();

           
            await using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
            
                var vehicle = new Vehicle
                {
                    Id = reader["Id"] != DBNull.Value ? Convert.ToInt32(reader["Id"]) : 0,
                    MakeId = reader["MakeId"] != DBNull.Value ? Convert.ToInt32(reader["MakeId"]) : 0,
                    Name = reader["Name"] != DBNull.Value ? reader["Name"].ToString() : string.Empty,
                    Abrv = reader["Abrv"] != DBNull.Value ? reader["Abrv"].ToString() : string.Empty,
                    
                };

                vehicles.Add(vehicle); 
            }

            return vehicles; 
        }

        public  async Task PostVehicle(Vehicle vehicle)
        {
            string connectionString = "Host=localhost;Port=5432;Database=CARS;Username=postgres;Password=mono";
            await using var connection = new NpgsqlConnection(connectionString);
            await using var command = new NpgsqlCommand(@"
            INSERT INTO ""Vehicle"" (""Name"", ""Abrv"", ""MakeId"")
            VALUES (@Name, @Abrv, @MakeId);", connection);

            command.Parameters.AddWithValue("@Name", vehicle.Name);
            command.Parameters.AddWithValue("@Abrv", vehicle.Abrv);
            command.Parameters.AddWithValue("@MakeId", vehicle.MakeId);

            await connection.OpenAsync();
            await command.ExecuteNonQueryAsync();
        }
    }
}
