import React from "react";
import {Icon, List} from "rsuite";
import {Col, Form} from "react-bootstrap";

function SimpleRemovableItem(props) {

    function handleRemoveOptionSelected() {
        props.handleOptionRemove(props.option)
    }

    return (
        <List.Item onClick={handleRemoveOptionSelected}>
            <Form.Row>
                <Col xs={11}>
                    <h6>{props.option}</h6>
                </Col>
                <Col xs={1}>
                    <Icon icon="trash" size="2x"/>
                </Col>
            </Form.Row>
        </List.Item>
    )
}

export default SimpleRemovableItem;
