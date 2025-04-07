import React, { useState, useEffect } from 'react';
import axios from "axios"; // Import axios for making HTTP requests
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch } from 'react-redux';
import AddEnvelope from '../AddEnvelope/AddEnvelope';
import { useSelector } from 'react-redux';
import { Col, Container, Row, Table } from 'react-bootstrap';

function LandingPage() {
  const user = useSelector(store => store.user);
  const envelopes = useSelector(store => store.envelope);
  const transactions = useSelector(store => store.transactions);
  const creatingEnvelope = useSelector(store => store.envSwitch);
  console.log(envelopes)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.title = "River City Envelopes"; // Set the document title
    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch({type: 'GRAB_ENVELOPES'});
    dispatch({type: 'GRAB_TRANSACTIONS'});
    creatingEnvelope && dispatch({type: 'SWITCH'});
  }, []); // Empty dependency array ensures this runs once on mount

  const pay = (id) => {
    const payCheck = async () => {
      try {
        // Fetch applications data
        await axios.put(`/api/checks/paid/${id}`);
        dispatch({type: 'GRAB_TRANSACTIONS'});
      } catch (error) {
        console.error("Error marking check as paid:", error);
      }
    };
    payCheck(); // Invoke the pay function
  }

  return (
    <Container fluid>
      <Row>
        {user.isAdmin ? <Col>
          <Row className="gy-4" key={7654}>
            {creatingEnvelope ? <Col xs={6}><AddEnvelope /></Col> : <Col xs={6}><button className='envelope' onClick={() => dispatch({type: "SWITCH"})}>+ Add New Envelope</button></Col>}
            {envelopes.map((envelope) => {
              console.log(envelope)
              let spent = 0;
              let remaining = Number(envelope.total);
              for (let item of transactions) {
                if (item.reviewed && item.envelope===envelope.envelope) {
                  spent += Number(item.amount);
                }
              }
              if (((remaining - spent) / envelope.total) >= .75) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center e75' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) >= .50) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center e50' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) >= .25) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center e25' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) > 0) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center e0' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) === 0) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center ez' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) < 0) {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center en' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              } else {
                return (
                  <Col xs={6}>
                    <div key={envelope.id} className='envelope text-center ez' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                      <h2>{envelope.envelope}</h2>
                      <h3>${envelope.total}</h3>
                      <h3>
                        Remaining: ${(remaining - spent).toFixed(2)}
                      </h3>
                    </div>
                  </Col>)
              }
            })}
          </Row>
        </Col> : <Col>
          <Row>
            {envelopes.map((envelope) => {
              let spent = 0;
              let remaining = Number(envelope.total);
              for (let item of transactions) {
                if (item.reviewed && item.envelope===envelope.envelope) {
                  spent += Number(item.amount);
                }
              }
              if (((remaining - spent) / envelope.total) >= .75) {
                return (
                  <Col key={envelope.id} className='envelope text-center e75' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) >= .50) {
                return (
                  <Col key={envelope.id} className='envelope text-center e50' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) >= .25) {
                return (
                  <Col key={envelope.id} className='envelope text-center e25' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) >= 0) {
                return (
                  <Col key={envelope.id} className='envelope  text-center e0' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) === 0) {
                return (
                  <Col key={envelope.id} className='envelope text-center ez' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              } else if (((remaining - spent) / envelope.total) < 0) {
                return (
                  <Col key={envelope.id} className='envelope text-center en' onClick={() => history.push(`/envelope?envelope=${envelope.envelope}`)}>
                    <h2>{envelope.envelope}</h2>
                    <h3>${envelope.total}</h3>
                    <h3>
                      Remaining: ${(remaining - spent).toFixed(2)}
                    </h3>
                  </Col>)
              }
            })}
          </Row>
        </Col>}
        {user.isAdmin && <div className='grid-col_5 grid'>
          <Table striped bordered hover className="grid-col_6 text-center">
            <thead>
              <tr>
                <th>Unreviewed</th>
                <th>
                  <svg onClick={() => dispatch({type: 'REVIEW_ALL'})} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all addPointer" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.filter((transaction) => transaction.reviewed === false).map((transaction) => 
                <tr key={transaction.id}>
                  <td>{transaction.name + ": " + transaction.amount}</td>
                  <td>
                    <button onClick={() => dispatch({type: 'REVIEW_TRANSACTION', payload: {id: transaction.id}})}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Table striped bordered hover className="grid-col_6 text-center">
            <thead>
              <tr>
                <th>Unpaid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.filter((transaction) => transaction.reviewed === true && transaction.paid === false && transaction.out_of_pocket === true).map((transaction) => 
                <tr key={transaction.id}>
                  <td>{transaction.name + ": " + transaction.amount}</td>
                  <td>
                    <button onClick={() => pay(transaction.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>}
      </Row>
    </Container>
  );
}

export default LandingPage;
