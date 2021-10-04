import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
} from "shards-react";

const IdeasTable = ({ title, ideaData }) => (
  <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup small flush className="list-group-small">
        {ideaData.map((item, idx) => (
          <ListGroupItem key={idx} className="d-flex px-3">
            <span className="text-semibold text-fiord-blue"><strong>#{item.title}</strong></span>
            <span className="mx-auto text-center text-semibold text-reagent-gray">
              {item.value}
            </span>
            <span className="text-black"><strong>{item.status}</strong></span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        {/* Time Span */}
        <Col>
          <FormSelect
            size="sm"
            value="last-week"
            style={{ maxWidth: "130px" }}
            onChange={() => {}}
          >
            <option value="last-week">Last Week</option>
            <option value="today">Today</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </FormSelect>
        </Col>

        {/* View Full Report */}
        <Col className="text-right view-report">
          {/* eslint-disable-next-line */}
          <a href="#">Full report &rarr;</a>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

IdeasTable.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  ideaData: PropTypes.array
};

IdeasTable.defaultProps = {
  title: "Ideas",
  ideaData: [
    {
      title: "000001",
      value: "3/15/2019 9:30AM",
      status:"Just Do It"
    },
    {
      title: "000002",
      value: "3/21/2019 10:00AM",
      status:"Just Do It"
    },
    {
      title: "000003",
      value: "3/22/2019 5:00PM",
      status:"Just Do It"
    },
    {
      title: "000004",
      value: "5/28/2019 2:00PM",
      status:"Just Do It"
    },
    {
      title: "000005",
      value: "12/13/2019 7:00PM",
      status:"Sometida"
    },
    {
      title: "000006",
      value: "8/05/2019 6:00AM",
      status:"Devuelta"
    },
    {
      title: "000007",
      value: "4/22/2019 9:00PM",
      status:"Devuelta"
    },
    {
      title: "000008",
      value: "9/22/2019 3:00AM",
      status:"Just Do It"
    }
  ]
};

export default IdeasTable;
