import React, {useEffect, useState} from "react";
import {Col, Row} from "rsuite"
import Layout from "../../components/layout/Layout";
import axios from "axios";
import DentistItem from "./DentistItem";
import {Container} from "react-bootstrap";

function DentistsPage(props) {

    const [dentists, setDentists] = useState([]);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(function () {
        axios({
            url: "http://localhost:5000/api/v1/users?role=Dentist",
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setDentists(response.data.users);
        }).catch(function (error) {
            console.log(error);
        });
    }, [dentists]);

    return (
        <Layout>
            <Container>
                <Row className="my-2">
                    {
                        (dentists.length <= 0) ? (
                                <Col style={{
                                    minHeight: "85vh",
                                    backgroundColor: "whitesmoke",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    justify: "center"
                                }}>
                                    <h5 style={{color: "#999"}}>No Dentists available</h5>
                                </Col>
                            ) :
                            (
                                dentists.map(function (dentist, index) {
                                    return (
                                        <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                            <DentistItem dentist={dentist}/>
                                        </Col>
                                    )
                                })
                            )
                    }
                </Row>
            </Container>
        </Layout>
    )
}

export default DentistsPage;