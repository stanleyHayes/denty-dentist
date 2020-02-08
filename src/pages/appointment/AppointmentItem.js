import React from "react";
import {Divider, Panel} from "rsuite";

function AppointmentItem(props) {

    return (
        <Panel shaded={true} className="shadow-sm" style={{backgroundColor: "white", borderRadius: "24px"}}
               bordered={true}>
            <small>Name</small>
            <p>{props.appointment.patient.name}</p>
            <Divider/>

            <small>Contact</small>
            <p>{props.appointment.patient.phone}</p>
            <Divider/>


            <small>Status</small>
            <p>{props.appointment.status}</p>
            <Divider/>


            <small>Proposed Date</small>
            <p>{new Date(props.appointment.appointment_date).toDateString()}</p>
            <Divider/>

            <small>Description</small>
            <p>{props.appointment.description}</p>
        </Panel>
    )
}

export default AppointmentItem;
