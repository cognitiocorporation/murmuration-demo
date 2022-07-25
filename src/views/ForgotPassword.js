import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import Parse from 'parse';


const Register = () => {
  const [email, setEmail] = useState('')
  
  const changeEmail = (event) => {
    const email = event.target.value
    setEmail(email)
  }

  const sendResetEmail = () => {
    Parse.User.requestPasswordReset(email, {}).then(() => {
      alert('Plese check your email for further instructions.')
    }).catch((error) => {
      alert(error)
    })
  }

  return(
  <Container fluid className="main-content-container h-200 px-4">
    <Row noGutters className="h-200 flex-center">
      <Col lg="3" md="5" className="auth-form mx-auto my-auto flex-center">
        <Card className="mt-4">
          <CardBody>
            {/* Logo */}
            {/* <img
              className="auth-form__logo d-table mx-auto mb-3"
              src={require("../images/shards-dashboards-logo.svg")}
              alt="Shards Dashboards - Register Template"
            /> */}

            {/* Title */}
            <h5 className="auth-form__title text-center mb-4">
              Reset Password
            </h5>

            {/* Form Fields */}
            <Form>
              <FormGroup>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <FormInput
                  type="email"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => changeEmail(event)}
                />
                <small className="form-text text-muted text-center">
                  You will receive an email with a unique token and link.
                </small>
              </FormGroup>
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                onClick={() => sendResetEmail()}
              >
                Reset Password
              </Button>
            </Form>
          </CardBody>
        </Card>

        {/* Meta Details */}
        <div className="auth-form__meta d-flex mt-4">
          <Link to="/login" className="mx-auto">
            Take me back to login.
          </Link>
        </div>
      </Col>
    </Row>
  </Container>
)};

export default Register;
