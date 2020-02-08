import React, {useState} from "react";
import {
    Button,
    Col,
    Container,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
    Row,
    Notification, Panel
} from "rsuite";

import {Link, useHistory} from "react-router-dom";

import axios from "axios";

function LoginPage(props) {

    const style = {
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center"
    };

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [user, setUser] = useState({});

    function showNotification(message, status) {
        if (status === "error") {
            Notification.error({
                title: "Failure",
                description: message
            });
        } else {
            Notification.success({
                title: "Success",
                description: message
            });
        }
    }

    function handleChangeVisibility() {
        setVisibility(!visibility);
    }

    function handleUserChange(formValue, event) {
        setUser({...user, [event.target.name]: event.target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        axios({
            method: "post",
            url: "http://localhost:5000/api/v1/users/login",
            data: user
        }).then(function (response) {
            if (response.status === 200) {
                showNotification(response.data.message, "success");
                props.handleUserData(response.data);
                localStorage.setItem("user_id", response.data.user._id);
                localStorage.setItem("token", response.data.token);
                history.push("/");
            } else {
                setLoading(false);
                showNotification(response.data.error, "error");
            }

        }).catch(function (error) {
            setLoading(false);
            showNotification("Something Went Wrong", "error");
        }).finally(function () {
            setLoading(false);
        });
    }

    return (
        <Container>
            <Panel style={{backgroundColor: "whitesmoke", borderRadius: "24px"}} className="shadow-sm">
                <Row style={style}>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <h1 style={{textAlign: "center"}}>Denty Dentist</h1>
                        <h5 style={{textAlign: "center"}}>Sign In</h5>
                    </Col>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Form fluid={true}>

                            <FormGroup>
                                <ControlLabel htmlFor="email">Email</ControlLabel>
                                <FormControl name="email" id="email" type="email" onChange={handleUserChange} required/>
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel htmlFor="password">Password</ControlLabel>
                                <FormControl name="password" id="password" type={(visibility) ? "text" : "password"}
                                             onChange={handleUserChange} required/>
                                <HelpBlock>This field is required</HelpBlock>

                                <Button onClick={handleChangeVisibility} appearance="link" size="lg"
                                        style={{float: "right"}}>
                                    {(visibility) ? "Hide Password" : "Show Password"}
                                </Button>
                            </FormGroup>

                            <FormGroup>
                                <Button block={true} color="green" size="lg" onClick={handleSubmit}
                                        onSubmit={handleSubmit}
                                        loading={loading} disabled={loading}>
                                    Sign In
                                </Button>

                                <Button block={true} size="lg" style={{textAlign: "center"}} appearance="link">
                                    <Link to="/register">
                                        Don't have an account? Sign up here
                                    </Link>
                                </Button>
                            </FormGroup>

                            <Button block={true} size="lg" style={{textAlign: "right"}}>
                                <Link to="/forgotten-password">
                                    Forgotten Password?
                                </Link>
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Panel>
        </Container>
    )
}

export default LoginPage;
