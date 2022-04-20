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


class UserListNew extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      users:[],
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
    const className = "User";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
   
    query = new Parse.Query(ItemClass);
    
    query.limit(1000)
    query.ascending("firstName").find()
    .then((results) => {
        this.setState({
            users: results,
        });
    }, (error) => {
      alert('Hubo un error en la busca. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  editItem(item) {
    this.props.editItem(item)
    // item.destroy({ useMasterKey: true})
    // .then((item) => {
    // // Execute any logic that should take place after the object is saved.
    //   this.fetchNewData();
    //   alert('¡La operacion fue exitosa!');
    // }, (error) => {
    //   // Execute any logic that should take place if the save fails.
    //   // error is a Parse.Error with an error code and message.
    //   alert('Hubo un error en la operacion: ' + error.message);
    // });
  }

  render() {
    const {users, title, filter, filteredQuestions} = this.state;
    const { t } = this.props;

    return(
      
            <table className="table mb-0">
              <thead className="py-2 bg-light text-semibold border-bottom">
                <tr>
                  <th className="text-center">{t("NAME")}</th>
                  <th className="text-center">{t("DEPARTMENT")}</th>
                  <th className="text-center">{t("USER ID")}</th>
                  <th className="text-center">{t("ROLE")}</th>
                  <th className="text-center">{"ACTION"}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, idx) => (
                  <tr key={idx}>
                    <td className="lo-stats__order-details text-center">
                      {item.get("firstName") + " " + item.get("lastName")}
                    </td>
                    <td className="lo-stats__total text-center text-success">
                      {item.get("department")}
                    </td>
                    <td className="lo-stats__total text-center text-success">
                      {item.get("username")}
                    </td>
                    <td className="lo-stats__items text-center">{item.get("role")}</td>
                    <td className="lo-stats__actions">
                      <ButtonGroup className="d-table ml-auto">
                        <Button size="sm" theme="white" onClick={e => this.editItem(item)}>
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


export default withTranslation()(UserListNew);
