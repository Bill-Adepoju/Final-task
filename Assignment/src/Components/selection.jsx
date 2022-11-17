import {React, useState, useEffect} from "react"

export default function Selection(){
    const [name, setName] = useState("")
    const [tier, setTier] = useState("Select Tier")
    const [amount, setAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0);
    const [display, setDisplay] = useState(false)

    const [users, setUsers] = useState([
        { userName: 'Sample User', userAmount: 0, userTier: "" },
        // { userName: 'bola', userAmount: 200, userTier: "Tier 2" },
    ]);
    
    function handleChange(event) {
        setName(event.target.value)
        
    }
    function handleChangeTier(event) {
        setTier(event.target.value)
        
    }
    function handleChangeAmount(event) {
        setAmount(event.target.value)
        
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(name , tier, amount, totalAmount)
        setDisplay(true)
        
        const newUser = {
            userName: name,
            userAmount: amount,
            userTier: tier,
        };
        
        const newUsers = [...users, newUser];
        
        setUsers(newUsers);
        setName('');
        setTier("Select Tier")
        setAmount(0)
        setTotalAmount(totalAmount)
        calculateTotal();
        
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
               <button className="submit-button">Submit</button>

            </form>

            <div className='user-list'>
                {users.map((user, index) => ( 
                        <div className='user-container'>
                            <div className='user-details'>
                                <h2 className='user-name'>{user.userName}</h2>
                                <h4>{user.userTier}</h4>
                                <h4> {user.userAmount} </h4>
                            </div>

                            <div className='withdraw'>
                                
                                <button className="withdraw-button">
                                    Withdraw
                                </button>
                            </div>
                        </div>
                ))}
            </div>
            <div className='total'>Total: {totalAmount}</div>
        </section>
    )
}