export default function Tier2(){

    const tier2Fee = 20000;
    const tier2interest = tier2Fee * 0.1;
    const tier2total = tier2Fee + tier2interest;
    return(
        <div>
            <p> You will save {tier2Fee}</p>
            <p> Your interest over one week is {tier2interest}</p>
            <p> You will recieve a Total of {tier2total}</p>
        </div>
    )
}