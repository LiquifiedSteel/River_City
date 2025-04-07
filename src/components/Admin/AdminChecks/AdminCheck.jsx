import React, { useState, useEffect } from "react";
import { Container, Form, FormLabel, Table, Row, Col } from "react-bootstrap";
import axios from "axios";

function AdminChecks() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [checks, setChecks] = useState([]);
    const [status, setStatus] = useState(false);
    const [searchYear, setSearchYear] = useState(0);
    const [years, setYears] = useState([]);
    const [searchMonth, setSearchMonth] = useState(0);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        document.title = "Admin - Checks"; // Set the document title
        window.scrollTo({ top: 0, behavior: 'smooth' });

        fetchChecks();
    }, [])

    const fetchChecks = async () => {
        try {
            // Fetch applications data
            const response = await axios.get("/api/checks/");
            setChecks(response.data);
            let collectYears = [];
            for(const check of response.data) {
                let newDate = new Date(check.date).getFullYear();
                if(collectYears.includes(Number(newDate))) {
                } else {
                    collectYears.push(Number(newDate));
                }
            }
            setSearchYear(0);
            setYears(collectYears);
            let collectMonths = [];
            for(const check of response.data) {
                let newDate = new Date(check.date).getMonth();
                if(collectMonths.includes(Number(newDate))) {
                } else {
                    collectMonths.push(Number(newDate));
                }
            }
            setSearchMonth(-1);
            setMonths(collectMonths);
        } catch (error) {
            console.error("Error fetching checks:", error);
        }
    };

    const formatDate = (checkDate) => {
        const dateString = checkDate;
        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return (formattedDate);
    }

    const markPaid = async (id) => {
        try{
            await axios.put(`/api/checks/paid/${id}`);
        } catch (error) {
            console.error("Error Updating checks:", error);
        }
        fetchChecks();
    }

    return (
        <Container fluid>
            <Row className="grid">
                <Col md={{ span: 2, offset: 1}} className="grid-col_3">
                    <center>
                        <button className="adminTableButton checkSwitch" onClick={() => {
                            setStatus(!status);
                            setSearchYear(0);
                        }}>{!status ? "Show Unpaid" : "Show All"}</button>
                    </center>
                </Col>
                
                <Col md={{ span: 3, offset: 1}} className="grid-col_3">
                    <FormLabel>Select Year</FormLabel>
                    <Form.Select onChange={() => setSearchYear(event.target.value)}>
                        <option value={0}>None</option>
                        {years && years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </Form.Select>
                </Col>

                <Col md={{ span: 3, offset: 1}} className="grid-col_3">
                    <FormLabel>Select Month</FormLabel>
                    <Form.Select onChange={() => setSearchMonth(event.target.value)}>
                        <option value={-1}>None</option>
                        {months && months.map((month) => <option key={month} value={month}>{monthNames[month]}</option>)}
                    </Form.Select>
                </Col>
            </Row>

            <Table hover striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {checks.filter((check) => { 
                            let year = new Date(check.date).getFullYear();
                            let month = new Date(check.date).getMonth();
                            return ((Number(searchYear) === 0 || Number(year) === Number(searchYear)) && (Number(searchMonth) === -1 || Number(month) === Number(searchMonth)) && (!status || (status && check.paid===false)))}).map((check) => (
                        <tr key={check.id}>
                            <td>{check.name}</td>
                            <td>{check.amount}</td>
                            <td>{formatDate(check.date)}</td>
                            <td>{check.paid ? "Paid" : "Unpaid"}</td>
                            <td>{!check.paid && <button className="adminTableButton" onClick={() => markPaid(check.id)}>Pay</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}

export default AdminChecks;