import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import {useParams} from "react-router-dom";
import NotFound from "./NotFound";

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
        claim ? <Container className="mt-4 border rounded p-4 shadow-sm bg-light">
            {/* Header */}
            <Row className="mb-3">
                <Col>
                    <h5>
                        Claim <strong>#{claim.claimId}</strong>
                    </h5>
                    <div>
                        <strong>Provider:</strong> {claim.provider}
                    </div>
                    <div>
                        <strong>Service Dates:</strong> {claim.serviceDate}
                    </div>
                    <div>
                        <strong>Status:</strong> <Badge bg="info">{claim.status}</Badge>
                    </div>
                </Col>
            </Row>

            {/* Status Timeline */}
            <Row className="mb-4">
                <Col>
                    <strong>Status Timeline:</strong>{' '}
                    {claim.statusTimeline.map((status, i) => (
                        <span key={i}>
              [{status}]
                            {i < claim.statusTimeline.length - 1 && ' — '}
            </span>
                    ))}
                </Col>
            </Row>

            {/* Financial Summary */}
            <Row className="mb-4">
                <Col>
                    <h6>Financial Summary</h6>
                    <ul className="list-unstyled mb-0">
                        <li>• <strong>Total Billed:</strong> ${claim.financialSummary.billed.toFixed(2)}</li>
                        <li>• <strong>Allowed Amount:</strong> ${claim.financialSummary.allowed.toFixed(2)}</li>
                        <li>• <strong>Plan Paid:</strong> ${claim.financialSummary.planPaid.toFixed(2)}</li>
                        <li>• <strong>Member Responsibility:</strong> ${claim.financialSummary.memberResp.toFixed(2)}</li>
                    </ul>
                </Col>
            </Row>

            {/* Line Items Table */}
            <Row className="mb-4">
                <Col>
                    <h6>Line Items</h6>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>CPT</th>
                            <th>Description</th>
                            <th>Billed</th>
                            <th>Allowed</th>
                            <th>Ded</th>
                            <th>Copay</th>
                            <th>Coins</th>
                            <th>You</th>
                        </tr>
                        </thead>
                        <tbody>
                        {claim.lineItems.map((item, i) => (
                            <tr key={i}>
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
                </Col>
            </Row>

            {/* Footer Buttons */}
            <Row className="justify-content-between">
                <Col xs="auto">
                    <Button variant="secondary">&larr; Back to Claims</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-primary">Download EOB PDF</Button>
                </Col>
            </Row>
        </Container> : <NotFound></NotFound>
    );
};

export default ClaimDetail;
