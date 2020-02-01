import React, {useState} from "react";
import {Col, Container, Row} from "rsuite"
import Layout from "../../components/layout/Layout";
import DentistItem from "./DentistItem";

function DentistPage(props) {

    const [dentists, setDentists] = useState([]);

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

export default DentistPage;