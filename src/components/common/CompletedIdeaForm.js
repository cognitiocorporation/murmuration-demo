import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader, 
  CardImg,
  CardTitle,
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
import { withTranslation } from 'react-i18next';

const remCharStyle = {
  color: 'green'
};

class CompletedIdeaForm extends React.Component {
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
          sectionTitle:'',
          formButtonTitle: 'Continuar',
          allUsers:[],
          mejoras:'',
          resultados:'',
          amountReturned: '',
          finalResults: '',
          beforePictureFile:'',
          afterPictureFile:'',
          hoursSaved: '',
          cost: '',
          inventory: '',
          oee: '',
          leadTime: '',
          replicated: '',
        }

        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setIdeaDescription = this.setIdeaDescription.bind(this);
        this.setIdeaTitle = this.setIdeaTitle.bind(this);
        this.selectBeforeFile = this.selectBeforeFile.bind(this);
        this.selectAfterFile = this.selectAfterFile.bind(this);
        this.showNext = this.showNext.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.saveIdea = this.saveIdea.bind(this);
        this.showNext = this.showNext.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.setResults = this.setResults.bind(this);
        this.setMejoras = this.setMejoras.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.changeCost = this.changeCost.bind(this);
        this.changeHours = this.changeHours.bind(this);
        this.changeInventory = this.changeInventory.bind(this);
        this.changeLeadtime = this.changeLeadtime.bind(this);
        this.changeOee = this.changeOee.bind(this);
        this.changeReplicated = this.changeReplicated.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    componentDidMount() {
      let currUser = Parse.User.current();
      this.getUserName(currUser);
      this.getUsers();
      this.fetchNewData();
      this.fetchQuestions();
      this.fetchFilterQuestions();
      this.getDate();
      this.getResult();
    }

     async getResult() {
      if (this.props.idea.get("result")) {
        const ideaResult = this.props.idea.get("result");
        const results = await ideaResult.fetch();
        this.setState({
          finalResults: results
        });
      }
      // var Result = Parse.Object.extend("Result");
      // var query = new Parse.Query(Result);

      // query.get(ideaResult)
      // .then((result) => {
      //   // The object was retrieved successfully.
      //   console.log(result);
      //   this.setState({
      //     finalResults: result
      //   });
      // }, (error) => {
      //   // The object was not retrieved successfully.
      //   // error is a Parse.Error with an error code and message.
      // });
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

    async getFinanceUsers() {
      var query = new Parse.Query(Parse.User);
      query.equalTo("finance", true);
      const results = await query.find();
      console.log(results);
      return results
    }

    async setVerificationNotifications() {
      const allUsers= await this.getFinanceUsers();
      for (var u in allUsers) {
        allUsers[u].increment("notificationCount");
        var responsibleNotifications = allUsers[u].get("notificationMessages");
        responsibleNotifications.unshift("'¡Congrats! You have ideas to evaluate.'");
        allUsers[u].set("notificationMessages", responsibleNotifications);
        await allUsers[u].save().catch(error => {
          // This will error, since the Parse.User is not authenticated
        });
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

    async savePhotos(myFile) {
      const parseFile = new Parse.File(myFile.name, myFile);
      parseFile.save().then((lastFile) => {
        // The file has been saved to Parse.
        console.log(lastFile);
        // ideaInfo.set("file", myFile);
        // this.saveFinalIdea(ideaInfo);
        return lastFile
      }, (error) => {
        // The file either could not be read, or could not be saved to Parse.
      });
    }

    showNext() {
     const {amountReturned, mejoras, resultados, beforePictureFile, afterPictureFile, hoursSaved, cost, inventory, oee, leadTime, replicated} = this.state;
     const idea = this.props.idea;
      var Result = Parse.Object.extend("Result");
      // Create a new instance of that class.
      var newResult = new Result();

      newResult.set("idea", idea);
      newResult.set("amountReturned", amountReturned);
      newResult.set("mejoras", mejoras);
      newResult.set("results", resultados);
      newResult.set("laborSaved", parseInt(hoursSaved))
      newResult.set("costSaved", parseInt(cost))
      newResult.set("inventorySaved", parseInt(inventory))
      newResult.set("oeeChange", parseInt(oee))
      newResult.set("leadTime", parseInt(leadTime))
      newResult.set("replicated", replicated)

      if (beforePictureFile && afterPictureFile) {
        const parseFile = new Parse.File(beforePictureFile.name, beforePictureFile);
        parseFile.save().then((lastFile) => {
          // The file has been saved to Parse.
          console.log(lastFile);
          // ideaInfo.set("file", myFile);
          // this.saveFinalIdea(ideaInfo);
          newResult.set("beforePhoto", lastFile);
          const myParseFile = new Parse.File(afterPictureFile.name, afterPictureFile);
          myParseFile.save().then((afterFile) => {
            // The file has been saved to Parse.
            // console.log(afterFile);
            newResult.set("afterPhoto", afterFile);
            this.finalSave(newResult, idea);
            // ideaInfo.set("file", myFile);
            // this.saveFinalIdea(ideaInfo);
        }, (error) => {
          // The file either could not be read, or could not be saved to Parse.
        });
        }, (error) => {
          // The file either could not be read, or could not be saved to Parse.
          console.log(error);
        });
      } else {
        this.finalSave(newResult, idea);
      }
    }

    finalSave(myResult, idea) {
      myResult.save()
      .then((result) => {
        this.setVerificationNotifications().then((e) =>
        this.updateIdea(idea, result))
        // Execute any logic that should take place after the object is saved.
        // 
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
      
    }

    updateIdea(idea, result) {
        idea.set("result", result);
        idea.set("completed", true);
        idea.set("needsEvaluation", true);
        idea.save()
        .then((result) => {
            alert('Gracias por someter los resultados. ',  window.location.reload());
            // Execute any logic that should take place after the object is saved.
            // 
        }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });
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

    async getIdeaCount(){
      var Idea = Parse.Object.extend("Idea");
      var query = new Parse.Query(Idea);
      var count = await query.count();
      console.log(count);
      return ++count
    }

    async saveIdea() {
      const {department, category, date, ideaDescription, file, answers, filterQAnswers, ideaTitle, userName, hoursSaved, cost, inventory, oee, leadTime, replicated} = this.state;
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
      
      ideaInfo.save()
      .then(() => {
        this.setVerificationNotifications().then((e) =>
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
      this.setState({proponent: '', department: '', category: '', ideaDescription:'', date: new Date(),file: '', remainingCharacters: 250, descriptionValid:'', answers: [], filterQAnswers: []});
      window.location.reload(); 
    }

    addNotifications() {

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

    selectBeforeFile(file) {
      // console.log(file);
      this.setState({
        beforePictureFile: file
      });
    }

    selectAfterFile(file) {
      // console.log(file);
      this.setState({
        afterPictureFile: file
      });
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

    changeAmount(event) {
        this.setState({
            amountReturned: event.target.value,
        });
    }

    setResults(event) {
        this.setState({
            resultados: event.target.value,
        });
    }

    changeHours(event) {
      this.setState({
          hoursSaved: event.target.value,
      });
    }

    changeCost(event) {
      this.setState({
          cost: event.target.value,
      });
    }

    changeInventory(event) {
      this.setState({
          inventory: event.target.value,
      });
    }

    changeOee(event) {
      this.setState({
          oee: event.target.value,
      });
    }

    changeLeadtime(event) {
      this.setState({
          leadTime: event.target.value,
      });
    }

    changeReplicated(value) {
      this.setState({
          replicated: value,
      });
    }


    setMejoras(event) {
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
        mejoras: event.target.value,
        remainingCharacters: charCount
      })
    }

    getIdeaData() {

    }

    downloadFile(file) {
      // console.log(file._url)
      if (file != null) {
          const newWindow = window.open(file._url, '_blank', 'noopener,noreferrer')
          if (newWindow) newWindow.opener = null
      } else {
          alert('No file found...');
      }
  }

    renderImgFile (file) {
      const { t } = this.props;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      console.log(file)
      const fileType = validImageTypes.includes(file['type'])?'image':'file'

      if (fileType == 'image') {
        return (
          <CardImg top src={file.url()} />
        )
      } else {
        return (
          <Button onClick={() => this.downloadFile(file)}>{t('VIEW_FILE')}</Button>
        )
      }
    }

    render() {
        const {visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, selectedFilterQ, categoryQuestions, hideNextButton, date, remainingCharacters, descriptionValid,ideaDescription, userName, ideaTitle, titleValid, remainingTitleCharacters, finalResults } = this.state
        const formVisibilityState = visible? 'block' : 'none';
        const filterVisibilityState = filterVisible? 'block' : 'none';
        const filterQuestionVisibilityState = filterQuestionsVisible? 'block' : 'none';
        const questionVisibilityState = ideaQuestionsVisible? 'block' : 'none';
        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';
        const completed = this.props.idea.get("completed");
        const ideaTit = this.props.idea.get("title");
        const ideaFile = this.props.idea.get("file");
        const beforeFile = finalResults && finalResults.get("beforePhoto");
        const afterFile = finalResults && finalResults.get("afterPhoto");
        const ideaDesc = this.props.idea.get("description");
        const ideaProponent = this.props.idea.get("proponentName");
        const ideaResponsible = this.props.idea.get("responsibleName");
        const mejoras = completed && finalResults?finalResults.get("mejoras"):"Breve descripcion de las mejoras implantadas...";
        const labor =  completed && finalResults?finalResults.get("laborSaved"):"Breve descripcion de las mejoras implantadas...";
        const costo =  completed && finalResults?finalResults.get("costSaved"):"Breve descripcion de las mejoras implantadas...";
        const inventario =  completed && finalResults?finalResults.get("inventorySaved"):"Breve descripcion de las mejoras implantadas...";
        const oee =  completed && finalResults?finalResults.get("oeeChange"):"Breve descripcion de las mejoras implantadas...";
        const tiempoEspera =  completed && finalResults?finalResults.get("leadTime"):"Breve descripcion de las mejoras implantadas...";
        const replicado =  completed && finalResults?finalResults.get("replicated"):"Breve descripcion de las mejoras implantadas...";        
        const resultados = completed && finalResults?finalResults.get("results"):"Breve descripcion de los resultados obtenidos y validados...";
        const revenue = completed && finalResults?finalResults.get("amountReturned"):"USD $";
        const { t } = this.props;
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
                          title={t('IDEA_COMPLETADA')}
                          description={t('IDEA_COMPLETADA_MESSAGE')}
                        />
                        {/* VISIBILITY */}
                        <div style={{display: formVisibilityState}}>
                        <Row form className="mx-4">
                        {/* Categoria */}
                        <Col md="6" className="form-group">
                            {/* <label htmlFor="userBio">Categoria</label>
                            <CategorySelect setCategory={this.setCategory} department={this.props.department}/> */}
                           <Card style={{ minHeight: "400px" }}>
                            <CardBody>
                                <CardTitle>{t('SUBMIT_IDEA_IdeaDescription')}</CardTitle>
                                <p>{t('TITLE')}: <strong>{ideaTit}</strong></p>
                                <p>{t('DESCRIPTION')}: <strong>{ideaDesc}</strong></p>
                                <p>{t('SUBMIT_IDEA_Proponent')}: <strong>{ideaProponent}</strong></p>
                                <p>{t('RESPONSIBLE_NAME')}: <strong>{ideaResponsible}</strong></p>
                                {ideaFile?this.renderImgFile(ideaFile):<p>{t("NO_FILE_FOUND")}</p>}
                            </CardBody>
                            </Card>
                          </Col>
                          
                          
                          {/* Idea Description */}
                          <Col md="6" className="form-group">
                            <Card style={{ minHeight: "400px" }}>
                            <CardBody>
                                <CardTitle>{t('PHOTOS_BEFORE_AFTER')}</CardTitle>
                                <p>{t('SUBMIT_BEFORE_AFTER')}</p>
                                <strong className="text-muted d-block mb-2">
                                {t('BEFORE')}
                            </strong>
                            {!beforeFile?(!completed?<span><CustomFileUpload onFileSelect={this.selectBeforeFile}/></span>:<p>{t('NO_FILE_FOUND')}</p>):
                            <CardImg top src={beforeFile.url()} />}
                             <strong className="text-muted d-block mb-2">
                             {t('AFTER')}
                            </strong>
                           {!afterFile?(!completed?<span><CustomFileUpload onFileSelect={this.selectAfterFile}/></span>:<p>{t('NO_FILE_FOUND')}</p>):
                            <CardImg top src={afterFile.url()} />}
                            </CardBody>
                            </Card>
                          </Col>
                        </Row>
    
                        <br/>
    
                        <Row form className="mx-4">
                        {/* Categoria */}
                        <Col md="6" className="form-group">
                        {completed?
                             <Card style={{ minHeight: "250px" }}>
                             <CardBody>
                                 <CardTitle>{t('MEJORAS_IMPLANTADAS')}</CardTitle>
                                  <FormTextarea
                               style={{ minHeight: "120px" }}
                               id="userBio"
                               placeholder={mejoras}
                               value={mejoras}
                               onChange={this.setMejoras}
                               inactive
                             />
                             <label  htmlFor="question"><strong>{t('SAVINGS_IN_LABOR')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('NUMBER_HOURS_SAVED')}
                                  value={labor}
                                  onChange={this.changeHours}
                                  inactive
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('COST')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('COST_SAVED')}
                                  value={costo}
                                  onChange={this.changeCost}
                                  inactive
                                  />
                                  <br/>                                  
                                  <label  htmlFor="question"><strong>{t('INVENTORY')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('INVENTORY_DESC')}
                                  value={inventario}
                                  onChange={this.changeInventory}
                                  inactive
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('OEE_INCREASE')}:</strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('OEE_INCREASE_MUCH')}
                                  value={oee}
                                  onChange={this.changeOee}
                                  inactive
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('LEAD_TIME')}:</strong></label>                                          
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('LEAD_TIME_HOURS')}
                                  value={tiempoEspera}
                                  onChange={this.changeLeadtime}
                                  inactive
                                  />
                             </CardBody>
                            </Card>
                             :
                            <Card style={{ minHeight: "250px" }}>
                            <CardBody>
                                <CardTitle>{t('MEJORAS_IMPLANTADAS')}</CardTitle>
                                 <FormTextarea
                                    style={{ minHeight: "120px" }}
                                    id="userBio"
                                    placeholder={mejoras}
                                    value={this.state.mejoras}
                                    onChange={this.setMejoras}
                                    valid={descriptionValid ? true : null}
                                    invalid={!descriptionValid ? true : null}
                                  />
                                  <FormFeedback 
                                    valid={descriptionValid ? true : null}
                                    invalid={!descriptionValid ? true : null}>
                                    {remainingCharacters} {t('SUBMIT_IDEA_RemainingCharacters')}
                                  </FormFeedback>
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('SAVINGS_IN_LABOR')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('NUMBER_HOURS_SAVED')}
                                  value={this.state.hoursSaved}
                                  onChange={this.changeHours}
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('COST')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('COST_SAVED')}
                                  value={this.state.cost}
                                  onChange={this.changeCost}
                                  />
                                  <br/>                                  
                                  <label  htmlFor="question"><strong>{t('INVENTORY')}: </strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('INVENTORY_DESC')}
                                  value={this.state.inventory}
                                  onChange={this.changeInventory}
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('OEE_INCREASE')}:</strong></label>
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('OEE_INCREASE_MUCH')}
                                  value={this.state.oee}
                                  onChange={this.changeOee}
                                  />
                                  <br/>
                                  <label  htmlFor="question"><strong>{t('LEAD_TIME')}:</strong></label>                                          
                                  <FormInput
                                  id="userBio"
                                  placeholder={t('LEAD_TIME_HOURS')}
                                  value={this.state.leadTime}
                                  onChange={this.changeLeadtime}
                                  />
                            </CardBody>
                            </Card>
                          }
                            {/* <label htmlFor="userBio">Categoria</label>
                            <CategorySelect setCategory={this.setCategory} department={this.props.department}/> */}
                          </Col>
                          
                          
                          {/* Idea Description */}
                          <Col md="6" className="form-group">
                          {completed?
                            <Card style={{ minHeight: "250px" }}>
                            <CardBody>
                                <CardTitle>Results</CardTitle>
                                  <FormTextarea
                              style={{ minHeight: "120px" }}
                              id="userBio"
                              placeholder={resultados}
                              value={resultados}
                              onChange={this.setResults}
                              inactive
                            />
                            <br/>
                            {/* <FormInput
                            id="userBio"
                            placeholder={revenue}
                            value={revenue}
                            onChange={this.changeAmount}
                            inactive
                            /> */}
                               <br/>
                            <label  htmlFor="question"><strong>{t('COULD_BE_REPLICATED')} </strong></label>
                            <br/>
                            <FormRadio
                              inline
                              name="sport"
                              checked={replicado == 'yes'}
                              onChange={(value) => {
                                // this.changeReplicated("yes");
                              }}
                              inactive
                            >
                              Yes
                            </FormRadio>
                            <FormRadio
                              inline
                              name="sport"
                              checked={replicado == 'no'}
                              onChange={(value) => {
                                // this.changeReplicated("no");
                              }}
                              inactive
                            >
                              No
                            </FormRadio>
                            </CardBody>
                            <br/>
                            {/* <FormInput
                            id="userBio"
                            placeholder={revenue}
                            value={this.state.amountReturned}
                            onChange={this.changeAmount}
                            /> */}
                            </Card>
                          :
                            <Card style={{ minHeight: "250px" }}>
                            <CardBody>
                                <CardTitle>Results</CardTitle>
                                  <FormTextarea
                              style={{ minHeight: "120px" }}
                              id="userBio"
                              placeholder={resultados}
                              value={this.state.resultados}
                              onChange={this.setResults}
                            />
                            <br/>
                            {/* <FormInput
                            id="userBio"
                            placeholder={revenue}
                            value={this.state.amountReturned}
                            onChange={this.changeAmount}
                            /> */}
                            <label  htmlFor="question"><strong>{t('COULD_BE_REPLICATED')} </strong></label>
                            <br/>
                            <FormRadio
                              inline
                              name="sport"
                              checked={this.state.replicated == "yes"}
                              onChange={(value) => {
                                this.changeReplicated("yes");
                              }}
                            >
                              Yes
                            </FormRadio>
                            <FormRadio
                              inline
                              name="sport"
                              checked={this.state.replicated == "no"}
                              onChange={(value) => {
                                this.changeReplicated("no");
                              }}
                            >
                              No
                            </FormRadio>
                            </CardBody>
                            </Card>
                          }
                          </Col>
                        </Row>
                        </div>
                          
                        {/* Select IDEA Filter Visibility State */}
                        <div style={{display: filterVisibilityState}}>
                          <IdeaFilterSelect setFilter={(e) => {this.setFilter(e)}}/>
                        </div>

                        {/* Select IDEA Filter Visibility State */}
                        <div style={{display: filterQuestionVisibilityState}}>
                        {/* <Row className="mx-4" style={{paddingBottom:20}}>
                          <h2>{sectionTitle}</h2>
                        </Row> */}
                        <Row form className="mx-4">
                          <Col lg="12">
                            <Row form>
                              {selectedFilterQ.map((item,idx) =>
                                <Col key={idx} md="6">
                                  <label  htmlFor="question"><strong>{item.get("questionTrans")}</strong></label>
                                  <FormTextarea 
                                  style={{ minHeight: "80px" }}
                                  id="filterQuestion"
                                  placeholder="Escribir contestacion..."
                                  onChange={(event) => this.filterQuestionAnswerChange(event, idx)}
                                  required>
                                  </FormTextarea>
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
                                    <label  htmlFor="question"><strong>{item.get("question")}</strong></label>
                                    <FormTextarea 
                                    style={{ minHeight: "80px" }}
                                    id="ideaQuestion"
                                    placeholder="Escribir contestacion..."
                                    onChange={(event) => this.questionAnswerChange(event, idx)}
                                    required>
                                    </FormTextarea>
                                    <label  class="text-muted" htmlFor="question">{item.get("required")?"*Esta pregunta es requerida.":""}</label>
                                    <br/>
                                  </Col>
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        </Form>
                    </CardBody>
                    <CardFooter className="border-top">
                      <ButtonGroup size="sm" className="ml-auto d-table mr-3">
                        {/* <Button theme="light" onClick={this.saveIdea}>Guardar</Button> */}
                        <Button disabled={completed} theme="accent" onClick={this.showNext} style={{display: nextButtonVisibilityState}}>Someter Resultados</Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
          );
    }
}


export default withTranslation() (CompletedIdeaForm);
