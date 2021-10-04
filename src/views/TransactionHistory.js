import React from "react";
import { NavLink } from "react-router-dom";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import dateFormat from "dateformat";
import {
  Badge,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

import Parse from 'parse';

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import getTransactionHistoryData from "../data/transaction-history-data";

import IdeaViewCard from "../components/common/IdeaViewCard";

import {withTranslation} from "react-i18next";


class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 5,
      tableData: [],
      viewIdea: false,
      ideaItem: '',
      data: '',
    };

    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
  }

  componentWillMount() {
    const tableData = getTransactionHistoryData();

    this.setState({
      ...this.state,
      tableData
    });

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(tableData, ["desc", "cat", "prop"], {
      caseSensitive: false
    });
  }

  initSearcher() {
    this.searcher = new FuzzySearch(this.state.tableData, ["desc", "cat", "prop"], {
      caseSensitive: false
    });
  }

  componentWillMount() {
    this.fetchIdeas();
  }

  // LOAD DATA
  fetchIdeas() {
    const className = "Idea";
    const Idea = Parse.Object.extend(className);
    // const evalCriteria = await this.getEvalCriteria();
    // console.log(multipleQueries);
    var query = new Parse.Query(Idea);

    // query.equalTo("status", "SOMETIDA");
    query.equalTo("needsEvaluation", false);
    query.descending("updatedAt");

    query.find()
    .then((results) => {
      var myData = results.map(function (idea) {
        var newData = {};
        newData['id'] = idea.get("num");
        newData['desc'] = idea.get("title");
        newData['cat'] = idea.get("category");
        newData['prop'] = idea.get("proponentName"); 
        newData['status'] = idea.get("status"); 
        console.log(newData);
        return newData
      })
      
      // console.log(myData);
      // results.map((elem) => 
        
        
        // {"id": 245,
        // "desc": "Esta liqueando la substeacion 24...",
        // "cat": "Accion Inmediata",
        // "prop": "Bryan Short",
        // "status": "Complete",
        // "total": "$6541.92"
        // }
      // );
        this.setState({
            tableData: myData,
            data: results
        }, this.initSearcher);
    }, (error) => {
      alert('Hubo un error en la busqueda. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      Cancelled: "danger",
      Complete: "success",
      Pending: "warning"
    };

    return `text-${statusMap[status]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }

  /**
   * Handles the global search.
   */
  handleFilterSearch(e) {
    this.setState({
      ...this.state,
      tableData: this.searcher.search(e.target.value)
    });
  }

  /**
   * Mock method for editing transactions.
   */
  handleItemEdit(row) {
    alert(`Editing transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {
    alert(`Deleting transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemConfirm(row) {
    this.setState({
      ideaItem:  this.state.data[row.index],
      viewIdea: !this.state.viewIdea
    })
    // alert(`Confirming transaction "${row.original.id}"!`);
    console.log(row)
    // console.log(this.state.tableData[0])
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.id}"!`);
  }

  dismissModal() {
    this.setState({
      viewIdea: !this.state.viewIdea
    });
  }

  render() {
    const { tableData, pageSize, pageSizeOptions, viewIdea } = this.state;
    const {t} = this.props;
    const tableColumns = [
      {
        Header: "#",
        accessor: "id",
        maxWidth: 60,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_DESCRIPTION"),
        accessor: "desc",
        className: "text-center",
        minWidth: 150,
      },
      {
        Header: t("TRANSACTION_CATEGORY"),
        accessor: "cat",
        maxWidth: 150,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_PROPONENT"),
        accessor: "prop",
        maxWidth: 150,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_STATUS"),
        accessor: "status",
        // maxWidth: 100,
        Cell: row => (
          <Badge pill theme={getBadgeType(row.original.status)}>
            {row.original.status}
          </Badge>
          // <span className={this.getStatusClass(row.original.status)}>
          //   {row.original.status}
          // </span>
        ),
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_ACTIONS"),
        accessor: "actions",
        maxWidth: 140,
        minWidth: 140,
        sortable: false,
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
               <i className="material-icons">visibility</i>
            </Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={t("TRANSACTION_EVALUATED")} subtitle={t("TRANSACTION_MANAGE")}className="text-sm-left mb-3" />
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
        {viewIdea == false ?
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                {/* Filters :: Page Size */}
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>{t('SHOW')}</span>
                  <FormSelect
                    size="sm"
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size + ' ' + t('ROWS')} 
                      </option>
                    ))}
                  </FormSelect>
                </Col>

                {/* Filters :: Search */}
                <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
              />
            </div>
          </CardBody>
        </Card>
        :
        <Row>
           <Col md="12" className="col d-flex align-items-center">
              <IdeaViewCard dismissModal={this.dismissModal.bind(this)} ideaItem={this.state.ideaItem} onViewIdeaPress={this.dismissModal.bind(this)}/>
           </Col>
        </Row>
        }
      </Container>
    );
  }
}

function getBadgeType(itemStatus) {
  const statusMap = {
    Complete: "success",
    Saved: "warning",
    Canceled: "danger"
  };

  return statusMap[itemStatus];
}

export default withTranslation()(TransactionHistory);
