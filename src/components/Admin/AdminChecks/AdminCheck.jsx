import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
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
        <div>
            <div>
            <button className="grid-col_2" onClick={() => {
                setStatus(!status);
                setSearchYear(0);
            }}>{!status ? "Show Unpaid" : "Show All"}</button>

            <label>Select Year</label>
            <select onChange={() => setSearchYear(event.target.value)}>
                <option value={0}>None</option>
                {years && years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>

            <label>Select Month</label>
            <select onChange={() => setSearchMonth(event.target.value)}>
                <option value={-1}>None</option>
                {months && months.map((month) => <option key={month} value={month}>{monthNames[month]}</option>)}
            </select>
            </div>

            <Table>
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
                            <td>{!check.paid && <button onClick={() => markPaid(check.id)}>Pay</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

}

export default AdminChecks;