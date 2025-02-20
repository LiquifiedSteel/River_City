import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/**
 * AdminBudget Component
 * 
 * This component displays the current budget and allows the user to update the budget amount.
 * It interacts with the Redux store to fetch and update budget data.
 */
function AdminBudget() {
    const budget = useSelector((store) => store.budget); // Access budget data from the Redux store
    const [budEdit, setBudEdit] = useState(false); // Local state to handle whether the edit mode is active
    const [newBudget, setNewBudget] = useState(0); // Local state to hold the new budget amount input by the user
    const dispatch = useDispatch(); // Redux dispatch function to send actions to the store

    /**
     * Fetches the budget data when the component mounts.
     * Dispatches the "GRAB_BUDGET" action to retrieve budget information from the backend.
     */
    useEffect(() => {
        dispatch({type: "GRAB_BUDGET"});
    }, [])
    
    /**
     * Handles submitting the new budget amount.
     * Dispatches the "UPDATE_BUDGET" action with the updated amount.
     * Resets the edit state and input field after submission.
     */
    const submitNewBudget = () => {
        if(newBudget < 0) {
            alert("Negative numbers are not valid.");
        } else {
            setBudEdit(false);
            dispatch({type: "UPDATE_BUDGET", payload: newBudget});
            setNewBudget(0);
        }
    }

    return (
        <div>
            {/* Display the current budget type and amount */}
            <p>{budget && budget[0].type}: ${budget && budget[0].amount}</p>

            {/* Button to enable budget editing */}
            {!budEdit && <button onClick={() => setBudEdit(true)}>Edit Budget Amount</button>}

            {/* Budget editing form with input and action buttons */}
            {budEdit &&
            <>
                <input type="number" placeholder="New Budget Amount" value={newBudget} onChange={(event) => setNewBudget(event.target.value)} />
                <button onClick={() => submitNewBudget()}>Submit</button>
                <button onClick={() => { setBudEdit(false); setNewBudget(0); }}>Cancel</button>
            </>}
        </div>
    );
}

export default AdminBudget;