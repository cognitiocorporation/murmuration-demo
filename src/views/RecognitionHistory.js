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
import {withTranslation} from "react-i18next"

class RecognitionHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 5,
      tableData: [],
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
    const className = "Recognition";
    const Idea = Parse.Object.extend(className);
    // const evalCriteria = await this.getEvalCriteria();
    // console.log(multipleQueries);
    var query = new Parse.Query(Idea);

    // query.equalTo("status", "SOMETIDA");
    query.equalTo("needsRecognition", false);
    query.descending("updatedAt");

    query.find()
    .then((results) => {
      var myData = results.map(function (idea) {
        var newData = {};
        newData['id'] = idea.get("ideaNum");
        newData['type'] = idea.get("recognitionType");
        newData['employeeNum'] = idea.get("employeeNum");
        newData['employeeName'] = idea.get("employeeName"); 
        newData['points'] = idea.get("points"); 
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
    alert(`Confirming transaction "${row.original.id}"!`);
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.id}"!`);
  }

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
    const { t } = this.props;
    const tableColumns = [
      {
        Header: "IDEA #",
        accessor: "id",
        maxWidth: 60,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_EMPLOYEE_NAME"),
        accessor: "employeeName",
        className: "text-center",
        minWidth: 150,
      },
      {
        Header: t("TRANSACTION_EMPLOYEE_NUM"),
        accessor: "employeeNum",
        maxWidth: 150,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_RECOGNITION_TYPE"),
        accessor: "type",
        maxWidth: 150,
        className: "text-center"
      },
      {
        Header: t("TRANSACTION_EMPLOYEE_POINTS"),
        accessor: "points",
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
            {/* <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
            <i class="fas fa-edit"></i>
            </Button> */}
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={t("TRANSACTION_VIEWRECOGNITION")} subtitle={t("TRANSACTION_RECOGNITION")} className="text-sm-left mb-3" />
          {/* <Col xs="12" sm="8" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/entradas-reconocimiento">
              {t("ENTRIES")}
              </Button>
              <Button theme="white" tag={NavLink} to="/historial-reconocimiento">
              {t("HISTORY")}
              </Button>
            </ButtonGroup>
           </Col> */}
        </Row>
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

export default withTranslation()(RecognitionHistory);
