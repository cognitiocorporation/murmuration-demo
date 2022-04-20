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
import SupervisorSelect from "./SupervisorSelect";
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
import { ReactComponent as AcceptIcon } from "../../images/accept_button.svg"
import { ReactComponent as CancelIcon } from "../../images/cancel_button.svg"
import { ReactComponent as SelectedLanguageIcon } from "../../images/selected_language.svg"
import { ReactComponent as NotSelectedLanguageIcon } from "../../images/not_selected_language.svg"
import { ReactComponent as EditIcon } from "../../images/edit.svg"
import { ReactComponent as DeleteIcon } from "../../images/delete.svg"
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

// Import Category Icons
import UrgentImageLocal from '../../images/Icons_Idle_01_Urgent.svg';
import ProductivityImageLocal  from "../../images/Icons_Idle_02_Productivity.svg"
import CheckmarkImageLocal from "../../images/check1.svg"
import TrophyImageLocal  from "../../images/Icons_Idle_04_Trophy.svg"
import Shield2ImageLocal  from "../../images/Icons_Idle_05_Shield.svg"
import DollarSignImageLocal from "../../images/Icons_Idle_06_Dollar Sign.svg"
import NumberOneImageLocal  from "../../images/Icons_Idle_07_Number One.svg"


import Switch from "./Switch.js"

import SmallSwitch from "./SmallSwitch.js"

import IdeaStatusSelect  from "./IdeaStatusSelect"

import { withTranslation } from 'react-i18next';

import ImageGallery from 'react-image-gallery';
import DepartmentSelect from "./DepartmentSelect";
import SelectPrivileges from "./SelectPrivileges";
import CategoryBasicSelect from "./CategoryBasicSelect";

const images = [
  {
    original: UrgentImageLocal,
    thumbnail: UrgentImageLocal,
    name: 'Urgent'
  },
  {
    original: ProductivityImageLocal,
    thumbnail: ProductivityImageLocal,
    name: 'Productivity'
  },
  {
    original: CheckmarkImageLocal,
    thumbnail: CheckmarkImageLocal,
    name: 'Checkmark'
  },
  {
    original: TrophyImageLocal,
    thumbnail: TrophyImageLocal,
    name: 'Trophy'
  },
  {
    original: Shield2ImageLocal,
    thumbnail: Shield2ImageLocal,
    name: 'Shiel Image'
  },
  {
    original: DollarSignImageLocal,
    thumbnail: DollarSignImageLocal,
    name: 'Dollar Sign'
  },
  {
    original: NumberOneImageLocal,
    thumbnail: NumberOneImageLocal,
    name: 'Number One'
  },
];


const remCharStyle = {
  color: 'green'
};

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        // Refs
        this.galleryRef = React.createRef();

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
          language: 'en',
          executionRes: 0,
          coachRes: '',
          recurringImpact: false,
          comment: '',
          categoryDuration: false,
          startDate: '',
          endDate: '',
          selectedLanguage: {
            value:'English',
            label:'English'
          }, 
          categoryTitle: '',
          categoryInformation: '',
          hasEnglish: false,
          hasSpanish: false,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          privileges: [],
          userData: '',
          question: '',
          isRequired: false,
          questionType: '',
          questionSpanish: '',
          filterType: '',
          filterTypeValue: ''
        }

        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setQuestionType = this.setQuestionType.bind(this);
        this.setQuestion = this.setQuestion.bind(this);
        this.setIdeaDescription = this.setIdeaDescription.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.showNext = this.showNext.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.saveIdea = this.saveIdea.bind(this);
        this.showNext = this.showNext.bind(this);
        this.changeMoney = this.changeMoney.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.setEvalStatus = this.setEvalStatus.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setFilterType = this.setFilterType.bind(this);
        // this.setPassword = this.setPassword.bind(this);
        this.setLanguage = this.setLanguage.bind(this);

    }

    componentDidUpdate(prevProps) {
      const {userData} = this.props;
      
      if (prevProps.userData !== this.props.userData) {
        // alert('Can evaluate!')
        this.loadInitialSettings()
      }
    }

    componentDidMount() {
      // Category

      this.loadInitialSettings()

      let currUser = Parse.User.current();
      this.getUserName(currUser);
      // this.fetchNewData();
      this.fetchQuestions();
      this.fetchFilterQuestions();
      this.getDate();
    }

    loadInitialSettings() {
      const { userData } = this.props;
      console.log(userData)
      if (userData) {
        const firstName = userData.get("firstName")
        const lastName = userData.get("lastName")
        const email = userData.get("username")
        const department = userData.get("department")
        const selectedDepartment = {value: "", label: department}

        this.setState({firstName: firstName, lastName: lastName, email: email, department: selectedDepartment})
      }


      // this.setState({categoryOn: categoryStatus, categoryTitle: categoryName, categoryInformation: categoryInformation, hasEnglish: hasEnglish, hasSpanish: hasSpanish})
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
      const {status, ideaDescription, descriptionValid, userName, committeeResObj, executionRes} = this.state;
      const { setFinishedSaving } = this.props;

      var ideaItem = this.props.ideaItem;
      var comments = ideaItem.get("comments");
      var newStatus = '';
      var percentage = [25,75];
      var mayNeedEval = false 
      
      // Verify idea to check if it leaves the evaluation inbox or not
      if (status == 'Proyecto' || status == 'Otro') {
        mayNeedEval = true
      }
      
      console.log(status)
      console.log(mayNeedEval)

      switch(status) {
        case "Devuelta":
          // code block
          newStatus = 'Idea Devuelta - Mas Informacion';
          break;
        case "Espera":
          // code block
          newStatus = 'Idea en Espera';
          break;
        case "No Perseguido":
          // code block
          newStatus = 'No Perseguido';
          percentage = [0,100];
          break;
        case "Ejecutar":
          // code block
          newStatus = 'Ejecutar - Just Do It';
          break;

        case "Ejecutar Proyecto":
          // code block
          newStatus = 'Ejecutar - Just Do It - Proyecto';
          break;
        case "Proyecto":
          // code block
          newStatus = 'Idea Proyecto';
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
        ideaCoach: '',
        privileges: '',
        supervisor: ''
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
          case 'Shield':
              return newIcons[4].selected;
          case 'Dollar':
              return newIcons[5].selected;
          case 'Number One':
              return newIcons[6].selected;
          case 'Approve':
              return newIcons[0].selected;
          case 'Do not Pursue':
              return newIcons[1].selected;
          case 'Save for Later':
              return newIcons[2].selected;
          case 'Request information':
              return newIcons[3].selected;
          case 'Project Idea':
              return newIcons[4].selected;
          case 'Transfer Committee':
              return newIcons[5].selected;
          default:
            return <img src={selectIdeaImage} width="200" height="200" />//<SelectIdeaImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
        }
  }
    toggle() {
      // alert('hover')
      this.setState({
        responseInfo: !this.state.responseInfo
      });
    }

    setEvalStatus(status) {
      console.log(status)
      this.setState({
        selectedStatus: status
      })
    }

    setFirstName(event) {
      const name = event.target.value;
  
      // console.log(isValid);
      this.setState({
        firstName: name,
      })
    }

    setEmail(event) {
      const email = event.target.value;
  
      // console.log(isValid);
      this.setState({
        email: email,
      })
    }

    

    setQuestion(event) {
        const question = event.target.value;
    
        if (this.state.selectedLanguage.value == "English") {
            this.setState({
                question: question,
              })
        } else {
            this.setState({
                questionSpanish: question,
              })
        }
    }

    changePassword(event) {
      const password = event.target.value;
  
      // console.log(isValid);
      this.setState({
        password: password,
      })
    }

    setLanguage(unit) {
      console.log(unit)
      this.setState({selectedLanguage: unit}, () => {
        // this.loadInitialSettings()
    })
      // this.loadInitialSettings()
      // if (this.state.expectedReturn && unit.label) {
      //   this.props.changeStatus(true)
      // }
    }

    setQuestionType(type) {
        console.log(type)
        
        this.setState({questionType: type}, () => {
        //   this.loadInitialSettings()
      })
        // this.loadInitialSettings()
        // if (this.state.expectedReturn && unit.label) {
        //   this.props.changeStatus(true)
        // }
      }

      setFilterType(type) {
        console.log(type)
        
        this.setState({filterType: type}, () => {
        //   this.loadInitialSettings()
      })
        // this.loadInitialSettings()
        // if (this.state.expectedReturn && unit.label) {
        //   this.props.changeStatus(true)
        // }
      }

    changeSupervisor(res, idx) {
      this.setState({
        supervisor: res,
      });
      
      console.log(res.value.get("email"));
    }

    changeDepartment(res, idx) {
        this.setState({
          department: res,
        });
        
        // if (res) {
        //   this.props.changeStatus(true)
        // }
        // console.log(res);
      }

      changeFilterTypeValue(res, idx) {
        this.setState({
          filterTypeValue: res,
        });
        
        // if (res) {
        //   this.props.changeStatus(true)
        // }
        // console.log(res);
      }

      changePrivileges(res, idx) {
        this.setState({
          privileges: res,
        });
        console.log(res)
        // if (res) {
        //   this.props.changeStatus(true)
        // }
        // console.log(res);
      }


    changeCoach(res, idx) {
      this.setState({
        coachRes: res,
      });
      console.log(res);
    }

    changeLastName(res) {
      const lastName = res.target.value
      this.setState({
        lastName: lastName
      })
    }

    async saveQuestion() {
      const { question, questionSpanish, isRequired, questionType, filterType, filterTypeValue} = this.state;

      const IdeaQuestion = Parse.Object.extend("IdeaQuestion");
      const ideaQuestion = new IdeaQuestion();

      const FilterQuestion = Parse.Object.extend("FilterQuestion")
      const filterQuestion = new FilterQuestion();



      if (question == '' || questionSpanish == '' || questionType == '' || filterType == '' || filterTypeValue == '') {
        alert('Please enter all required information.');
      } else {

        // // Check if super-user
        // const isSuperUser = privileges.some(e => e.label === 'Super User')
        // // Check if Coach
        // const isCoach = privileges.some(e => e.label === 'Coach')
        // // Check if Supervisor
        // const isSupervisor = privileges.some(e => e.label === 'Supervisor')

        // // User type
        // const userType = isSuperUser? 'super_user':'user'

        // // Supervisor email
        // const supervisorData = supervisor.value
        // const supervisorEmail = supervisorData.get("username")
        // console.log(supervisorEmail)

        //   user.set("username", email)
        //   user.set("password", password)
        //   user.set("firstName", firstName)
        //   user.set("coach", isCoach)
        //   user.set("isSupervisor", isSupervisor)
        //   user.set("supervisorEmail", supervisorEmail)
        //   user.set("lastName", lastName)
        //   user.set("evaluationCriteria", [])
        //   user.set("email", email);
        //   user.set("role", userType)
        //   user.set("department", department.label)
        //   user.set("notificationCount", 0)
        //   user.set("notificationMessages", [])

        const isField = questionType.label == 'Comment Box'
        const questionTrans = {
            en: question,
            es: questionSpanish
        }

        ideaQuestion.set("questionTrans", questionTrans)
        ideaQuestion.set("question", question)
        ideaQuestion.set("field", isField)
        ideaQuestion.set("category", filterTypeValue.label)
        ideaQuestion.set("required", isRequired)

        if (filterType.label == 'Type') {
            filterQuestion.set("questionTrans", questionTrans)
            filterQuestion.set("question", question)
            filterQuestion.set("field", isField)
            filterQuestion.set("ideaType", filterTypeValue.value)
            filterQuestion.set("filter", filterTypeValue.value)
            
            filterQuestion.save().then(() => {
                this.props.refreshQuestions()
            })
        } else {
            ideaQuestion.save().then(() => {
                this.props.refreshQuestions()
            })
        }
      }
      
     
    }

    async editUser() {
      const { userData, firstName, lastName, email, password, privileges, department, supervisor} = this.state;

      var sessionToken = Parse.User.current().getSessionToken();
      var user = userData;
     
      if (firstName == '' || lastName == '' || email == '' || department == '' ) {
        alert('Please enter all required information.');
      } else {

        if (privileges.length > 0) {
          // Check if super-user
          const isSuperUser = privileges.some(e => e.label === 'Super User')
          // Check if Coach
          const isCoach = privileges.some(e => e.label === 'Coach')
          // Check if Supervisor
          const isSupervisor = privileges.some(e => e.label === 'Supervisor')

          // User type
          const userType = isSuperUser? 'super_user':'user'

          user.set("isSupervisor", isSupervisor)
          user.set("role", userType)

        }
        
        // Supervisor email
        // const supervisorData = supervisor.value
        // const supervisorEmail = supervisorData.get("username")
        // console.log(supervisorEmail)

          user.set("firstName", firstName)
          user.set("lastName", lastName)
          user.set("email", email);
          user.set("department", department.label)

          user.save().then(() => {
            this.props.refreshQuestions()
          })

          // try {
          //     await user.signUp();
          //     Parse.User.become(sessionToken);
          //     this.props.refreshUsers()
          //     // Hooray! Let them use the app now.
          //     alert('User was created.');
          //   } catch (error) {
          //     // Show the error message somewhere and let the user try again.
          //     alert('There was an error creating user: ' + error.message);
          //   }
        }
      
     
    }

    deleteIdea() {
      const {selectedLanguage, categoryTitle, categoryInformation } = this.state;
      const {ideaStage, evaluationData, categoryData, refreshIdea} = this.props;
      
      const canDelete = window.confirm('Are you sure you want to delete this category?');
      
      if (canDelete) {
        categoryData.destroy().then(() => {
          refreshIdea()
        })
      }
    }

    deleteUser() {
      const {selectedLanguage, categoryTitle, categoryInformation } = this.state;
      const {userData} = this.props;
      
      const canDelete = window.confirm('Are you sure you want to delete this user?');
      
      if (canDelete) {
        userData.destroy({ useMasterKey: true}).then((item) => {
          this.props.refreshUsers()
        })
      }
    }

    createIdea() {

    }

    render() {
        const {firstName, lastName, email, supervisor, privileges, selectedLanguage, categoryTitle, categoryInformation, language, coachRes, expectedReturn, page, visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, selectedFilterQ, categoryQuestions, category, answers, buttonState, hideNextButton, date, remainingCharacters, descriptionValid, department, ideaDescription, userName, sectionTitle, executionRes } = this.state
        const {ideaStage, evaluationData, categoryData} = this.props;
        const formVisibilityState = visible? 'block' : 'none';
        const filterVisibilityState = filterVisible? 'block' : 'none';
        const filterQuestionVisibilityState = filterQuestionsVisible? 'block' : 'none';
        const questionVisibilityState = ideaQuestionsVisible? 'block' : 'none';
        const nextButtonVisibilityState = !hideNextButton? 'inline' : 'none';
        const ideaItem = this.props.ideaItem;
        const comments = []//ideaItem.get("comments")
        const ideaDate = Date() //ideaItem.get("date")
        const today = moment()
        const ideaMomentDate = moment(ideaDate)
        const timeDiff = today.diff(ideaMomentDate, 'days')
        const timingWording = timeDiff > 10 ? "Late" : "On-Time"
        console.log(ideaMomentDate)
        console.log(today)
        console.log(timeDiff)
        console.log(ideaStage)
        const parsedDate = this.getDate(ideaDate)
        const nowDate = this.getDate(Date())
        const { t } = this.props;

        

        const customStyles = {
          control: base => ({
            ...base,
            height: 35,
            minHeight: 35
          })
        }; 

        const hasEnglish = this.state.question != ''
        const hasSpanish = this.state.questionSpanish != ''
        const canEditUser = this.props.userData != ''

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
                        <div >
                        <Row form >
                          {/* Left Part */}
                          
                       
                          

                          {/* Right Part */}
                          

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
                                            Type Category Description. Lorem ipsum dolor sit amet, consectetuer adipi- scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volut-!
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
                              <Row>
                                  
                              </Row>

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

                        <Row form className="mt-2" >
                            <Col md="12" className="mx-auto">
                                <Row className="mt-2">
                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Choose Language: </label>
                                        <Select
                                            value={selectedLanguage}
                                            className="insideFont"
                                            placeholder='English'
                                            styles={customStyles}
                                            onChange={this.setLanguage}
                                            options={[
                                            {
                                                value:'English',
                                                label:'English'
                                            }, 
                                            {
                                                value:'Spanish',
                                                label:'Spanish'
                                            }
                                            ]}z
                                        />
                                    </Col>

                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Configured Languages </label>
                                        <Row className="mt-auto">
                                            <Col md="4">
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{'English'}</h6>
                                            </Col>
                                            <Col className="mb-auto" md="1">
                                            { hasEnglish && <SelectedLanguageIcon style={{height: 20, width: 20}}></SelectedLanguageIcon>}
                                            { !hasEnglish && <NotSelectedLanguageIcon style={{height: 16, width: 16}}></NotSelectedLanguageIcon>}
                                            {/* } */}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                            <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Spanish'}</h6>
                                            </Col>
                                            <Col className="mb-auto" md="1">
                                            { hasSpanish && <SelectedLanguageIcon style={{height: 20, width: 20}}></SelectedLanguageIcon>}
                                            { !hasSpanish && <NotSelectedLanguageIcon style={{height: 16, width: 16}}></NotSelectedLanguageIcon>}
                                            {/* } */}
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Question Properties: </label>
                                        <Switch 
                                            isOn={this.state.isRequired}
                                            handleToggle={() => this.setState({isRequired: !this.state.isRequired})}
                                            onColor="#633FDA"
                                            title="Required"
                                            myKey={'isRequired'}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row form className="mt-2" >
                            <Col md="11" className="mx-auto">
                                <Row className="mt-2">
                                    <Col md="12" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Question: </label>
                                        <FormInput
                                                id="categoryName"
                                                placeholder={'Type Question Here'}
                                                value={this.state.selectedLanguage.value == "English"?this.state.question:this.state.questionSpanish}
                                                onChange={this.setQuestion}
                                                className="insideFont"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row form className="mt-4" >
                            <Col md="12" className="mx-auto">
                                <Row className="mt-4">
                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Choose 1 Reponse Type </label>
                                        <Select
                                            value={this.state.questionType}
                                            className="insideFont"
                                            placeholder='Comment Box'
                                            styles={customStyles}
                                            onChange={this.setQuestionType}
                                            options={[
                                            {
                                                value:'Yes / No',
                                                label:'Yes / No'
                                            }, 
                                            {
                                                value:'Comment Box',
                                                label:'Comment Box'
                                            }
                                            ]}z
                                        />
                                    </Col>

                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Is this an idea category or an idea type question? </label>
                                        <Select
                                            value={this.state.filterType}
                                            className="insideFont"
                                            placeholder='Category / Type'
                                            styles={customStyles}
                                            onChange={this.setFilterType}
                                            options={[
                                            {
                                                value:'Category',
                                                label:'Category'
                                            }, 
                                            {
                                                value:'Type',
                                                label:'Type'
                                            }
                                            ]}z
                                        />
                                    </Col>

                                    <Col md="3" className="mx-auto">
                                        <label htmlFor="firstName" className="georgia">Applicable Idea “Cat/Type” </label>
                                        <CategoryBasicSelect className="insideFont" evalType={this.state.filterType.label == 'Category'?"execution":""} setResponsible={(res, idx) => this.changeFilterTypeValue(res, idx)} selectedVal={this.state.filterTypeValue}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                       
                        <Row className="mt-2">
                            <Col md="2" className="ml-auto">
                                <Row>
                                    <Col md="3" className="ml-auto">
                                        { !canEditUser && <AcceptIcon style={{height: 34, width: 34}} onClick={() => canEditUser?this.editUser():this.saveQuestion()}></AcceptIcon>}
                                    </Col>
                                    <Col md="3" className="mr-auto">
                                        {/* <CancelIcon style={{height: 34, width: 34}} onClick={() => this.deleteUser()}></CancelIcon> */}
                                    </Col>
                                </Row>
                            </Col>
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




export default withTranslation()(QuestionForm);