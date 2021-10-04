import React, {useState} from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Container, Row, Col, Button, ButtonGroup, Badge } from "shards-react";
import Parse from 'parse';
import { withTranslation } from "react-i18next";


class UserTeams extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      teams:[],
    }
  }

  componentWillMount() {
      this.getTeams()
  }

  getTeams = () => {
    const className = "EvaluationCommittee";
    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
    // const loadData = () => {
  // if (teams == '') {
    query.find()
    .then((results) => {
        console.log(results);
        this.setState({
          teams: results
        })
    }, (error) => {
      alert('Hubo un error en la busqueda de comites de evaluacion.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  // }
// }
  }

  deleteTeam = (team) => {
    team.destroy({}).then(alert('Committee was deleted succesfully.'))
    window.location.reload()
    // setTeams('')
    // loadData()
    console.log('DESTROY: ' + team)
  }

  render() {
    const {teams} = this.state;
    const {title, t} = this.props;
    console.log(title)
    return (
      <Card small className="user-teams mb-4" style={{height: '95%'}}>
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('EVAL_COMMITTEES')}</h6>
          <div className="block-handle" />
        </CardHeader>
        <CardBody className="p-0">
          <Container fluid>
            {teams != ''? teams.map((team, idx) => (
              <Row className="px-3" key={idx}>
                <Col lg="12" sm="1" className="user-teams__image my-auto p-0"> 
                {team.get("canDelete") && <ButtonGroup className="d-table ml-auto">
                  <Button opill outline size="sm" theme="danger" onClick={() => this.deleteTeam(team)}>
                    <i class="material icons">X</i>
                  </Button>
                </ButtonGroup>}
                </Col> 
                <Col className="user-teams__info pl-3">
                  <h6 className="m-0">{team.get("name")}</h6>
                  <span className="text-light">{t('NUMBER_MEMBERS')+ team.get("members").length}</span>
                  <span className="text-light">{t('EVALUATING_BY')+ team.get("value")}</span>
                </Col>
                <Col lg='2'>
                  {/* {team.get("members").map((member, idx) => (
                    <div>
                      <Badge style={{marginBottom:5}} theme="dark">{member.name}</Badge>
                    </div>
                  ))} */}
                  <Button pill outline size="sm" theme="success" onClick={() => this.props.toggle(team)}>
                   <i className="material-icons">visibility</i>
                  </Button>
                </Col>
              </Row>
            )): ''}
          </Container>
        </CardBody>
  </Card>
    );
  }
}

export default withTranslation()(UserTeams);
