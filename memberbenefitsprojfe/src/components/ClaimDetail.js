import {Container, Row, Col, Table, Button, Badge, Card} from 'react-bootstrap';
import {useParams, useLocation} from "react-router-dom";


const ClaimDetail = () => {
    const {id} = useParams();
    const location = useLocation();
    const claim = location.state

    return (
        <Container className="py-4">
            {/* Header Section */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row>
                        <Col>
                            <h4>Claim #{claim.claimNumber}</h4>
                            <div><strong>Provider:</strong> {claim.provider.name}</div>
                            <div><strong>Service Dates:</strong> {claim.receivedDate}</div>
                            <div>
                                <strong>Status:</strong>{' '}
                                <Badge bg="info" className="text-uppercase">
                                    {claim.status}
                                </Badge>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Financial Summary */}
            <Card className="mb-4">
                <Card.Body>
                    <h5>Financial Summary</h5>
                    <Row>
                        <Col md={6}>
                            <ul className="list-unstyled mb-0">
                                <li>💰 <strong>Total Billed:</strong> ${claim.totalBilled.toFixed(2)}</li>
                                <li>📉 <strong>Allowed Amount:</strong> ${claim.totalAllowed.toFixed(2)}</li>
                                <li>🏦 <strong>Plan Paid:</strong> ${claim.totalPlanPaid.toFixed(2)}</li>
                                <li>🙋 <strong>Your
                                    Responsibility:</strong> ${claim.totalMemberResponsibility.toFixed(2)}</li>
                            </ul>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Line Items Table */}
            <Card className="mb-4">
                <Card.Body>
                    <h5>Line Items</h5>
                    <Table bordered responsive hover size="sm">
                        <thead>
                        <tr>
                            <th>CPT</th>
                            <th>Description</th>
                            <th>Billed</th>
                            <th>Allowed</th>
                            <th>Deductible</th>
                            <th>Copay</th>
                            <th>Coins</th>
                            <th>You Pay</th>
                        </tr>
                        </thead>
                        <tbody>
                        {claim.claimLines.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cptCode}</td>
                                <td>{item.description}</td>
                                <td>${item.billedAmount.toFixed(2)}</td>
                                <td>${item.allowedAmount.toFixed(2)}</td>
                                <td>${item.deductibleApplied.toFixed(2)}</td>
                                <td>${item.copayApplied.toFixed(2)}</td>
                                <td>${item.coinsuranceApplied.toFixed(2)}</td>
                                <td>${item.planPaid.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Footer Buttons */}
            <Row className="justify-content-between">
                <Col xs="auto">
                    <Button variant="secondary" onClick={() => window.history.back()}>
                        ← Back
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="info">
                        📄 Download EOB PDF
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ClaimDetail;
