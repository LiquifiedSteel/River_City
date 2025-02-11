import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";

function AdminBudget() {
    const budget = useSelector((store) => store.budget);
    const [budEdit, setBudEdit] = useState(false);
    const [newBudget, setNewBudget] = useState(0);
    const dispatch = useDispatch();
    console.log(budget);
    // Async function to fetch budget things
    useEffect(() => {
        dispatch({type: "GRAB_BUDGET"});
    }, [])
    
    const submitNewBudget = () => {
        setBudEdit(false);
        dispatch({type: "UPDATE_BUDGET", payload: newBudget});
        setNewBudget(0);
    }

    return (
        <div>
            <p>{budget && budget[0].type}: ${budget && budget[0].amount}</p>
            {!budEdit && <button onClick={() => setBudEdit(true)}>Edit Budget Amount</button>}
            {budEdit &&
            <>
                <input type="number" placeholder="New Budget Amount" value={newBudget} onChange={() => setNewBudget(event.target.value)} />
                <button onClick={() => submitNewBudget()}>Submit</button>
                <button onClick={() => { setBudEdit(false); setNewBudget(0); }}>Cancel</button>
            </>}
        </div>
    );
}

export default AdminBudget;