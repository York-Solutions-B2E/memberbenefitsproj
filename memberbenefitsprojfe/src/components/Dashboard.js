import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, Row, Col, Card, ProgressBar, ListGroup,} from "react-bootstrap";
import SignOutButton from "./SignOutButton";
import {API_BASE_URL, MEMBER_ID} from "../util/globalVar";

function Dashboard() {
    const activeSession = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [member, setMember] = useState({});
    const [plan, setPlan] = useState({});
    const [accumulator, setAccumulator] = useState({});
    const [claims, setClaims] = useState([]);

    const getMember = async () => {
        const response = await fetch(API_BASE_URL+`getMember?memberID=${MEMBER_ID}`)
        if(response.ok){
            const result = await response.json();
            setMember(result);
            setPlan(result?.enrollments[0]?.plan);
            setAccumulator(result?.enrollments[0]?.accumulators[0]);
            setClaims(result?.claims);
        }
    }

    useEffect(() => {
        getMember();
    }, []);

    const deductibleProgress = (accumulator?.usedAmount / 1500) * 100;
    const oopProgress = (accumulator?.limitAmount / 6000) * 100;

    // const claims = [
    //     {id: 'C-10421', status: 'Processed', amount: '$45'},
    //     {id: 'C-10405', status: 'Denied', amount: '$0'},
    //     {id: 'C-10398', status: 'Paid', amount: '$120'},
    //     {id: 'C-10375', status: 'In Review', amount: '$—'},
    //     {id: 'C-10312', status: 'Paid', amount: '$60'},
    // ];
    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Dashboard</h5>
                    <div>
                        {(activeSession?.given_name && activeSession.family_name)
                            ? <strong>{activeSession?.given_name + ' ' + activeSession?.family_name}</strong>
                            : <></>}
                        <SignOutButton variant="danger" className="ms-3 text-decoration-none"/>
                    </div>
                </Card.Header>

                <Card.Body>
                    <Row>
                        {/* Active Plan */}
                        <Col md={4} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Active Plan</Card.Title>
                                    <ul className="list-unstyled">
                                        <li>• {plan?.name}</li>
                                        <li>• {"Network: "+plan?.networkName}</li>
                                        <li>• {"Coverage "+plan?.planYear}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Accumulators */}
                        <Col md={4} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Accumulators</Card.Title>
                                    <p>Deductible: <strong>{"$"+accumulator?.usedAmount} / $1500</strong></p>
                                    <ProgressBar now={deductibleProgress} className="mb-3"/>
                                    <p>OOP Max: <strong>{"$"+accumulator?.limitAmount} / $6000</strong></p>
                                    <ProgressBar now={oopProgress}/>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Recent Claims */}
                        <Col md={4} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Recent Claims</Card.Title>
                                    <ListGroup variant="flush">
                                        {!claims ? <></> : claims.map((claim, idx) => (
                                            <ListGroup.Item key={idx}>
                                                <Link to={`/ClaimDetail/${claim.claimNumber}`}
                                                state={claim}>
                                                    {claim.claimNumber} <span className="text-muted">{claim.status}</span>{' '}
                                                    <strong>{" $"+claim.totalBilled}</strong>
                                                </Link>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>

                <Card.Footer className="text-center">
                    <Button variant="link" onClick={() => navigate('/ClaimList')}>View All Claims</Button>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default Dashboard;