import React, { useEffect, useState } from "react";
import { Col, Container, Table, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";

function AdminEnvelopes() {
    const [name, setName] = useState(""); // State to manage the envelope name input field
    const dispatch = useDispatch(); // Redux dispatch function to send actions to the store
    const [envelopes, setEnvelopes] = useState([]);
    const [edit, setEdit] = useState(-1);
    const [newName, setNewName] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newPrev, setNewPrev] = useState("");
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        document.title = "Admin - Envelopes"; // Set the document title
        window.scrollTo({ top: 0, behavior: 'smooth' });

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
          const response2 = await axios.get("/api/budget/");
          setBudget((response2.data[0].amount - allocated).toFixed(2));
        } catch (error) {
          console.error("Error fetching Envelopes:", error);
        }
    };

    const triggerEdit = (env) => {
        setEdit(env.id);
        setNewName(env.envelope);
        setNewAmount(env.total);
        setNewPrev(env.prevTotal);
    }

    const submitChange = async (amount) => {
        try {
            let allocate = Number(budget);
            allocate += Number(amount);
            allocate -= Number(newAmount);
            if(allocate >= 0) {
                await axios.put(`/api/envelopes/edit/`, {envelope: newName, total: newAmount, id: edit, previous: newPrev});
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
        if(confirm("Are you sure you want to delete this envelope?")) {
            try {
                await axios.delete(`/api/envelopes/deleteEnv/${id}`);
                const response = await axios.get("/api/envelopes/");
                setEnvelopes(response.data);
                fetchEnvelopes();
            } catch (error){
                console.error("Error deleting envlope:", error);
            }
        }
    }

    return (
        <Container fluid>
             <div className="newEnvCard grid-col_3 grid">
                <h3>Add Envelope</h3>
                {/* Input field to capture the envelope name */}
                <div className='grid-col_12 cardElements'>
                    <center>
                        <input className='grid-col_12' type="text" placeholder="Envelope Name" value={name} onChange={(event) => setName(event.target.value)} />
                    </center>
                </div>

                {/* Button to submit the new envelope name */}
                <button className="adminTableButton cardElements" onClick={() => {
                    dispatch({type: "ADD_ENVELOPE", payload: {envName: name}});
                    fetchEnvelopes();
                    setName('');
                }}>Submit</button>
            </div>
            <center><h3>Unallocated Budget: ${budget}</h3></center>
            <Row>
                <Col>
                    <Table hover striped>
                        <thead>
                            <tr>
                                <th>Envelope</th>
                                <th>Budget for Current Year</th>
                                <th>Budget for Previous Year</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {envelopes.map((envelope)=> {if (edit!==envelope.id) { return(
                                <tr key={envelope.id}>
                                    <td>{envelope.envelope}</td>
                                    <td>${envelope.total}</td>
                                    <td>${envelope.prevTotal}</td>
                                    <td><button className="adminTableButton" onClick={() => triggerEdit(envelope)}>Edit</button></td>
                                    <td><button className="adminTableButton" onClick={() => deleteEnvelope(envelope.id)}>Delete</button></td>
                                </tr>
                            )} else {
                            return(
                                <tr key={envelope.id}>
                                    <td><input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} /></td>
                                    <td><input type="number" value={newAmount} onChange={(event) => setNewAmount(event.target.value)} /></td>
                                    <td><input type="number" value={newPrev} onChange={(event) => setNewPrev(event.target.value)} /></td>
                                    <td><button className="adminTableButton" onClick={() => submitChange(envelope.total)}>Submit</button></td>
                                    <td><button className="adminTableButton" onClick={() => setEdit(-1)}>Cancel</button></td>
                                </tr>
                            )}})}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )

}

export default AdminEnvelopes;