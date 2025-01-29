import React, { useState } from "react";
import { useDispatch } from 'react-redux';

function AddEnvelope() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="newEnvCard grid-col_6 grid">
            <div className='grid-col_12'>
                <input className='grid-col_12' type="text" placeholder="Envelope Name" value={name} onChange={() => setName(event.target.value)} />
            </div>
            <button onClick={() => dispatch({type: "SWITCH"})}>Back</button>
            <button onClick={() => {
                dispatch({type: "ADD_ENVELOPE", payload: {envName: name}});
                window.location.reload();
                }}>Submit</button>
        </div>
    )
};

export default AddEnvelope;