import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import LatestOrders from "../components/ecommerce/LatestOrders";
import ManageIdeaForm from "../components/common/ManageIdeaForm";
import CompleteIdeaForm from "../components/common/CompletedIdeaForm";
import { ReactComponent as PreviousIcon} from '../images/PreviousIcon.svg';
import { ReactComponent as SaveIcon} from "../images/save_icon.svg"
import { ReactComponent as SaveIconNosel } from "../images/save_nosel.svg"

import colors from "../utils/colors";

import { useTranslation, initReactI18next, withTranslation } from "react-i18next";

class SearchIdea extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      currIdea: '',
    }

    this.openEvalForm = this.openEvalForm.bind(this);
  }

  openEvalForm(item) {
    this.setState({
      currIdea: item,
      open: true
    });
  }

  render() {
    const {open} = this.state;
    const {t} = this.props;
    return(
      !open?(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle title={t("IDEA_UPDATE_TITLE")} subtitle={t("IDEA_UPDATE_SUBTITLE")} className="text-sm-left mb-3" />
    
          {/* Page Header :: Actions */}
          {/* <Col xs="12" sm="8" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/submit-idea-new">
                {t('SUBMIT')}
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                {t('SEARCH')}
              </Button>
            </ButtonGroup>
          </Col> */}
    
          {/* Page Header :: Datepicker */}
          {/* <Col sm="4" className="d-flex">
            <RangeDatePicker className="justify-content-end" />
          </Col> */}
        </Row>
    
        <Row>
          {/* Latest Orders */}
          <Col lg="12" className="mb-4">
            <LatestOrders onEvalBtnPress={(item) => this.openEvalForm(item)}/>
          </Col>
        </Row>
    
      </Container>
    ):
    (<Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title={this.state.currIdea.get("title")} subtitle={t("IDEA_MANAGE_SUBTITLE")}className="text-sm-left mb-3" />

      {/* Page Header :: Actions */}
      <Col xs="12" sm="8" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/submit-idea">
                Someter
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                Buscar
              </Button>
            </ButtonGroup>
          </Col>
    </Row>
    <Row>
        <Col lassName="mb-4">
          <ManageIdeaForm idea={this.state.currIdea}/>
        </Col>
    </Row>
    <Row>
      <PreviousIcon className="mr-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => this.setState({open: false})}></PreviousIcon>
      <SaveIconNosel className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => console.log('Go Back')}></SaveIconNosel>
    </Row>
  </Container>)
    )
  }

}

export default withTranslation()(SearchIdea);
