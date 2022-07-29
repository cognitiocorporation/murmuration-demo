import React, { Component } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormCheckbox,
  FormTextarea,
  FormSelect,
  Container,
  Col,
  Row,
  Form, 
  FormGroup,

  FormInput
} from "shards-react";
import Parse from 'parse';
import { withTranslation } from 'react-i18next';


class IdeaFilterManager extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            /* initial state */ 
            data:[],
            statusData:[],
            newItem:'',
            searchString:'',
            category:'',
            status:'',
            ideaType: '',
            ideaQuestions:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
      }

      handleChange(event) {
        this.setState({newItem: event.target.value});
      }

      componentDidMount() {
        this.fetchNewData("IdeaCategory");
        this.fetchNewData("IdeaStatus");
        this.fetchQuestions();
      }

      fetchQuestions() {
        const className = "IdeaQuestion";
  
        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);
        query.equalTo("field", false);
        query.find()
        .then((results) => {
          // console.log(results);
            this.setState({
                ideaQuestions: results
            });
        }, (error) => {
            this.setState({
                ideaQuestions: []
            });
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      }

      fetchNewData(myClassName) {
        const className = myClassName;

        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);

        if (myClassName == "IdeaCategory") {
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
        } else {
            query.find()
            .then((results) => {
            console.log('RESULTS: ' + results);
                this.setState({
                    statusData: results
                });
            }, (error) => {
                this.setState({
                    statusData: []
                });
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            });
        }
      }

      handleSubmit(event) {
        const className = this.props.className;
        const PropertyItem = Parse.Object.extend(className);
        const newItem= new PropertyItem();
        
        newItem.set("itemName", this.state.newItem);

        if (className == "IdeaCategory") {
          newItem.set("show", false);
        }
        
        newItem.save()
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          this.fetchNewData();
          alert('¡La operacion fue exitosa!');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }

      handleToggle(item) {
        const className = this.props.className;
        console.log('clicked');
        if (className == "IdeaCategory" || className == "IdeaDepartment") {
          console.log(item);
          const isShowing = item.get("show");
          item.set("show", !isShowing);
          item.save().then((item) => {
            // Now let's update it with some new data. In this case, only cheatMode and score
            // will get sent to the cloud. playerName hasn't changed.
            this.fetchNewData();
          });
        } 
      }

      deleteItem(item) {
        item.destroy({})
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          this.fetchNewData();
          alert('¡La operacion fue exitosa!');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }

      handleSearchTextChange() {
          
      }
      

      handleCategoryChange(event) {
          console.log(event.target.value);
          const newCat = event.target.value;
          this.props.onCategoryChange(newCat);
          this.setState({
            category: newCat
        });
      }

      handleStatusChange(event) {
        console.log(event.target.value);

        var newStat = event.target.value == 'Sometidas'?'SOMETIDA':event.target.value;

        this.props.onStatusChange(newStat);
        this.setState({
          status: newStat
      });
    }

    handleTypeChange(event) {
      console.log(event.target.value);

      var newType = event.target.value == 'Todas'?'Todas':event.target.value;

      this.props.onTypeChange(newType.toLowerCase());
      this.setState({
        ideaType: newType
    });
    }

    handleQuestionChange(event) {
      // console.log(event.target.value);

      var newType = event.target.value == 'Todas'?'Todas':event.target.value;

      this.props.onQuestionChange(newType);
      // this.setState({
      //   ideaType: newType
      // });
    }


      render() {
          const { searchString, category, status, ideaType, ideaQuestions } = this.state;
          const { t } = this.props;
          const storageLanguage =  localStorage.getItem('language') != null?localStorage.getItem('language'):'en';
          return(
            <Card small className="mb-3">
                <CardHeader className="border-bottom">
                <h6 className="m-0">{t("IDEA_MANAGE_FILTERS")}</h6>
                </CardHeader>
                <CardBody className="p-0">
                <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                    <Col>
                        <Form>
                        <Row form>
                                <Col md="12" className="form-group">
                                <label htmlFor="feInputState">{t("IDEA_MANAGE_CATS")}</label>
                                <FormSelect id="feInputState" onChange={this.handleCategoryChange.bind(this)} value={category}>
                                    <option>All</option>
                                    { this.state.data.map((item, idx) => (
                                        // <FormCheckbox onChange={e => this.handleToggle(item)} className="mb-1" checked={item.get("show")} key={idx}> 
                                        //   {item.get("itemName")}
                                        // </FormCheckbox>
                                        <option value={item.get("itemNameTrans")["en"]} key={idx}>{item.get("itemNameTrans")[storageLanguage]}</option>
                                    //   <IndividualPropertyItem itemName={item.get("itemName")} itemID={item.get("objectId")} objectClass={this.className}/>
                                    ))}
                                </FormSelect>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    {/* <Col>
                        <Form>
                        <Row form>
                                <Col md="12" className="form-group">
                                <label htmlFor="feInputState">{t("IDEA_MANAGE_STATUS")}</label>
                                <FormSelect id="feInputState" onChange={this.handleStatusChange.bind(this)} value={status}>
                                    <option>{t('FILTER_ALL')}</option>
                                    <option>{t('FILTER_SUBMITTED')}</option>
                                    <option>{t('FILTER_DONE')}</option>
                                </FormSelect>
                                </Col>
                            </Row>
                        </Form>
                    </Col> */}
                    <Col>
                        <Form>
                        <label htmlFor="feInputState">{t("IDEA_MANAGE_TYPES")}</label>
                        <FormSelect id="feInputState" onChange={this.handleTypeChange.bind(this)} value={ideaType}>
                                    <option>{t('FILTER_ALL')}</option>
                                    <option>{t('FILTER_INNOVATION')}</option>
                                    <option>{t('FILTER_PROBLEM_F')}</option>
                                    <option>{t('FILTER_IMPROVEMENT')}</option>
                                </FormSelect>
                        </Form>
                    </Col>
                    {/* <Col>
                        <Form>
                        <label htmlFor="feInputState">{t("IDEA_MANAGE_QUESTIONS")}</label>
                        <FormSelect id="feInputState" onChange={this.handleQuestionChange.bind(this)} value={ideaType}>
                                    <option>{t('FILTER_ALL')}</option>
                                    { ideaQuestions.map((item, idx) => (
                                        // <FormCheckbox onChange={e => this.handleToggle(item)} className="mb-1" checked={item.get("show")} key={idx}> 
                                        //   {item.get("itemName")}
                                        // </FormCheckbox>
                                        <option value={item.get("questionTrans")["es"]} key={idx}>{item.get("questionTrans")[storageLanguage]}</option>
                                    //   <IndividualPropertyItem itemName={item.get("itemName")} itemID={item.get("objectId")} objectClass={this.className}/>
                                    ))}
                                </FormSelect>
                        </Form>
                    </Col> */}
                    </Row>
                </ListGroupItem>
                </ListGroup>
            </CardBody>
            </Card>
            
            );
      }
}


// PropertyManager.defaultProps = {
//   title: "Categorias"
// };

export default withTranslation()(IdeaFilterManager);
