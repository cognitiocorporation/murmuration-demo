import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import LatestOrders from "../components/ecommerce/LatestOrders";
import ManageIdeaForm from "../components/common/ManageIdeaForm";
import IdeaChangeHistory from "../components/common/IdeaHistory";
import CompleteIdeaForm from "../components/common/CompletedIdeaForm";
import { ReactComponent as PreviousIcon} from '../images/PreviousIcon.svg';
import { ReactComponent as SaveIcon} from "../images/save_icon.svg"
import { ReactComponent as SaveIconNosel } from "../images/save_nosel.svg"
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"

import colors from "../utils/colors";

import { useTranslation, initReactI18next, withTranslation } from "react-i18next";
import IdeaHistory from "../components/common/IdeaHistory";
import EmployeeActivityDashboard from "./EmployeeActivityDashboard";

class SearchIdea extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      currIdea: '',
      canGoNext: false,
      canSubmit: false,
      canEdit: false,
    }

    this.openEvalForm = this.openEvalForm.bind(this);
  }

  openEvalForm(item) {
    this.setState({
      currIdea: item,
      open: true,
    });
  }

  changeBtnStatus(status) {
    this.setState({
      canGoNext: status
    })
  }

  render() {
    const {open, canGoNext, canSubmit, canEdit } = this.state;
    const {t} = this.props;
    return(
      !open?(
      <Container fluid className="main-content-container px-4">
        <Row>
            {/* Page Header :: Title */}
            <Col md="10" lg="10" className="mt-4 mx-auto">
                <Row>
                <Col md="12" lg="12">
                    <h3 className="m-auto" style={{fontWeight: 600, color: '#303030'}}>Your Ideas at Work</h3>
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
  
        <Row>
          {/* Latest Orders */}
          <Col lg="10" className="mx-auto">
            <EmployeeActivityDashboard/>
          </Col>
        </Row>

        <Row className="mb-4">
            {/* Page Header :: Title */}
            <Col md="10" lg="10" className="mt-4 mx-auto">
                <Row>
                <Col md="12" lg="12">
                    <h3 className="m-auto" style={{fontWeight: 600, color: '#303030'}}>Your Idea History</h3>
                </Col>
                </Row>
                <Row>
                
                </Row>
            </Col>
            {/* Page Header :: Actions */}
        
        </Row>

        <Row>
          {/* Latest Orders */}
          <Col lg="10" className="mt-4 mb-4 mx-auto">
            <LatestOrders onEvalBtnPress={(item) => this.openEvalForm(item)}/>
          </Col>
        </Row>
    
      </Container>
    ):
    (<Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title={this.state.currIdea.get("title")} subtitle={t("IDEA_MANAGE_SUBTITLE")}className="text-sm-left mb-3" />

      {/* Page Header :: Actions */}
      {/* <Col xs="12" sm="8" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/submit-idea">
                Someter
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                Buscar
              </Button>
            </ButtonGroup>
          </Col> */}
    </Row>
    <Row>
        <Col lassName="mb-4">
          <ManageIdeaForm  setCanEdit={(canEdit) => this.setState({canEdit: canEdit})} idea={this.state.currIdea} changeStatus={(status) => this.changeBtnStatus(status)} canSubmit={canSubmit} closeIdea={() => this.setState({open: false})}/>
        </Col>
    </Row>
    <Row>
        <Col lassName="mb-4">
          <h6>Activity History: </h6>
          <IdeaChangeHistory idea={this.state.currIdea} changeStatus={(status) => this.changeBtnStatus(status)} canRefresh={canSubmit} closeIdea={() => this.setState({open: false})}/>
        </Col>
    </Row>
    
    <Row>
      <PreviousIcon className="functionalButton mr-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => this.setState({open: false})}></PreviousIcon>
      {canEdit && !canGoNext && <SaveIconNosel className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => console.log('Go Back')}></SaveIconNosel>}
      {canEdit && canGoNext && <SaveIcon className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => this.setState({canSubmit: true})}></SaveIcon>}
    </Row>
  </Container>)
    )
  }

}

export default withTranslation()(SearchIdea);
