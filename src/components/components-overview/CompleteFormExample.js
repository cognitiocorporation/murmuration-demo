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
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Button
} from "shards-react";
import Parse from 'parse';
import { useTranslation, initReactI18next, withTranslation } from "react-i18next";

class CompleteFormExample extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      required: false,
      questionText: '',
      questionTextSpanish:'',
      category: 'Todas'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchNewData();
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

  handleCategoryChange(event) {
    console.log(event.target.value);
    this.setState({category: event.target.value});
  }

  handleRequiredChange(event) {
    console.log(event.target.value);
    this.setState({required: !this.state.required});
    // this.setState({value: this.props.value});
  }

  handleChange(e) {
    this.setState({required: !this.state.required});
  }

  handleQuestionTypeChange(e) {
    this.setState({open: !this.state.open});
  }

  handleQuestionTextChange(event) {
    console.log(event.target.value);
    this.setState({questionText: event.target.value});
    // this.setState({value: this.props.value});
  }

  handleSpanishQuestionTextChange(event) {
    console.log(event.target.value);
    this.setState({questionTextSpanish: event.target.value});
    // this.setState({value: this.props.value});
  }

  resetForm() {
    this.setState({
      required: false,
      questionText: '',
      category: 'Todas',
      open: false,
    });
  }

  handleSubmit(event) {
    const {questionText, questionTextSpanish, category, required, open} = this.state;

    const className = "IdeaQuestion";
    const PropertyItem = Parse.Object.extend(className);
    const newItem= new PropertyItem();

    if (questionText == '' || category == '' ) {
      alert('Por favor asegurese de escribir una pregunta y escoger la respectiva categoria.');
    } else {
      newItem.set("required", required);
      newItem.set("question", questionText);
      newItem.set("questionTrans", {"en":questionText,"es":questionTextSpanish});
      newItem.set("category", category);
      newItem.set("field", open);
      
      newItem.save()
      .then((item) => {
      // Execute any logic that should take place after the object is saved.
        this.resetForm()
        alert('¡La operacion fue exitosa!');
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Hubo un error en la operacion: ' + error.message);
      });
    }
  }

  render() {
    const { required, questionText, questionTextSpanish, category, data, open } = this.state;
    const {t} = this.props
    return(
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('NEW_QUESTION')}</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <label htmlFor="feInputAddress2">{t('QUESTION_ENGLISH')}</label>
                    <FormTextarea value={questionText} onChange={this.handleQuestionTextChange.bind(this)}
                      id="feInputAddress2"
                      placeholder={t('QUESTION_PLACEHOLDER')}
                    />
                    <br></br>
                    <label htmlFor="feInputAddress2">{t('QUESTION_SPANISH')}</label>
                    <FormTextarea value={questionTextSpanish} onChange={this.handleSpanishQuestionTextChange.bind(this)}
                      id="feInputAddress2"
                      placeholder={t('QUESTION_PLACEHOLDER_SPANISH')}
                    />
                  </FormGroup>

                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feInputState">{t('QUESTION_CATEGORY')}</label>
                      <FormSelect id="feInputState" onChange={this.handleCategoryChange.bind(this)} value={category}>
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
                    <Col md="2" className="form-group">
                      <FormCheckbox
                        checked={required}
                        onChange={e => this.handleChange(e)}
                      >
                        {t('QUESTION_REQUIRED')}
                      </FormCheckbox>
                    </Col>
                    <Col md="2" className="form-group">
                      <FormCheckbox
                        checked={open}
                        onChange={e => this.handleQuestionTypeChange(e)}
                      >
                        {t('QUESTION_OPEN')}
                      </FormCheckbox>
                    </Col>
                  </Row>
                  <Button onClick={e => this.handleSubmit(e)}>{t('QUESTION_BTN')}</Button>
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

export default withTranslation()(CompleteFormExample);
