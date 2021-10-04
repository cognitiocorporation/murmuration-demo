import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormTextarea,
  FormRadio,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Button
} from "shards-react";
import Parse from 'parse';
import { useTranslation, initReactI18next, withTranslation } from "react-i18next";
import Select from 'react-select';

class CreateCommiteeForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      departments: [],
      members: [],
      selectedRes: null,
      required: false,
      questionText: '',
      committees: [{"name":"", "email": "" }],
      category: 'Todas', 
      evaluationType: '',
      value: '',
      options: [],
      selectedMembers: []
    }
  }

  componentDidMount() {
    this.fetchNewData();
    this.fetchDepartments();
    this.fetchCategoryData();
  }

  fetchNewData() {
    const className = "IdeaCategory";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);

    query.find()
    .then((results) => {
      console.log('RESULTS: ' + results);
        this.setState({
            data: results
        });
    }, (error) => {
        this.setState({
            data: []
        });
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  fetchDepartments() {
    const className = "IdeaDepartment";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);

    query.find()
    .then((results) => {
      console.log('RESULTS: ' + results);
        this.setState({
            departments: results
        });
    }, (error) => {
        this.setState({
            departments: []
        });
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  fetchCategoryData() {
    const className = "User";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
    query.limit(1000)
    query.ascending("firstName").find()
    .then((results) => {
        const options = []
        {
            results.map((result, idx) => options.push({"value":result, "label":this.getFullName(result)}))
        }
        
        this.setState({
            options: options
        });
        // this.props.setResponsible(results[0], -1);
    }, (error) => {
        this.setState({
            options: []
        });
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  getFullName(result) {
    if (result) {
        return result.get("firstName") + ' ' + result.get("lastName");
    }
  }

  handleCategoryChange(event) {
    console.log(event.target.value);
    this.setState({evaluationType: 'category', value: event.target.value});
  }

  handleDepartmentChange(event) {
    console.log(event.target.value);
    this.setState({evaluationType: 'department', value: event.target.value});
  }

  handleManagementChange(event) {
    console.log(event.target.value);
    this.setState({evaluationType: 'manage', value: event.target.value});
  }

  handleRequiredChange(event) {
    console.log(event.target.value);
    this.setState({required: !this.state.required});
    // this.setState({value: this.props.value});
  }

  handleQuestionTextChange(event) {
    console.log(event.target.value);
    this.setState({questionText: event.target.value});
    // this.setState({value: this.props.value});
  }

  handleMemberTextChange(idx, event) {
    const {committees} = this.state;
    const value = event.target.value;
    const newCommittees = committees.slice()
    newCommittees[idx].name = value
    this.setState({committees: newCommittees});
    // this.setState({value: this.props.value});
  }

  handleMemberEmailTextChange(idx, event) {
    const {committees} = this.state;
    const value = event.target.value;
    const newCommittees = committees.slice()
    newCommittees[idx].email= value
    this.setState({committees: newCommittees});
    // const newCommittees = committees.slice()
    // newCommittees[idx].email = value
    // this.setState({committees: newCommittees});
  }

  addMembers(members) {
    // const { committees } = this.state;
    // const oldComms = commitees; 
    // oldComms.push({"name":" ", "email": " " });
    console.log(members)
  //   this.setState(prevState => ({
  //     committees: prevState.committees.concat({"name":" ", "email": " " })
  // }));
    this.setState({selectedMembers: members});
    // this.setState({value: this.props.value});
  }


  resetForm() {
    this.setState({
      required: false,
      questionText: '',
      category: 'Todas',
    });
  }

  handleSubmit(event) {
    const {committees, value, evaluationType, questionText, selectedMembers} = this.state;

    const className = "EvaluationCommittee";
    const PropertyItem = Parse.Object.extend(className);
    const newItem= new PropertyItem();
    var parseObjs = []

    if (evaluationType == '' || value == '' || '') {
      alert('Por favor asegurese de escoger el respectivo metodo de evaluacion.');
    } else {
      newItem.set("members", selectedMembers);
      newItem.set("evaluationType", evaluationType);
      newItem.set("value", value);
      newItem.set("name", questionText);
      newItem.set("canDelete", true);
      Parse.Object.saveAll([newItem], {useMasterKey: true})
      .then((item) => {
      // Execute any logic that should take place after the object is saved.
        if (evaluationType == 'manage') {
            selectedMembers.forEach((obj) => {
              const member = obj.value
              if (member.get("role") != 'super_user') {
                const type = this.getType(value)

                if (value == 'PMO') {
                  member.set("pmo", true);
                }

                member.set("role", type);
                parseObjs.push(member);
              }
              
          });
        } else {
          selectedMembers.forEach((obj) => {
            const member = obj.value
            if (member.get("role") != 'super_user') {

              var evaluationCriteria = member.get("evaluationCriteria")
              evaluationCriteria.push(value)
              member.set("role", 'evaluation');
              member.set("evaluationCriteria", evaluationCriteria);
              parseObjs.push(member);
            }
          });
        }
        Parse.Object.saveAll(parseObjs, {useMasterKey: true}).then(() => {
          this.resetForm()
          alert('¡La operacion fue exitosa!');
        });
        }, (error) => {
          console.log(error)
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
    }
  }

  getType(value) {
    switch(value) {
      case 'Evaluación':
        // code block
        return 'evaluation'
      case 'Verificación':
        // code block
        return 'verification'
      case 'Reconocimiento':
        // code block
        return 'recognition'
      case 'PMO':
        // code block
        return 'evaluation'
      default:
        // code block
    }
  }

  changeResponsibilityType(responsibility) {
    this.setState({
      selectedRes: responsibility
    });
  }

  render() {
    const { required, questionText, category, data, committees, options, selectedMembers } = this.state;
    const {t} = this.props
    
    return(
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('EVAL_COMMITTEE_NEW')}</h6> 
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <label htmlFor="feInputAddress2">{t('EVAL_COMMITTEE')}</label>
                    <FormInput value={questionText} onChange={this.handleQuestionTextChange.bind(this)}
                      id="feInputAddress2"
                      placeholder={t('EVAL_COMMITTEE_PLACEHOLDER')}
                    />
                  </FormGroup>
                  
                  <label htmlFor="feInputAddress2">{t('EVAL_COMMITTEE_MEMBER')}</label>
                  <Select
                      value={selectedMembers}
                      onChange={this.addMembers.bind(this)}
                      isMulti
                      options={options}
                      placeholder={'Seleccione Empleados'}
                      clearable={false}
                  />

                  {/* <Button onClick={e => this.addMembers()}>{t('EVAL_COMMITTEE_MEMBER_BTN')}</Button> */}
                <Row>
                    &nbsp;
                    <Col md="12" style={{zIndex: 0}}>
                    <p className="mb-2">{t('EVAL_COMMITTEE_TYPE_TITLE')}</p>
          <FormRadio
            inline
            name="sport"
            checked={this.state.selectedRes === "department"}
            onChange={() => {
              this.changeResponsibilityType("department");
            }}
          >
            {t('EVAL_COMMITTEE_AREA')}
          </FormRadio>
          <FormRadio
            inline
            name="responsibility"
            checked={this.state.selectedRes === "category"}
            onChange={() => {
              this.changeResponsibilityType("category");
            }}
          >
            {t('EVAL_COMMITTEE_CLASSIFICATION')}
          </FormRadio>
          <FormRadio
            inline
            name="manage"
            checked={this.state.selectedRes === "manage"}
            onChange={() => {
              this.changeResponsibilityType("manage");
            }}
          >
            {t('EVAL_COMMITTEE_MANAGE')}
          </FormRadio>
          
                    </Col>
                    
                </Row>
                {this.state.selectedRes=='category'?
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feInputState">{t('EVAL_COMMITTEE_CATEGORY')}</label>
                      <FormSelect id="feInputState" onChange={this.handleCategoryChange.bind(this)} value={this.state.value}>
                        <option>Todas</option>
                        { this.state.data.map((item, idx) => (
                              // <FormCheckbox onChange={e => this.handleToggle(item)} className="mb-1" checked={item.get("show")} key={idx}> 
                              //   {item.get("itemName")}
                              // </FormCheckbox>
                              <option key={idx}>{item.get("itemName")}</option>
                          //   <IndividualPropertyItem itemName={item.get("itemName")} itemID={item.get("objectId")} objectClass={this.className}/>
                          ))}
                      </FormSelect>
                    </Col>
                  </Row>:<div></div>}
                  {this.state.selectedRes=='department'?
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feInputState">{t('EVAL_COMMITTEE_DEPARTMENT')}</label>
                      <FormSelect id="feInputState" onChange={this.handleDepartmentChange.bind(this)} value={this.state.value}>
                        <option>Todos</option>
                        { this.state.departments.map((item, idx) => (
                              // <FormCheckbox onChange={e => this.handleToggle(item)} className="mb-1" checked={item.get("show")} key={idx}> 
                              //   {item.get("itemName")}
                              // </FormCheckbox>
                              <option key={idx}>{item.get("itemName")}</option>
                          //   <IndividualPropertyItem itemName={item.get("itemName")} itemID={item.get("objectId")} objectClass={this.className}/>
                          ))}
                      </FormSelect>
                    </Col>
                  </Row>:<div></div>}
                  {this.state.selectedRes=='manage'?
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feInputState">{t('EVAL_COMMITTEE_DEPARTMENT')}</label>
                      <FormSelect id="feInputState" onChange={this.handleManagementChange.bind(this)} value={this.state.value}>
                        <option>Verificación</option>
                        <option>Reconocimiento</option>
                        <option>PMO</option>
                      </FormSelect>
                    </Col>
                  </Row>:<div></div>}
                  &nbsp;
                        <Button onClick={e => this.handleSubmit(e)}>{t('EVAL_COMMITTEE_CREATE_COMMITTEE')}</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
    )
  }
}

export default withTranslation()(CreateCommiteeForm);
