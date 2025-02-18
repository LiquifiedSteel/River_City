import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function AdminEnvelopes() {
    const [envelopes, setEnvelopes] = useState([]);
    const [edit, setEdit] = useState(-1);
    const [newName, setNewName] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        fetchEnvelopes();
    }, [])

    const fetchEnvelopes = async () => {
        try {
          // Fetch envelopes data and budget
          let allocated = 0
          const response1 = await axios.get("/api/envelopes/");
          setEnvelopes(response1.data);
          for(let env of response1.data) {
            allocated += Number(env.total);
          }
          const response2 = await axios.get("/api/envelopes/navBudget");
          setBudget((response2.data[0].amount - allocated).toFixed(2));
        } catch (error) {
          console.error("Error fetching Envelopes:", error);
        }
    };

    const triggerEdit = (env) => {
        setEdit(env.id);
        setNewName(env.envelope);
        setNewAmount(env.total);
    }

    const submitChange = async (amount) => {
        try {
            let allocate = Number(budget);
            allocate += Number(amount);
            allocate -= Number(newAmount); 
            console.log(Number(allocate));
            if(allocate >= 0) {
                await axios.put(`/api/envelopes/edit/`, {envelope: newName, total: newAmount, id: edit});
                fetchEnvelopes();
                setEdit(-1);
            } else {
                alert("There is not enough unallocated budget for the envelope amount you are trying to set!")
            }
        } catch (error) {
            console.error("Error updating envelope:", error);
        }
    }

    const deleteEnvelope = async (id) => {
        try {
            await axios.delete(`/api/envelopes/deleteEnv/${id}`);
            const response = await axios.get("/api/envelopes/");
            setEnvelopes(response.data);
        } catch (error){
            console.error("Error deleting envlope:", error);
        }
    }

    return (
        <div>
            <h3>Unallocated Budget: ${budget}</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Envelope</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {envelopes.map((envelope)=> {if (edit!==envelope.id) { return(
                        <tr key={envelope.id}>
                            <td>{envelope.envelope}</td>
                            <td>{envelope.total}</td>
                            <td><button onClick={() => triggerEdit(envelope)}>Edit</button></td>
                            <td><button onClick={() => deleteEnvelope(envelope.id)}>Delete</button></td>
                        </tr>
                    )} else {
                    return(
                        <tr key={envelope.id}>
                            <td><input type="text" value={newName} onChange={() => setNewName(event.target.value)} /></td>
                            <td><input type="number" value={newAmount} onChange={() => setNewAmount(event.target.value)} /></td>
                            <td><button onClick={() => submitChange(envelope.total)}>Submit</button></td>
                        </tr>
                    )}})}
                </tbody>
            </Table>
        </div>
    )

}

export default AdminEnvelopes;