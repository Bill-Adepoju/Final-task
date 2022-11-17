import {React, useState, useEffect} from "react"
import Tier1 from "./Tier1"
import Tier2 from "./Tier2"
import Tier3 from "./Tier3"


export default function Selection(){
    const [name, setName] = useState("")
    const [tier, setTier] = useState("Select Tier")
    const [amount, setAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(true);
    const [userPreview, setUserPreview] = useState(false)

    const [tier1visible, setTier1visible] = useState(false)
    const [tier2visible, setTier2visible] = useState(false)
    const [tier3visible, setTier3visible] = useState(false)

    const [withAmount, setWithAmount] = useState()

    useEffect(() => {
        tier === "Tier1" ? setTier1visible(true) : setTier1visible(false);
        tier === "Tier2" ? setTier2visible(true) : setTier2visible(false);
        tier === "Tier3" ? setTier3visible(true) : setTier3visible(false);
      }, [tier]);
    

    const [users, setUsers] = useState([
        { userName: '', userAmount: '', userTier: "", toWithdraw : ""},
    ]);
    
    function handleChange(event) {
        setName(event.target.value)
        
    }
    function handleChangeTier(event) {
        setTier(event.target.value)
        
    }
    function handleChangeAmount(event) {
        setAmount(event.target.value)
        if(((tier=="Tier1") && (event.target.value == "10000")) || ((tier == "Tier2") && (event.target.value == "20000")) || ((tier == "Tier3") && (event.target.value == "30000"))){
            setErrorMessage(false)
        }else{
            setErrorMessage(true)
        }

        if (tier == "Tier1"){
            setWithAmount((event.target.value * 0.05) + parseInt(event.target.value))
        } else if(tier=="Tier2"){
            setWithAmount((event.target.value * 0.1) + parseInt(event.target.value))
        } else if(tier =="Tier3"){
            setWithAmount((event.target.value * 0.2) + parseInt(event.target.value))
        }
        
    }

    function userWithdraw(userName, userAmount, userTier, toWithdraw){
        
        const deleteUser = users.filter(function(){
           return 
            ({
                userName: !userName,
                userAmount: !userAmount,
                userTier: !userTier,
                toWithdraw : !toWithdraw
            });

        }) 

        setUsers(deleteUser);
          
    }

    
    

    function handleSubmit(event){
        event.preventDefault()
        console.log(name , tier, amount, totalAmount)
        
        
        const newUser = {
            userName: name,
            userAmount: amount,
            userTier: tier,
            toWithdraw : withAmount
        };
        
        const newUsers = [...users, newUser];
        
        setUsers(newUsers);
        setName('');
        setTier("Select Tier")
        setAmount(0)
        setTotalAmount(totalAmount)
        calculateTotal();
        setUserPreview(true)
        setErrorMessage(true)

       
        
    }

    const calculateTotal = () => {
        const allAmount = users.reduce((total, user) => {
            total = total +  parseInt(user.userAmount) ;
            return total
        }, 0);
    
        setTotalAmount((allAmount => allAmount + parseInt(amount)));
    };

    return(
        <section className="collect-details">
            <form onSubmit={handleSubmit} className="details-form">
                <label className="name-label" htmlFor="name">Input your name</label>
                <input
                    className="name-field"
                    type="text"
                    placeholder="Input Name"
                    onChange={handleChange}
                    name="name"
                    value={name}
               />
               <br />

                <label className="select-label" htmlFor="tier">What tier do you prefer?</label>
    
                <select
                    className="select-field" 
                    id="tier" 
                    value={tier}
                    onChange={handleChangeTier}
                    name="tier"
                >
                    <option value="selectTier">Select Tier</option>
                    <option value="Tier1">Tier 1</option>
                    <option value="Tier2">Tier 2</option>
                    <option value="Tier3">Tier 3</option>
                
                </select>
                <div className="tier-texts">
                    {tier1visible && <Tier1 />}
                    {tier2visible && <Tier2 />}
                    {tier3visible && <Tier3 />}
                </div>
                <br />
                <label className="amount-label" htmlFor="amount">How much would you like to save?</label>
                <input
                    className="amount-field"
                    type="text"
                    placeholder="Input Amount"
                    onChange={handleChangeAmount}
                    name="amount"
                    value={amount}
               />
               <div>
                    {errorMessage && <p className="error-text">Please, input the correct amount for your tier</p> }
               </div>
               <div>
                  {!errorMessage && <button className="submit-button">Submit</button>}
               </div>
               

            </form>

            <div className='user-list'>
                {users.map((user, index) => ( 
                        <div className='user-container'>
                            <div className='user-details'>
                                <h2 className='user-name'>{user.userName}</h2>
                                <h4 className="user-tier">{user.userTier}</h4>
                                <h4 className="user-amount"> {user.userAmount} </h4>
                            </div>
                            <div> {userPreview &&
                                <div className='withdraw'>
                                    
                                    <button onClick={userWithdraw} className="withdraw-button">
                                        Withdraw
                                    </button>
                                    <p>{user.toWithdraw}</p>
                                </div>}
                            </div>
                        </div>
                ))}
            </div>
            <div className='total'>Total Amount Saved: {totalAmount}</div>
        </section>
    )
}