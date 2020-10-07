import React from 'react';
import { Alert } from 'react-bootstrap';

export default function Alerts(props) {
  if (!props.message) {
    return null;
  } else {
    return <Alert bsStyle={props.type}>{props.message}</Alert>;
  }
}
