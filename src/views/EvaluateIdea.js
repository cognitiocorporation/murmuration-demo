import React from "react";
import PropTypes, { any } from "prop-types";
import { Container, Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import SmallStats from "../components/common/SmallStats";
import CountryReports from "../components/common/CountryReports";
import SalesReport from "../components/ecommerce/SalesReport";
import SalesByCategory from "../components/ecommerce/SalesByCategory";
import LatestOrders from "../components/ecommerce/LatestOrders";
import IdeaFilterManager from "../components/administration/IdeaFilterManager"
import ManagementIdeaTable from "../components/administration/ManagementIdeaTable"

import colors from "../utils/colors";
import EvaluationSelect from "../components/common/EvaluationSelect";
import ExecutionSelect from "../components/common/ExecutionSelect";
import EvaluateIdeaForm from "../components/common/EvaluateIdeaForm";
import IdeaViewCardNew from "../components/common/IdeaViewCardNew";
import IdeaVerificationForm from "../components/common/IdeaVerificationForm";
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"
import { ReactComponent as SubmitIcon} from "../images/submit_new_new.svg"
import { ReactComponent as PreviousIcon } from "../images/PreviousIcon.svg"
import { ReactComponent as NextIcon } from "../images/NextIcon.svg"
import { ReactComponent as NextIconValid } from "../images/NextIconSelected.svg"
import { ReactComponent as HomeIcon } from "../images/home.svg"

import { v4 as uuidv4 } from 'uuid';

import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import dateFormat from "dateformat";

import { withTranslation } from "react-i18next";
import ThankYouEvaluate from "../components/common/ThankYouEvaluate";

class EvaluateIdea extends React.Component { 

  constructor(props) {
    super(props)

    this.state = {
      categoryName: '',
      statusName: '',
      ideaType: '',
      open: false,
      viewIdea: false,
      ideaItem: any,
      title: 'Evaluate',
      ideaStage:0,
      canGoNext: true,
      evaluationResponse: {
        status: '',
        economicImpact: '',
        timeFrame: '',
        recurringImpact: false,
        comments: '',
        ideaOwner: '',
        ideaCoach: ''
      },
      canSubmit: false,
    }
  }

  onCategoryChange(categoryName) {
    console.log(categoryName)
    var selectedCategoryName = categoryName
    if (categoryName == "All" || categoryName == "Todas") {
      selectedCategoryName = ""
    }

    this.setState({
      categoryName: selectedCategoryName
    })
  }

  onStatusChange(statusName) {
    console.log(statusName);
    var selectedStatusName = ""
    if (statusName == "Submitted" || statusName == 'Sometidas') {
      selectedStatusName = "SOMETIDA"
    } else if (statusName == "Done" || statusName == 'Completadas') {
      selectedStatusName = "problema"
    }
    this.setState({
      statusName: selectedStatusName
    })
  }

  onTypeChange(ideaType) {
    console.log(ideaType);
    var selectedIdeaType = ""
    if (ideaType == "innovation" || ideaType == 'innovacion') {
      selectedIdeaType = "innovacion"
    } else if (ideaType == "problem" || ideaType == 'problema') {
      selectedIdeaType = "problema"
    }

    this.setState({
      ideaType: selectedIdeaType
    })
  }

  onQuestionChange(question) {
    console.log(question);
    // var selectedIdeaType = ""
    // if (ideaType == "innovation" || ideaType == 'innovacion') {
    //   selectedIdeaType = "innovacion"
    // } else if (ideaType == "problem" || ideaType == 'problema') {
    //   selectedIdeaType = "problema"
    // }

    this.setState({
      ideaQuestion: question
    })
  }

  toggle(item) {
    console.log(item);
    this.setState({
      open: !this.state.open,
      ideaItem: item,
      viewIdea: false
    });
  }

  showIdea(item) {
      this.setState({
      open: true,
      ideaItem: item,
      viewIdea: true,
    });
  }

  dismissModal() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {canSubmit, categoryName, statusName, ideaType, open, viewIdea, ideaQuestion, ideaStage, canGoNext} = this.state;
    const { t } = this.props;
    const tableColumns = [
      {
        Header: "#",
        accessor: "id",
        maxWidth: 60,
        className: "text-center"
      },
      {
        Header: "Titulo",
        accessor: "date",
        className: "text-center",
        minWidth: 200,
        Cell: row =>
          dateFormat(new Date(row.original.date), "dddd, mmmm dS, yyyy")
      },
      {
        Header: "Categoria",
        accessor: "customer",
        className: "text-center"
      },
      {
        Header: "Proponente",
        accessor: "products",
        maxWidth: 100,
        className: "text-center"
      },
      {
        Header: "Estatus",
        accessor: "status",
        maxWidth: 100,
        Cell: row => (
          <span className={this.getStatusClass(row.original.status)}>
            {row.original.status}
          </span>
        ),
        className: "text-center"
      },
      {
        Header: "Acciones",
        accessor: "actions",
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
              <i className="material-icons">visibility</i>
            </Button>
            <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
            <i class="fas fa-edit"></i>
            </Button>
          </ButtonGroup>
        )
      }
    ];

    const changeIdeaStage = () => {
      const { ideaStage, evaluationResponse } = this.state;
      const newStage = ideaStage + 1
  
      if (newStage == 0) {
        this.setState({title: 'Evaluate', ideaStage: newStage})
      } else if (newStage == 1) {
        // setTitle('Idea > Select Idea Type')
        this.setState({title: 'Evaluate > Next Step', ideaStage: newStage})
        
        // Check for reqs
        if (!evaluationResponse.economicImpact || !evaluationResponse.timeFrame) {
          changeBtnStatus(false)
        }


      } else if (newStage == 2) {
        // setTitle('Idea > Innovati n > Idea Details')
        this.setState({title: 'Evaluate > Next Step > Additional Details', ideaStage: newStage})
        
        if (!evaluationResponse.ideaOwner) {
          changeBtnStatus(false)
        }
      } else if (newStage == 3) {
        // setTitle('Idea > Innovation > Idea Details > Done')
        this.setState({title: 'Evaluate > Next Step > Additional Details > Thank You', canSubmit: true})
      } else {
        // setTitle('Welcome back, ' + username+ '!')
        this.dismissModal()
        this.setState({title: 'Evaluate', ideaStage: 0})
      }
    }

    const changeIdeaStageBack = () => {
      const { ideaStage, evaluationResponse } = this.state;
      const newStage = ideaStage - 1
      
      if (newStage == -1) {
        this.setState({title: 'Evaluate', ideaStage: 0})
        this.dismissModal()
      } else if (newStage == 0) {
        // setTitle('Idea > Select Idea Type')
        this.setState({title: 'Evaluate ', ideaStage: newStage})
        
        // Check for reqs
        if (!evaluationResponse.economicImpact || !evaluationResponse.timeFrame) {
          changeBtnStatus(false)
        }

        changeBtnStatus(true)
      } else if (newStage == 1) {
        // setTitle('Idea > Innovati n > Idea Details')
        this.setState({title: 'Evaluate > Next Step', ideaStage: newStage})
        if (evaluationResponse.economicImpact && evaluationResponse.timeFrame) {
          changeBtnStatus(true)
        }
      } else if (newStage == 2) {
        // setTitle('Idea > Innovation > Idea Details > Done')
        this.setState({title: 'Evaluate > Next Step > Additional Details', ideaStage: newStage})
        // if (!evaluationResponse.ideaOwner) {
        //   changeBtnStatus(false)
        // }
      } else {
        // setTitle('Welcome back, ' + username+ '!')
        this.setState({title: 'Evaluate', ideaStage: 0})
      }
    }

    const changeBtnStatus = (status) => {
      this.setState({canGoNext: status})
    }

    const setFinished = () => {
      this.setState({ideaStage: 3})
    }

    return(
      !open?(
      <Container fluid className="main-content-container px-4" style={{backgroundColor: 'white'}}>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
        <PageTitle title={t("TRANSACTION_MANAGE")} subtitle="IDEA" className="text-sm-left mb-3" />

        {/* Page Header :: Actions */}
        <Col xs="12" sm="8" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
            <Button theme="white" tag={NavLink} to="/idea-management">
                {t('ENTRIES')}
            </Button>
            <Button theme="white" tag={NavLink} to="/historial">
                {t('HISTORY')}
            </Button>
            </ButtonGroup>
        </Col>
        </Row>

        {/* Small Stats Blocks */}
        <Row>
            <Col lassName="mb-4">
              <IdeaFilterManager onCategoryChange={this.onCategoryChange.bind(this)} onStatusChange={this.onStatusChange.bind(this)} onTypeChange={this.onTypeChange.bind(this)}  onQuestionChange={this.onQuestionChange.bind(this)}/>
            </Col>
        </Row>

        <Row>
        {/* Latest Orders */}
        <Col className="mb-4">
            <ManagementIdeaTable category={categoryName} status={statusName} ideaType={ideaType} filterQuestion={ideaQuestion} onEditActionPress={this.toggle.bind(this)} onViewIdeaPress={this.showIdea.bind(this)}/>
        </Col>
        </Row>

    </Container>)
    :
    (<Container fluid className="main-content-container px-4" style={{backgroundColor: 'white'}}>
        <Row>
        <Col md="10" lg="10" className="mt-4 mx-auto">
        {/* <PageTitle title={t('Welcome back, Angel')} subtitle=" " className="text-sm-left" /> */}
        <Row>
          <Col md="12" lg="12">
            <h3 className="m-auto" style={{fontWeight: 600, color: '#303030'}}>{this.state.title}</h3>
          </Col>
          
          {/* <Col xs="12" md="2" lg="2" className="col d-flex align-items-center ml-auto">
            
            <div>
              <h6 className="m-0" style={{color: '#303030'}}>Idea # </h6>
            </div>
            <h4 className="m-0" style={{fontWeight: 600, color: '#303030'}}>{uuidv4().substring(0,4)}</h4>
          </Col> */}
        </Row>
        <Row>
          <Col>
            <DivisorBarIcon></DivisorBarIcon>
          </Col>
        </Row>
      </Col>
        </Row>
        {!viewIdea?
        <Row>
            <Col lg="10" className="m-auto">
            {this.state.ideaItem.get("completed") == true? 
            <IdeaVerificationForm dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem}/>
            :
            <EvaluateIdeaForm dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem}/>
            }
            </Col>
        </Row>:
        <Row>
        <Col lg="10" className="m-auto">
            {ideaStage != 3 && <IdeaViewCardNew canSubmit={canSubmit} setFinishedSaving={() => setFinished()} evaluationData={this.state.evaluationResponse} dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem} changeStatus={(status) => changeBtnStatus(status)} ideaStage={this.state.ideaStage} onViewIdeaPress={this.toggle.bind(this)}/>}
            {ideaStage == 3 && <ThankYouEvaluate idea={this.state.ideaItem}/>}
        </Col>
        </Row>
        }
        <Row>
            <Col lg="6" className="mb-2 mr-auto">

                {/* Submit Icon States */}
                {ideaStage < 3 && <PreviousIcon className="functionalButton mr-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStageBack()}></PreviousIcon>}
                {/* {ideaStage == 0 && !canGoNext && <SubmitIconNosel className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></SubmitIconNosel>}


                {ideaStage == 1  && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></NextIcon>}
                {ideaStage == 2  && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></NextIcon>}
                {ideaStage == 3  && <HomeIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>} */}
            </Col>
            <Col lg="6" className="mb-2 ml-auto">

                {/* Submit Icon States */}
                {ideaStage < 3 &&  !canGoNext && <NextIcon className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} ></NextIcon>}
                {ideaStage < 3 &&  canGoNext && <NextIconValid className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></NextIconValid>}
                {ideaStage == 3  && <HomeIcon className="functionalButton ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>}
                {/* {ideaStage == 0 && !canGoNext && <SubmitIconNosel className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></SubmitIconNosel>}
                

                {ideaStage == 1  && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></NextIcon>}
                {ideaStage == 2  && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></NextIcon>}
                {ideaStage == 3  && <HomeIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>} */}
            </Col>
        </Row>
  </Container>)
    )
  }
}

export default withTranslation()(EvaluateIdea);
