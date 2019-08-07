namespace SpeedBet.Models.Model
{
    public class BalanceModel
    {
        public int AmountBet { get; }
        public double AmountWon { get; }
        public BalanceModel(int amountBet, double amountWon)
        {
            AmountBet = amountBet;
            AmountWon = amountWon;
        }
    }
}
