namespace CarApp.Common;

public class Sorting
{
    public string? OrderBy { get; set; }
    public string? SortOrder { get; set; }

    public Sorting() {}

    public Sorting( string? orderBy, string? sortOrder)
    {
        SortOrder = sortOrder;
        OrderBy = orderBy;
    }
}