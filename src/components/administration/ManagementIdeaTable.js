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
import moment from 'moment';
import {withTranslation} from 'react-i18next';

class ManagementIdeaTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ideas:[],
      evalCriteria: [],
      filteredIdeas:[],
      title:''
    }
  }

  componentDidMount() {
    this.getEvalQuery();
    this.getEvalCriteria();
    this.fetchIdeas();
  }

  componentWillReceiveProps(newProps) {
      console.log(newProps);
      this.filterIdeas(newProps.category, newProps.status, newProps.ideaType, newProps.filterQuestion);
  }

  getEvalQuery() {
    const currentUser = Parse.User.current();
    const evalCriteria = currentUser.get("evaluationCriteria");
    console.log('MY EVAL CRITERIA')
    console.log(evalCriteria)
    
    var myQueries = [];

    for (var i in evalCriteria) {
      var ItemClass = Parse.Object.extend("Idea");
      var deptQuery = new Parse.Query(ItemClass);
      myQueries.push(deptQuery.equalTo("department", evalCriteria[i]))
    }
    
    console.log(myQueries)
    return myQueries;
  }

  async getEvalCriteria() {
    const currentUser = Parse.User.current();
    const evalCriteria = currentUser.get("evaluationCriteria");
    return evalCriteria;
  }

  async fetchIdeas() {
    const className = "Idea";
    // const evalCriteria = await this.getEvalCriteria();

    // var multipleQueries = this.getEvalQuery();

    // console.log(multipleQueries);
    var query = new Parse.Query(className);

    // query.equalTo("status", "SOMETIDA");
    query.equalTo("needsEvaluation", true);
    query.equalTo("completed", false);
    query.descending("createdAt");
    
    const currentUser = Parse.User.current();
    const evalCriteria = await this.getEvalCriteria()
    // evalCriteria.map((criteria) => {
    //   console.log(criteria.type)
    //   console.log(criteria.name)
    // })
    console.log(evalCriteria)

    query.find()
    .then((results) => {
      const isSuperUser = currentUser.get("role") == "super_user"
        // const myResults = results.filter(result => result.get("department") == 'Fill & Pack' || result.get("department") == 'Planta 2')
        var i = 0
        const myResultsT = []
        // results.filter((result) => {
        //   for (i; i<evalCriteria.length; i++) {
        //     console.log(result.get(evalCriteria[i].type))
        //   }

        //   const evalCriteria = currentUser.get("evaluationCriteria");
        //   // return evalCriteria.map((criteria) => {
        //   //   if (result.get(criteria.type) != criteria.name) {
        //   //     return false
        //   //   }
        //   //   return true;
        //   })
        // console.log(myResults)
      const evalCriteria = currentUser.get("evaluationCriteria");
      const allIdeas = evalCriteria.includes('Todas')
      const pmo = currentUser.get("pmo");

      //   var filtered = results.filter(
      //     function(e) {
      //       return this.indexOf(e.get("department")) < 0;
      //     },
      //     evalCriteria
      // );
      
        var filtered = []
        if (evalCriteria.length == 0) {
          filtered = results
        } else {
          filtered = results.filter(result => evalCriteria.includes(result.get("department")))
        }
       
      //  console.log(evalCriteria)
      //   console.log(filtered)
        
        if (!pmo) {
          
          filtered = filtered.filter(result => result.get('status') != 'Idea Proyecto' )
          // const secondFilter = filtered.filter(result => evalCriteria.includes(result.get("department")))
          // filtered = secondFilter
        } else {
          var pmoIdeas = results.filter(result => result.get('status') == 'Idea Proyecto')
          var withoutDuplicates = filtered.concat(pmoIdeas.filter((item) => filtered.indexOf(item) < 0))
          filtered = withoutDuplicates
        }

        console.log(pmo)
        console.log(pmoIdeas)
        console.log(filtered)
        this.setState({
            ideas: filtered,//isSuperUser?results:myResultsT,
            filteredIdeas: isSuperUser || allIdeas ?results:filtered//isSuperUser?results:myResultsT,
        });
    }, (error) => {
      alert('Hubo un error en la busqueda. Favor de tratar luego.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  arrayIncludesInObj = (arr, key, valueToCheck) => {
    return arr.some(value => value[key] === valueToCheck);
  }

  filterIdeas(categoryName, status, ideaType, filterQuestion) {
    const newCategory = categoryName;
    const newStatus = status;
    const newType = ideaType;
    console.log(filterQuestion)
    const nuevo = this.state.ideas.map(item => {
      item.get("questionAnswer").find(elem => {
        return elem.answer == filterQuestion
      })
    });
    console.log(nuevo)

    const { ideas, filteredIdeas } = this.state;
    
    var filteredData;
    if (newCategory !== 'Todas' && newCategory !== '') {
      console.log('CATEGORY')
      // alert(newCategory)
      filteredData = ideas.filter(item => item.get("category") === newCategory);
      
      filteredData = status && status!='Todos'?filteredData.filter(item => item.get("status") === newStatus):filteredData;
      filteredData = ideaType && ideaType!='Todos'?filteredData.filter(item => item.get("ideaType") === newType):filteredData;
    } else if(status !== 'Todas' && status !== ''){
      console.log('STATUS')
      filteredData = ideas;
      filteredData = status!='Todos'?filteredData.filter(item => item.get("status") === newStatus):filteredData;
      filteredData = ideaType && ideaType!='Todos'?filteredData.filter(item => item.get("ideaType") === newType):filteredData;
      console.log('FILTRALO');
    } else if(newCategory  == '' && newStatus == '' && ideaType == ''){
      filteredData = ideas;
    }
    else {
      filteredData = ideas;
      filteredData = ideaType!='todas'?filteredData.filter(item => item.get("ideaType") === ideaType):filteredData;
      console.log('FILTRALO TIPO');
    }
    
    this.setState({
      filteredIdeas: filteredData
    });
  }

  get fullName() {

  }

  render() {
    const {ideas, filteredIdeas, title} = this.state;
    const { t } = this.props;
    return(
      <Card small className="lo-stats h-150">
        <CardBody className="p-0">
          <Container fluid className="px-0">
            <table className="table mb-0">
              <thead className="py-2 bg-light text-semibold border-bottom">
                <tr>
                  
                  <th className="text-center">{t("IDEA_MANAGE_NUM")}</th>
                  {/* <th className="text-center">Categoria</th> */}
                  <th className="text-center">{t("IDEA_MANAGE_TITLE")}</th>
                  <th className="text-center">{t("IDEA_MANAGE_CATEGORY")}</th>
                  {/* <th className="text-center">{t("IDEA_MANAGE_PROP")}</th> */}
                  <th className="text-center">{t("IDEA_MANAGE_STATUS")}</th>
                  <th className="text-right">{t("IDEA_MANAGE_EVALUATE")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredIdeas.map((item, idx) => (
                  <tr key={idx}>
                    <td className="lo-stats__order-details text-center ">
                      {item.get("num")}
                    </td>
                    <td className="lo-stats__total text-center">
                    {item.get("title")}
                    </td>
                    <td className="lo-stats__total text-center text-success">
                    {item.get("category")}
                    </td>
                    {/* <td className="lo-stats__items text-center">{item.get("proponentName")}</td> */}
                    <td className="lo-stats__status">
                      <div className="d-table mx-auto">
                        <Badge pill theme={getBadgeType(item.get("status"))}>
                          {item.get("status")}
                        </Badge>
                      </div>
                    </td>
                    <td className="lo-stats__actions ">
                      <ButtonGroup className="d-table ml-auto">
                      <Button pill outline size="sm" theme="danger" onClick={() => this.props.onViewIdeaPress(item)}>
                        <i className="material-icons">create</i>
                      </Button>
                      </ButtonGroup>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </CardBody>
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

export default withTranslation()(ManagementIdeaTable);