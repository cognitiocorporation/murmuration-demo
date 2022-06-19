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
import SimpleCategorySelect from "./SimpleCategorySelect"
import DepartmentSelect from "./DepartmentSelect"
import EmployeeSelect from "./EmployeeSelect"
import IdeaFilterSelect from "./IdeaFilterSelect";
import { all } from "q";
import EvaluationSelect from "./EvaluationSelect";
import ExecutionSelectNew from "./ExecutionSelectNew";
import { object } from "prop-types";

import VectorButton from '../common/VectorButton'

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
import { ReactComponent as RightIcon } from "../../images/right_icon.svg"
import { ReactComponent as LeftIcon } from "../../images/left_icon.svg"
import { ReactComponent as SelectedLanguageIcon } from "../../images/selected_language.svg"
import { ReactComponent as NotSelectedLanguageIcon } from "../../images/not_selected_language.svg"
import { ReactComponent as EditIcon } from "../../images/edit.svg"
import { ReactComponent as DeleteIcon } from "../../images/delete.svg"
import { ReactComponent as ArrowDownIcon } from "../../images/arrow_down.svg"
import { ReactComponent as ArrowUpIcon } from "../../images/arrow_up.svg"
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
    name: 'Shield Image'
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

class EditCommitteeForm extends React.Component {
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
          categoryTitleSpanish: '',
          categoryInformation: '',
          categoryInformationSpanish: '',
          hasEnglish: false,
          hasSpanish: false,
          employees: [],
          committeeTitle: '',
          members: []

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
        this.setCategoryTitle = this.setCategoryTitle.bind(this);
        this.setLanguage = this.setLanguage.bind(this);

    }

    componentDidUpdate(prevProps) {
      if (prevProps.canSubmit !== this.props.canSubmit) {
        // alert('Can evaluate!')
        this.submitEvaluation()
      }
    }

    componentDidMount() {
      const {categoryData} = this.props;
      // Category

      this.loadInitialSettings()

      let currUser = Parse.User.current();
      this.getUserName(currUser);
      // this.fetchNewData();
      this.fetchCategories();
      this.fetchDepartments();
      this.getDate();
    }

    loadInitialSettings() {
      const { selectedLanguage } = this.state;
      const { categoryData } = this.props;

      // Language

      const languageSelector = selectedLanguage.label == "English"? "en":"es"
      const categoryName = categoryData.get("name")
      const cMembers = categoryData.get("members")
      const selectedDepartment = categoryData.get("department")?categoryData.get("department"):'All Departments'
      const selectedCategory = categoryData.get("category")?categoryData.get("category"):'All Categories'
     
      
      const departmentVal = {}
      
      
      this.setState({committeeTitle: categoryName, employees: cMembers, department:  {value: "", label: selectedDepartment}, category:  {value: "", label: selectedCategory}})
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


    fetchCategories() {
      const className = "IdeaCategory";

      var ItemClass = Parse.Object.extend(className);
      var query = new Parse.Query(ItemClass);

      query.find()
      .then((results) => {
        // console.log(results);
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
        // console.log(results);
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

    setCategoryTitle(event) {
      const title = event.target.value;

      // Confirm Length
      if (title.length >= 30) {
        alert('Title should contain less than 30 characters.')
      } else {
        if (this.state.selectedLanguage.value == "English") {
          this.setState({
            committeeTitle: title,
          })
        } else {
          this.setState({
            committeeTitle: title,
          })
        }
    
      }

      // console.log(isValid);
    }

    setLanguage(unit) {
      console.log(unit)
      this.setState({selectedLanguage: unit})
      // this.loadInitialSettings()
      // if (this.state.expectedReturn && unit.label) {
      //   this.props.changeStatus(true)
      // }
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

    changeCategoryInformation(res) {
      const comment = res.target.value

      if (this.state.selectedLanguage.value == "English") {
        this.setState({
          categoryInformation: comment
        })
      } else {
        this.setState({
          categoryInformationSpanish: comment
        })
      }
    }

    goNext() {
      const currIndex = this.galleryRef.current.getCurrentIndex()
      this.galleryRef.current.slideToIndex(currIndex + 1)
    }

    goPrev() {
      const currIndex = this.galleryRef.current.getCurrentIndex()
      this.galleryRef.current.slideToIndex(currIndex - 1)
    }

    updateIdea() {
       const { department, category, members, employees, selectedLanguage, committeeTitle, categoryTitleSpanish, categoryInformationSpanish, categoryInformation } = this.state;
      const {ideaStage, evaluationData, categoryData, refreshIdea} = this.props;
      
      categoryData.set("name", committeeTitle)
      categoryData.set("members", employees)
      categoryData.set("category", category.label)
      categoryData.set("department", department.label)
      categoryData.save().then(() => refreshIdea())
      // const titleTrans = categoryData.get("itemNameTrans")
      // titleTrans.en = categoryTitle
      // titleTrans.es = categoryTitleSpanish

      // const description = categoryData.get("categoryDescription")
      // description.en = categoryInformation
      // description.es = categoryInformationSpanish

      // const iconIndex = this.galleryRef.current.getCurrentIndex()
      // const iconName = images[iconIndex].name
      // console.log(iconIndex)
      // console.log(iconName)
      // const isIconRepeated = this.isIconRepeated(categoryTitle, iconName)
      
      // if (isIconRepeated) {
      //   alert('This icon is already being used in another category. Please fix! ')
      // } else {
      //   categoryData.set("itemName", categoryTitle)
      //   categoryData.set("itemNameTrans", titleTrans)
      //   categoryData.set("categoryDescription", description)
      //   categoryData.set("icon", iconName)
        
      //   categoryData.save().then(() => refreshIdea())
      // }

      // alert('Update committee!')
    }

    isIconRepeated(categoryTitle, iconName) {
      const {data} = this.state;
      
      // data.filter((category) => { return category.get("icon") == iconName })

      if (data.some(e => e.get("icon") === iconName && e.get("itemName") !== categoryTitle)) {
        /* vendors contains the element we're looking for */
        return true
      }
         
   
     
      
    }

    deleteIdea() {
      const { selectedLanguage, categoryTitle, categoryInformation } = this.state;
      const {ideaStage, evaluationData, categoryData, refreshIdea} = this.props;
      
      const canDelete = window.confirm('Are you sure you want to delete this committee?');
      
      if (canDelete) {
        categoryData.destroy().then(() => {
          refreshIdea()
        })
      }
    }

    changeDepartment = (department, i) => {
      this.setState({department: department})
    }

    changeCategory = (category, i) => {
      this.setState({category: category})
    }

    changeEmployees = (employees, i) => {
      this.setState({employees: employees})
    }

    render() {
        const {employees, categoryTitleSpanish, categoryInformationSpanish, selectedLanguage, categoryTitle, categoryInformation, language, coachRes, expectedReturn, page, visible, filterVisible, filterQuestionsVisible, ideaQuestionsVisible, selectedFilterQ, categoryQuestions, category, answers, buttonState, hideNextButton, date, remainingCharacters, descriptionValid, department, ideaDescription, userName, sectionTitle, executionRes } = this.state
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

        const hasEnglish = this.state.categoryTitle != '' && this.state.categoryInformation != ''
        const hasSpanish = this.state.categoryTitleSpanish!= '' && this.state.categoryInformationSpanish != ''

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
                          <Col lg="4" className="mx-auto">
                            <Row form>
                              {/* Proponent */}
                              <Col md="12" className="form-group">
                                <Row className="mt-2">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Department: </label>
                                    {/* <Select
                                        // value={selectedLanguage}
                                        className="insideFont"
                                        placeholder='All Departments'
                                        styles={customStyles}
                                        onChange={this.setLanguage}
                                        options={[
                                          {
                                            value:'All Departments',
                                            label:'All Departments'
                                          }, 
                                          
                                        ]}z
                                      /> */}
                                      <DepartmentSelect className="insideFont" evalType={'execution'} type="Committee" setResponsible={(res, idx) => this.changeDepartment(res, idx)} selectedVal={department}/>
                                  </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <label htmlFor="firstName" className="georgia">Category: </label>
                                        <SimpleCategorySelect className="insideFont" evalType={'execution'} type="Committee" setResponsible={(res, idx) => this.changeCategory(res, idx)} selectedVal={category}/>
                                    </Col>
                                </Row>
                                
                                
                              </Col>
    
                            </Row>
                          </Col>

                          {/* Right Part */}
                          

                          
                          <Col lg="4" className="mx-auto">
                              <Row form className="mt-2">
                                <Col md="12" className="form-group">
                                <label htmlFor="firstName" className="georgia">Committee Name: </label>
                                  {/* <IdeaStatusSelect setEvalStatus={this.setEvalStatus}></IdeaStatusSelect> */}
                                  {/* <ImageGallery ref={this.galleryRef} originalHeight={100} originalWidth={100} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} items={images} /> */}
                                  <FormInput
                                            id="categoryName"
                                            placeholder={'Committee Name'}
                                            value={this.state.committeeTitle}
                                            onChange={this.setCategoryTitle}
                                            className="insideFont"
                                        />
                                </Col>
                                {/* <Col lg="2" className="ml-auto">  
                                    <Row className="ml-auto">
                                        <SmallSwitch 
                                              isOn={this.state.categoryOn}
                                              myKey={'turnOn'}
                                              handleToggle={() => this.setState({categoryOn: !this.state.categoryOn})}
                                              onColor="#79de75"
                                              title="On/Off"
                                          />
                                    </Row>
                                </Col> */}
                              </Row>
                             
                            </Col>

                          {/* Middle Part */}

                          <Col lg="3" className="mx-auto">
                            <Row form>
                              {/* Proponent */}
                              <Col md="12" className="form-group">
                                <Row className="mt-2">
                                  <Col>
                                    <label htmlFor="firstName" className="georgia">Committee Members: </label>
                                    {/* <Select
                                        // value={selectedLanguage}
                                        className="insideFont"
                                        placeholder='[FirstName] [LastName]'
                                        styles={customStyles}
                                        onChange={this.setLanguage}
                                        options={[
                                          {
                                            value:'All Users',
                                            label:'All Users'
                                          }, 
                                          
                                        ]}z
                                      /> */}
                                      <EmployeeSelect className="insideFont" evalType={'execution'} type="Committee" setResponsible={(res, idx) => this.changeEmployees(res, idx)} selectedVal={employees}/>
                                  </Col>
                                </Row>
                                
                                
                                
                              </Col>
    
                            </Row>
                          </Col>
                          

                          
                        </Row>
                        
                        <Row className="mt-2">
                            <Col md="2" className="ml-auto">
                                <Row>
                                    <Col md="3" className="ml-auto">
                                      <AcceptIcon  className="functionalButton" style={{height: 34, width: 34}} onClick={() => this.updateIdea()}></AcceptIcon>
                                    </Col>
                                    <Col md="3" className="mr-auto">
                                      <CancelIcon className="functionalButton" style={{height: 34, width: 34}} onClick={() => this.deleteIdea()}></CancelIcon>
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




export default withTranslation()(EditCommitteeForm);