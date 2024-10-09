namespace CarApp.Common;

public class Filter
{
    public int? MakeId { get; set; }
    public string? Name { get; set; }
    public string? Abrv { get; set; }

    public DateTime? DateStart { get; set; }
    
    public DateTime? DateEnd { get; set; }
    
    public Filter(int? makeId = null, string? name = null, string? abrv = null, DateTime? dateStart = null, DateTime? dateEnd = null)
    {
        MakeId = makeId;
        Name = name;
        Abrv = abrv;
        DateStart = dateStart;
        DateEnd = dateEnd;
    }
}