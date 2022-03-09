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
  FormCheckbox,
} from "shards-react";
import Select from 'react-select';
import Parse from 'parse';

import FormSectionTitle from "../edit-user-profile/FormSectionTitle";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import CategorySelect from "./CategorySelect"
import Switch from "./Switch.js"
import IdeaFilterSelectNew from "./IdeaFilterSelectNew";
import ThankYou from "./ThankYou";
import { useTranslation, initReactI18next, withTranslation } from "react-i18next";
import SelectedCategoryDisplay from "./SelectedCategoryDisplay";

import { ReactComponent as SubmitIcon } from "../../images/submit.svg"


var storageLanguage = localStorage.getItem('language');

class SubmitIdeaForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          data:[],
          ideaQuestions: [],
          answers:[],
          category:'',
          department:'',
          date: '',
          categoryQuestions: [],
          filterQuestions: [],
          selectedFilterQ: [],
          filterQAnswers: [],
          categoryQAnswers: [],
          ideaDescription: null,
          ideaTitle: null,
          file:null, 
          buttonNext:true,
          descriptionValid:'',
          titleValid:'',
          remainingCharacters: 250,
          remainingTitleCharacters: 30,
          visible: true,
          filterVisible: false,
          filterQuestionsVisible: false, 
          ideaQuestionsVisible: false,
          hideNextButton: false,
          userName: 'User Name',
          userDept: '',
          sectionTitle:'',
          formButtonTitle: 'Continue',
          allUsers:[],
          selectedOption: null,
          allTeamUsers: [],
          teamName:'',
          hasTeam: false,
          ideaType: '',
          expectedReturn: 0,
          options: [],
          selectedEmployees: [],
          categoryIcon: '',
          hasAttachment: false,
          hasATeam: false
        }

        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setIdeaDescription = this.setIdeaDescription.bind(this);
        this.setIdeaTitle = this.setIdeaTitle.bind(this);
        this.setExpectedReturn = this.setExpectedReturn.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.showNext = this.showNext.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.saveIdea = this.saveIdea.bind(this);
        this.showNext = this.showNext.bind(this);
    }

    componentDidMount() {
      let currUser = Parse.User.current();
      this.getUserName(currUser);
      this.getUsers();
      this.fetchAllUsers();
      this.fetchUserData();
      this.fetchNewData();
      this.fetchQuestions();
      this.fetchFilterQuestions();
      this.getDate();
    }

    async getUsers() {
      var query = new Parse.Query(Parse.User);
      query.notEqualTo("evaluationCriteria", []);
      const results = await query.find();
      console.log(results);
      this.setState({
        allUsers: results
      });
      // this.setNotifications();
    }

    fetchUserData() {
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

    fetchAllUsers() {
      const className = "User";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);
      query.limit(1000)
      query.ascending("firstName").find()
      .then((results) => {
          // { value: 'chocolate', label: 'Chocolate' }
          console.log(results.length)
          var allUsers = [];
          results.map(user => allUsers.push({value: user.get("email"), label: user.get("firstName") + ' ' + user.get("lastName"), userObj: user}));
          this.setState({
              allTeamUsers: allUsers
          });
      }, (error) => {
          this.setState({
            allTeamUsers: []
          });
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
    }

    async setNotifications() {
      const {allUsers, department, category} = this.state;
      var notified = false;
      for (var u in allUsers) {
        const evalCriteria = allUsers[u].get("evaluationCriteria");
        for (var i in evalCriteria) {
          if ((evalCriteria[i].type == "department" && evalCriteria[i].name == department) || (evalCriteria[i].type == "category" && evalCriteria[i].name == category)) {
            if (notified == false) {
              allUsers[u].increment("notificationCount");
              allUsers[u].set("notificationMessages", ["Tiene una nueva idea para manejar."]);
              await allUsers[u].save().catch(error => {
                // This will error, since the Parse.User is not authenticated
              });
            }

            notified = true;
          } 
        }
      }
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
      const dept = results[0].get('department');
      const fullName = firstName + ' ' + lastName;
      this.setState({
        userName: fullName,
        userDept: dept,
      });
    }

    handleSubmit() {
      const { formButtonTitle } = this.state;
      
      if (formButtonTitle == "Continue") {
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

        const { category, department, descriptionValid, titleValid } = this.state;

        if (!category || !department || !descriptionValid || !titleValid) {
          alert("Por favor seleccione un departamento, una categoria y asegurese de que el titulo y la descripcion de la idea sean validos.");
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
            formButtonTitle: 'Submit',
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
          alert("Por favor conteste todas las preguntas requeridas.");
        } else {
          // alert("FINISHED");
          this.saveIdea();
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
        console.log(results);
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
        console.log(newFilter)
        // filteredData = filterQuestions.filter(item => item.get("filter") === newCategory);
        filteredData = filterQuestions.filter(item => item.get("filter") === newCategory);
      }  else {
        filteredData = filterQuestions;
      }

      this.setState({
        selectedFilterQ: filteredData
      }, this.addFilterAnswer(filteredData));
      console.log(filteredData);
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

    async getIdeaCount(){
      var Idea = Parse.Object.extend("Idea");
      var query = new Parse.Query(Idea);
      var count = await query.count();
      console.log(count);
      return ++count
    }

    async saveIdea() {
      const {department, category, date, ideaDescription, file, answers, filterQAnswers, ideaTitle, userName} = this.state;
      // Simple syntax to create a new subclass of Parse.Object.
      var Idea = Parse.Object.extend("Idea");
      // Create a new instance of that class.
      var ideaInfo = new Idea();

      const currentUser = Parse.User.current();
      const userId = currentUser.get("username");

      const count = await this.getIdeaCount();
      
      console.log(answers);
      let currUser = Parse.User.current();
      // IDEA Properties
      ideaInfo.set("proponentObj", currUser);
      ideaInfo.set("proponent", userId);
      ideaInfo.set("edited", false);
      ideaInfo.set("completed", false);
      ideaInfo.set("department", department);
      ideaInfo.set("category", category);
      ideaInfo.set("date", date);
      ideaInfo.set("num", count);
      ideaInfo.set("title", ideaTitle)
      ideaInfo.set("description", ideaDescription);
      ideaInfo.set("file", file);
      ideaInfo.set("status", "SOMETIDA");
      ideaInfo.set("progress", [0,100]);
      ideaInfo.set("filterAnswer", filterQAnswers);
      ideaInfo.set("questionAnswer", answers);
      ideaInfo.set("proponentName", userName);
      ideaInfo.set("comments", []);
      ideaInfo.set("needsEvaluation", true);
      ideaInfo.set("hasTeam", this.state.hasTeam);
      ideaInfo.set("ideaType", this.state.ideaType);
      ideaInfo.set("expectedReturn", parseFloat(this.state.expectedReturn));
      if (this.state.hasTeam) {
        const teamMembers = this.state.selectedEmployees;
        const teamName = this.state.teamName;

        ideaInfo.set("teamMembers", teamMembers);
        ideaInfo.set("teamName", this.state.teamName);
      }

      var myFile;
      if (file) {
        console.log('HELLO TIENES O NO FILE');
        console.log(file);
        const parseFile = new Parse.File(file.name, file);
        parseFile.save().then((myFile) => {
          // The file has been saved to Parse.
          console.log(myFile);
          ideaInfo.set("file", myFile);
          this.saveFinalIdea(ideaInfo);
        }, (error) => {
          // The file either could not be read, or could not be saved to Parse.
        });
      } else {
        this.saveFinalIdea(ideaInfo);
      }
    }

    saveFinalIdea(ideaInfo) {
      ideaInfo.save()
      .then(() => {
        this.setNotifications().then((e) =>
          alert('¡Congrats! Thanks for submitting your idea.',this.resetForm(e)));
        // Execute any logic that should take place after the object is saved.
        // 
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }

    resetForm(e) {
      // e.preventDefault();
      // console.log(e);
      // console.log('reset');
      // this.setNotifications();
      this.setState({proponent: '', department: '', category: '', ideaDescription:'', date: new Date(),file: '', remainingCharacters: 250, descriptionValid:'', });
      window.location.reload(); 
    }

    addNotifications() {

    }

    change(event) {
      // this.setState({category: event.target.value});
      this.setState({department: event.target.value});
      // console.log(event.target.value);
    }

    setCategory(categoryName, categoryIcon) {
      this.setState({
        category: categoryName,
        categoryIcon: categoryIcon
      })

      this.handleCategoryChange(categoryName)
      console.log(categoryName);
    }

    setFilter(filterName) {
      // console.log(filterName);
      // this.setState({sectionTitle: (filterName === "innovacion")?"INNOVACION":"RESOLUCION DE PROBLEMAS"});
      if (filterName == "innovacion") {
        this.setState({ideaType: filterName});
      } else {
        this.setState({ideaType: "problema"});
      }

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

    filterQuestionAnswerChange(answer, idx) {
      const {filterQAnswers} = this.state;
      // console.log(event.target.value);
      // console.log(idx);
      // const newObj = {'question':this.state.filterQuestions[idx], 'answer': event.target.value }
      this.state.filterQAnswers[idx].answer = answer;
      this.setState({filterQAnswers: filterQAnswers})
      // console.log(this.state.filterQAnswers);
      // const newArray = this.state.filterQAnswers
      // this.setState({filterQAnswers: newArray}, console.log(this.state.filterQAnswers));
      // this.setState({department: event.target.value});
      // console.log(this.state.answers[idx].answer);
    }

    filterQuestionAnswerChangeField(event, idx) {
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

    questionAnswerChange(answer, idx) {
      const {answers} = this.state;
      // console.log(event.target.value);
      console.log(answers);
      // const newObj = {'question':this.state.filterQuestions[idx], 'answer': event.target.value }
      this.state.answers[idx].answer = answer;
      this.setState({answers: answers})
      // console.log(this.state.answers);
      // const newArray = this.state.filterQAnswers
      // this.setState({filterQAnswers: newArray}, console.log(this.state.filterQAnswers));
      // this.setState({department: event.target.value});
      // console.log(this.state.answers[idx].answer);
    }

    questionAnswerChangeField(event, idx) {
      const {answers} = this.state;
      // console.log(event.target.value);
      console.log(answers);
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

    setIdeaTitle(event) {
      const description = event.target.value;
      const maxCharacters = 30;
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
        titleValid: isValid,
        ideaTitle: description,
        remainingTitleCharacters: charCount
      })
    }

    setExpectedReturn(event) {
      const amount = event.target.value;
  
      // console.log(isValid);
      this.setState({
        expectedReturn: amount,
      })
    }

    getFullName(result) {
      if (result) {
          return result.get("firstName") + ' ' + result.get("lastName");
      }
    }

    selectFile(myFile) {
      console.log(myFile);
      this.setState({file: myFile});
    }

    deleteFile() {
      this.setState({file: ''});
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
        const question = item.get("questionTrans")
        const validQuestion = question['en']
        newItems.push({question: validQuestion, answer:''});
      })

      this.setState({ filterQAnswers: newItems}, () => {
          // console.log(this.state.filterQAnswers);
        });
    }

    handleChange = selectedOption => {
      console.log(selectedOption)
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
      );
    };

    selectEmployees = selectedEmployees => {
      console.log(selectedEmployees);
      this.setState(
        { selectedEmployees },
        () => console.log(`Option selected:`, this.state.selectedEmployees)
      );
    };

    render() {
        const {hasATeam, hasAttachment, visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, filterQuestions, selectedFilterQ, categoryQuestions, hideNextButton, date, remainingCharacters, descriptionValid,ideaDescription, userName, ideaTitle, titleValid, remainingTitleCharacters, expectedReturn, options } = this.state
        const { currentStage } = this.props;

        const formVisibilityState = currentStage == 0? 'block' : 'none';
        const filterVisibilityState = currentStage == 1? 'block' : 'none';
        // const formVisibilityState = 'none';
        // const filterVisibilityState = 'none';
        const filterQuestionVisibilityState = currentStage == 2? 'block' : 'none';
        // const filterQuestionVisibilityState = 'block';
        const questionVisibilityState = ideaQuestionsVisible? 'block' : 'none';

        const thankYouVisibilityState = currentStage == 3? 'block' : 'none';

        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';
        const expectedRetunrnValid =  /^\d+$/.test(expectedReturn);
        // alert(this.state.filterQuestions.length)
        const { t } = this.props;
        
        return(
                  <div className="edit-user-details mb-4">
                    {/* <ProfileBackgroundPhoto /> */}
    
                    {/* <CardBody className="p-0"> */}
    
                      {/* Form Section Title :: General */}
                      <Form className="py-4"
                      onSubmit={this.onSubmit}
                      noValidate
                      >
                        
                        {/* <h6 style={{fontWeight: 500, color: '#303030'}}>Choose how to contribute! </h6> */}
                        {/* VISIBILITY */}
                        <div style={{display: formVisibilityState}}>
                        
                        {/* Categoria */}
                        <Col md="12" className="form-group">
                            <CategorySelect setCategory={this.setCategory} department={this.props.department}/>
                          </Col>
                        <br/>
                        
                        <Row form>
                          <Col md="6">
                          <h6 style={{fontWeight: 500, color: '#303030'}}>Selected Category: </h6>
                            <SelectedCategoryDisplay categoryName={this.state.categoryIcon} setCategory={this.setCategory} department={this.props.department}></SelectedCategoryDisplay>
                          </Col>
                          
                          {/* Idea Description */}
                          <Col md="6" className="form-group">
                            {/* <label htmlFor="ideaTitle">{t("SUBMIT_IDEA_IdeaTitle")}</label> */}
                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{t("SUBMIT_IDEA_IdeaTitle")}</h6>
                            <FormInput
                            id="userBio"
                            placeholder={t('SUBMIT_IDEA_TitlePlaceholder')}
                            value={ideaTitle}
                            onChange={this.setIdeaTitle}
                            // valid={titleValid ? true : null}
                            // invalid={!titleValid ? true : null}
                            />
                            { titleValid &&
                            <FormFeedback 
                              valid={titleValid}
                              invalid={!titleValid}>
                              {remainingTitleCharacters} {t("SUBMIT_IDEA_RemainingCharacters")}
                            </FormFeedback>
                            }
                            <br/>
                            {/* <label htmlFor="userBio">{t("SUBMIT_IDEA_IdeaDescription")}</label> */}
                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{t("SUBMIT_IDEA_IdeaDescription")}</h6>
                            <FormTextarea
                              style={{ minHeight: "120px" }}
                              id="userBio"
                              placeholder={t("SUBMIT_IDEA_DescriptionPlaceholder")}
                              value={ideaDescription}
                              onChange={this.setIdeaDescription}
                              // valid={descriptionValid}
                              // invalid={!descriptionValid}
                            />
                            {ideaDescription && 
                            <FormFeedback 
                              valid={descriptionValid}
                              invalid={!descriptionValid}>
                              {remainingCharacters} {t("SUBMIT_IDEA_RemainingCharacters")}
                            </FormFeedback>}
                            <br/>
                            <FormCheckbox
                              checked={this.state.hasTeam}
                              onChange={e => this.setState({hasTeam: !this.state.hasTeam})}
                            >
                              {t('Add team members and attachments')}
                            </FormCheckbox>
    
                            
                            <br/>
                            {this.state.hasTeam &&
                              <div>

                                {/* Team */}
                                 
                                {/* <div >
                                  <Switch
                                  isOn={hasAttachment}
                                  onColor={"#633FDA"}
                                  style={{display: 'inline-block'}}
                                  handleToggle={(value) => this.setState({hasAttachment: !hasAttachment})}
                                />
                                <h6 style={{fontWeight: 500,  color: '#303030', display: 'inline-block'}}>{t("Add an attachment")}</h6>
                                </div>
                                
                                
                                {
                                  hasAttachment &&
                                <span><CustomFileUpload onFileSelect={this.selectFile} myFile={this.state.file}/> {this.state.file && <Button theme="warning" onClick={this.deleteFile}>{t("DELETE_FILE")}</Button>}</span> 
                                }
      
                                  <br/> */}
    
                              {/* Team */}
                               
                                 <div>
                                  <Switch
                                  isOn={hasATeam}
                                  id={'1234'}
                                  onColor={"#633FDA"}
                                  style={{display: 'inline-block'}}
                                  handleToggle={(value) => this.setState({hasATeam: !hasATeam})}
                                />
                                <h6 style={{fontWeight: 500,  color: '#303030', display: 'inline-block'}}>{t("Add a team")}</h6>
                                </div>
                                 
                                
                                {
                                  hasATeam &&
                                  <Select
                                    value={this.state.selectedEmployees}
                                    id={'12345'}
                                    onChange={this.selectEmployees}
                                    options={options}
                                    isMulti
                                    placeholder={t('Type [First Name] [Last Name]')}
                                  />
                                }
      
                                  <br/>
                              </div>
                              }
                              
                            
                            {/* <FormCheckbox
                              checked={this.state.hasTeam}
                              onChange={e => this.setState({hasAttachment: !this.state.hasTeam})}
                            >
                              {t('Add an attachment')}
                            </FormCheckbox>
                            <br/>
                            <strong className="text-muted d-block mb-2">
                            {t("SUBMIT_IDEA_UploadArchive")}
                            </strong>
                            <span><CustomFileUpload onFileSelect={this.selectFile} myFile={this.state.file}/> {this.state.file && <Button theme="warning" onClick={this.deleteFile}>{t("DELETE_FILE")}</Button>}</span> */}
                            {/* <Switch/> */}
                            {/* <label htmlFor="ideaTitle">{t("SUBMIT_IDEA_ReturnTitle")}</label>
                              <FormInput
                                id="expectedReturn"
                                placeholder={t('SUBMIT_IDEA_ReturnPlaceholder')}
                                value={expectedReturn}
                                onChange={this.setExpectedReturn}
                                invalid={!expectedRetunrnValid}
                            />
                            <FormFeedback 
                              valid={expectedRetunrnValid}
                              invalid={!expectedRetunrnValid}>
                             {t("SUBMIT_IDEA_Money")}
                            </FormFeedback> */}
                            {/* <br/>
                            <strong className="text-muted d-block mb-2">
                            {t("SUBMIT_IDEA_UploadArchive")}
                            </strong>
                            <span><CustomFileUpload onFileSelect={this.selectFile} myFile={this.state.file}/> {this.state.file && <Button theme="warning" onClick={this.deleteFile}>{t("DELETE_FILE")}</Button>}</span> */}
                          </Col>
                        </Row>
                        </div>
                          
                        {/* Select IDEA Filter Visibility State */}
                        <div style={{display: filterVisibilityState}}>
                          <IdeaFilterSelectNew setFilter={(e) => {this.setFilter(e)}}/>
                          {/* <ThankYou></ThankYou> */}
                        </div>

                        <div style={{display: thankYouVisibilityState}}>
                          <ThankYou></ThankYou>
                        </div>

                        {/* Select IDEA Filter Visibility State */}
                        <div style={{display: filterQuestionVisibilityState}}>
                        {/* <Row className="mx-4" style={{paddingBottom:20}}>
                          <h2>{sectionTitle}</h2>
                        </Row> */}
                        <Row form>
                          <Col lg="12">
                            <Row form>
                              {filterQuestions.map((item,idx) =>
                                <Col key={idx} md="6" className={"mt-4 pr-4"}>
                                  {/* <label  htmlFor="question"><strong>{item.get("questionTrans")[storageLanguage]}</strong></label> */}
                                  <h6 style={{fontWeight: 500,  color: '#303030', fontSize: 14}}>{item.get("questionTrans")[storageLanguage]}</h6>
                                  {item.get("field")?
                                  <FormTextarea 
                                  style={{ minHeight: "80px" }}
                                  id="filterQuestion"
                                  placeholder="Answer.."
                                  onChange={(event) => this.filterQuestionAnswerChangeField(event, idx)}
                                  required>
                                  </FormTextarea>
                                  :
                                  <div>
                                    <FormRadio
                                    inline
                                    name={"type"+idx}
                                    // checked={this.state.filterQAnswers[idx].answer == 'yes'}
                                    onChange={() => {
                                      this.filterQuestionAnswerChange("yes", idx)
                                    }}
                                  >
                                    Yes
                                  </FormRadio>
                                  <FormRadio
                                    inline
                                    name={"type"+idx}
                                    // checked={this.state.filterQAnswers[idx].answer == 'no'}
                                    onChange={() => {
                                      this.filterQuestionAnswerChange("no", idx)
                                    }}
                                  >
                                    No
                                  </FormRadio>
                                  </div>
                                  }
                                  <br/>
                                </Col>
                              )}
                              </Row>
                            </Col>
                            </Row>
                        </div>

                        {/* Question Visibility State */}
                        <div style={{display: questionVisibilityState}}>
                          <Row form className="mx-4">
                            <Col lg="12">
                              <Row form>
                                {categoryQuestions.map((item,idx) =>
                                  <Col key={idx} md="6">
                                    <label  htmlFor="question"><strong>{item.get("questionTrans")[storageLanguage]}</strong></label>
                                    {item.get("field")?
                                    <FormTextarea 
                                    style={{ minHeight: "80px" }}
                                    id="ideaQuestion"
                                    placeholder={t('ANSWER')}
                                    onChange={(event) => this.questionAnswerChangeField(event, idx)}
                                    required>
                                    </FormTextarea>
                                    :
                                    <div>
                                       <FormRadio
                                        inline
                                        name={"type"+idx}
                                        checked={ this.state.answers[idx].answer == "yes"}
                                        onChange={() => {
                                          this.questionAnswerChange("yes", idx)
                                        }}
                                      >
                                        Yes
                                      </FormRadio>
                                      <FormRadio
                                        inline
                                        name={"type"+idx}
                                        checked={ this.state.answers[idx].answer == "no"}
                                        onChange={() => {
                                          this.questionAnswerChange("no", idx)
                                        }}
                                      >
                                        No
                                      </FormRadio>
                                      <br/>
                                        <label  class="text-muted" htmlFor="question">{item.get("required")?t('SUBMIT_IDEA_REQUIRED_QUESTION'):""}</label>
                                        <br/>
                                        </div>
                                    }
                                  </Col>
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                    {/* </CardBody> */}
                    {/* <CardFooter className="border-top">
                      <ButtonGroup size="sm" className="ml-auto d-table mr-3">
                        <Button theme="light" onClick={this.saveIdea}>Guardar</Button>
                        <Button theme="accent" onClick={this.showNext} style={{display: nextButtonVisibilityState}} >{this.state.formButtonTitle}</Button>
                      </ButtonGroup>
                    </CardFooter> */}
                  </div>
          );
    }
}


export default withTranslation()(SubmitIdeaForm);