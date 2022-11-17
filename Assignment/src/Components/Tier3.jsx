export default function Tier3(){

    const tier3Fee = 30000;
    const tier3interest = tier3Fee * 0.2;
    const tier3total = tier3Fee + tier3interest;
    return(
        <div>
            <p> You will save {tier3Fee}</p>
            <p> Your interest over one week is {tier3interest}</p>
            <p> You will recieve a Total of {tier3total}</p>
        </div>
    )
}