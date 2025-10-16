import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Badge,
    Card,
} from 'react-bootstrap';
import {useParams} from "react-router-dom";


const ClaimDetail = () => {
    const {id} = useParams();

    // todo: fetch all claims
    const claims = [{
        claimId: 'C-10421',
        provider: 'River Clinic',
        serviceDate: '08/29–08/29',
        status: 'Processed',
        statusTimeline: ['Submitted', 'In Review', 'Processed', 'Paid'],
        financialSummary: {
            billed: 300.0,
            allowed: 200.0,
            planPaid: 155.0,
            memberResp: 45.0,
        },
        lineItems: [
            {
                cpt: '99213',
                desc: 'Office Visit, Est Pt',
                billed: 150.0,
                allowed: 100.0,
                deductible: 0.0,
                copay: 25.0,
                coins: 10.0,
                youPay: 15.0,
            },
            {
                cpt: '81002',
                desc: 'Urinalysis',
                billed: 150.0,
                allowed: 100.0,
                deductible: 0.0,
                copay: 0.0,
                coins: 10.0,
                youPay: 10.0,
            },
        ],
    }];

    // find the one claim to display
    const claim = claims.find(c => c.claimId === id);

    return (
        <Container className="py-4">
            {/* Header Section */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row>
                        <Col>
                            <h4>Claim #{claim.claimId}</h4>
                            <div><strong>Provider:</strong> {claim.provider}</div>
                            <div><strong>Service Dates:</strong> {claim.serviceDate}</div>
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
                                <li>💰 <strong>Total Billed:</strong> ${claim.financialSummary.billed.toFixed(2)}</li>
                                <li>📉 <strong>Allowed Amount:</strong> ${claim.financialSummary.allowed.toFixed(2)}</li>
                                <li>🏦 <strong>Plan Paid:</strong> ${claim.financialSummary.planPaid.toFixed(2)}</li>
                                <li>🙋 <strong>Your
                                    Responsibility:</strong> ${claim.financialSummary.memberResp.toFixed(2)}</li>
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
                        {claim.lineItems.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cpt}</td>
                                <td>{item.desc}</td>
                                <td>${item.billed.toFixed(2)}</td>
                                <td>${item.allowed.toFixed(2)}</td>
                                <td>${item.deductible.toFixed(2)}</td>
                                <td>${item.copay.toFixed(2)}</td>
                                <td>${item.coins.toFixed(2)}</td>
                                <td>${item.youPay.toFixed(2)}</td>
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
