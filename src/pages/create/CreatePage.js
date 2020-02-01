import React, {useState} from "react";
import {Card, Container, Form} from "react-bootstrap"
import Layout from "../../components/layout/Layout";
import {Button, Col, Divider, List, Panel, Row} from "rsuite";
import Record from "../record/Record";

function CreatePage(props) {
    const [cause, setCause] = useState("");
    const [causes, setCauses] = useState([]);

    const [treatments, setTreatments] = useState([]);
    const [treatment, setTreatment] = useState("");

    const [prevention, setPrevention] = useState("");
    const [preventions, setPreventions] = useState([]);

    const [symptom, setSymptom] = useState("");
    const [symptoms, setSymptoms] = useState([]);
    return (
        <Layout>
            <Container>
                <Card bordered={true} shaded={true} className="shadow-sm my-5 p-5">
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Caption</Form.Label>
                                <Form.Control as="textarea" rows={4} type="text" placeholder="Enter Caption" required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Causes</Form.Label>
                                <Form.Control as="textarea" rows={2} type="text" placeholder="Enter Cause" required/>
                                <Divider/>

                                <Button block={true} appearance="default">Add cause</Button>

                                <Divider>Added Causes</Divider>

                                <Row>
                                    {
                                        (causes.length === 0) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "35vh",
                                                backgroundColor: "whitesmoke"
                                            }}>
                                                <h6 style={{color: "#999"}}>No Causes Listed</h6>
                                            </Col>
                                        ) : (
                                            <Col>
                                                <List>
                                                    {
                                                        causes.map(function (cause, index) {
                                                            return (
                                                                <List.Item key={index}>
                                                                    <p>{cause}</p>
                                                                    <Form.Text>Click to remove</Form.Text>
                                                                </List.Item>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Treatments</Form.Label>
                                <Form.Control as="textarea" rows={2} type="text" placeholder="Enter Treatment"
                                              required/>
                                <Divider/>

                                <Button block={true} appearance="default">Add Treatment</Button>

                                <Divider>Added Treatments</Divider>

                                <Row>
                                    {
                                        (treatments.length === 0) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "35vh",
                                                backgroundColor: "whitesmoke"
                                            }}>
                                                <h6 style={{color: "#999"}}>No Treatments Listed</h6>
                                            </Col>
                                        ) : (
                                            <Col>
                                                <List bordered={true} hover={true} size="sm">
                                                    {
                                                        treatments.map(function (treatment, index) {
                                                            return (
                                                                <List.Item key={index}>
                                                                    <p>{treatment}</p>
                                                                    <Form.Text>Click to remove</Form.Text>
                                                                </List.Item>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Symptoms</Form.Label>
                                <Form.Control as="textarea" rows={2} type="text" placeholder="Enter a symptom"
                                              required/>
                                <Divider/>

                                <Button block={true} appearance="default">Add Symptom</Button>

                                <Divider>Added Symptoms</Divider>

                                <Row>
                                    {
                                        (symptoms.length === 0) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "35vh",
                                                backgroundColor: "whitesmoke"
                                            }}>
                                                <h6 style={{color: "#999"}}>No Symptoms Listed</h6>
                                            </Col>
                                        ) : (
                                            <Col>
                                                <List bordered={true} hover={true} size="sm">
                                                    {
                                                        symptoms.map(function (cause, index) {
                                                            return (
                                                                <List.Item key={index}>
                                                                    <p>{cause}</p>
                                                                    <Form.Text>Click to remove</Form.Text>
                                                                </List.Item>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Preventions</Form.Label>
                                <Form.Control as="textarea" rows={2} type="text" placeholder="Enter a Prevention"
                                              required/>
                                <Divider/>

                                <Button block={true} appearance="default">Add Prevention</Button>

                                <Divider>Added Preventions</Divider>

                                <Row>
                                    {
                                        (preventions.length === 0) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "35vh",
                                                backgroundColor: "whitesmoke"
                                            }}>
                                                <h6 style={{color: "#999"}}>No Preventions Listed</h6>
                                            </Col>
                                        ) : (
                                            <Col>
                                                <List bordered={true} hover={true} size="sm">
                                                    {
                                                        preventions.map(function (cause, index) {
                                                            return (
                                                                <List.Item key={index}>
                                                                    <p>{cause}</p>
                                                                    <Form.Text>Click to remove</Form.Text>
                                                                </List.Item>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Button block={true} appearance="primary" size="md">
                                    Add Article
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}

export default CreatePage;