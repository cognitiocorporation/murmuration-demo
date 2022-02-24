import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";
import Parse from 'parse';

import PageTitle from "../components/common/PageTitle";
import SubmitIdeaForm from "../components/common/SubmitIdeaForm";
import { v4 as uuidv4 } from 'uuid';

import colors from "../utils/colors";

import { ReactComponent as SubmitIcon } from "../images/submit.svg"
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"

import { useTranslation, initReactI18next } from "react-i18next";


function SubmitIdeaNew(smallStats) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  let currUser = Parse.User.current();
  // this.getUserName()
  const getUserName = async (user) => {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", user.id);
    const results = await query.find();
    const firstName = results[0].get('firstName');
    const lastName = results[0].get('lastName');
    const fullName = firstName + ' ' + lastName;
    const email = results[0].get("username")
    console.log(email)
    
    // return firstName
    setUsername(firstName)
  }

  useEffect(() => {
    // Update the document title using the browser API
    getUserName(currUser)
  });

  return (
  <Container fluid className="main-content-container px-4" style={{backgroundColor: 'white'}}>
    <Row>
      {/* Page Header :: Title */}
      <Col md="10" lg="10" className="mt-4 mx-auto">
        {/* <PageTitle title={t('Welcome back, Angel')} subtitle=" " className="text-sm-left" /> */}
        <Row>
          <Col md="8" lg="8">
            <h3 className="m-auto" style={{fontWeight: 600, color: '#303030'}}>Welcome back, {username}!</h3>
          </Col>
          
          <Col xs="12" md="2" lg="2" className="col d-flex align-items-center ml-auto">
            {/* <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/submit-idea">
                {t('SUBMIT')}
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                {t('SEARCH')}
              </Button>
            </ButtonGroup> */}
            <div>
              <h6 className="m-0" style={{color: '#303030'}}>Idea # </h6>
            </div>
            <h4 className="m-0" style={{fontWeight: 600, color: '#303030'}}>{uuidv4().substring(0,4)}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <DivisorBarIcon></DivisorBarIcon>
          </Col>
        </Row>
      </Col>
      {/* Page Header :: Actions */}
      
    </Row>
    
    {/* Divider */}
    {/* <Col xs="12" md="12" style={{height: 1, width: '100%', backgroundColor: 'black', opacity: 0.2}} className="col d-flex align-items-center"></Col> */}

    <Row>
      {/* Latest Orders */}
      <Col lg="10" className="mb-4 m-auto">
        <SubmitIdeaForm />     
      </Col>
    </Row>
    <Row>
      <SubmitIcon className="ml-auto d-block" style={{minWidth: 120, maxWidth:120}}></SubmitIcon>
    </Row>
  </Container>
  )}

SubmitIdeaNew.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

SubmitIdeaNew.defaultProps = {
  signedIn: true,
  smallStats: [
    {
      label: "Ideas Submitted",
      value: "18",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Ideas Accepted",
      value: "7",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: "Ideas in Progress",
      value: "4",
      percentage: "3.71%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
  ]
};

export default SubmitIdeaNew;
