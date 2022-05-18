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
  Badge,
  Alert
} from "shards-react";
import Parse from 'parse';

import FormSectionTitle from "../edit-user-profile/FormSectionTitle";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import CategorySelect from "./CategorySelect"
import IdeaFilterSelect from "./IdeaFilterSelect";
import { all } from "q";
import EvaluationSelect from "./EvaluationSelect";
import ExecutionSelect from "./ExecutionSelect";
import moment from 'moment';
import CompletedIdeaForm from "./CompletedIdeaForm";

import { useTranslation, initReactI18next, withTranslation } from "react-i18next";

const remCharStyle = {
  color: 'green'
};

class ManageIdeaForm extends React.Component {
    constructor(props) {
        super(props);
        const {t} = this.props
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
          ideaDescription: String,
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
          firstActive: false,
          secondActive: false,
          thirdActive: false,
          fourthActive: false,
          progress: [25,75],
          commentTitle: t('COMMENTS_IDEA'),
          submitBtnTitle: "Actualizar IDEA", 
          showCompleted: false,
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
        this.progressBtnPress = this.progressBtnPress.bind(this);
        this.submitEvaluation = this.submitEvaluation.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
        this.showCompletedIdeaForm = this.showCompletedIdeaForm.bind(this);
    }

    componentDidMount() {
      let currUser = Parse.User.current();
      this.showCorrectScreen();
      this.getUserName(currUser);
      this.getDate();
      this.setPercentage();
    }

    showCorrectScreen() {
      const idea = this.props.idea;
      const percentage = idea.get("progress")[0];
      if (percentage == 100) {
        this.setState({showCompleted: true});
      } else {
        this.setState({showCompleted: false});
      }
    }

    setPercentage() {
      const idea = this.props.idea;
      const percentage = idea.get("progress")[0];
      console.log(percentage);
      switch(percentage) {
        case 25:
          // code block
          console.log('CASE IS 25');
          this.setState({firstActive: true,
            secondActive: false,
            thirdActive: false,
            fourthActive: false,});
          break;
        case 50:
          // code block
          console.log('CASE IS 50');
          this.setState({firstActive: false,
            secondActive: true,
            thirdActive: false,
            fourthActive: false,});
          break;
        case 75:
          // code block
          console.log('CASE IS 75');
          this.setState({firstActive: false,
            secondActive: false,
            thirdActive: true,
            fourthActive: false,});
          break;
        case 100:
          // code block
          console.log('CASE IS 100');
          this.setState({firstActive: false,
            secondActive: false,
            thirdActive: false,
            fourthActive: true,});
          break;
        default:
          // code block
          this.setState({firstActive: false,
            secondActive: false,
            thirdActive: false,
            fourthActive: false,});
          break;
      }
      console.log(this.state.firstActive);
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
          alert("Please answer all required questions");
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
      
      ideaInfo.save()
      .then((ideaInfo) => {
        // Execute any logic that should take place after the object is saved.
        this.resetForm();
        alert('Su IDEA fue guardada exitosamente.');
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
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
      const { progress, ideaDescription, userName } = this.state;
      const { idea } = this.props;
    
      // IDEA Properties
      if (progress.length > 0) {
        idea.set("progress", progress);
      }

      if (idea.get("status") == 'Idea Devuelta - Mas Informacion') {
        idea.set("needsEvaluation", true);
      }

      if (ideaDescription.length > 0) {
          var comments = idea.get("comments");
          var myProgress = progress;
          comments.push({"comment": ideaDescription, "date": new Date(), "user": userName, "progress": myProgress});
          idea.set("comments", comments);
          idea.set("completed", false);
      }
      idea.set("edited", true);
    
      Parse.Object.saveAll([idea], {useMasterKey: true})
      .then((ideaInfo) => {
        // Execute any logic that should take place after the object is saved.
        // 
        if (progress[0] == 100) {
          alert('Su IDEA ha sido actualizada. ¡Gracias!', this.showCompletedIdeaForm());
        } else {
          alert('Su IDEA ha sido actualizada. ¡Gracias!', window.location.reload());
        }
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }

    addToQueue() {
      // const { progress, ideaDescription, userName } = this.state;
      const { idea } = this.props;
    
      // IDEA Properties
      idea.set("status", "En Espera");
      
      
      idea.save()
      .then((ideaInfo) => {
        // Execute any logic that should take place after the object is saved.
        // 
        // if (progress[0] == 100) {
        //   alert('Su IDEA ha sido actualizada. ¡Gracias!', this.showCompletedIdeaForm());
        // } else {
        //   alert('Su IDEA ha sido actualizada. ¡Gracias!', window.location.reload());
        // }
        alert('Su IDEA ha sido actualizada. ¡Gracias!', window.location.reload());
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }

    progressBtnPress(e) {
      e.preventDefault();
      const value = e.target.value;
      if (value==25) {
        this.setState({
          progress:[25,75],
          firstActive: true,
          secondActive: false,
          thirdActive: false,
          fourthActive: false,
        });
      } else if (value==50) {
        this.setState({
          progress:[50,50],
          firstActive: false,
          secondActive: true,
          thirdActive: false,
          fourthActive: false,
        });
      } else if (value==75) {
        this.setState({
          progress:[75,25],
          firstActive: false,
          secondActive: false,
          thirdActive: true,
          fourthActive: false,
        });
      } else if (value==100) {
        this.setState({
          progress:[100,0],
          firstActive: false,
          secondActive: false,
          thirdActive: false,
          fourthActive: true,
        });
      }
    }

    getDate(date) {
      // console.log(date);
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }

    showCompletedIdeaForm() {
      this.setState({showCompleted: true});
    }

    render() {
        const {visible, filterVisible, hideNextButton, ideaDescription, userName, 
          firstActive, secondActive, thirdActive, fourthActive, progress, commentTitle, submitBtnTitle, showCompleted } = this.state
        const {idea} = this.props;
        const formVisibilityState = visible? 'block' : 'none';
        const filterVisibilityState = filterVisible? 'block' : 'none';
        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';

        const canEdit = ((userName == idea.get("responsibleName"))?true:false);

        const ideaProgress = idea.get("progress")[0]
        const comments = idea.get("comments");
        const edited = idea.get("edited");
        var hasComments = false;

        var canBeUpdated = false;
        if (progress[0] > 25 && progress[0] > ideaProgress) {
          console.log('POSSIBLE');
          canBeUpdated = true;
        } else if (progress[0] > 25 && ideaProgress == 100){
          canBeUpdated = true;
        } else {
          if (edited == false) {
            canBeUpdated = true
          } else {
            canBeUpdated = false
          }
        }

        const finalPermission = canEdit && canBeUpdated;

        const holdOrCancelled = idea.get("status") == "No Perseguido" || idea.get("status") == "Idea en Espera"
        const {t} = this.props
    
        return(
                !showCompleted?
                  <Card small className="edit-user-details mb-4">
                    {/* <ProfileBackgroundPhoto /> */}
    
                    <CardBody className="p-0">
    
                      {/* Form Section Title :: General */}
                      <Form className="py-4"
                      onSubmit={this.onSubmit}
                      noValidate
                      >
                        <FormSectionTitle
                          title={t("IDEA_MANAGE_OVERVIEW")}
                          description=""
                        />
                        {/* VISIBILITY */}
                        <div style={{display: formVisibilityState}}>
                        <Row form className="mx-4">
                          <Col lg="12">
                            <Row form>
                              {/* Proponent */}
                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("IDEA_MANAGE_PROPONENT")}</label>
                                <FormInput
                                  id="firstName"
                                  value={idea.get("proponentName")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>
    
                              {/* Date */}
                              <Col md="3" className="form-group">
                              <label htmlFor="lastName">{t("IDEA_MANAGE_SUBMITTED")}</label>
                              <InputGroup>
                                  <InputGroupAddon type="append">
                                    <InputGroupText>
                                      <i className="material-icons">&#xE916;</i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <DatePicker
                                    placeholderText={idea.get("date")}
                                    dropdownMode="select"
                                    className="text-center"
                                    readOnly = "true"
                                    onChange={this.setDate} 
                                    selected={idea.get("date")}
                                    required
                                  />
                                </InputGroup>
                              </Col>
                              {/* Department */}
                              <Col md="3" className="form-group">
                                <label htmlFor="userLocation">{t("IDEA_MANAGE_DEPARTMENT")}</label>
                                <FormInput
                                  id="firstName"
                                  value={idea.get("department")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>
                              {/* Department */}
                              <Col md="3" className="form-group">
                                <label htmlFor="userLocation">{t("IDEA_MANAGE_CATEGORY")}</label>
                                <FormInput
                                  id="firstName"
                                  value={idea.get("category")}
                                  onChange={() => {}}
                                  required
                                  disabled
                                />
                              </Col>

                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("IDEA_MANAGE_ASSIGNED")}</label>
                                <Alert theme="primary">
                                  <strong>{idea.get("responsibleName")}</strong>
                                </Alert>
                              </Col>

                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("IDEA_MANAGE_COACH")}</label>
                                <Alert theme="primary">
                                  <strong>{idea.get("coachName")?idea.get("coachName"):"No Coach"}</strong>
                                </Alert>
                              </Col>

                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("IDEA_MANAGE_STATUS")}</label>
                                <Alert theme="primary">
                                  <strong>{idea.get("status")}</strong>
                                </Alert>
                              </Col>

                              <Col md="3" className="form-group">
                                <label htmlFor="firstName">{t("IDEA_MANAGE_PROGRESS")}</label>
                                <Alert theme="primary">
                                  <strong>{idea.get("progress")[0] + '%'}</strong>
                                </Alert>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
    
                        <br/>

                        <FormSectionTitle
                          title={t("IDEA_MANAGE_ADD_PROGRESS")}
                          description=""
                        />
                        <Row form className="mx-4">
                        {/* Categoria */}
                          <Col md="12" className="form-group">
                            {/* <EvaluationSelect setCategory={(selection) => console.log(selection)}/> */}
                            <Row md="12">
                              <Col md="3">
                                <Button outline={!firstActive?true:false}  block value='25' onClick={this.progressBtnPress}>25%</Button>
                                <label htmlFor="firstName">{t('IDEA_EVALUATED_ASSIGNED')}</label>
                              </Col>
                              <Col md="3">
                              <Button outline={!secondActive?true:false} block value='50' onClick={this.progressBtnPress}>50%</Button>
                              <label htmlFor="firstName">{t('IDEA_EXECUTION_STARTED')}</label>
                              </Col>
                              <Col md="3">
                              <Button outline={!thirdActive?true:false} block value='75' onClick={this.progressBtnPress}>75%</Button>
                              <label htmlFor="firstName">{t('IDEA_IMPLEMENTED')}</label>
                              </Col>
                              <Col md="3">
                              <Button outline={!fourthActive?true:false} block value='100'onClick={this.progressBtnPress}>100%</Button>
                              <label htmlFor="firstName">{t('IDEA_IMPLEMENTED_BENEFITS')}</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {/* <FormSectionTitle
                          title="Comentarios"
                          description=""
                        /> */}
                        {ideaProgress < progress[0]?
                        <div></div>
                        :<FormSectionTitle
                        title={t('COMMENTS_IDEA')}
                        description=""
                      />}
                        {comments.map((comment, idx) =>
                        comments[idx].progress[0] == progress[0] && 
                        <Row form className="mx-4" hidden={ideaProgress < progress[0]}>
                          {/* Idea Description */}
                          <Col md="12" className="form-group">
                              <strong className="text-muted d-block mb-2">
                                {comments[idx].user} | {this.getDate(comments[idx].date)}
                              </strong>
                              <span>{comments[idx].comment}</span>
                          </Col>
                        </Row>
                        )}

                        {finalPermission && <FormSectionTitle
                          display={!finalPermission}
                          title={t('WRITE_NEW_COMMENT')}
                          description=""
                        />}
                        <Row form className="mx-4">
                          {/* Idea Description */}
                          <Col md="12" className="form-group">
                            <FormTextarea
                              hidden={!finalPermission}
                              style={{ minHeight: "100px" }}
                              id="userBio"
                              placeholder={t('WRITE_NEW_COMMENT_DESCRIPTION')}
                              value={ideaDescription}
                              onChange={this.setIdeaDescription}
                            />
                          </Col>
                        </Row>

                        {finalPermission && <FormSectionTitle
                          hidden={!finalPermission}
                          title={t('SUBMIT_IDEA_UploadArchive')}
                          description=""
                        />}
                        
                        <Row form className="mx-4" hidden={!finalPermission}>
                          {/* Idea Description */}
                          <Col className="form-group">
                            <CustomFileUpload onFileSelect={this.selectFile}/>
                          </Col>
                        </Row>
                        </div>
                          
                        {/* Select IDEA Filter Visibility State */}
                        <div style={{display: filterVisibilityState}}>
                          <IdeaFilterSelect setFilter={(e) => {this.setFilter(e)}}/>
                        </div>

                        {/* Select IDEA Filter Visibility State */}
                        </Form>
                    </CardBody>
                  
                  </Card>
                  :
                  <CompletedIdeaForm idea={idea}></CompletedIdeaForm>
          );
    }
}




export default withTranslation()(ManageIdeaForm);
