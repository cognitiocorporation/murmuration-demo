/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
} from "shards-react";
import LoginFormContainer from "../components/auth/LoginFormContainer";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container fluid className="main-content-container h-100 px-4">
        <br/>
        <br/>
        <br/>
        <br/>
        <Row noGutters className="h-100 flex-center">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Row className="flex-center">
              <img
                    id="main-logo"
                    className="d-inline-block align-top"
                    style={{ maxWidth: "90%", maxHeight: '90px', marginBottom: '20px', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                    src= {'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Baxter.svg/1200px-Baxter.svg.png'}
                    alt="Murmuratto"
                />
            </Row>
            <Card>
              <CardBody>
                {/* Logo */}
                {/* <h3 className="text-center mb-4">Murmuration</h3> */}
                <div className="text-center" style={{alignContent: 'center', justifyContent: 'center', }}>
                  <img
                      id="main-logo"
                      className="d-inline-block align-top"
                      style={{ maxWidth: "90%", maxHeight: '90px', marginBottom: '20px', alignSelf: 'center', marginLeft: 'auto' }}
                      src= {'https://goswiftmedia.com/wp-content/uploads/2021/04/BAXTER_LOGO_MURMURATION.001.jpeg'}
                      alt="Murmuratto"
                  />
                </div>
                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Access Your Account
                </h5>

                {/* Form Fields */}
                <LoginFormContainer handleAuth={this.props.handleAuth}/>
              </CardBody>
            </Card>

            {/* Meta Details */}
            {/* <div className="auth-form__meta d-flex mt-4">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div> */}
          </Col>
        </Row>
        <div className="d-table m-auto">
          <br/>
          <small>powered by</small>
          <br/>
          <a href="#">
          
            <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1 ml-3"
                    style={{ maxWidth: "140px" }}
                    // src= {require("../images/logo_murmuration.png")}
                    src={'http://mymurmuration.theswiftstudio.com/wp-content/uploads/2022/05/image001-1.png'}
                    alt="Murmuratto"
                  />
          </a>
        </div>
      </Container>
    )
  }
}

export default Login;
