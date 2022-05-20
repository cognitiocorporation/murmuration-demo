import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  FormSelect,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupAddon, 
  InputGroupText, 
  FormInput,
  Form,
} from "shards-react";
import Chart from "../../utils/chart";
import colors from "../../utils/colors";
import SingleProgressChart from "../analytics/GoalsOverview/SingleProgressChart";
import Parse from 'parse';
import { useTranslation, initReactI18next, withTranslation } from "react-i18next";


class IdeaQuestionsNew extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ideas:[],
      filteredQuestions:[],
      filter:'Todas'
    }
  }

  componentDidMount() {
    this.fetchNewData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldUpdate !== this.props.shouldUpdate) {
      // alert('Can evaluate!')
      this.fetchNewData()
    }
  }

  fetchNewData() {
    const { filter } = this.state;
    const className = "IdeaQuestion";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);

    // subscription.on('open', () => {
    //   console.log('subscription opened');
    //  });

    const currentUser = Parse.User.current();
    const userId = currentUser.get("username");


    if (filter == 'Todas') {
      query = new Parse.Query(ItemClass);
    } else {
      query.equalTo("category", filter);
    }

    query.find()
    .then((results) => {
        this.setState({
            ideas: results,
            filteredQuestions: results
        }, () => this.fetchFilterQuestions());
    }, (error) => {
      alert('Hubo un error en la busca. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  fetchFilterQuestions() {
    const { filter } = this.state;
    const className = "FilterQuestion";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);

    // subscription.on('open', () => {
    //   console.log('subscription opened');
    //  });

    const currentUser = Parse.User.current();
    const userId = currentUser.get("username");


    if (filter == 'Todas') {
      query = new Parse.Query(ItemClass);
    } else {
      query.equalTo("category", filter);
    }

    

    query.find()
    .then((results) => {
      // alert(results.length)
      const questions = [...this.state.filteredQuestions, ...results]
        this.setState({
            ideas: questions,
            filteredQuestions: questions
        });
    }, (error) => {
      alert('Hubo un error en la busca. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  handleCategoryChange(event) {
    const newCategory = event.target.value;
    const { ideas, filteredQuestions } = this.state;
    console.log('FILTERED QUESTIONS');
    console.log(ideas);
    
    var filteredData;
    if (newCategory !== 'Todas') {
      filteredData = ideas.filter(item => item.get("category") === newCategory);
    }  else {
      filteredData = ideas;
    }
    
    this.setState({
      filter: newCategory,
      filteredQuestions: filteredData
    });
  }

  deleteItem(item) {

    const canDelete = window.confirm('Are you sure you want to delete this question?')
    if (canDelete) {
      item.destroy({})
      .then((item) => {
      // Execute any logic that should take place after the object is saved.
        this.fetchNewData();
        
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Hubo un error en la operacion: ' + error.message);
      });
    } 
    
  }

  editItem(item) {
    // var newQuestion = prompt("Replace \"" + item.get("question") +"\" with: ");
    // if (newQuestion != '') {
    //   item.set("question", newQuestion)
    //   item.save()
    //   .then((item) => {
    //   // Execute any logic that should take place after the object is saved.
    //     this.fetchNewData();
    //     alert('¡La operacion fue exitosa!');
    //   }, (error) => {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Hubo un error en la operacion: ' + error.message);
    //   });
    // } else {
    //   alert("Question cannot be left blank.")
    // }
    // console.log(item)
    this.props.editItem(item)
  }

  render() {
    const {ideas, title, filter, filteredQuestions} = this.state;
    const { t } = this.props;

    return(
      
            <table className="table mb-0">
              <thead className="py-2 bg-light text-semibold border-bottom">
                <tr>
                  <th className="text-center">{t("QUESTION")}</th>
                  <th className="text-center">{t("CATEGORY")}</th>
                  <th className="text-center">{t("STATUS")}</th>
                  <th className="text-right">{t("ACTIONS")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((item, idx) => (
                  <tr key={idx}>
                    <td className="lo-stats__order-details text-center">
                      {item.get("question")}
                    </td>
                    <td className="lo-stats__total text-center text-success">
                      {item.get("category")?item.get("category"):item.get("filter")}
                    </td>
                    <td className="lo-stats__items text-center">{item.get("required") ? 'Requerida':'No Requerida'}</td>
                    <td className="lo-stats__actions">
                      <ButtonGroup className="d-table ml-auto">
                        {/* <Button size="sm" theme="white" onClick={e => this.editItem(item)}>
                          Editar
                        </Button> */}
                        <Button size="sm" theme="white" onClick={() => this.editItem(item)}>
                          Edit
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    )
  }
}

/**
 * Returns the badge type for a specific
 */
function getBadgeType(itemStatus) {
  const statusMap = {
    Complete: "success",
    Saved: "warning",
    Canceled: "danger"
  };

  return statusMap[itemStatus];
}

function getProgressChart(itemProgress) {
  const progressString = itemProgress[0] + "%";
  const progressChart = {
    data: {
      conversionRate: progressString,
      datasets: [
        {
          hoverBorderColor: "#fff",
          data: itemProgress,
          backgroundColor: [
            colors.primary.toRGBA(0.9),
            colors.athensGray.toRGBA(0.8)
          ]
        }
      ],
      labels: ["Label 1", "Label 2"]
    }
  };

  return progressChart;
}


export default withTranslation()(IdeaQuestionsNew);
