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
const storageLanguage = localStorage.getItem('language');

class LatestOrders extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ideas:[],
      title:''
    }
  }

  componentDidMount() {
    this.fetchIdeas();
  }

  fetchIdeas() {
    const className = "Idea";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
    var assignedIdeaQuery =  new Parse.Query(ItemClass);

    const currentUser = Parse.User.current();
    const userId = currentUser.get("username");

    query.equalTo("proponent", userId);
    // query
    assignedIdeaQuery.equalTo("responsible", currentUser);

    var mainQuery = Parse.Query.or(query, assignedIdeaQuery);

    mainQuery.descending("updatedAt");

    mainQuery.find()
    .then((results) => {
        this.setState({
            ideas: results
        });
    }, (error) => {
      alert('Hubo un error en la busca. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  showModal(item) {
    console.log(item);
    this.props.onEvalBtnPress(item);
  }

  render() {
    const {ideas, title} = this.state;
    const { t } = this.props;
    return(
      <Card small className="lo-stats h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
          <div className="block-handle" />
          {/* INSERT SEARCH HERE */}
        </CardHeader>

        <CardBody className="p-0">
          <Container fluid className="px-0">
            <table className="table mb-0">
              <thead className="py-2 bg-light text-semibold border-bottom">
                <tr>
                  <th className="text-left">{t("IDEA_MANAGE_NUM")}</th>
                  <th className="text-center">{t("IDEA_MANAGE_TITLE")}</th>
                  <th className="text-center">{t("IDEA_MANAGE_CAT")}</th>
                  <th className="text-center">{t("IDEA_MANAGE_PROG")}</th>
                  <th className="text-center">{t("IDEA_MANAGE_STATUS")}</th>
                  <th className="text-right">{t("IDEA_UPDATE_VIEW")}</th>
                </tr>
              </thead>
              <tbody>
                {ideas.map((item, idx) => (
                  <tr key={idx}>
                    <td className="lo-stats__total text-center">
                      {item.get("num")}
                    </td>
                    <td className="lo-stats__items text-center">{item.get("title")}</td>
                    <td className="lo-stats__total text-center text-success">
                    {item.get("category")}
                    </td>
                    <td><SingleProgressChart key={idx} idea={getProgressChart(item.get("progress"))}/></td>
                    <td className="lo-stats__status">
                      <div className="d-table mx-auto">
                        <Badge pill theme={getBadgeType(item.get("status"))}>
                          {item.get("status")}
                        </Badge>
                      </div>
                    </td>
                    <td className="lo-stats__actions ">
                      <ButtonGroup className="d-table ml-auto">
                        <Button size="sm" theme="white" onClick={() => this.showModal(item)}>
                          <i className="material-icons">visibility</i>
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </CardBody>

        <CardFooter className="border-top">
          <Row>
            {/* Time Span */}
            {/* <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col> */}

            {/* View Full Report */}
            {/* <Col className="text-right view-report">
              
              <a href="#">View full report &rarr;</a>
            </Col> */}
          </Row>
        </CardFooter>
      </Card>
    )
  }
}

// const LatestOrders = ({ title, latestOrdersData }) => (
  
//   <Card small className="lo-stats h-100">
//     <CardHeader className="border-bottom">
//       <h6 className="m-0">{title}</h6>
//       <div className="block-handle" />
//       {/* INSERT SEARCH HERE */}
//     </CardHeader>

//     <CardBody className="p-0">
//       <Container fluid className="px-0">
//         <table className="table mb-0">
//           <thead className="py-2 bg-light text-semibold border-bottom">
//             <tr>
//               <th>Num. de Idea</th>
//               <th className="text-center">Nombre del Proceso</th>
//               <th className="text-center">Proponente</th>
//               <th className="text-center">Progreso</th>
//               <th className="text-center">Status</th>
//               <th className="text-right">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {latestOrdersData.map((item, idx) => (
//               <tr key={idx}>
//                 <td className="lo-stats__order-details">
//                   {item.id}
//                 </td>
//                 <td className="lo-stats__total text-center text-success">
//                   {item.total}
//                 </td>
//                 <td className="lo-stats__items text-center">{item.items}</td>
//                 <td><SingleProgressChart key={idx} idea={item}/></td>
//                 <td className="lo-stats__status">
//                   <div className="d-table mx-auto">
//                     <Badge pill theme={getBadgeType(item.status)}>
//                       {item.status}
//                     </Badge>
//                   </div>
//                 </td>
//                 <td className="lo-stats__actions">
//                   <ButtonGroup className="d-table ml-auto">
//                     <Button size="sm" theme="white">
//                       View
//                     </Button>
//                   </ButtonGroup>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Container>
//     </CardBody>

//     <CardFooter className="border-top">
//       <Row>
//         {/* Time Span */}
//         <Col>
//           <FormSelect
//             size="sm"
//             value="last-week"
//             style={{ maxWidth: "130px" }}
//             onChange={() => {}}
//           >
//             <option value="last-week">Last Week</option>
//             <option value="today">Today</option>
//             <option value="last-month">Last Month</option>
//             <option value="last-year">Last Year</option>
//           </FormSelect>
//         </Col>

//         {/* View Full Report */}
//         <Col className="text-right view-report">
//           {/* eslint-disable-next-line */}
//           <a href="#">View full report &rarr;</a>
//         </Col>
//       </Row>
//     </CardFooter>
//   </Card>
// );

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

// function 

// LatestOrders.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,

//   /**
//    * The latest orders data.
//    */
//   latestOrdersData: PropTypes.array
// };

// LatestOrders.defaultProps = {
//   title: "Lista de IDEA",
//   latestOrdersData: [
//     {
//       id: "#000001",
//       date: "3/15/2019 9:30AM",
//       status: "Just do It",
//       items: "Sierra Brooks",
//       total: "Manufactura", 
//       conversionRate: "75%",
//       data: {
//         datasets: [
//           {
//             hoverBorderColor: "#fff",
//             data: [75, 25],
//             backgroundColor: [
//               colors.primary.toRGBA(0.9),
//               colors.athensGray.toRGBA(0.8)
//             ]
//           }
//         ],
//         labels: ["Label 1", "Label 2"]
//       }
//     },
//     {
//       id: "#000002",
//       date: "3/21/2019 10:00AM",
//       status: "Just do It",
//       items: "Sierra Brooks",
//       total: "Produccion",
//       conversionRate: "50%",
//       data: {
//         datasets: [
//           {
//             hoverBorderColor: "#fff",
//             data: [50, 50],
//             backgroundColor: [
//               colors.warning.toRGBA(0.9),
//               colors.athensGray.toRGBA(0.8)
//             ]
//           }
//         ],
//         labels: ["Label 1", "Label 2"]
//       }
//     },
//     {
//       id: "#000003",
//       date: "3/22/2019 5:00PM",
//       status: "Just do It",
//       items: "Sierra Brooks",
//       total: "Calidad",
//       conversionRate: "50%",
//       data: {
//         datasets: [
//           {
//             hoverBorderColor: "#fff",
//             data: [50, 50],
//             backgroundColor: [
//               colors.warning.toRGBA(0.9),
//               colors.athensGray.toRGBA(0.8)
//             ]
//           }
//         ],
//         labels: ["Label 1", "Label 2"]
//       }
//     },
//     {
//       id: "#000004",
//       date: "5/28/2019 2:00PM",
//       status: "Just do It",
//       items: "Sierra Brooks",
//       total: "Seguridad",
//       conversionRate: "25%",
//       data: {
//         datasets: [
//           {
//             hoverBorderColor: "#fff",
//             data: [25, 75],
//             backgroundColor: [
//               colors.salmon.toRGBA(0.9),
//               colors.athensGray.toRGBA(0.8)
//             ]
//           }
//         ],
//         labels: ["Label 1", "Label 2"]
//       }
//     }
//   ]
// };

export default withTranslation()(LatestOrders);
