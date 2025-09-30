import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

/**
 * AdminBudget Component
 * 
 * This component displays the current budget and allows the user to update the budget amount.
 * It interacts with the Redux store to fetch and update budget data.
 */
function AdminBudget() {
    const budget = useSelector((store) => store.budget); // Access budget data from the Redux store
    const transactions = useSelector(store => store.transactions);
    const envelopes = useSelector(store => store.envelope);
    const [budEdit1, setBudEdit1] = useState(false); // Local state to handle whether the edit mode is active
    const [budEdit2, setBudEdit2] = useState(false); // Local state to handle whether the edit mode is active
    const [newBudget, setNewBudget] = useState(0); // Local state to hold the new budget amount input by the user
    const [prevYear, setPrevYear] = useState(0);
    const [currYear, setCurrYear] = useState(0);
    const [budgetRows, setBudgetRows] = useState([]);
    const dispatch = useDispatch(); // Redux dispatch function to send actions to the store

    /**
     * Fetches the budget data when the component mounts.
     * Dispatches the "GRAB_BUDGET" action to retrieve budget information from the backend.
     */
    useEffect(() => {
        document.title = "Admin - Budget"; // Set the document title
        window.scrollTo({ top: 0, behavior: 'smooth' });

        dispatch({type: "GRAB_BUDGET"});
        dispatch({type: "GRAB_TRANSACTIONS"});
        dispatch({type: "GRAB_ENVELOPES"});
        const now = new Date();
        setCurrYear(Number(now.getFullYear()));
        setPrevYear(Number(now.getFullYear())-1);
    }, []);

    // Run buildBudgetRows only after envelopes are updated
    useEffect(() => {
        if (envelopes.length > 0) {
            buildBudgetRows();
        }
    }, [envelopes]);

    const buildBudgetRows = () => {
        let newBudgetRows = envelopes.map(envelope => {
            let setPrevTotal = 0;
            let setPrevSpent = 0;
            let setCurrTotal = 0;
            let setCurrSpent = 0;
            const currentDate = new Date();
            for(const env of envelopes) {
                if(env.envelope === envelope.envelope) {
                    setCurrTotal = env.total
                    setPrevTotal = env.prevTotal;
                    let sum1 = 0;
                    let sum2 = 0
                    for(const transaction of transactions) {
                        if(transaction.envelope === env.envelope && Number(transaction.timeDate.split("-")[0]) === Number(currentDate.getFullYear())-1) {
                            sum1 += Number(transaction.amount);
                        } else if(transaction.envelope === env.envelope && Number(transaction.timeDate.split("-")[0]) === Number(currentDate.getFullYear())){
                            sum2 += Number(transaction.amount);
                        }
                    }
                    setPrevSpent = sum1;
                    setCurrSpent = sum2;
                }
            }
            return {
                envName: envelope.envelope, // Envelope name
                prevTotal: setPrevTotal, // Placeholder for previous total budget
                prevSpent: setPrevSpent, // Placeholder for previous spent amount
                currTotal: setCurrTotal, // Placeholder for current total budget
                currSpent: setCurrSpent, // Placeholder for current spent amount
            }
    });
        setBudgetRows(newBudgetRows);
    }
    
    /**
     * Handles submitting the new budget amount.
     * Dispatches the "UPDATE_BUDGET" action with the updated amount.
     * Resets the edit state and input field after submission.
     */
    const submitNewBudget = () => {
        if(confirm("Are you sure you want to change the previous year's budget?")) {
            if(newBudget < 0) {
                alert("Negative numbers are not valid.");
            } else {
                setBudEdit1(false);
                dispatch({type: "UPDATE_BUDGET", payload: {amount: newBudget, year: budget[1].year}});
                setNewBudget(0);
            }
        }
    };

    const submitNewBudget2 = () => {
        if(confirm("Are you sure you want to change the current year's budget?")) {
            if(newBudget < 0) {
                alert("Negative numbers are not valid.");
            } else {
                setBudEdit2(false);
                dispatch({type: "UPDATE_BUDGET", payload: {amount: newBudget, year: budget[0].year}});
                setNewBudget(0);
            }
        }
    };

    return (
        <Container fluid>
            {/* Display the current budget type and amount */}
            <Row>
                <Col md={{offset: 1}}>
                    <p>Budget for {budget && currYear}: ${budget && budget[0].amount}</p>
                </Col>

                <Col>
                    {/* Button to enable budget editing */}
                    {!budEdit2 && <button className="adminTableButton" onClick={() => setBudEdit2(true)}>Edit Current Year's Budget Amount</button>}

                    {/* Budget editing form with input and action buttons */}
                    {budEdit2 &&
                    <>
                        <input type="number" placeholder="New Budget Amount" value={newBudget} onChange={(event) => setNewBudget(event.target.value)} />
                        <button className="adminTableButton" onClick={() => submitNewBudget2()}>Submit</button>
                        <button className="adminTableButton" onClick={() => { setBudEdit2(false); setNewBudget(0); }}>Cancel</button>
                    </>}
                </Col>

                <Col md={{offset: 1}}>
                    <p>Budget for {budget && prevYear}: ${budget && budget[1].amount}</p>
                </Col>

                <Col>
                    {/* Button to enable budget editing */}
                    {!budEdit1 && <button className="adminTableButton" onClick={() => setBudEdit1(true)}>Edit Previous Year's Budget Amount</button>}

                    {/* Budget editing form with input and action buttons */}
                    {budEdit1 &&
                    <>
                        <input type="number" placeholder="New Budget Amount" value={newBudget} onChange={(event) => setNewBudget(event.target.value)} />
                        <button className="adminTableButton" onClick={() => submitNewBudget()}>Submit</button>
                        <button className="adminTableButton" onClick={() => { setBudEdit1(false); setNewBudget(0); }}>Cancel</button>
                    </>}
                </Col>
            </Row>

            <Table>
                <thead>
                    <tr>
                        <th>Budget Envelopes</th>
                        <th>Total Budget for {prevYear}</th>
                        <th>Spent Money for {prevYear}</th>
                        <th>Total Budget for {currYear}</th>
                        <th>Spent Money for {currYear}</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetRows.map(item => {
                        return(<tr key={item.envName}>
                            <th>{item.envName}</th>
                            <td>${Number(item.prevTotal).toFixed(2)}</td>
                            <td>${Number(item.prevSpent).toFixed(2)}</td>
                            <td>${Number(item.currTotal).toFixed(2)}</td>
                            <td>${Number(item.currSpent).toFixed(2)}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminBudget;