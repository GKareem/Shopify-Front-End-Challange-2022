import React, { useRef, useState} from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";

import "./Header.css"
import { useAPI } from "../contexts/ApiContext";

const currentDate = new Date();
const maxDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
const minDate = "1995-06-16";

export function Header() {
  const startDateRef = useRef(), endDateRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { httpRequest } = useAPI();

  var startDate, endDate, numberOfDays;

  async function handleSubmit(e) {
    e.preventDefault();

    if (startDateRef.current.value === "" || startDateRef.current.value === null) {
      return setError("Start date value is invalid!");
    }
    if (endDateRef.current.value === "" || endDateRef.current.value === null) {
      return setError("End date value is invalid");
    }
  
    startDate = new Date(parseInt(startDateRef.current.value.slice(-10)), parseInt(startDateRef.current.value.slice(-5)) - 1, parseInt(startDateRef.current.value.slice(-2)));
    endDate = new Date(parseInt(endDateRef.current.value.slice(-10)), parseInt(endDateRef.current.value.slice(-5))-1, parseInt(endDateRef.current.value.slice(-2)));
  
    numberOfDays = Math.abs(startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    try {
      setError("");
      setLoading(true);
      await httpRequest(startDateRef.current.value, endDateRef.current.value, numberOfDays);
    } catch {
      setError("An error has occured!");
    }

    setLoading(false);
  }

  return (
    <Container fluid className="Container">
      <Form.Group as={Row} className="FormGroup">
        <Col>
          <Form.Control
            type="date"
            ref={startDateRef}
            defaultValue={maxDate}
            max={maxDate}
            min={minDate}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="FormGroup">
        <Col>
          <Form.Control
            type="date"
            ref={endDateRef}
            defaultValue={maxDate}
            max={maxDate}
            min={minDate}
          />
        </Col>
      </Form.Group>
      <Button disabled={loading} className="Button" onClick={handleSubmit}>
        Search
      </Button>
      <div className="DivAlert">
        {error && (
          <Alert className="Alert" variant="danger">
            {error}
          </Alert>
        )}
      </div>
    </Container>
  );
}
export { maxDate };