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
  Tooltip
} from "shards-react";
import Select from 'react-select';
import Parse from 'parse';
import moment from 'moment';

import FormSectionTitle from "../edit-user-profile/FormSectionTitle";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import CategorySelect from "./CategorySelect"
import IdeaFilterSelect from "./IdeaFilterSelect";
import { all } from "q";
import EvaluationSelect from "./EvaluationSelect";
import ExecutionSelectNew from "./ExecutionSelectNew";
import { object } from "prop-types";

import { ReactComponent as LineChartImage } from "../../images/line-chart.svg"
import { ReactComponent as UserImage } from "../../images/man-user.svg"
import { ReactComponent as DocumentImage } from "../../images/document.svg"
import { ReactComponent as RibbonImage } from "../../images/ribbon.svg"
import { ReactComponent as BarsImage } from "../../images/bars.svg"

// Defult
import { ReactComponent as ExtraImage } from '../../images/innovation.svg';
import { ReactComponent as HandImage } from "../../images/hand.svg"
import { ReactComponent as ChartImage } from "../../images/line-chart.svg"
import { ReactComponent as ShieldImage } from "../../images/shield.svg"
import { ReactComponent as TimeImage } from "../../images/time.svg"
import { ReactComponent as TeamImage } from "../../images/team.svg"
import { ReactComponent as DollarImage } from "../../images/dollar-symbol.svg"
import { ReactComponent as GreenIcon } from "../../images/green_icon.svg"
import { ReactComponent as RedIcon } from "../../images/red_icon.svg"
import { ReactComponent as InfoIcon } from "../../images/info_icon.svg"
// fill="#157ffb"

// New
import { ReactComponent as UrgentImage} from '../../images/Icons_Idle_01_Urgent.svg';
import { ReactComponent as ProductivityImage } from "../../images/Icons_Idle_02_Productivity.svg"
import { ReactComponent as CheckmarkImage} from "../../images/check1.svg"
import { ReactComponent as TrophyImage } from "../../images/Icons_Idle_04_Trophy.svg"
import { ReactComponent as Shield2Image } from "../../images/Icons_Idle_05_Shield.svg"
import { ReactComponent as DollarSignImage } from "../../images/Icons_Idle_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImage } from "../../images/Icons_Idle_07_Number One.svg"
import { ReactComponent as SelectIdeaImage } from "../../images/Icons_Fx_09b_Placeholder.svg"
// import selectIdeaImage from '../../images/select_idea_category_new.png';
import selectIdeaImage from '../../images/selected.png';

// New Selected
import { ReactComponent as UrgentImageSelected} from '../../images/Icons_Selected_01_Urgent.svg';
import { ReactComponent as ProductivityImageSelected } from "../../images/Icons_Selected_02_Productivity.svg"
import { ReactComponent as CheckmarkImageSelected } from "../../images/check1_selected.svg"
import { ReactComponent as TrophyImageSelected } from "../../images/Icons_Selected_04_Trophy.svg"
import { ReactComponent as Shield2ImageSelected } from "../../images/Icons_Selected_05_Shield.svg"
import { ReactComponent as DollarSignImageSelected } from "../../images/Icons_Selected_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImageSelected } from "../../images/Icons_Selected_07_Number One.svg"
import Switch from "./Switch.js"

// Updated Icons
import { ReactComponent as CheckmarkNewImage} from '../../images/Icons_Idle_03_CheckmarkNew.svg';
import { ReactComponent as DenyImage} from '../../images/Icons_Idle_08_Deny.svg';
import { ReactComponent as SaveImage} from '../../images/Icons_Idle_09_Save.svg';
import { ReactComponent as TransferImage} from '../../images/Icons_Idle_10_Transfer.svg';
import { ReactComponent as ProjectImage} from '../../images/Icons_Idle_11_Project.svg';
import { ReactComponent as QuestionImage} from '../../images/Icons_Idle_12_Question.svg';

// Updated Icons Selected
import { ReactComponent as CheckmarkNewImageSelected} from '../../images/Icons_Selected_03_CheckmarkNew.svg';
import { ReactComponent as DenyImageSelected} from '../../images/Icons_Selected_08_Deny.svg';
import { ReactComponent as SaveImageSelected} from '../../images/Icons_Selected_09_Save.svg';
import { ReactComponent as TransferImageSelected} from '../../images/Icons_Selected_10_Transfer.svg';
import { ReactComponent as ProjectImageSelected} from '../../images/Icons_Selected_11_Project.svg';
import { ReactComponent as QuestionImageSelected} from '../../images/Icons_Selected_12_Question.svg';

import IdeaStatusSelect  from "./IdeaStatusSelect"

import { withTranslation } from 'react-i18next';


const remCharStyle = {
  color: 'green'
};

class IdeaViewCardNew extends React.Component {
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
          executionResObj: object,
          selectedBenefit:'',
          selectedResult: '',
          money: '',
          selectedImprovement: '',
          selectedImpact: '',
          selectedCoachBackup: '',
          isRecognized: '',
          page: 2,
          responseInfo: false,
          responseInfo2: false,
          selectedStatus: ''.length,
          expectedReturn: '',
          timeUnit: '',
          timeUnitVal: '',
          executionRes: 0,
          coachRes: '',
          recurringImpact: false,
          comment: '',
          needsEconomicImpact: false,
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
        this.changeMoney = this.changeMoney.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.setEvalStatus = this.setEvalStatus.bind(this);
        this.setExpectedReturn = this.setExpectedReturn.bind(this);
        this.setTimeUnit = this.setTimeUnit.bind(this);

    }

    componentDidUpdate(prevProps) {
      if (prevProps.canSubmit !== this.props.canSubmit) {
        // alert('Can evaluate!')
        this.submitEvaluation()
      }

      if (prevProps.ideaStage ==0 && this.props.ideaStage==1) {
        if (this.state.expectedReturn && this.state.timeUnit) {
          this.props.changeStatus(true)
        }

        if (this.state.needsEconomicImpact == false) {
          this.props.changeStatus(true)
        }
      }

      if (prevProps.ideaStage == 1 && this.props.ideaStage == 2) {
        
        if (this.state.selectedStatus == "Do not Pursue") {
          this.props.changeStatus(true)
        }
      }

      if (prevProps.ideaStage ==2 && this.props.ideaStage==1) {
        if (this.state.expectedReturn && this.state.timeUnit) {
          this.props.changeStatus(true)
        }

        if (this.state.needsEconomicImpact == false) {
          this.props.changeStatus(true)
        }
       
      }
    }

    componentDidMount() {
      let currUser = Parse.User.current();
      this.getUserName(currUser);
      this.fetchNewData();
      this.fetchQuestions();
      this.fetchFilterQuestions();
      this.getDate();
      this.fetchCategoryData()
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

    fetchCategoryData() {
      const ideaItem = this.props.ideaItem;
      const ideaCategory = ideaItem.get("category")

      const className = "IdeaCategory";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);

      // alert(ideaCategory)
      query.equalTo("itemName", ideaCategory);
      query.find()
      .then((results) => {
          this.setState({
              ideaCategory: results[0]
          });
          // console.log(results);
      }, (error) => {
        console.log(error)
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
      const {selectedStatus, status, ideaDescription, descriptionValid, userName, committeeResObj, executionRes} = this.state;
      const { setFinishedSaving } = this.props;

      var ideaItem = this.props.ideaItem;
      var comments = ideaItem.get("comments");
      var newStatus = '';
      var percentage = [25,75];
      var mayNeedEval = false 
      
      // Verify idea to check if it leaves the evaluation inbox or not
      if (selectedStatus == 'Project Idea' || status == 'Otro') {
        mayNeedEval = true
      }
      
      console.log(selectedStatus)
      console.log(mayNeedEval)
      
      switch(selectedStatus) {
        case 'Request\ninformation':
          // code block
          percentage = [0,100];
          newStatus = 'More Information Needed';
          break;
        case "Espera":
          // code block
          newStatus = 'Idea en Espera';
          break;
        case "Do not Pursue":
          // code block
          newStatus = 'Do not Pursue';
          percentage = [0,100];
          break;
        case "Approve":
          // code block
          newStatus = 'Approved';
          break;
        case "Project Idea":
          // code block
          newStatus = 'Project Idea';
          break;
        case "Ejecutar Proyecto":
          // code block
          newStatus = 'Ejecutar - Just Do It - Proyecto';
          break;
        case "Save for Later":
          // code block
          newStatus = 'Save for Later';
          percentage = [0,100];
          break;
        default:
          newStatus = 'SOMETIDA';
          percentage = [0,100];
          // code block
      }



      // Comments
      var newComment = {"comment": ideaDescription, "date": new Date(), "user":userName, "progress":[25,75]};

      if (ideaDescription && ideaDescription.length > 0) {
        comments.push(newComment)
      }
      console.log(this.state.executionRes)
      const responsibleName = this.state.executionRes.label;

      // if (this.state.coachResObj != '' ) {
      //   const coachName = this.state.coachResObj.label;
      //   const coachUser = this.state.coachResObj.value;
      //   ideaItem.set("coachName",coachName);
      //   ideaItem.set("coach", coachUser);
      // }
     
      console.log('COACH SELECTION')
      console.log(this.state.coachResObj)

      const resUser = this.state.executionRes;

      ideaItem.set("status", newStatus);
      ideaItem.set("comments", comments);
      ideaItem.set("needsEvaluation", mayNeedEval);
      ideaItem.set("progress", percentage);

      if (status == 'Otro') {
        var otherCom = committeeResObj.get('value');
        ideaItem.set("department", otherCom);
      } else {
        ideaItem.set("responsibleName",responsibleName);
      }

      ideaItem.set("responsible", resUser.value);
      ideaItem.set("edited", false);
      console.log(newStatus)

      if ( newStatus == 'No Perseguido') {
        if (window.confirm('Did you have a conversation with your employee? If you did, please click OK.')) this.saveIdeaItem(ideaItem) 
      } else {
        this.saveIdeaItem(ideaItem) 
      }
  }

  saveIdeaItem(ideaItem) {
    const { setFinishedSaving } = this.props;
    Parse.Object.saveAll([ideaItem], {useMasterKey: true}).then(() => {
      if (this.state.status == 'Otro') {
        alert('Su evaluacion ha sido sometida. ¡Gracias!', setFinishedSaving());
      } else {
        setFinishedSaving()
      }
    });
  }

    changeStatus(selection) {
      this.setState({status: selection});
      console.log('STATUS CHANGED TO: ' + this.state.status);
    }

    // changeResponsible(res, idx) {
    //   console.log(idx);
    //   this.setState({
    //     executionResObj: res,
    //     executionRes: idx
    //   });
    //   console.log(res);
    // }

    changeEvaluationResponse() {
      const responseObj = {
        status: '',
        economicImpact: '',
        timeFrame: '',
        recurringImpact: false,
        comments: '',
        ideaOwner: '',
        ideaCoach: ''
      }
    }

    async getHumanResourceUsers() {
      var query = new Parse.Query(Parse.User);
      query.equalTo("humanResources", true);
      const results = await query.find();
      console.log(results);
      return results
    }

    async setVerificationNotifications() {
      const allUsers= await this.getHumanResourceUsers();
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

    async setNotifications() {
      const {allUsers, department, category} = this.state;

      const responsibleMsg = '¡Congrats! Your idea has been verified.';

      var ideaItem = this.props.ideaItem;

      var responsibleUser = ideaItem.get("responsible");

      var responsibleNotifications = responsibleUser.get("notificationMessages");
      responsibleNotifications.unshift(responsibleMsg);

      responsibleUser.increment("notificationCount");
      responsibleUser.set("notificationMessages", responsibleNotifications);

      var users = new Parse.Query("Users");

      if(this.state.isRecognized) {
        await Parse.Object.saveAll(users, {useMasterKey: true}).then(()=> this.setVerificationNotifications())
        .catch(error => {
          console.log('Error saving.');
       });
      } else {
        await Parse.Object.saveAll(users, {useMasterKey: true})
        .catch(error => {
          console.log('Error saving.');
       });
      }
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

    changeMoney(response) {
      const inputMoney = parseFloat(response.target.value);
      console.log(inputMoney);
      this.setState({
        money: inputMoney
      })
    }

    changeRecognition(response) {
      this.setState({
          isRecognized: response
      });
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

    getDate(date) {
      // console.log(date);
      return moment(date).format('DD / MM / YYYY');
    }

    getIcon(name, fillColor) {
      const {selectionValue, selectedCategoryName, page} = this.state;
      const newIcons = [
        {normal: <UrgentImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <UrgentImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <ProductivityImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <ProductivityImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <CheckmarkImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <CheckmarkImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <TrophyImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <TrophyImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <Shield2Image className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <Shield2ImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <DollarSignImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <DollarSignImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
       {normal: <NumberOneImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
        selected: <NumberOneImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
       },
        {normal: <UrgentImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <UrgentImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <DenyImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <DenyImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <TransferImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <TransferImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <ProjectImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <ProjectImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <QuestionImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <QuestionImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <SaveImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <SaveImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
        {normal: <CheckmarkImage className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>,
         selected: <CheckmarkImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
        },
    ]

      switch(name) {
          case 'HandImage':
            return <HandImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          case 'ShieldImage':
              return <ShieldImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          case 'ChartImage':
              return <ChartImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          case 'TeamImage':
              return <TeamImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          case 'DollarImage':
              return <DollarImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          case 'ClockImage':
              return <TimeImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: fillColor}}/>;
          //New Icons
          case 'Urgent':
              return newIcons[0].selected;
          case 'Productivity':
              return newIcons[1].selected;
          case 'Checkmark':
              return newIcons[2].selected;
          case 'Trophy':
              return newIcons[3].selected;
          case 'Shield Image':
              return newIcons[4].selected;
          case 'Dollar':
              return newIcons[5].selected;
          case 'Dollar Sign':
            return newIcons[5].selected;
          case 'Number One':
              return newIcons[6].selected;
          case 'Approve':
              return newIcons[13].selected;
          case 'Do not Pursue':
              return newIcons[8].selected;
          case 'Save for Later':
              return newIcons[12].selected;
          case 'Request information':
              return newIcons[11].selected;
          case 'Request\ninformation':
            return newIcons[11].selected;
          case 'Project Idea':
              return newIcons[10].selected;
          case 'Transfer Committee':
              return newIcons[9].selected;
          case 'Transfer\nCommittee':
            return newIcons[9].selected;
          default:
            return <img src={selectIdeaImage} width="200" height="200" />//<SelectIdeaImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
        }
  }

  getIconDescription(name) {
    const {selectionValue, selectedCategoryName, page} = this.state;
    const {t} = this.props;
  
    switch(name) {
        case 'Approve':
            return t("APPROVE_MSG");
        case 'Do not Pursue':
            return t("DO_NOT_PURSUE_MSG");
        case 'Save for Later':
            return t("SAVE_FOR_LATER_MSG");
        case 'Request information':
            return t("REQUEST_INFORMATION_MSG");
        case 'Request\ninformation':
            return t("REQUEST_INFORMATION_MSG");
        case 'Project Idea':
            return t("PROJECT_IDEA_MSG");
        case 'Transfer Committee':
            return t("TRANSFER_COMMITTEE_MSG");
        case 'Transfer\nCommittee':
          return t("TRANSFER_COMMITTEE_MSG");
        default:
          return "No description available at the moment."//<SelectIdeaImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
      }
  }

    toggle() {
      // alert('hover')
      this.setState({
        responseInfo: !this.state.responseInfo
      });
    }

    setEvalStatus(status, index) {
      console.log(status)
      this.setState({
        selectedStatus: status,
        selectedStatusVal: status
      })
    }

    setExpectedReturn(event) {
      const amount = event.target.value;
  
      // console.log(isValid);
      this.setState({
        expectedReturn: amount,
      })

      if (amount && this.state.timeUnit) {
        this.props.changeStatus(true)
      } else {
        this.props.changeStatus(false)
      }
    }

    setTimeUnit(unit) {
      console.log(unit)
      this.setState({timeUnit: unit.label, timeUnitVal: unit})
      if (this.state.expectedReturn && unit.label) {
        this.props.changeStatus(true)
      }
    }

    changeResponsible(res, idx) {
      this.setState({
        executionRes: res,
      });
      
      if (res) {
        this.props.changeStatus(true)
      }
      console.log(res);
    }

    changeCoach(res, idx) {
      this.setState({
        coachRes: res,
      });
      console.log(res);
    }

    commentChangeField(res) {
      const comment = res.target.value
      this.setState({
        comment: comment
      })
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
    

    render() {
        const {ideaCategory, coachRes, expectedReturn, page, visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, selectedFilterQ, categoryQuestions, category, answers, buttonState, hideNextButton, date, remainingCharacters, descriptionValid, department, ideaDescription, userName, sectionTitle, executionRes } = this.state
        const {ideaStage, evaluationData, t} = this.props;
        const formVisibilityState = visible? 'block' : 'none';
        const filterVisibilityState = filterVisible? 'block' : 'none';
        const filterQuestionVisibilityState = filterQuestionsVisible? 'block' : 'none';
        const questionVisibilityState = ideaQuestionsVisible? 'block' : 'none';
        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';
        const ideaItem = this.props.ideaItem;
        const comments = ideaItem.get("comments")
        const ideaDate = ideaItem.get("date")
        const today = moment()
        const ideaMomentDate = moment(ideaDate)
        const timeDiff = today.diff(ideaMomentDate, 'days')
        const timingWording = timeDiff > 10 ? "Late" : "On-Time"
        console.log(ideaMomentDate)
        console.log(today)
        console.log(timeDiff)
        const parsedDate = this.getDate(ideaDate)
        const nowDate = this.getDate(Date())


        const customStyles = {
          control: base => ({
            ...base,
            height: 35,
            minHeight: 35
          })
        };
        const storageLanguage =  localStorage.getItem('language') != null?localStorage.getItem('language'):'en';
        const myIcon = ideaCategory && ideaCategory.get("icon")
        const categoryTitle = ideaCategory && ideaCategory.get("itemNameTrans")[storageLanguage]


        return(

            <div className="edit-user-details" >
                    {/* <ProfileBackgroundPhoto /> */}
    
                    {/* <CardBody className="p-0"> */}
    
                      {/* Form Section Title :: General */}
                      <Form className="py-4"
                      onSubmit={this.onSubmit}
                      noValidate
                      >
                        
                        {/* VISIBILITY */}
                        <div style={{display: formVisibilityState}}>
                        <Row form>
                          {/* Left Part */}
                          <Col lg="5">
                            <Row form>
                              {/* Proponent */}
                              <Col md="12" className="form-group">
                                <Row className="mt-4">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Idea Title</label>
                                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("title")}</h6>
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col md="6">
                                    <label htmlFor="firstName" className="georgia">Idea Category</label>
                                    <Row>
                                      <Col>
                                      {this.getIcon(myIcon, 'Black')}
                                          <div className="mr-auto" style={{width: '100%', backgrounColor: 'black'}}>
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{categoryTitle}</h6>
                                          </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col md="6">
                                    <Row className="mt-2">
                                      <Col>
                                        <label htmlFor="firstName" className="georgia">Submit Date</label>
                                        <h6 style={{fontWeight: 500,  color: '#303030'}}>{parsedDate}</h6>
                                      </Col>
                                    </Row>
                                    <Row className="mt-2">
                                      <Col>
                                        <label htmlFor="firstName" className="georgia">Employee Response</label>
                                        <Row>
                                          <Col md="7">
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{timingWording}</h6>
                                          </Col>
                                          <Col className="mb-auto" md="1">
                                            {/* <div className="my-auto" style={{backgroundColor: '#1DE334', height: 16, width: 16, borderRadius: 8}}></div> */}
                                            { timingWording == "On-Time"? 
                                            <GreenIcon style={{height: 16, width: 16}}></GreenIcon>
                                            :
                                            <RedIcon style={{height: 16, width: 16}}></RedIcon>
                                            }
                                          </Col>
                                          <Col md="1" className="mb-auto">
                                            <a id={"TooltipResponseInfo"} className="text-right" style={{ color: 'inherit'}} onClick={() => {
                                                const myCopy = this.state.responseInfo
                                                myCopy = !myCopy
                                                this.setState({responseInfo: myCopy})
                                            }}>
                                                
                                                <InfoIcon style={{height: 16, width: 16}}></InfoIcon>
                                                
                                            </a>
                                          </Col>
                                         
                                          <Tooltip
                                            open={this.state.responseInfo}
                                            target={"#TooltipResponseInfo"}
                                            id={"TooltipResponseInfo1"}
                                            toggle={() => {this.toggle()}}
                                            >
                                              {t("RESPONSE_TIME_MSG")}
                                          </Tooltip>
                                      </Row>

                                      </Col>
                                    </Row>
                                    
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Idea Type</label>
                                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("ideaType")}</h6>
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Department to benefit from idea</label>
                                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("department")}</h6>
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Idea Description</label>
                                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("description")}</h6>
                                  </Col>
                                </Row>
                                {ideaItem.get("file") && 
                                <Row className="mt-4">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Attachments</label>
                                    {/* <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("description")}</h6> */}
                                    {/* <Button >Download Attachment</Button> */}
                                    <Button onClick={() => this.downloadFile(ideaItem.get("file"))} style={{display: 'flex'}} >{t('VIEW_FILE')}</Button>
                                  </Col>
                                </Row>
                                }
                              </Col>
    
                            </Row>
                          </Col>
                          {/* Divisor Line */}
                          <Col lg="1" className="mx-auto">
                            {/* <div style={{height: 300, width: 10, color: 'blue'}}></div> */}
                            <div className="mx-auto" style={{height: '100%', width: 1, backgroundColor: '#BABABA'}}></div>
                          </Col>

                          {/* Right Part */}
                          { ideaStage == 0 && 
                          
                            <Col lg="6">
                                <Row form>
                                  {ideaItem.get("filterAnswer").map((question, index) => {
                                      const prefix = 'Q' + (index + 1)+ ': '
                                      const myQuestion = prefix + question["question"]
                                      return(
                                      <Col md="12" className="form-group">
                                        <Row className="mt-4">
                                          <Col md="12">
                                            <label className="georgia">{myQuestion}</label>
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{question["answer"]}</h6>
                                          </Col>
                                        </Row>
                                        
                                          {/* <Row form>
                                          <Col md="9">
                                          <p className="mb-2">{question["question"]}</p>
                                          <p className="mb-2">{question["answer"]}</p>
                                          </Col>
                                          </Row> */}
                                      </Col>)
                                  })}
                                  {ideaItem.get("questionAnswer").map((question, index) => {
                                      const prefix = 'Q' + (index + 1)+ ': '
                                      const myQuestion = prefix + question["question"]
                                      return(
                                      <Col md="12" className="form-group">
                                        <Row className="mt-4">
                                          <Col md="12">
                                            <p className="georgia">{myQuestion}</p>
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{question["answer"]}</h6>
                                          </Col>
                                        </Row>
                                        
                                          {/* <Row form>
                                          <Col md="9">
                                          <p className="mb-2">{question["question"]}</p>
                                          <p className="mb-2">{question["answer"]}</p>
                                          </Col>
                                          </Row> */}
                                      </Col>)
                                  })}
                                  </Row>
                            </Col>
                          }

                          {ideaStage == 1 && 
                            <Col lg="6">
                              <Row form className="mt-4">
                                <Col md="12" className="form-group">
                                  <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose how to proceed: ' + '*'}</h6>
                                  <IdeaStatusSelect setEvalStatus={this.setEvalStatus} selectedStatus={this.state.selectedStatus}></IdeaStatusSelect>
                                </Col>
                              </Row>
                              <Row form className="mt-4">
                                <Col md="12" className="form-group">
                                <Switch 
                                        isOn={this.state.needsEconomicImpact}
                                        handleToggle={() => {
                                          // Check to see if it has  everything
                                          if (this.state.needsEconomicImpact == false) {
                                            // this.props.changeStatus(false)
                                            if (this.state.expectedReturn && this.state.timeUnit) {
                                              this.props.changeStatus(true)
                                            } else {
                                              this.props.changeStatus(false)
                                            }
                                          } else {
                                            this.props.changeStatus(true)
                                            // if (this.state.expectedReturn && this.state.timeUnit) {
                                            //   this.props.changeStatus(true)
                                            // } else {
                                            //   this.props.changeStatus(false)
                                            // }
                                          }
                                          
                                          this.setState({needsEconomicImpact: !this.state.needsEconomicImpact})}
                                        }
                                        onColor="#633FDA"
                                        myKey={'economicImpact'}
                                        title="Estimate economic/output impact"
                                      />
                                  {/* <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Estimate economic/output impact *'}</h6> */}
                                  {this.state.needsEconomicImpact &&
                                  <Row>
                                    <Col>
                                      <FormInput
                                        id="expectedReturn"
                                        placeholder={'$15,000'}
                                        value={expectedReturn}
                                        onChange={this.setExpectedReturn}
                                        className="insideFont"
                                      />
                                    </Col>
                                    <Col>
                                      <Select
                                        value={this.state.timeUnitVal}
                                        className="insideFont"
                                        placeholder='term'
                                        styles={customStyles}
                                        onChange={this.setTimeUnit}
                                        options={[
                                          {
                                            value:'month',
                                            label:'month'
                                          }, 
                                          {
                                            value:'year',
                                            label:'year'
                                          }
                                        ]}
                                      />
                                    </Col>
                                    <Col>
                                      <Switch 
                                        isOn={this.state.recurringImpact}
                                        myKey={'recurringImpact'}
                                        handleToggle={() => this.setState({recurringImpact: !this.state.recurringImpact})}
                                        onColor="#633FDA"
                                        title="Recurring Impact"
                                      />
                                    </Col>
                                  </Row>
                                }
                                </Col>
                              </Row>
                              <Row form >
                                <Col md="12" className="form-group">
                                  <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Comments'}</h6>
                                    <FormTextarea 
                                      style={{ minHeight: "80px" }}
                                      id="ideaQuestion"
                                      className="insideFont"
                                      placeholder={t('ANSWER')}
                                      onChange={(event) => this.commentChangeField(event)}
                                      required>
                                    </FormTextarea>
                                </Col>
                              </Row>
                            </Col>
                          }

                          {ideaStage == 2 && 
                            <Col lg="6">
                              <Row className="mt-4">
                                  <Col md="6">
                                    <label htmlFor="firstName" className="georgia">Choose how to proceed: </label>
                                    <Row>
                                      <Col>
                                      {this.getIcon(this.state.selectedStatus, 'Black')}
                                          <div className="mr-auto" style={{width: '100%', backgrounColor: 'black'}}>
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{this.state.selectedStatus}</h6>
                                          </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col md="6">
                                    <Row className="mt-2">
                                      <Col>
                                        <label htmlFor="firstName" className="georgia">Employee Response Date</label>
                                        <h6 style={{fontWeight: 500,  color: '#303030'}}>{nowDate}</h6>
                                      </Col>
                                    </Row>
                                    <Row className="mt-2">
                                    <Col>
                                        <label htmlFor="firstName" className="georgia">Idea Status</label>
                                        <Row>
                                          <Col md="7">
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Pending'}</h6>
                                          </Col>
                                          <Col className="mb-auto" md="1">
                                            {/* <div className="my-auto" style={{backgroundColor: '#1DE334', height: 16, width: 16, borderRadius: 8}}></div> */}
                                            {/* { timingWording == "On-Time"? 
                                            <GreenIcon style={{height: 16, width: 16}}></GreenIcon>
                                            : */}
                                            <RedIcon style={{height: 16, width: 16}}></RedIcon>
                                            {/* } */}
                                          </Col>
                                          <Col md="1" className="mb-auto">
                                            <a id={"TooltipResponseInfo2"} className="text-right" style={{ color: 'inherit'}} onClick={() => {
                                                const myCopy = this.state.responseInfo2
                                                myCopy = !myCopy
                                                this.setState({responseInfo2: myCopy})
                                            }}>
                                                
                                                <InfoIcon style={{height: 16, width: 16}}></InfoIcon>
                                                
                                            </a>
                                          </Col>
                                         
                                          <Tooltip
                                            open={this.state.responseInfo2}
                                            target={"#TooltipResponseInfo2"}
                                            id={"TooltipResponseInfo2"}
                                            toggle={() => {this.toggle()}}
                                            >
                                              {this.getIconDescription(this.state.selectedStatus)}
                                            {/* Type Category Description. Lorem ipsum dolor sit amet, consectetuer adipi- scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volut-! */}
                                          </Tooltip>
                                      </Row>

                                      </Col>
                                    </Row>
                                    
                                  </Col>
                              </Row>

                              {/* Subject Matter Comments */}
                              <Row form className="mt-4">
                                <Col md="12" className="form-group">
                                  <label htmlFor="firstName" className="georgia">Subject-Matter Expert Comments:</label>
                                  <h6 style={{fontWeight: 500,  color: '#303030'}}>{this.state.comment}</h6>
                                </Col>
                              </Row>

                              {this.state.needsEconomicImpact &&
                              <Row form className="mt-4">
                                <Col md="12" className="form-group">
                                  <label className="georgia">{'Estimate economic/output impact'}</label>
                                  <Row>
                                    <Col>
                                      <h6 style={{fontWeight: 500,  color: '#303030'}}>{'$'+this.state.expectedReturn}</h6>
                                    </Col>
                                    <Col md="4">
                                      <h6 style={{fontWeight: 500,  color: '#303030'}}>{this.state.timeUnit}</h6>
                                    </Col>
                                    <Col md="4">
                                      <Switch 
                                        isOn={this.state.recurringImpact}
                                        disabled
                                        // handleToggle={() => this.setState({hasTeam: !hasTeam})}
                                        onColor="#633FDA"
                                        title="Recurring Impact"
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              }

                              { this.state.selectedStatus !== "Do not Pursue" &&
                              <Row form className="mt-4">
                                <Col md="12" className="form-group">
                                  <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose an Idea Owner *'}</h6>
                                    <ExecutionSelectNew className="insideFont" evalType={'execution'} setResponsible={(res, idx) => this.changeResponsible(res, idx)} selectedVal={executionRes}/>
                                  <br/>
                                  <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose an Idea Coach'}</h6>
                                    <ExecutionSelectNew className="insideFont" evalType={'coach'} setResponsible={(res, idx) => this.changeCoach(res, idx)} selectedVal={coachRes}/>
                                </Col>
                              </Row>
                              } 
                            </Col>
                          }
                        </Row>

                        
    
                       
                       
                        {/* Type of Idea Information (Problema o Innovacion) */}
                        
                        
                      
                        </div>
                        </Form>
                    {/* </CardBody> */}
                    {/* <CardFooter className="border-top">
                      <ButtonGroup size="sm" className="ml-auto d-table mr-3">
                     
                        <Button theme="accent" onClick={() => this.props.onViewIdeaPress()} style={{display: nextButtonVisibilityState}} >{t('BACK')}</Button>
                      </ButtonGroup>
                    </CardFooter> */}
                  </div>
          );
    }
}




export default withTranslation()(IdeaViewCardNew);