import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  CardFooter,
  Row,
  Col,
  FormSelect
} from "shards-react";

import colors from "../../../utils/colors";
import SingleGoal from "./SingleGoal";

const GoalsOverview = ({ title, goalsOverviewData }) => (
  <Card small className="go-stats">
    {/* Card Header */}
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="py-0">
      {/* Goals Overview List Group */}
      <ListGroup flush>
        {goalsOverviewData.map((goal, idx) => (
          <SingleGoal key={idx} goal={goal} />
        ))}
      </ListGroup>
    </CardBody>

    {/* Footer */}
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
          <a href="#">View full report &rarr;</a>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

GoalsOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The goals overview data.
   */
  goalsOverviewData: PropTypes.array
};

GoalsOverview.defaultProps = {
  title: "Goals Overview",
  goalsOverviewData: [
    {
      id: "000001",
      department: "HR",
      category: "Seguridad",
      conversionRate: "75%",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [75, 25],
            backgroundColor: [
              colors.primary.toRGBA(0.9),
              colors.athensGray.toRGBA(0.8)
            ]
          }
        ],
        labels: ["Label 1", "Label 2"]
      }
    },
    {
      id: "000002",
      department: "Ingenieria",
      category: "Calidad",
      conversionRate: "50%",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [50, 50],
            backgroundColor: [
              colors.warning.toRGBA(0.9),
              colors.athensGray.toRGBA(0.8)
            ]
          }
        ],
        labels: ["Label 1", "Label 2"]
      }
    },
    {
      id: "000003",
      department: "Salud",
      category: "Productividad",
      conversionRate: "50%",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [50, 50],
            backgroundColor: [
              colors.warning.toRGBA(0.9),
              colors.athensGray.toRGBA(0.8)
            ]
          }
        ],
        labels: ["Label 1", "Label 2"]
      }
    },
    {
      id: "000004",
      department: "Mercadeo",
      category: "Mas Comunes",
      conversionRate: "25%",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [25, 75],
            backgroundColor: [
              colors.salmon.toRGBA(0.9),
              colors.athensGray.toRGBA(0.8)
            ]
          }
        ],
        labels: ["Label 1", "Label 2"]
      }
    },
  ]
};

export default GoalsOverview;
