import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom"; // useLocation for getting URL query parameters
import axios from "axios";
import { Col, Container, Row, Table, Form, FormLabel } from 'react-bootstrap';
import './Envelopes.css';

function Envelopes() {
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);
    const transactions = useSelector((store) => store.transactions)
    const [searchYear, setSearchYear] = useState(-1);
    const [years, setYears] = useState([]);
    const location = useLocation(); // React Router's hook to access the current URL
    const envelope = new URLSearchParams(location.search).get("envelope"); // Extracts the "envelope" query parameter from the URL

    useEffect(() => {
        document.title = `${envelope}`; // Set the document title
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch({type: 'GRAB_TRANSACTIONS_ENV', payload:{envelope}});
        // Async function to fetch transactions
        const fetchTransactions = async () => {
          try {
            // Fetch transactions data
            const response = await axios.get(`/api/transactions/${envelope}`);
            let collectYears = [];
            for(const transaction of response.data) {
                let newDate = new Date(transaction.timeDate).getFullYear();

                if(collectYears.includes(Number(newDate))) {
                } else {
                    collectYears.push(Number(newDate));
                }
            }
            setSearchYear(-1);
            setYears(collectYears);
          } catch (error) {
            console.error("Error fetching Envelopes:", error);
          }
        };
        fetchTransactions(); // Invoke the fetch function
    }, [])

    const review = (id) => {
        setSearchYear(-1);
        dispatch({type:'REVIEW_TRANSACTION_ENV', payload: {id, envelope}});
      }

    return (
        <Container fluid>

            <Row>
                <center><Col><h1 className="envHead">{envelope}</h1></Col></center>
            </Row>

            <Row>
                <Col md={{ offset: 2}}><button className="envButton" onClick={() => history.push(`/home`)}>Back</button></Col>
                <Col><button className="envButton" onClick={() => history.push(`/new-transaction?envelope=${envelope}`)}>New Transaction +</button></Col>
                {user.isAdmin && <Col><button className="envButton" onClick={() => {
                    setPending(!pending)
                    setSearchYear(0);
                }}>Pending Transactions</button></Col>}
                {!pending ? <Col>
                    <Form.Select id="shadow" onChange={() => setSearchYear(event.target.value)}>
                        {searchYear === -1 && <option value={-1}>Select a Year to Search</option>}
                        <option value={0}>None</option>
                        {years && years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </Form.Select>
                </Col> :  <Col md={{ span: 2}}></Col>}
                <Col md={{ span: 2}}></Col>
            </Row>
            
            <Row>
                <Col>
                    <Table className="text-center">
                        <thead>
                            <tr>
                                <th>Tag</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Amount Spent</th>
                                <th>Out of Pocket</th>
                                {pending && <th>Review</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {!pending && transactions && transactions.filter((transaction) => { 
                                let date = new Date(transaction.timeDate).getFullYear();
                                return (Number(searchYear) === 0 || Number(searchYear) === -1) ? transaction.reviewed : transaction.reviewed && Number(date) === Number(searchYear)}).map((transaction) => 
                                <tr key={transaction.id}>
                                    <td>{transaction.tag}</td>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.location}</td>
                                    <td>{transaction.timeDate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{String(transaction.out_of_pocket)}</td>
                                </tr>
                            )}
                            {pending && transactions && transactions.filter((transaction) => !transaction.reviewed).map((transaction) => 
                                <tr key={transaction.id}>
                                    <td>{transaction.tag}</td>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.location}</td>
                                    <td>{transaction.timeDate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{String(transaction.out_of_pocket)}</td>
                                    <td>
                                        <button onClick={() => review(transaction.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
};

export default Envelopes;