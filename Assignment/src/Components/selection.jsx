import {React, useState, useEffect} from "react"

export default function Selection(){
    const [name, setName] = useState("")
    const [tier, setTier] = useState("Select Tier")
    const [amount, setAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0);

    const [users, setUsers] = useState([
        { userName: '', userAmount: 0, userTier: "" },
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
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Input Name"
                    onChange={handleChange}
                    name="name"
                    value={name}
               />
               <br />

                <label htmlFor="tier">What tier do you prefer?</label>
                <br />
                <select 
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
                <input
                    type="text"
                    placeholder="Input Amount"
                    onChange={handleChangeAmount}
                    name="amount"
                    value={amount}
               />
               <button>Submit</button>

            </form>

            <div className='user-list'>
                {users.map((user, index) => (
                    <div className='item-container'>
                        <div className='item-name'>
                                <>
                                
                                    <span className='completed'>{user.userName}</span>
                                </>
                          
                                <>
                                    
                                    <span>{user.userTier}</span>
                                </>
                           
                        </div>
                        <div className='withdraw'>
                            <span> {user.userAmount} </span>
                            <button>
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