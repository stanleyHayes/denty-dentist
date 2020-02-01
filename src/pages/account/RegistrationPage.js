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
    Notification, DatePicker, Panel
} from "rsuite";

import {Link, useHistory} from "react-router-dom";

import axios from "axios";

function RegistrationPage(props) {

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
    const [confirmPassword, setConfirmPassword] = useState("");

    function showNotification(message, status) {
        if (status === "error") {
            Notification.error({
                title: "Registration Failed",
                description: message
            });
        } else {
            Notification.success({
                title: "Registration Succeeded",
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

    function handleConfirmPasswordChange(formValue, event) {
        setConfirmPassword(formValue);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (confirmPassword !== user.password) {
            setLoading(false);
            showNotification("Passwords do not match", "error");
        } else {
            setLoading(true);
            axios({
                method: "post",
                url: "http://localhost:5000/api/v1/users/register",
                data: user
            }).then(function (response) {
                if (response.status === 201) {
                    showNotification(response.data.message, "success");
                    history.push("/login");
                    console.log(response);
                } else {
                    setLoading(false);
                    showNotification(response.data.error, "error");
                }

            }).catch(function (error) {
                setLoading(false);
                showNotification("Email already in use", "error");
                console.log(error);
                console.log(`Error.Error${error.error}`);
            }).finally(function () {
                setLoading(false);
            });
        }
    }

    return (
        <Container>
            <Row style={style}>
                <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                    <h1 style={{textAlign: "center"}}>Denty Dentist</h1>
                    <h5 style={{textAlign: "center"}}>Sign Up</h5>
                </Col>
                <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                    <Form fluid={true}>
                        <FormGroup>
                            <ControlLabel htmlFor="name">Name</ControlLabel>
                            <FormControl name="name" id="name" required onChange={handleUserChange}/>
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel htmlFor="email">Email</ControlLabel>
                            <FormControl name="email" id="email" type="email" onChange={handleUserChange} required/>
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel htmlFor="username">Username</ControlLabel>
                            <FormControl name="username" id="username" type="text" onChange={handleUserChange}
                                         required/>
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel htmlFor="username">Birthday</ControlLabel>
                            <DatePicker block={true} name="username" id="username" onChange={handleUserChange}
                                        required/>
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel htmlFor="password">Password</ControlLabel>
                            <FormControl name="password" id="password" type={(visibility) ? "text" : "password"}
                                         onChange={handleUserChange} required/>
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>


                        <FormGroup>
                            <ControlLabel htmlFor="confirm-password">Confirm Password</ControlLabel>
                            <FormControl name="confirm-password" id="conform-password"
                                         type={(visibility) ? "text" : "password"}
                                         onChange={handleConfirmPasswordChange} required/>
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
                                Sign Up
                            </Button>

                            <Button block={true} size="lg" style={{textAlign: "center"}} appearance="link">
                                <Link to="/login">
                                    Already have an account? Login here
                                </Link>
                            </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegistrationPage;