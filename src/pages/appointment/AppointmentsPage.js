import React, {useEffect, useState} from "react";
import {Row, Col} from "rsuite"
import Layout from "../../components/layout/Layout";

import axios from "axios";
import {Tab, Tabs, Container} from "react-bootstrap";
import AppointmentItem from "./AppointmentItem";

function AppointmentsPage(props) {

    const [unassignedAppointments, setUnassignedAppointments] = useState([]);
    const [assignedAppointments, setAssignedAppointments] = useState([]);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [tabKey, setTabKey] = useState("assigned");

    function handleTabSelect(keyEvent, event) {
        setTabKey(keyEvent);
    }


    useEffect(function () {
        axios({
            url: "http://localhost:5000/api/v1/appointments?status=vacant",
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setUnassignedAppointments(response.data.appointments);
        }).catch(function (error) {
            console.log(error);
        });
    }, [unassignedAppointments]);


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/appointments?status=vacant&dentist=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setAssignedAppointments(response.data.appointments);
        }).catch(function (error) {
            console.log(error);
        });
    }, [assignedAppointments]);


    return (
        <Layout>
            <Container>
                <Tabs
                    className="my-3"
                    id="appointments"
                    activeKey={tabKey}
                    onSelect={handleTabSelect}
                    defaultActiveKey="vacant"
                    variant="tabs">

                    <Tab title="Vacant" eventKey="vacant">
                        <Row className="my-2">
                            {
                                (unassignedAppointments.length === 0) ? (
                                        <Col style={{
                                            minHeight: "85vh",
                                            backgroundColor: "whitesmoke",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            justify: "center"
                                        }}>
                                            <h5 style={{color: "#999"}}>No Vacant Appointments</h5>
                                        </Col>
                                    ) :
                                    (
                                        unassignedAppointments.map(function (appointment, index) {
                                            return (
                                                <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                    <AppointmentItem appointment={appointment}/>
                                                </Col>
                                            )
                                        })
                                    )
                            }
                        </Row>
                    </Tab>
                    <Tab title="Assigned" eventKey="assigned">
                        <Row className="my-2">
                            {
                                (assignedAppointments.length <= 0) ? (
                                        <Col style={{
                                            minHeight: "85vh",
                                            backgroundColor: "whitesmoke",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            justify: "center"
                                        }}>
                                            <h1>WTF</h1>
                                            <h5 style={{color: "#999"}}>No Assigned Appointments</h5>
                                        </Col>
                                    ) :
                                    (
                                        assignedAppointments.map(function (appointment, index) {
                                            return (
                                                <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                    <AppointmentItem appointment={appointment}/>
                                                </Col>
                                            )
                                        })
                                    )
                            }
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </Layout>
    )
}

export default AppointmentsPage;