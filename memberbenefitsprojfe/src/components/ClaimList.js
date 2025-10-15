import React, {useState} from 'react';
import {Table, Form, InputGroup, Button, Dropdown, Pagination, Row, Col, Container, Card} from 'react-bootstrap';


function ClaimList({}) {
    const claimsData = [
        {id: '#C-10421', date: '08/29–08/29', provider: 'River Clinic', status: 'Processed', amount: '$45.00'},
        {id: '#C-10405', date: '08/20–08/20', provider: 'City Imaging Ctr', status: 'Denied', amount: '$0.00'},
        {id: '#C-10398', date: '08/09–08/09', provider: 'Prime Hospital', status: 'Paid', amount: '$120.00'},
    ];

    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [provider, setProvider] = useState('');
    const [claimNumber, setClaimNumber] = useState('');

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Claims</h5>
                    <div>
                        <strong>John Smith</strong>
                        <a href="#" className="ms-3 text-decoration-none">Sign out</a>
                    </div>
                </Card.Header>

                <Card.Body>
                    {/* Filters */}
                    <Row className="mb-3 g-2">
                        <Col md={3}>
                            <Form.Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Status</option>
                                <option value="Processed">Processed</option>
                                <option value="Denied">Denied</option>
                                <option value="Paid">Paid</option>
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <Form.Select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            >
                                <option value="">Date Range</option>
                                <option value="last7">Last 7 days</option>
                                <option value="last30">Last 30 days</option>
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <Form.Control
                                type="text"
                                placeholder="Provider"
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                            />
                        </Col>

                        <Col md={3}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Claim #"
                                    value={claimNumber}
                                    onChange={(e) => setClaimNumber(e.target.value)}
                                />
                                <Button variant="primary">Search</Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* Claims Table */}
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                        <tr>
                            <th>Claim #</th>
                            <th>Date</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {claimsData.map((claim, idx) => (
                            <tr key={idx}>
                                <td>{claim.id}</td>
                                <td>{claim.date}</td>
                                <td>{claim.provider}</td>
                                <td>{claim.status}</td>
                                <td>{claim.amount}</td>
                                <td>
                                    <a href="#">View &rsaquo;</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>

                {/* Pagination */}
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        Page <strong>1</strong> of <strong>5</strong>
                    </div>
                    <div>
                        <Form.Select size="sm" style={{width: '100px', display: 'inline-block'}}>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </Form.Select>{' '}
                        per page
                    </div>
                    <Pagination className="mb-0">
                        <Pagination.Prev/>
                        <Pagination.Item active>1</Pagination.Item>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Ellipsis disabled/>
                        <Pagination.Item>Next &rsaquo;</Pagination.Item>
                    </Pagination>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default ClaimList;