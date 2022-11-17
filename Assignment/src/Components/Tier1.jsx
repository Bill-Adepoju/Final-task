export default function Tier1(){

    const tier1Fee = 10000;
    const tier1interest = tier1Fee * 0.05;
    const tier1total = tier1Fee + tier1interest;
    return(
        <div>
            <p> You will save {tier1Fee}</p>
            <p> Your interest over one week is {tier1interest}</p>
            <p> You will recieve a Total of {tier1total}</p>
        </div>
    )
}