import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import axios from "axios";

import ExportExcelButton from "../../ExcelExport/ExcelExport";
import { useDispatch, useSelector } from "react-redux";

function AdminTransactions() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const transactions = useSelector((store) => store.transactions);
    const [status, setStatus] = useState(false);
    const [searchYear, setSearchYear] = useState(0);
    const [years, setYears] = useState([]);
    const [searchMonth, setSearchMonth] = useState(0);
    const [months, setMonths] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Admin - Transactions"; // Set the document title
        window.scrollTo({ top: 0, behavior: 'smooth' });

        fetchTransactions();
    }, [])

    const fetchTransactions = async () => {
        try {
            // Fetch applications data
            dispatch({type: 'GRAB_TRANSACTIONS'});
            const response = await axios.get("/api/transactions/");
            let collectYears = [];
            for(const transaction of response.data) {
                let newDate = new Date(transaction.timeDate).getFullYear();
                if(collectYears.includes(Number(newDate))) {
                } else {
                    collectYears.push(Number(newDate));
                }
            }
            setSearchYear(0);
            setYears(collectYears);
            let collectMonths = [];
            for(const transaction of response.data) {
                let newDate = new Date(transaction.timeDate).getMonth();
                if(collectMonths.includes(Number(newDate))) {
                } else {
                    collectMonths.push(Number(newDate));
                }
            }
            setSearchMonth(-1);
            setMonths(collectMonths);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const formatDate = (transactionDate) => {
        const dateString = transactionDate;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return (formattedDate);
    }

    return (
        <Container fluid>
            <Row className="grid">
                <Col md={{ span: 2, offset: 1}} className="grid-col_3">
                    <button className="adminTableButton checkSwitch" onClick={() => {
                        setStatus(!status);
                        setSearchYear(0);
                    }}>{!status ? "Show Unpaid" : "Show All"}</button>
                </Col>
                
                <Col md={{ span: 2, offset: 1 }} className="grid-col_3">
                    <label>Select Year</label>
                    <Form.Select onChange={() => setSearchYear(event.target.value)}>
                        <option value={0}>None</option>
                        {years && years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </Form.Select>
                </Col>

                <Col md={{ span: 2 }} className="grid-col_3">
                    <label>Select Month</label>
                    <Form.Select onChange={() => setSearchMonth(event.target.value)}>
                        <option value={-1}>None</option>
                        {months && months.map((month) => <option key={month} value={month}>{monthNames[month]}</option>)}
                    </Form.Select>
                </Col>

                <Col md={{ span: 2, offset: 1 }} className="checkSwitch">
                    <ExportExcelButton />
                </Col>
            </Row>

            <Table hover striped>
                <thead>
                    <tr>
                        <th>Tag</th>
                        <th>Envelope</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Amount Spent</th>
                        <th>Out of Pocket</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.filter((transaction) => { 
                        let year = new Date(transaction.timeDate).getFullYear();
                        let month = new Date(transaction.timeDate).getMonth();
                        return ((Number(searchYear) === 0 || Number(year) === Number(searchYear)) && (Number(searchMonth) === -1 || Number(month) === Number(searchMonth)) && (!status || (status && transaction.paid===false)))}).map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.tag}</td>
                                <td>{transaction.envelope}</td>
                                <td>{transaction.name}</td>
                                <td>{transaction.location}</td>
                                <td>{formatDate(transaction.timeDate)}</td>
                                <td><a href={transaction.recieptLink}>{transaction.amount}</a></td>
                                <td>{transaction.out_of_pocket ? "Yes" : "No"}</td>
                                <td>{!transaction.reviewed && <button className="adminTableButton" onClick={() => dispatch({type: 'REVIEW_TRANSACTION', payload: {id: transaction.id}})}>Review</button>}</td>
                            </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}

export default AdminTransactions;