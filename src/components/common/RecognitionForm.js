import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  DatePicker,
  Fade,
  Form,
  FormInput,
  FormSelect,
  FormRadio,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText, 
  FormFeedback,
} from "shards-react";
import Parse from 'parse';

import FormSectionTitle from "../edit-user-profile/FormSectionTitle";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import CategorySelect from "./CategorySelect"
import IdeaFilterSelect from "./IdeaFilterSelect";
import { all } from "q";
import EvaluationSelect from "./EvaluationSelect";
import ExecutionSelect from "./ExecutionSelect";
import { object } from "prop-types";
import Select from 'react-select';

import { ReactComponent as LineChartImage } from "../../images/line-chart.svg"
import { ReactComponent as DollarImage } from "../../images/dollar-symbol.svg"
import { ReactComponent as UserImage } from "../../images/man-user.svg"
import { ReactComponent as MedalImage } from "../../images/medal.svg"
import { ReactComponent as RibbonImage } from "../../images/ribbon.svg"
import { ReactComponent as BarsImage } from "../../images/bars.svg"
import { withTranslation } from 'react-i18next';

const remCharStyle = {
  color: 'green'
};

const options = [];

class RecognitionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          data:[],
          ideaQuestions: [],
          answers:[],
          category:null,
          department:null,
          date: '',
          categoryQuestions: [],
          filterQuestions: [],
          selectedFilterQ: [],
          filterQAnswers: [],
          categoryQAnswers: [],
          ideaDescription: null,
          file:null, 
          buttonNext:true,
          descriptionValid:'',
          remainingCharacters: 250,
          visible: true,
          filterVisible: false,
          filterQuestionsVisible: false, 
          ideaQuestionsVisible: false,
          hideNextButton: false,
          userName: 'User Name',
          sectionTitle:'',
          formButtonTitle: 'Continuar',
          ideaNumber: '#00008',
          status: '',
          executionRes: 0,
          executionResObj: object,
          selectedBenefit:'',
          selectedResult: '',
          money: '',
          selectedImprovement: '',
          selectedImpact: '',
          selectedCoachBackup: '',
          selectedEmployees: '',
          points:'',
        }

        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setIdeaDescription = this.setIdeaDescription.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.showNext = this.showNext.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.saveIdea = this.saveIdea.bind(this);
        this.showNext = this.showNext.bind(this);
        this.selectEmployees = this.selectEmployees.bind(this);
        this.changePoints = this.changePoints.bind(this);
    }

    componentDidMount() {
      let currUser = Parse.User.current();
      this.getResponsibleUsers();
      this.getUserName(currUser);
      this.fetchNewData();
      this.fetchQuestions();
      this.fetchFilterQuestions();
      this.getDate();
    }

    getResponsibleUsers() {
      var ideaItem = this.props.ideaItem;
      const ideaUsers = ideaItem.get("responsible");
      const fullName = ideaUsers.get("firstName") + " " + ideaUsers.get("lastName");

      options.push({"value":ideaUsers, "label":fullName})
    }

    getDate() {
      this.setState({
        date: new Date()
      });
    }

    async getUserName(user) {
      var query = new Parse.Query(Parse.User);
      query.equalTo("objectId", user.id);
      const results = await query.find();
      const firstName = results[0].get('firstName');
      const lastName = results[0].get('lastName');
      const fullName = firstName + ' ' + lastName;
      this.setState({
        userName: fullName
      });
    }

    handleSubmit() {
      const { formButtonTitle } = this.state;
      
      if (formButtonTitle == "Continuar") {
        this.showNext();
      } else {
        var isInvalid = false
        this.state.answers.forEach((item,idx) => {
          // console.log(item)
          if (item.required && !item.answer) {
            isInvalid = true
          }
        });

        if (isInvalid) {
          alert("Por favor conteste todas las preguntas requeridas.");
        } else {
        alert("Su IDEA ha sido sometida.");
      }
    }
  }

    showNext() {
      const isShowingForm = this.state.visible;
      const isShowingFilter = this.state.filterVisible;
      const isShowingFilterQuestions = this.state.filterQuestionsVisible;
      const isShowingQuestions = this.state.ideaQuestionsVisible;

      if (isShowingForm && !isShowingFilter && !isShowingFilterQuestions && !isShowingQuestions) {

        const { category, department, descriptionValid } = this.state;

        if (!category || !department || !descriptionValid) {
          alert("Por favor seleccione una categoria, un departamento y asegurese de que la descripcion de la idea sea valida.");
        } else {
          this.setState({
            visible: !isShowingForm,
            filterVisible: !isShowingFilter,
            buttonState: false,
            hideNextButton: true,
          });
        }
      } else if (!isShowingForm && isShowingFilter && !isShowingFilterQuestions && !isShowingQuestions) {
        this.setState({
          hideNextButton: false,
          filterVisible: !isShowingFilter,
          filterQuestionsVisible: !isShowingFilterQuestions,
          buttonState: false,
        });
      } else if (!isShowingForm && !isShowingFilter && isShowingFilterQuestions && !isShowingQuestions) {
        var allAnswered = false;
        // console.log(this.state.filterQAnswers);
        // console.log(this.state.filterQAnswers);
        var isInvalid = false
        this.state.filterQAnswers.forEach((item,idx) => {
          // console.log(item)
          if (!item.answer) {
            isInvalid = true
          }
        });

        if (isInvalid) {
          alert("Por favor conteste todas las preguntas.");
        } else {
          this.setState({
            filterQuestionsVisible: !isShowingFilterQuestions,
            ideaQuestionsVisible: !isShowingQuestions,
            buttonState: false,
            formButtonTitle: 'Someter',
          });
        }
      } else if (!isShowingForm && !isShowingFilter && !isShowingFilterQuestions && isShowingQuestions) {
        // console.log(this.state.answers);
        var isInvalid = false
        this.state.answers.forEach((item,idx) => {
          // console.log(item)
          if (item.required && !item.answer) {
            isInvalid = true
          }
        });

        if (isInvalid) {
          alert("Please answer all required questions.");
        } else {
          alert('¡Congrats! Thanks for submitting your idea.', 
          this.resetIdeaForm());
        }
      }
      // console.log(isShowingForm);
      // console.log(isShowingFilter);
      // console.log(isShowingFilterQuestions);
      // console.log(isShowingFilterQuestions);
      // console.log('\n');
    }

    resetIdeaForm() {
      window.location.reload();
    }

    fetchNewData() {
      const className = "IdeaDepartment";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);

      query.find()
      .then((results) => {
          this.setState({
              data: results
          });
          // console.log(results);
      }, (error) => {
          this.setState({
              data: []
          });
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
    }

    fetchQuestions() {
      const className = "IdeaQuestion";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);

      query.find()
      .then((results) => {
        // console.log(results);
          this.setState({
              ideaQuestions: results
          });
      }, (error) => {
          this.setState({
              data: []
          });
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
    }

    fetchFilterQuestions() {
      const className = "FilterQuestion";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);
      query.find()
      .then((results) => {
        // console.log(results);
          this.setState({
              filterQuestions: results
          });
      }, (error) => {
          this.setState({
              filterQuestions: []
          });
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
    }

    handleFilterChange(newFilter) {
      const newCategory = newFilter;
      const { filterQuestions, selectedFilterQ } = this.state;
      // console.log('FILTERED QUESTIONS');
      // console.log(filterQuestions);
      
      var filteredData;
      if (newCategory !== 'Todas') {
        filteredData = filterQuestions.filter(item => item.get("filter") === newCategory);
      }  else {
        filteredData = filterQuestions;
      }
      
      this.setState({
        selectedFilterQ: filteredData
      }, this.addFilterAnswer(filteredData));
      // console.log(filteredData);
      this.showNext();
    }

    handleCategoryChange(selectedCategory) {
      const newCategory = selectedCategory;
      const { ideaQuestions } = this.state;

      var filteredData = ideaQuestions.filter(item => item.get("category") === newCategory );
            
      this.setState({
        categoryQuestions: filteredData
      }, this.addAnswer(filteredData));
    }

    onSubmit = e => {
      e.preventDefault();
      alert('Form submitted');
    };

    saveIdea() {
      // Simple syntax to create a new subclass of Parse.Object.
      var Idea = Parse.Object.extend("Idea");
      // Create a new instance of that class.
      var ideaInfo = new Idea();

      const currentUser = Parse.User.current();
      const userId = currentUser.get("username");
    
      // IDEA Properties
      ideaInfo.set("proponent", userId);
      ideaInfo.set("department",this.state.department);
      ideaInfo.set("category", this.state.category);
      ideaInfo.set("date", this.state.date);
      ideaInfo.set("description", this.state.ideaDescription);
      ideaInfo.set("file", this.state.file);
      ideaInfo.set("status", "saved");
      ideaInfo.set("progress", [0,100]);
      
      // ideaInfo.save()
      // .then((ideaInfo) => {
      //   // Execute any logic that should take place after the object is saved.
      //   this.resetForm();
      //   alert('Su IDEA fue guardada exitosamente.');
      // }, (error) => {
      //   // Execute any logic that should take place if the save fails.
      //   // error is a Parse.Error with an error code and message.
      //   alert('Failed to create new object, with error code: ' + error.message);
      // });
    }

    resetForm() {
      this.setState({proponent: '', department: '', category: '', ideaDescription:'', date: new Date(),file: '', remainingCharacters: 250, descriptionValid:''});
    }

    change(event) {
      // this.setState({category: event.target.value});
      this.setState({department: event.target.value});
      // console.log(event.target.value);
    }

    setCategory(categoryName) {
      this.setState({
        category: categoryName
      })

      this.handleCategoryChange(categoryName)
      // console.log(categoryName);
    }

    setFilter(filterName) {
      // console.log(filterName);
      // this.setState({sectionTitle: (filterName === "innovacion")?"INNOVACION":"RESOLUCION DE PROBLEMAS"});
      this.handleFilterChange(filterName);
    }

    clickedPrint() {
      console.log('HOLA');
    }

    setDate(ideaDate) {
      this.setState({
        date: ideaDate
      })
      // console.log(ideaDate);
    }

    filterQuestionAnswerChange(event, idx) {
      // console.log(event.target.value);
      // console.log(idx);
      // const newObj = {'question':this.state.filterQuestions[idx], 'answer': event.target.value }
      this.state.filterQAnswers[idx].answer = event.target.value;
      // console.log(this.state.filterQAnswers);
      // const newArray = this.state.filterQAnswers
      // this.setState({filterQAnswers: newArray}, console.log(this.state.filterQAnswers));
      // this.setState({department: event.target.value});
      // console.log(this.state.answers[idx].answer);
    }

    questionAnswerChange(event, idx) {
      // console.log(event.target.value);
      // console.log(idx);
      // const newObj = {'question':this.state.filterQuestions[idx], 'answer': event.target.value }
      this.state.answers[idx].answer = event.target.value;
      // console.log(this.state.answers);
      // const newArray = this.state.filterQAnswers
      // this.setState({filterQAnswers: newArray}, console.log(this.state.filterQAnswers));
      // this.setState({department: event.target.value});
      // console.log(this.state.answers[idx].answer);
    }

    setIdeaDescription(event) {
      const description = event.target.value;
      const maxCharacters = 250;
      const charCount = maxCharacters - description.length
      var isValid = null;

      if (charCount < 0 && description.length > 0) {
        isValid = false
      } else if (charCount > 0 && description.length > 0) {
        isValid = true
      } else {
        isValid = null
      }

      // console.log(isValid);
      this.setState({
        descriptionValid: isValid,
        ideaDescription: description,
        remainingCharacters: charCount
      })
      // console.log(description);
    }

    selectFile(file) {
      // console.log(file);
    }

    addAnswer(filteredQuestions) {
      filteredQuestions.map((item, idx) => (
        // console.log(item.get("question"))
        this.setState((prevState) => ({
          answers: [...prevState.answers, {question:item.get("question"), answer:"", required: item.get("required")}],
        }))
      ))
      // console.log(this.);
    }

    addFilterAnswer(filteredData) {
      // console.log('Add Filter ANswer' );
    
      var newItems = [];
      filteredData.forEach((item, idx) => {
        newItems.push({question:item.get("question"), answer:''});
      })

      this.setState({ filterQAnswers: newItems}, () => {
          // console.log(this.state.filterQAnswers);
        });
    }

    submitEvaluation() {
      const {selectedImpact, date, selectedEmployees, points} = this.state;

      var ideaItem = this.props.ideaItem;


      const RecognitionObject = Parse.Object.extend("Recognition");
      var recognitions = [];
      
      console.log(selectedEmployees);
      for (var i in selectedEmployees) {
        const currEmployee = selectedEmployees[i];

        // Recognition
        const recognition= new RecognitionObject();
        recognition.set("employeeName", currEmployee.label);
        recognition.set("employee", currEmployee.value);
        recognition.set("employeeNum", 1);
        recognition.set("idea", ideaItem);
        recognition.set("ideaNum",ideaItem.get("num"));
        recognition.set("recognitionType", selectedImpact);
        recognition.set("recognitionDate", date);
        recognition.set("needsRecognition", false);
        recognition.set("points", points);
        recognition.set("status", "Completado");
        recognitions.push(recognition);
      }

      ideaItem.set("needsRecognition", false);
        Parse.Object.saveAll(recognitions, {useMasterKey: true}).then(() => {})
        ideaItem.save().then(() => {
          Parse.Object.saveAll(recognitions, {useMasterKey: true}).then(() => {
            this.setNotifications().then(() => {
              alert('Su reconocimiento ha sido sometido. ¡Gracias!', this.props.dismissModal());
            });
          })
        });
    }

    changeStatus(selection) {
      this.setState({status: selection});
      console.log('STATUS CHANGED TO: ' + this.state.status);
    }

    changeResponsible(res, idx) {
      console.log(idx);
      this.setState({
        executionResObj: res,
        executionRes: idx
      });
      console.log(res);
    }

    async setNotifications() {
      const {allUsers, department, category} = this.state;

      const responsibleMsg = "'¡Congrats! We have assigned an idea for execution.'";
      const proponentMsg = "'¡Congrats! Thanks for submitting your idea.'"

      var ideaItem = this.props.ideaItem;
      console.log('RESPONSIBLE');
      console.log(ideaItem.get("responsible"));

      var proponentUser = ideaItem.get("proponentObj");
      var responsibleUser = ideaItem.get("responsible");

      var proponentNotifications = proponentUser.get("notificationMessages");
      proponentNotifications.unshift(proponentMsg);

      proponentUser.increment("notificationCount");
      proponentUser.set("notificationMessages", proponentNotifications);

      var responsibleNotifications = responsibleUser.get("notificationMessages");
      responsibleNotifications.unshift(responsibleMsg);

      responsibleUser.increment("notificationCount");
      responsibleUser.set("notificationMessages", responsibleNotifications);

      var users = new Parse.Query("Users");

      await Parse.Object.saveAll(users, {useMasterKey: true}).catch(error => {
        console.log('Error saving.');
      });
      // await responsibleUser.saveAll().catch(error => {
      //   console.log('Error saving.');
      // });

      // console.log(notifications);
      // var notified = false;
      // for (var u in allUsers) {
      //   const evalCriteria = allUsers[u].get("evaluationCriteria");
      //   console.log(evalCriteria);
      //   for (var i in evalCriteria) {
      //     if ((evalCriteria[i].type == "department" && evalCriteria[i].name == department) || (evalCriteria[i].type == "category" && evalCriteria[i].name == category)) {
      //       console.log('DEPARTMENT');
      //       // Department Queries
      //       // var deptQuery = new Parse.Query(ItemClass);
      //       // myQueries.push(deptQuery.equalTo("department", evalCriteria[i].name))
      //       if (notified == false) {
      //         allUsers[u].increment("notificationCount");
      //         allUsers[u].set("notificationMessages", ["You have a new IDEA waiting for evaluation in your inbox."]);
      //         await allUsers[u].save().catch(error => {
      //           // This will error, since the Parse.User is not authenticated
      //         });
      //       }

      //       notified = true;
      //     } 
        // }
      // }
    }

    changeBenefit(response) {
        this.setState({
          selectedBenefit: response
        });
      }

    changeResults(response) {
    this.setState({
        selectedResult: response
    });
    }

    changeImprovement(response) {
    this.setState({
        selectedImprovement: response
    });
    }

    changeMoney(response) {
    this.setState({
        money: response
    });
    }

    changeImpact(response) {
    this.setState({
        selectedImpact: response
    });
    }

    changeBackup(response) {
    this.setState({
        selectedCoachBackup: response
    });
    }

    changeImpact(response) {
      this.setState({
          selectedImpact: response
      });
      }

    changePoints(response) {
      const myPoints = parseFloat(response.target.value);
      this.setState({
        points: myPoints
      });
    }

    selectEmployees = selectedEmployees => {
      console.log(selectedEmployees);
      this.setState(
        { selectedEmployees },
        () => console.log(`Option selected:`, this.state.selectedEmployees)
      );
    };

    render() {
        const {visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, selectedFilterQ, categoryQuestions, category, answers, buttonState, hideNextButton, date, remainingCharacters, descriptionValid, department, ideaDescription, userName, sectionTitle, executionRes } = this.state
        const formVisibilityState = visible? 'block' : 'none';
        const filterVisibilityState = filterVisible? 'block' : 'none';
        const filterQuestionVisibilityState = filterQuestionsVisible? 'block' : 'none';
        const questionVisibilityState = ideaQuestionsVisible? 'block' : 'none';
        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';
        const ideaItem = this.props.ideaItem;
        const {t} = this.props;
        console.log(executionRes);
        return(

                  <Card small className="edit-user-details mb-4">
                    {/* <ProfileBackgroundPhoto /> */}
    
                    <CardBody className="p-0">
    
                      {/* Form Section Title :: General */}
                      <Form className="py-4"
                      onSubmit={this.onSubmit}
                      noValidate
                      >
                        <FormSectionTitle
                          title={ideaItem.get("title")}
                          description=""
                        />
                        {/* VISIBILITY */}
                        <div style={{display: formVisibilityState}}>
                        <Row form className="mx-4">
                          <Col lg="12">
                            <Row form>
                              {/* Proponent */}
                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("SUBMIT_IDEA_Proponent")}</label>
                                <FormInput
                                  id="firstName"
                                  value={ideaItem.get("proponentName")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>
    
                              {/* Date */}
                              <Col md="3" className="form-group">
                              <label htmlFor="lastName">{t("SUBMIT_IDEA_Date")}</label>
                              <InputGroup>
                                  <InputGroupAddon type="append">
                                    <InputGroupText>
                                      <i className="material-icons">&#xE916;</i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <DatePicker
                                    placeholderText={ideaItem.get("date")}
                                    dropdownMode="select"
                                    className="text-center"
                                    readOnly = "true"
                                    onChange={this.setDate} 
                                    selected={ideaItem.get("date")}
                                    required
                                  />
                                </InputGroup>
                              </Col>
                              {/* Department */}
                              <Col md="3" className="form-group">
                                <label htmlFor="userLocation">{t("SUBMIT_IDEA_Department")}</label>
                                <FormInput
                                  id="firstName"
                                  value={ideaItem.get("department")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>
                              {/* Department */}
                              <Col md="3" className="form-group">
                                <label htmlFor="userLocation">{t("SUBMIT_IDEA_Category")}</label>
                                <FormInput
                                  id="firstName"
                                  value={ideaItem.get("category")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
    
                        <br/>

                        <FormSectionTitle
                          title={t("RECOG_IDEA_RECOGNITION")}
                          description=""
                        />
                        <Row form className="mx-4">
                        {/* Categoria */}
                            <Col md="4" className="form-group">
                                {/* <EvaluationSelect setCategory={(selection) => this.changeStatus(selection)}/> */}
                                <Row form className="mx-4">
                                <Col md="3"><UserImage className="mx-auto d-block" style={{minWidth: 50, maxWidth:50, minHeight: 50, maxHeight: 50,fill: 'black'}}/></Col>
                                <Col md="9">
                                <p className="mb-2">{t("RECOG_IDEA_EMPLOYEES")}:</p>
                                <Select
                                  value={this.state.selectedEmployees}
                                  onChange={this.selectEmployees}
                                  options={options}
                                  isMulti
                                  placeholder={'Seleccione Empleados'}
                                />
                                </Col>
                                </Row>
                            </Col>
                            <Col md="4" className="form-group">
                                {/* <EvaluationSelect setCategory={(selection) => this.changeStatus(selection)}/> */}
                                <Row form className="mx-4">
                                <Col md="3"><LineChartImage className="mx-auto d-block" style={{minWidth: 50, maxWidth:50, minHeight: 50, maxHeight: 50,fill: 'black'}}/></Col>
                                <Col md="9">
                                <p className="mb-2">{t("RECOG_IDEA_DATE")}:</p>
                                <DatePicker
                                    placeholderText={this.state.date}
                                    dropdownMode="select"
                                    className="text-center"
                                    onChange={this.setDate} 
                                    selected={this.state.date}
                                  />
                                </Col>
                                </Row>
                            </Col>
                            <Col md="4" className="form-group">
                                {/* <EvaluationSelect setCategory={(selection) => this.changeStatus(selection)}/> */}
                                <Row form className="mx-4">
                                <Col md="3"><MedalImage className="mx-auto d-block" style={{minWidth: 50, maxWidth:50, minHeight: 50, maxHeight: 50,fill: 'black'}}/></Col>
                                <Col md="9">
                                <p className="mb-2">{t("RECOG_IDEA_TYPE")}:</p>
                                <FormRadio
                                    inline
                                    name="impacto"
                                    checked={this.state.selectedImpact === "Bajo"}
                                    onChange={() => {
                                    this.changeImpact("Bajo");
                                    }}
                                >
                                    {t("RECOG_IDEA_LOW")}
                                </FormRadio>
                                <FormRadio
                                    inline
                                    name="impacto"
                                    checked={this.state.selectedImpact=== "Moderado"}
                                    onChange={() => {
                                    this.changeImpact("Moderado");
                                    }}
                                >
                                    {t("RECOG_IDEA_MODERATE")}
                                </FormRadio>
                                <FormRadio
                                    inline
                                    name="impacto"
                                    checked={this.state.selectedImpact=== "Alto"}
                                    onChange={() => {
                                    this.changeImpact("Alto");
                                    }}
                                >
                                    {t("RECOG_IDEA_HIGH")}
                                </FormRadio>
                                </Col>
                                </Row>
                            </Col>
                            
                            <Col md="4" className="form-group">
                                {/* <EvaluationSelect setCategory={(selection) => this.changeStatus(selection)}/> */}
                                <Row form>
                                    <Col md="3"><DollarImage className="mx-auto d-block" style={{minWidth: 50, maxWidth:50, minHeight: 50, maxHeight: 50,fill: 'black'}}/></Col>
                                    <Col md="9">
                                        <p className="mb-2">{t("RECOG_IDEA_POINTS")}:</p>
                                        <FormInput onChange= {this.changePoints} placeholder={t("RECOG_IDEA_POINTS")} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </div>
                        </Form>
                    </CardBody>
                    <CardFooter className="border-top">
                      <ButtonGroup size="sm" className="ml-auto d-table mr-3">
                        {/* <Button theme="light" onClick={this.saveIdea}>Guardar</Button> */}
                        {/* <Button theme="secondary" onClick={this.submitEvaluation.bind(this)} style={{display: nextButtonVisibilityState}} >Pedir Informacion</Button> */}
                        <Button theme="accent" onClick={this.submitEvaluation.bind(this)} style={{display: nextButtonVisibilityState}} >Someter Verificación</Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
          );
    }
}




export default withTranslation()(RecognitionForm);
