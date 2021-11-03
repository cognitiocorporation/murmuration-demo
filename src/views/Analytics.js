import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import SmallStats from "../components/common/SmallStats";
import IdeasTable from "../components/common/IdeasTable";
import GoalsOverview from "../components/analytics/GoalsOverview/GoalsOverview";
import UserPerformance from "./../components/user-profile/UserPerformance";
import { Chart } from 'react-charts'
import { Pie } from 'react-chartjs-2'
// import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ObjectsToCsv } from 'objects-to-csv';
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardBody,
  CardFooter,
} from "shards-react";
import Parse from 'parse';


import colors from "../utils/colors";
import ReactMinimalPieChart from "react-minimal-pie-chart";
// import { PieChart } from 'react-native-svg-charts'

// )

// Language
import {withTranslation} from 'react-i18next';
import {ExportCSV} from '../components/components-overview/ExportCSV'


const storageLanguage = localStorage.getItem('language');

const blueColor = '#3A7BBB'
const orangeColor = '#FD902c'
const greenColor = '#7FA86F'
const goldColor = '#DDB153'

// PieChart

// const PieChart = () => {
//   const labels = ['Label 1', 'Label 2']
//   const datasets = [{
//     data: [2000, 4000],
//     backgroundColor: ['red', 'blue']
//   }]
//   const pie = (
//     <Pie 
//     data={{
//       labels: labels,
//       datasets: datasets
//     }}
//     height='50%'
//     />
//   )
// }

const MyChart = (props) => {
  console.log('MY PROPS');
  console.log(props.data);
  const {t} = props;
  const data = React.useMemo(
    () => [
      {
        label: 'Completed',
        data: [['Departamento 1', 25], ['Departamento 2', 45], ['Departamento 3', 5]]
      },
      {
        label: 'In Progress',
        data: [['Departamento 1', 20], ['Departamento 2', 4], ['Departamento 3', 4]]
      },
      {
        label: 'Submitted',
        data: [['Departamento 1', 5], ['Departamento 2', 11], ['Departamento 3', 9]]
      },
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left'},
      { type: 'linear', stacked:'true', position: 'bottom' },
    ],
    []
  )

  const barChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
       <Chart style={{
        width: '400px',
        height: '300px'
      }} data={props.data} series={series} axes={axes} tooltip/>
    </div>
    
  )

  return barChart
}

const ProgressPerCategoryChart = (props) => {
  const data = React.useMemo(
    () => [
      {
        label: '0%',
        data: [['Seguridad', 25], ['Calidad', 45], ['Productividad', 5], ['Accion Inmediata', 5]]
      },
      {
        label: '25%',
        data: [['Seguridad', 25], ['Calidad', 45], ['Productividad', 5], ['Accion Inmediata', 5]]
      },
      {
        label: '50%',
        data: [['Seguridad', 25], ['Calidad', 45], ['Productividad', 5], ['Accion Inmediata', 5]]
      },
      {
        label: '75%',
        data: [['Seguridad', 25], ['Calidad', 45], ['Productividad', 5], ['Accion Inmediata', 5]]
      },
      {
        label: '100%',
        data: [['Seguridad', 25], ['Calidad', 45], ['Productividad', 5], ['Accion Inmediata', 5]]
      },
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { type: 'linear', stacked:'false', position: 'bottom' }
    ],
    []
  )

  const barChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <Chart style={{maxHeight: "200px", width: '100%'}} initialWidth={100} data={props.data} series={series} axes={axes} tooltip />
  )

  return barChart
}

function IdeasPendingEvaluationPerDeptChart() {
  const data = React.useMemo(
    () => [
      {
        label: 'Ideas Pendientes de Evaluacion',
        data: [['Departamento 1', 1]]
      },
      {
        label: 'Ideas Pendientes de Evaluacion',
        data: [['Departamento 2', 2]]
      },
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { type: 'linear', stacked:'false', position: 'bottom' }
    ],
    []
  )

  const barChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        maxWidth: '400px',
        height: '100px'
      }}
    >
      <Chart data={data} initialWidth={100} series={series} axes={axes} tooltip style={{width: '100%'}}/>
    </div>
  )

  return barChart
}

class Analytics extends React.Component { 

  constructor(props) {
    super(props)

    this.state = {
      ideas:[],
      numSubmitted: '',
      numCompleted:'',
      numInProgress:'',
      numPendingEval: '',
      departments: '',
      categories: '',
      ideaByDepartmentData: [],
      progressByCategoryData:[],
      returnsByCategoryData:[],
      actualReturnsByCategoryData:[],
      completedIdeas:[],
      completeIdeas:[],
      ideasInProgress:[],
      ideasPerCats:[],
      ideaResults:[],
      showChart: false,
      showIdeasByDeptChart: false,
      showProgressByCatChart: false,
      showEarningsByCatChart: false,
      exportData:{}
    }
    
    this.getIdeas = this.getIdeas.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getDepartments = this.getDepartments.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentWillMount() {
    this.getIdeas();
    this.getResults();
    // this.getDepartments();
  }

  async getIdeas() {
    const IdeaObject = Parse.Object.extend("Idea");
    const query = new Parse.Query(IdeaObject);
    const results = await query.find();
    const completedIdeas = results.filter(idea => idea.get("progress")[0] == 100);
    const ideasInProgress = results.filter(idea => idea.get("progress")[0] > 0 && idea.get("progress")[0] < 100);
    const ideasPendingEval = results.filter(idea => idea.get("needsEvaluation") == true);
    

    // query.equalTo("needsEvaluation", true);
    // query.equalTo("completed", false);
    // query.descending("createdAt");

    this.setState({ideas: results,
      completedIdeas: completedIdeas, 
      ideasInProgress: ideasInProgress, 
      numCompleted: String(completedIdeas.length),
      numInProgress: String(ideasInProgress.length),
      numSubmitted: String(results.length), 
      numPendingEval: String(ideasPendingEval.length),
    }, () => this.getDepartments())
  }

  async getResults() {
    const IdeaObject = Parse.Object.extend("Result");
    const query = new Parse.Query(IdeaObject);
    const results = await query.find();
    this.setState({ideaResults: results});
  }

  async getCategories() {
    const Category = Parse.Object.extend("IdeaCategory");
    const query = new Parse.Query(Category);
    const results = await query.find();
    this.setState({categories: results}, () => this.setupProgressByCategoryData());
  }

  async getDepartments() {
    this.getCategories();
    const Department = Parse.Object.extend("IdeaDepartment");
    const query = new Parse.Query(Department);
    const results = await query.find();
    this.setState({departments: results}, () => this.setupIdeaByDepartmentData());
  }

  setupIdeaByDepartmentData() {
    const {ideas, categories, completedIdeas, ideasInProgress, departments, numCompleted, numSubmitted, numInProgress} = this.state;
    var inProgressData = [];
    // var completedData = [];
    for (var i in departments) {
      const deptName = departments[i].get("itemName");
      const filteredDataCount = ideasInProgress.filter(idea => idea.get("department") == deptName)
      const newNum = filteredDataCount.length;
      inProgressData.push([deptName, newNum])
    }

    var completedData = [];
    var completedIdeas1 = [];
    var colors = [greenColor, blueColor, orangeColor, goldColor, 'red'];
    for (var i in departments) {
      const deptName = departments[i].get("itemName");
      const filteredDataCount = completedIdeas.filter(idea => idea.get("department") == deptName)
      const newNum = filteredDataCount.length;
      completedData.push([deptName, newNum]);
      completedIdeas1.push({ title: deptName, value: newNum, color: colors[i]});
    }

    var ideasPerCategory = []
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName)
      const newNum = filteredDataCount.length;
      ideasPerCategory.push({ title: categoryName, value: newNum, color: colors[i]});
    }

    var submittedData = [];
    for (var i in departments) {
      const deptName = departments[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("department") == deptName)
      const newNum = filteredDataCount.length;
      submittedData.push([deptName, newNum])
    }
    
    const exportData = {
      'Submitted': submittedData,
      'In Progress':ideasPerCategory,
      "Completed":completedData
    }

    console.log(exportData)
    

    const results = [{
      label: 'Completed',
      data: completedData
    },
    {
      label: 'In Progress',
      data: inProgressData
    },
    {
      label: 'Submitted',
      data: submittedData
    }, []];

    console.log(results);
    this.setState({ideaByDepartmentData: results, exportData: ideas, completeIdeas: completedIdeas1, ideasPerCats: ideasPerCategory, showIdeasByDeptChart: true});
  }

  setupProgressByCategoryData() {

    this.setupEarningsByCategoryData()
    
    const {ideas, completedIdeas, ideasInProgress, departments, progressByCategoryData, categories} = this.state;
    console.log(completedIdeas);
    var zeroData = [];
    // var completedData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName && idea.get("progress")[0] == 0)
      const newNum = filteredDataCount.length;
      zeroData.push([categoryName, newNum])
    }

    var twentyFiveData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName && idea.get("progress")[0] == 25)
      const newNum = filteredDataCount.length;
      twentyFiveData.push([categoryName, newNum])
    }

    var fiftyData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName && idea.get("progress")[0] == 50)
      const newNum = filteredDataCount.length;
      fiftyData.push([categoryName, newNum])
    }

    var seventyFiveData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName && idea.get("progress")[0] == 75)
      const newNum = filteredDataCount.length;
      seventyFiveData.push([categoryName, newNum])
    }

    var hundredData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea =>  idea.get("category") == categoryName && idea.get("progress")[0] == 100)
      const newNum = filteredDataCount.length;
      hundredData.push([categoryName, newNum])
    }

    const results = [{
      label: '0%',
      data: zeroData
    },
    {
      label: '25%',
      data: twentyFiveData
    },
    {
      label: '50%',
      data: fiftyData
    },
    {
      label: '75%',
      data: seventyFiveData
    },
    {
      label: '100%',
      data: hundredData
    }, []];
    console.log(results);

    this.setState({progressByCategoryData: results, showProgressByCatChart: true});
  }

  setupEarningsByCategoryData() {
    const {ideas, completedIdeas, ideasInProgress, departments, progressByCategoryData, categories} = this.state;
    console.log(completedIdeas);
    var zeroData = [];
    // var completedData = [];
    for (var i in categories) {
      const categoryName = categories[i].get("itemName");
      const filteredDataCount = ideas.filter(idea => idea.get("category") == categoryName)
      var earnings = 0
      for (var index in filteredDataCount) {
        // earnings = earnings + filteredDataCount[index]
       earnings = earnings + filteredDataCount[index].get("expectedReturn")
      }
      
      zeroData.push([categoryName, earnings])
      console.log(zeroData)
    }

    const results = [{
      label: 'Returns',
      data: zeroData
    }, []];
    
    console.log(results);
    this.setState({returnsByCategoryData: results, showChart: true});
  }

    render() {
      const {t} = this.props;
      const { numCompleted, numInProgress, numPendingEval} = this.state;
      console.log(Number.parseInt(numCompleted))
      const labels = ['Completed Ideas', 'Ideas on Progress', 'Pending for Evaluation']
      const datasets = [{
        data: [Number.parseInt(numCompleted), Number.parseInt(numInProgress), Number.parseInt(numPendingEval)],
        backgroundColor: ['blue', 'green', 'red']
      }]

      var smallStats = [
        {
          label: t('SUBMITTED_IDEAS'),
          value: this.state.numSubmitted,
          percentage: "12.4%",
          increase: true,
          chartLabels: [null, null, null, null, null],
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.primary.toRGBA(0.1),
              borderColor: colors.primary.toRGBA(),
              data: [9, 3, 3, 9, 9]
            }
          ]
        },
        {
          label: t('COMPLETED_IDEAS'),
          value: this.state.numCompleted,
          percentage: "7.21%",
          increase: false,
          chartLabels: [null, null, null, null, null],
          decrease: true,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.success.toRGBA(0.1),
              borderColor: colors.success.toRGBA(),
              data: [3.9, 4, 4, 9, 4]
            }
          ]
        },
        {
          label: t('IDEAS_ON_PROGRESS'),
          value: this.state.numInProgress,
          percentage: "3.71%",
          increase: true,
          chartLabels: [null, null, null, null, null],
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.warning.toRGBA(0.1),
              borderColor: colors.warning.toRGBA(),
              data: [6, 6, 9, 3, 3]
            }
          ]
        },
        {
          label: t('PENDING_FOR_EVALUATION'),
          value: this.state.numPendingEval,
          percentage: "3.71%",
          increase: true,
          chartLabels: [null, null, null, null, null],
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: colors.warning.toRGBA(0.1),
              borderColor: colors.warning.toRGBA(),
              data: [6, 6, 9, 3, 3]
            }
          ]
        },
      ];

      return (
        <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      {/* Page Header :: Title */}
      <PageTitle title={t('VIEW_REPORTS')} subtitle={t('REPORTS')} className="text-sm-left mb-3" />

      {/* Page Header :: Actions */}
      <Col xs="12" sm="4" className="col d-flex align-items-center">
        {/* <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
          <Button theme="white">
            Personal
          </Button>
          <Button theme="white">
            Admin
          </Button>
        </ButtonGroup> */}
      </Col>

      {/* Page Header :: Datepicker */}
      {/* <Col sm="4" className="d-flex">
        <RangeDatePicker className="justify-content-end" />
      </Col> */}
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      {smallStats.map((stats, idx) => (
        <Col key={idx} md="6" lg="3" className="mb-4">
          <Card>
            <CardBody>
              <CardSubtitle>{stats.label}</CardSubtitle>
                <h3>{stats.value}</h3>
            </CardBody>
          </Card>
        </Col>
        ))}

      <Col lg="6" sm="6" className="mb-4">
        <Card>
        <CardBody>
          <CardTitle>{t('IDEAS_BY_PROGRESS')}</CardTitle>
          <Pie data={{labels: labels, datasets: datasets}} height={80} options={{ maintainAspectRatio: true }} />
        </CardBody>
        <CardFooter>
          {/* <Button>{t('DOWNLOAD_DATA')} &rarr;</Button> */}
          </CardFooter>
      </Card>
          {/* <Chart data={data} axes={axes} /> */}
      </Col>
        
       {/* <Col lg="6" sm="6" className="mb-4">
       <Card>
      <CardBody>
        <CardTitle>{t('IDEAS_BY_DEPARTMENT')}</CardTitle>
        {this.state.showIdeasByDeptChart &&<MyChart height={80} width={80} initialWidth={80} data={this.state.ideaByDepartmentData}></MyChart>}
      </CardBody>
      <CardFooter>
        </CardFooter>
    </Card>
        
      </Col> */}

      {/* <Col lg="12" sm="6" className="mb-4">
       <Card>
      <CardBody>
        <CardTitle>{t('PROGRESS_BY_CATEGORY')}</CardTitle>
        {this.state.showProgressByCatChart &&<ProgressPerCategoryChart data={this.state.progressByCategoryData}></ProgressPerCategoryChart>}
      </CardBody>
      <CardFooter>
        
        </CardFooter>
    </Card>
        
      </Col> */}

      {/* Earnings */}
      {/* <Col lg="12" sm="6" className="mb-4">
       <Card>
      <CardBody>
        <CardTitle>{t('EXPECTED_EARNINGS_BY_CATEGORY')}</CardTitle>
        {this.state.showChart && <ProgressPerCategoryChart data={this.state.returnsByCategoryData}></ProgressPerCategoryChart>}
      </CardBody>
      <CardFooter>
       
        </CardFooter>
    </Card>
       
      </Col> */}

      {/* Actual Earnings */}
      {/* <Col lg="12" sm="6" className="mb-4">
       <Card>
      <CardBody>
        <CardTitle>{t('ACTUAL_EARNINGS_BY_CATEGORY')}</CardTitle>
        <ProgressPerCategoryChart style={{height: "30px"}} data={this.state.actualReturnsByCategoryData}></ProgressPerCategoryChart>
      </CardBody>
      <CardFooter>
       
        </CardFooter>
    </Card>
        
      </Col> */}
    </Row>
    
  </Container>
      )
    }
  }
// const Analytics = ({ smallStats }) => (
//   <Container fluid className="main-content-container px-4">
//     <Row noGutters className="page-header py-4">
//       {/* Page Header :: Title */}
//       <PageTitle title="Ver Reportes" subtitle="Reportes" className="text-sm-left mb-3" />

//       {/* Page Header :: Actions */}
//       {/* <Col xs="12" sm="4" className="col d-flex align-items-center">
//         <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
//           <Button theme="white" tag={NavLink} to="/analytics">
//             Personal
//           </Button>
//           <Button theme="white" tag={NavLink} to="/ecommerce">
//             Admin
//           </Button>
//         </ButtonGroup>
//       </Col> */}

//       {/* Page Header :: Datepicker */}
//       {/* <Col sm="4" className="d-flex"> */}
//         {/* <RangeDatePicker className="justify-content-end" /> */}
//       {/* </Col> */}
//     </Row>

//     {/* Small Stats Blocks */}
//     <Row>
//       {smallStats.map((stats, idx) => (
//         <Col key={idx} md="6" lg="4" className="mb-4">
//           <SmallStats
//             id={`small-stats-${idx}`}
//             chartData={stats.datasets}
//             chartLabels={stats.chartLabels}
//             label={stats.label}
//             value={stats.value}
//             percentage={stats.percentage}
//             increase={stats.increase}
//             decrease={stats.decrease}
//           />
//         </Col>
//       ))}
//     </Row>

//     <Row>
//       {/* Top Referrals */}
//       <Col lg="6" sm="6" className="mb-4">
//         <IdeasTable/>
//         {/* <UserPerformance/> */}
//       </Col>

//       {/* Goals Overview */}
//       <Col lg="6" className="mb-4">
//         <GoalsOverview title="Idea Progress"/>
//       </Col>
//     </Row>
//   </Container>
// );

Analytics.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

Analytics.defaultProps = {
  smallStats: [
    {
      label: "Ideas Submitted",
      value: "18",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Ideas Accepted",
      value: "7",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: "Ideas in Progress",
      value: "4",
      percentage: "3.71%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
  ]
};

export default withTranslation()(Analytics);
