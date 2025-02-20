import React, { useState } from "react";
import { useDispatch } from 'react-redux';

/**
 * AddEnvelope Component
 * 
 * This component allows the user to create a new envelope by providing a name.
 * It dispatches Redux actions to either submit the envelope or switch views.
 */
function AddEnvelope() {
    const [name, setName] = useState(""); // State to manage the envelope name input field
    const dispatch = useDispatch(); // Redux dispatch function to send actions to the store

    return (
        <div className="newEnvCard grid-col_6 grid">
            {/* Input field to capture the envelope name */}
            <div className='grid-col_12'>
                <input className='grid-col_12' type="text" placeholder="Envelope Name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>

            {/* Button to navigate back (likely switches views) */}
            <button onClick={() => dispatch({type: "SWITCH"})}>Back</button>

            {/* Button to submit the new envelope name */}
            <button onClick={() => {
                dispatch({type: "ADD_ENVELOPE", payload: {envName: name}})}}>Submit</button>
        </div>
    )
};

export default AddEnvelope;