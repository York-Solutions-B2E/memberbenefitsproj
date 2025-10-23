import React, {useEffect, useState} from 'react';
import {Table, Form, InputGroup, Button, Dropdown, Pagination, Row, Col, Container, Card} from 'react-bootstrap';
import SignOutButton from "./SignOutButton";
import {API_BASE_URL} from "../util/globalVar";


function ClaimList() {

    const [claimsData, setClaimsData] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(5);

    async function loadClaims(page = 0, size = 5) {
        const response = await fetch(API_BASE_URL + `page?page=${page}&size=${size}`, {});
        if (response.ok) {
            const result = await response.json();
            setClaimsData(result.content);
            setCurrentPageNumber(Number(result.number) + 1);
            setSizePerPage(result.size);
            setTotalPages(result.totalPages);
        }
    }

    useEffect(() => {
        loadClaims();
    }, [])

    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [provider, setProvider] = useState('');
    const [claimNumber, setClaimNumber] = useState('');

    const activeSession = JSON.parse(sessionStorage.getItem('user'));


    async function handleSizePerPageChange(e) {
        const newSizePerPage = Number(e.target.value)
        setSizePerPage(newSizePerPage);
        await loadClaims(currentPageNumber - 1, newSizePerPage);
    }

    async function handlePageChange(number) {
        if (number !== currentPageNumber) // check to see if request/fetch needs to be call
            await loadClaims(number - 1, sizePerPage);
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Claims</h5>
                    <div>
                        {(activeSession?.given_name && activeSession.family_name)
                            ? <strong>{activeSession?.given_name + ' ' + activeSession?.family_name}</strong>
                            : <></>}
                        <SignOutButton variant="danger" className="ms-3 text-decoration-none"/>
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
                        {!claimsData ? <></> : claimsData.map((claim, idx) => (
                            <tr key={idx}>
                                <td>{claim.claimNumber}</td>
                                <td>{claim.serviceStartDate}</td>
                                <td>{claim.provider.name}</td>
                                <td>{claim.status}</td>
                                <td>{claim.totalBilled.toFixed(2)}</td>
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
                        <Form.Select size="sm"
                                     style={{width: '100px', display: 'inline-block'}}
                                     value={sizePerPage} //  Binds the select box to state
                                     onChange={handleSizePerPageChange} //  Captures input change
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </Form.Select>{' '}
                        per page
                    </div>
                    <Pagination className="mb-0">
                        <Pagination.Prev/>
                        <Pagination.Item active={1 === currentPageNumber}
                                         onClick={() => handlePageChange(1)}>1</Pagination.Item>
                        <Pagination.Item active={2 === currentPageNumber}
                                         onClick={() => handlePageChange(2)}>2</Pagination.Item>
                        <Pagination.Item active={3 === currentPageNumber}
                                         onClick={() => handlePageChange(3)}>3</Pagination.Item>
                        <Pagination.Ellipsis disabled/>
                        <Pagination.Item>Next &rsaquo;</Pagination.Item>
                    </Pagination>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default ClaimList;