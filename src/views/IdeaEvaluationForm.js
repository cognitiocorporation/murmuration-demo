import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, ButtonGroup, Button } from "shards-react";
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

class IdeaEvaluationForm extends React.Component { 

  constructor(props) {
    super(props)

    this.state = {
      categoryName: '',
      statusName: '',

    }
  }

  onCategoryChange(categoryName) {
    console.log(categoryName);
    this.setState({
      categoryName: categoryName
    })
  }

  onStatusChange(statusName) {
    console.log(statusName);
    this.setState({
      statusName: statusName
    })
  }

  render() {
    const {categoryName, statusName} = this.state;
    return(
      <Container fluid className="main-content-container px-4">
        <Modal size="sm" open={open} toggle={this.toggle}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>👋 Hello there!</ModalBody>
        </Modal>
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Manejo de Ideas" subtitle="IDEA" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
        <Col lassName="mb-4">
          <IdeaFilterManager onCategoryChange={this.onCategoryChange.bind(this)} onStatusChange={this.onStatusChange.bind(this)} />
        </Col>
    </Row>

    <Row>
      {/* Latest Orders */}
      <Col className="mb-4">
        <ManagementIdeaTable category={categoryName} status={statusName}/>
      </Col>
    </Row>

    <Row>
      {/* Latest Orders */}
      <Col className="mb-4">
        <EvaluationSelect setCategory={(category) => console.log(category)}/>
      </Col>
    </Row>

    <Row>
      {/* Latest Orders */}
      <Col className="mb-4">
        <ExecutionSelect  setCategory={(category) => console.log(category)}/>
      </Col>
    </Row>
  </Container>
    )
  }
}

// const OnlineStore = ({ smallStats, defaultProps }) => (
//   <Container fluid className="main-content-container px-4">
//     {/* Page Header */}
//     <Row noGutters className="page-header py-4">
//       <PageTitle title="Manejo de Ideas" subtitle="IDEA" className="text-sm-left mb-3" />
//     </Row>

//     {/* Small Stats Blocks */}
//     <Row>
//         <Col lassName="mb-4">
//           <IdeaFilterManager onCategoryChange={defaultProps.changeFilter}/>
//         </Col>
//     </Row>

//     <Row>
//       {/* Latest Orders */}
//       <Col className="mb-4">
//         <ManagementIdeaTable />
//       </Col>
//     </Row>
//   </Container>
// );

// OnlineStore.propTypes = {
//   /**
//    * The data for the small stats.
//    */
//   smallStats: PropTypes.array


// };

// OnlineStore.defaultProps = {
//    changeFilter(categoryName) {
//     console.log(categoryName);
//   }
// };

export default IdeaEvaluationForm;
