import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import SubmitIdeaForm from "../components/common/SubmitIdeaForm_old";

import colors from "../utils/colors";

import { useTranslation, initReactI18next } from "react-i18next";


function SubmitIdea(smallStats) {
  const { t } = useTranslation();
  return (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      {/* Page Header :: Title */}
      <PageTitle title={t('SUBMIT_IDEA')} subtitle="Idea" className="text-sm-left mb-3" />

      {/* Page Header :: Actions */}
      <Col xs="12" md="8" className="col d-flex align-items-center">
        <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
          <Button theme="white" tag={NavLink} to="/submit-idea">
            {t('SUBMIT')}
          </Button>
          <Button theme="white" tag={NavLink} to="/search-idea">
            {t('SEARCH')}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>

    <Row>
      {/* Latest Orders */}
      <Col lg="12" className="mb-4">
        <SubmitIdeaForm />     
      </Col>
    </Row>
  </Container>
  )}

SubmitIdea.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

SubmitIdea.defaultProps = {
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

export default SubmitIdea;