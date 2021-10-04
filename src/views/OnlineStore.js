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
import IdeaViewCard from "../components/common/IdeaViewCard";
import IdeaVerificationForm from "../components/common/IdeaVerificationForm";

import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import dateFormat from "dateformat";

import { withTranslation } from "react-i18next";

class OnlineStore extends React.Component { 

  constructor(props) {
    super(props)

    this.state = {
      categoryName: '',
      statusName: '',
      ideaType: '',
      open: false,
      viewIdea: false,
      ideaItem: any,
    }
  }

  onCategoryChange(categoryName) {
    console.log(categoryName);
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
    const {categoryName, statusName, ideaType, open, viewIdea, ideaQuestion} = this.state;
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
    return(
      !open?(
      <Container fluid className="main-content-container px-4">
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
  (<Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title={t("EVAL_IDEA_TITLE")} subtitle="IDEA" className="text-sm-left mb-3" />
    </Row>
    {!viewIdea?
    <Row>
        <Col className="mb-4">
          {this.state.ideaItem.get("completed") == true? 
          <IdeaVerificationForm dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem}/>
        :
        <EvaluateIdeaForm dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem}/>
        }
        </Col>
    </Row>:
    <Row>
      <Col md="12" className="col d-flex align-items-center">
        <IdeaViewCard dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem} onViewIdeaPress={this.toggle.bind(this)}/>
      </Col>
    </Row>
    }
  </Container>)
    )
  }
}

export default withTranslation()(OnlineStore);
