namespace SpeedBet.Models.Model
{
    public class TeamModel
    {
        public int Id { get; }
        public string Name { get; }
        public double Odds { get; }

        public TeamModel(int id, string name, double odds)
        {
            Id = id;
            Name = name;
            Odds = odds;
        }
    }
}
