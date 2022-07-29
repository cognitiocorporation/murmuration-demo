import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"
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


const storageLanguage = localStorage.getItem('language') != null?localStorage.getItem('language'):'en';

const blueColor = '#3A7BBB'
const orangeColor = '#FD902c'
const greenColor = '#7FA86F'
const goldColor = '#DDB153'

// PieChart

const PieChart = () => {
  const labels = ['Label 1', 'Label 2']
  const datasets = [{
    data: [2000, 4000],
    backgroundColor: ['red', 'blue']
  }]
  const pie = (
    <Pie 
    data={{
      labels: labels,
      datasets: datasets
    }}
    height='50%'
    />
  )
}

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
       <Chart data={props.data} series={series} axes={axes} tooltip/>
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
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart initialWidth={100} data={props.data} series={series} axes={axes} tooltip />
    </div>
   
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
        height: '300px'
      }}
    >
      <Chart data={data} initialWidth={100} series={series} axes={axes} tooltip style={{width: '100%'}}/>
    </div>
  )

  return barChart
}

class EmployeeActivityDashboard extends React.Component { 

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
      exportData:{},
      ideaDataCsv: [],
      myIdeas: [],
      myApprovedIdeas: [],
      myTeamContributions: [],
      myApprovedTeamIdeas: [],
      basicIdeaByDepartment:[],
      orderedDepartments: [],
      ideasByType: []
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
    const displayLimit = 1000;
    const query = new Parse.Query(IdeaObject);
    query.limit(displayLimit)
    const results = await query.find();

    const myUser = Parse.User.current()

    const myIdeas = results.filter(idea => idea.get("proponentObj").id == myUser.id)
    const myApprovedIdeas = myIdeas.filter(idea => idea.get("status") == 'Approved')
    const myTeamContributions = results.filter(idea => idea.get("department") == myUser.get("department"))
    const myApprovedTeamIdeas = results.filter(idea => idea.get("status") == 'Approved')
    
    const completedIdeas = results.filter(idea => idea.get("progress")[0] == 100);
    const ideasInProgress = results.filter(idea => idea.get("progress")[0] > 0 && idea.get("progress")[0] < 100);
    const ideasPendingEval = results.filter(idea => idea.get("needsEvaluation") == true);
    
    // query.equalTo("needsEvaluation", true);
    // query.equalTo("completed", false);
    // query.descending("createdAt");

    this.setState({
        myIdeas: myIdeas,
        myApprovedIdeas: myApprovedIdeas,
        myTeamContributions: myTeamContributions,
        myApprovedTeamIdeas: myApprovedTeamIdeas,
        ideas: results,
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
    // Modify Idea Data
    this.downloadIdeaData()
    const Department = Parse.Object.extend("IdeaDepartment");
    const query = new Parse.Query(Department);
    const results = await query.find();
    this.setState({departments: results}, () => this.setupIdeaByDepartmentData());
  }

  setupIdeaByDepartmentData() {
    const {ideas, categories, completedIdeas, ideasInProgress, departments, numCompleted, numSubmitted, numInProgress} = this.state;
    var inProgressData = [];
    var basicIdeaByDepartment = []
    var orderedDepartments = []

    const innovation = ideas.filter(idea => idea.get("ideaType") == "innovacion")
    const improvement = ideas.filter(idea => idea.get("ideaType") == "improvement")
    const problemSolving = ideas.filter(idea => idea.get("ideaType") == "problema")

    const innovationPercentage = parseInt((innovation.length / ideas.length) * 100)
    const improvementPercentage = parseInt((improvement.length / ideas.length) * 100)
    const problemSolvingPercentage = parseInt((problemSolving.length / ideas.length) * 100)

    const ideasByType = [innovationPercentage, improvementPercentage, problemSolvingPercentage]

    // var completedData = [];
    for (var i in departments) {
      const deptName = departments[i].get("itemName");
      const filteredDataCount = ideasInProgress.filter(idea => idea.get("department") == deptName)
      const realFilteredDataCount = ideas.filter(idea => idea.get("department") == deptName)
      const newNum = filteredDataCount.length;
      const filteredNewNum = realFilteredDataCount.length
      const percentage = parseInt((filteredNewNum / ideas.length) * 100)
      basicIdeaByDepartment.push(percentage)
      orderedDepartments.push(deptName)
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
    this.setState({ideasByType: ideasByType, orderedDepartments: orderedDepartments,basicIdeaByDepartment: basicIdeaByDepartment,ideaByDepartmentData: results, exportData: ideas, completeIdeas: completedIdeas1, ideasPerCats: ideasPerCategory, showIdeasByDeptChart: true});
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

  downloadIdeaData() {
    const modifiedData = this.state.ideas.map((idea) => {
      const newData = {
        "Idea Originator": idea.get("proponentName"),
        "Idea Number": idea.get("num"),
        "Idea Title": idea.get("title"),
        "Description": idea.get("description"),
        "Idea Category": idea.get("category"),
        "Idea Type": idea.get("type"),
        "Business Value": idea.get("questionAnswer"),
        "Supervisor/Owner": idea.get("responsibleName"),
        "Department": idea.get("department"),
        "Submitted": idea.get("date"),
        "Updated": idea.get("updatedAt"),
        "Progress": idea.get("progress"),
        "Implementation Type": idea.get("status"),
        "Edited": idea.get("edited"),
        "Idea Details": idea.get("filterAnswer"),
        "Comments": idea.get("comments"),
        "Has Team": idea.get("hasTeam"),
        "Idea Team": idea.get("teamMembers"),
        "Needs Evaluation": idea.get("needsEvaluation"),
      }

      return(newData)
    })
    console.log(modifiedData)
    this.setState({ideaDataCsv: modifiedData})
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
      const labels = this.state.orderedDepartments
      const backgroundColors = ['#79de75', '#f56bd6', '#99c2fd', '#633fda', '#2a2a2a', '#6912', '#e149', '#ed714d', '#529e80', '#b5d8b3']
      const otherLabels = ['Innovation', 'Continuous Improvement', 'Problem Solving']
      const datasets = [{
        data: this.state.basicIdeaByDepartment,
        backgroundColor: backgroundColors
      }]

      const datasetsByType = [{
        data: this.state.ideasByType,
        backgroundColor: backgroundColors
      }]

      var smallStats = [
        {
          label: t('Your Contributions'),
          value: this.state.myIdeas.length,
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
          label: t('Your Approved Contributions'),
          value: this.state.myApprovedIdeas.length,
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
          label: t("Your Team's Contributions"),
          value: this.state.myTeamContributions.length,
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
          label: t('Contributions in Progress'),
          value: this.state.myApprovedTeamIdeas.length,
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
       <div>

    {/* Small Stats Blocks */}
    
    <Row>
      <Col lg="12" className="m-auto">
        <Row className="mt-4">
        {smallStats.map((stats, idx) => (
        <Col key={idx} md="6" lg="3" className="mb-4">
          <Card>
            <CardBody>
              <CardSubtitle style={{textAlign: 'center'}} >{stats.label}</CardSubtitle>
                <h3 className="mt-2" style={{textAlign: 'center'}}>{stats.value}</h3>
            </CardBody>
          </Card>
        </Col>
        ))}
        </Row>
      </Col>
    </Row>
    
    <Row>
        <Col lg="12" className="m-auto">
            <Row>
                <Col lg="6" sm="12" className="mb-4">
                    <Card>
                    <CardBody>
                    <CardTitle>{t('Ideas by Department (%)')}</CardTitle>
                    {/* <div
                        style={{
                        width: '400px',
                        height: '300px'
                        }}
                    > */}
                        <Pie data={{labels: labels, datasets: datasets}}  
                            options={{ 
                                maintainAspectRatio: true,
                                responsive: true,
                                legend: {
                                    display: true,
                                    position: "bottom"
                                  },
                            }} />
                    {/* </div> */}
                    
                    </CardBody>
                    <CardFooter>
                    {/* <Button>{t('DOWNLOAD_DATA')} &rarr;</Button> */}
                    </CardFooter>
                    </Card>
                </Col>
                <Col lg="6" sm="12" className="mb-4">
                    <Card>
                    <CardBody>
                    <CardTitle>{t('Ideas by Type (%)')}</CardTitle>
                    {/* <div
                        style={{
                        width: '400px',
                        height: '300px'
                        }}
                    > */}
                        <Pie data={{labels: otherLabels, datasets: datasetsByType}}  options={{
                             maintainAspectRatio: true,
                            responsive: true,
                             legend: {
                                display: true,
                                position: "bottom"
                              },
                        }} />
                    {/* </div> */}
                    
                    </CardBody>
                    <CardFooter>
                    {/* <Button>{t('DOWNLOAD_DATA')} &rarr;</Button> */}
                    </CardFooter>
                    </Card>
                </Col>
            </Row>
         </Col>
      </Row>
      </div>
      )
    }
  }


EmployeeActivityDashboard.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

EmployeeActivityDashboard.defaultProps = {
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

export default withTranslation()(EmployeeActivityDashboard);
