// import React from "react";
// import PropTypes from "prop-types";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Col,
//   Row,
//   FormSelect
// } from "shards-react";
// import Parse from 'parse';

// import "./LocalStyles/CategorySelectStyle.css"

// // Defult
// import clockImage from "../../images/stopwatch.svg"
// import handImage from "../../images/hand.svg"
// import chartImage from "../../images/line-chart.svg"
// import shieldImage from "../../images/shield.svg"

// // Selected
// import clockImageSelected from "../../images/stopwatch_blue.svg"
// import handImageSelected from "../../images/hand_blue.svg"
// import chartImageSelected from "../../images/line-chart_blue.svg"
// import shieldImageSelected from "../../images/shield_blue.svg"

// // Defult
// import { ReactComponent as PuzzleImage } from "../../images/puzzle.svg"
// import { ReactComponent as GearsImage } from "../../images/gears.svg"

// // Selected
// import puzzleImageSelected from "../../images/puzzle_blue.svg"
// import gearsImageSelected from "../../images/gears_blue.svg"

// import { useTranslation, initReactI18next, withTranslation } from "react-i18next";

// const selectedColor = '#FD902c';//'#ff9012';
// const blueColor = '#3A7BBB'
// const orangeColor = '#FD902c'
// const greenColor = '#7FA86F'
// const goldColor = '#DDB153'

// class IdeaFilterSelect extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             selectionValue: '',
//             sq1Color: '',
//             sq2Color: '',
//             sq3Color: '',
//             sq4Color: '',
//             titleColor1: 'black',
//             titleColor2: 'black',
//             titleColor3: 'black',
//             titleColor4: 'black',
//             handIcon: 'black',
//             shieldIcon: 'black',
//             chartIcon: 'black',
//             clockIcon: 'black',
//             puzzleIcon: blueColor,
//             gearIcon: greenColor,
//             data:[],
//             showSecurity:'',
//             showQuality:'',
//             showProductivity:'',
//             showAction:'',
//           }
//           this.fetchCategoryData = this.fetchCategoryData.bind(this);
//     }

//     componentDidMount() {
//         this.fetchCategoryData();
//     }

//     fetchCategoryData() {
//         const className = "IdeaCategory";
  
//         var ItemClass = Parse.Object.extend(className);
//         var query = new Parse.Query(ItemClass);
  
//         query.find()
//         .then((results) => {
//             // this.setState({
//             //     data: results
//             // });

//             for (var i = 0; i < results.length; i++) {
//                 // console.log(results[i].get("show"));
//                 // console.log(results[i].get("itemName"));
//                 if (results[i].get("itemName") == "Seguridad") {
//                     this.setState({
//                         showSecurity: results[i].get("show")
//                     });
//                 } else if (results[i].get("itemName") == "Calidad") {
//                     this.setState({
//                         showQuality: results[i].get("show")
//                     });
//                 } else if (results[i].get("itemName") == "Productividad") {
//                     this.setState({
//                         showProductivity: results[i].get("show")
//                     });
//                 } else if (results[i].get("itemName") == "Accion Inmediata") {
//                     this.setState({
//                         showAction: results[i].get("show")
//                     });
//                 }
//               }
//             // console.log(results[0].get("show"));
//         }, (error) => {
//             this.setState({
//                 data: []
//             });
//           // The object was not retrieved successfully.
//           // error is a Parse.Error with an error code and message.
//         });
//       }

//     changeSelectedValue(selectionValue) {
//         if (selectionValue === 1) {
//             this.setState({
//                 selectionValue: 'Seguridad', 
//                 sq1Color: selectedColor,
//                 sq2Color: '',
//                 puzzleIcon: 'black',
//                 gearIcon: selectedColor,
//                 titleColor1: selectedColor,
//                 titleColor2: 'black',
//             })
//             this.props.setFilter('innovacion');
//         } else if (selectionValue === 2){
//             this.setState({
//                 selectionValue: 'Calidad', 
//                 sq1Color: '',
//                 sq2Color: selectedColor,
//                 puzzleIcon: selectedColor,
//                 gearIcon: 'black',
//                 titleColor1: 'black',
//                 titleColor2: selectedColor,
//             })
//              this.props.setFilter('solucion');
//         } 
//     }

//     render() {
//         const { sq1Color, sq2Color, sq3Color, sq4Color, handIcon, gearIcon, puzzleIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity } = this.state
//         const {t} = this.props;
//         return(
//             <div className="container">
//                 <div className="row no-gutters mt-2 mb-4">
//                     <div className="col my-auto">
//                         <div className="square"  onClick={(event) => { this.changeSelectedValue(1)}}>
//                             {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={gearIcon} /> */}
//                             <GearsImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, minHeight: 80, maxHeight: 80,fill: gearIcon}}/>
//                             <span><h5 className="text-center" style={{color: titleColor1}}>{t("Problem Solving")}</h5></span>
//                         </div>
//                     </div>
//                     <div className="col my-auto">
//                         <div className="square"  onClick={(event) => { this.changeSelectedValue(2)}}>
//                             {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={puzzleIcon} /> */}
//                             <PuzzleImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, minHeight: 80, maxHeight: 80,fill: puzzleIcon}}/>
//                             <span><h5 className="text-center" style={{color: titleColor2}}>{t("Continuous Improvement")}</h5></span>
//                         </div>
//                     </div>
//                     <div className="col my-auto">
//                         <div className="square"  onClick={(event) => { this.changeSelectedValue(2)}}>
//                             {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={puzzleIcon} /> */}
//                             <PuzzleImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, minHeight: 80, maxHeight: 80,fill: puzzleIcon}}/>
//                             <span><h5 className="text-center" style={{color: titleColor2}}>{t("Innovation")}</h5></span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row no-gutters">
                // <h6 className="mt-4"style={{fontWeight: 500,  color: '#303030'}}>{t("Which department is this idea for?")}</h6>
                //     <FormSelect
                //         size="sm"
                //         onChange={this.change} value={this.state.department}
                //         required
                //     >
                //         <option key={-1} value={-1}>{t("SUBMIT_IDEA_DepartmentSelect")}</option>
                //         {this.state.data.map((item, idx) => (
                        
                //         <option key={idx} value={item.get("itemName")} hidden={!item.get("show")}>{item.get("itemName")}</option>
                    
                //     ))}
                //     </FormSelect>
//                 </div>
//             </div>
//         )
//     }
// }

// export default withTranslation()(IdeaFilterSelect);

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  FormSelect,
  Tooltip,
  Button
} from "shards-react";
import Parse from 'parse';
import i18n from 'i18next';

import "./LocalStyles/CategorySelectStyle.css"

// Translation
import { withTranslation } from 'react-i18next';

// Default
import { ReactComponent as ExtraImage } from '../../images/innovation.svg';
import { ReactComponent as HandImage } from "../../images/hand.svg"
import { ReactComponent as ChartImage } from "../../images/line-chart.svg"
import { ReactComponent as ShieldImage } from "../../images/shield.svg"
import { ReactComponent as TimeImage } from "../../images/time.svg"
import { ReactComponent as TeamImage } from "../../images/team.svg"
import { ReactComponent as DollarImage } from "../../images/dollar-symbol.svg"
import { ReactComponent as InfoIcon} from "../../images/info_icon.svg"


// New
import { ReactComponent as UrgentImage} from '../../images/Icons_Idle_01_Urgent.svg';
import { ReactComponent as ProductivityImage } from "../../images/Icons_Idle_02_Productivity.svg"
import { ReactComponent as CheckmarkImage} from "../../images/Icons_Idle_03_Checkmark.svg"
import { ReactComponent as TrophyImage } from "../../images/Icons_Idle_04_Trophy.svg"
import { ReactComponent as Shield2Image } from "../../images/Icons_Idle_05_Shield.svg"
import { ReactComponent as DollarSignImage } from "../../images/Icons_Idle_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImage } from "../../images/Icons_Idle_07_Number One.svg"
import { ReactComponent as ProblemSolvingImage } from "../../images/Icons_Type_01_Problem Solving_NotSelected.svg"
import { ReactComponent as InnovationImage } from "../../images/Icons_Type_02_Innovation_NotSelected.svg"
import { ReactComponent as ContinuousImprovementImage } from "../../images/Icons_Type_03_ContinuousImprovement_NotSelected.svg"

// New Selected
import { ReactComponent as UrgentImageSelected} from '../../images/Icons_Selected_01_Urgent.svg';
import { ReactComponent as ProductivityImageSelected } from "../../images/Icons_Selected_02_Productivity.svg"
import { ReactComponent as CheckmarkImageSelected } from "../../images/Icons_Selected_03_Checkmark.svg"
import { ReactComponent as TrophyImageSelected } from "../../images/Icons_Selected_04_Trophy.svg"
import { ReactComponent as Shield2ImageSelected } from "../../images/Icons_Selected_05_Shield.svg"
import { ReactComponent as DollarSignImageSelected } from "../../images/Icons_Selected_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImageSelected } from "../../images/Icons_Selected_07_Number One.svg"
import { ReactComponent as ProblemSolvingImageSelected } from "../../images/Icons_Type_01_Problem Solving_Selected.svg"
import { ReactComponent as InnovationImageSelected } from "../../images/Icons_Type_02_Innovation_Selected.svg"
import { ReactComponent as ContinuousImprovementImageSelected } from "../../images/Icons_Type_03_ContinuousImprovement_Selected.svg"

// fill="#157ffb"

// Selected
import clockImageSelected from "../../images/stopwatch_blue.svg"
import handImageSelected from "../../images/hand_blue.svg"
import chartImageSelected from "../../images/line-chart_blue.svg"
import shieldImageSelected from "../../images/shield_blue.svg"
// import { Container, Row, Col } from "shards-react";



const selectedColor = '#FD902c'//'#157ffb';//'#ff9012';
const blueColor = '#3A7BBB'
const orangeColor = '#FD902c'
const greenColor = '#7FA86F'
const goldColor = '#DDB153'
const purpleColor = '#62466B'
const whiteSelected = 'white'

class IdeaFilterSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectionValue: '',
            sq1Color: '',
            sq2Color: '',
            sq3Color: '',
            sq4Color: '',
            sq5Color: '',
            titleColor1: 'black',
            titleColor2: 'black',
            titleColor3: 'black',
            titleColor4: 'black',
            titleColor5: 'black',
            handIcon: 'black',
            shieldIcon: blueColor,
            chartIcon: greenColor,
            clockIcon: goldColor,
            extraIcon: purpleColor,
            data:[],
            showSecurity:'',
            showQuality:'',
            showProductivity:'',
            showAction:'',
            showExtra:'',
            extraName:'',
            extraValue: '',
            allCats: [],
            bgColor: '',
            right: [],
            selectedCategoryName: '',
            department: ''
          }
          this.fetchCategoryData = this.fetchCategoryData.bind(this);
          this.fetchNewData = this.fetchNewData.bind(this);
          this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.fetchCategoryData();
        this.fetchNewData();
        // this.updateStatus()
    }

    updateStatus() {
        if (!this.state.deparment || this.state.selectedCategoryName) {
            this.props.changeStatus(false)
        } else {
            this.props.changeStatus(true)
        }
    }

    fetchCategoryData() {
        const className = "IdeaCategory";
  
        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);


        const filterSelectData = [
            {
                name:'Problem Solving',
                icon: 'ProblemSolving',
                description: 'Solve a problem or challenge that stops us from getting things done or makes it harder.'
            },
            {
                name:'Innovation',
                icon: 'Innovation',
                description: 'Doing things in a way they have not been done before.'
            },
            {
                name:'Continuous Improvement',
                icon: 'Improvement',
                description: 'Improving the way we do things.'
            },
        ]

        this.setState({allCats: filterSelectData, right:[false, false, false]})
  
        // query.find()
        // .then((results) => {
        //     // this.setState({
        //     //     data: results
        //     // });
        //     this.setState({allCats: results})
        //     console.log(results)
            
        //     for (var i = 0; i < results.length; i++) {
        //         // console.log(results[i].get("show"));
        //         // console.log(results[i].get("itemName"));
        //         if (results[i].get("itemName") == "Seguridad") {
        //             this.setState({
        //                 showSecurity: results[i].get("show")
        //             });
        //         } else if (results[i].get("itemName") == "Calidad") {
        //             this.setState({
        //                 showQuality: results[i].get("show")
        //             });
        //         } else if (results[i].get("itemName") == "Productividad") {
        //             this.setState({
        //                 showProductivity: results[i].get("show")
        //             });
        //         } else if (results[i].get("itemName") == "Accion Inmediata") {
        //             this.setState({
        //                 showAction: results[i].get("show")
        //             });
        //         } else {
        //             this.setState({
        //                 showExtra: results[i].get("show"),
        //                 extraName: results[i].get("itemNameTrans"),
        //                 extraValue: results[i].get("itemName")
        //             });
        //         } 
        //       }
        //     // console.log(results[0].get("show"));
        // }, (error) => {
        //     this.setState({
        //         data: []
        //     });
        //   // The object was not retrieved successfully.
        //   // error is a Parse.Error with an error code and message.
        // });
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

    changeSelectedValue(selectionValue, category) {
        const myExtraValue = category.name
        // if (selectionValue === 1) {
        //     this.setState({
        //         selectionValue: 'Seguridad', 
        //         sq1Color: selectedColor,
        //         sq2Color: '',
        //         sq3Color: '',
        //         sq4Color: '',
        //         sq5Color: '',
        //         handIcon: whiteSelected,
        //         shieldIcon: blueColor,
        //         chartIcon: greenColor,
        //         clockIcon: goldColor,
        //         extraIcon: purpleColor,
        //         titleColor1: whiteSelected,
        //         titleColor2: 'black',
        //         titleColor3: 'black',
        //         titleColor4: 'black',
        //         titleColor5: 'black',
        //     })
        //     this.props.setCategory('Seguridad');
        // } else if (selectionValue === 2){
        //     this.setState({
        //         selectionValue: 'Calidad', 
        //         sq1Color: '',
        //         sq2Color: selectedColor,
        //         sq3Color: '',
        //         sq4Color: '',
        //         sq5Color: '',
        //         handIcon: 'black',
        //         shieldIcon: whiteSelected,
        //         chartIcon: greenColor,
        //         clockIcon: goldColor,
        //         extraIcon: purpleColor,
        //         titleColor1: 'black',
        //         titleColor2: whiteSelected,
        //         titleColor3: 'black',
        //         titleColor4: 'black',
        //         titleColor5: 'black',
        //     })
        //     this.props.setCategory('Calidad');
        // } else if (selectionValue === 3) {
        //     this.setState({
        //         selectionValue: 'Productividad', 
        //         sq1Color: '',
        //         sq2Color: '',
        //         sq3Color: selectedColor,
        //         sq4Color: '',
        //         sq5Color: '',
        //         handIcon: 'black',
        //         shieldIcon: blueColor,
        //         chartIcon: whiteSelected,
        //         clockIcon: goldColor,
        //         extraIcon: purpleColor,
        //         titleColor1: 'black',
        //         titleColor2: 'black',
        //         titleColor3: whiteSelected,
        //         titleColor4: 'black',
        //         titleColor5: 'black',
        //     })
        //     this.props.setCategory('Productividad');
        // } else if (selectionValue === 4){
        //     this.setState({
        //         selectionValue: 'Accion Inmediata', 
        //         sq1Color: '',
        //         sq2Color: '',
        //         sq3Color: '',
        //         sq4Color: selectedColor,
        //         sq5Color: '',
        //         handIcon: 'black',
        //         shieldIcon: blueColor,
        //         chartIcon: greenColor,
        //         clockIcon: whiteSelected,
        //         extraIcon: purpleColor,
        //         titleColor1: 'black',
        //         titleColor2: 'black',
        //         titleColor3: 'black',
        //         titleColor4: whiteSelected,
        //         titleColor5: 'black',
        //     })
        //     this.props.setCategory('Accion Inmediata');
        // } else {
        //     this.setState({
        //         selectionValue: myExtraValue, 
        //         sq1Color: '',
        //         sq2Color: '',
        //         sq3Color: '',
        //         sq4Color: '',
        //         sq5Color: selectedColor,
        //         handIcon: 'black',
        //         shieldIcon: blueColor,
        //         chartIcon: greenColor,
        //         clockIcon: goldColor,
        //         extraIcon: whiteSelected,
        //         titleColor1: 'black',
        //         titleColor2: 'black',
        //         titleColor3: 'black',
        //         titleColor4: 'black',
        //         titleColor5: whiteSelected,
        //     })
        //     this.props.setCategory(myExtraValue);
        // }

        // Old Selection
        this.setState({
            selectionValue: selectionValue,
            selectedCategoryName: category.icon
        })
        this.props.setFilter(category.name)
        console.log(selectionValue)
        console.log(category)
    }

    getIcon(name, fillColor) {
        const {selectionValue, selectedCategoryName} = this.state;

        const newIcons = [
            {normal: <UrgentImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <UrgentImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <ProductivityImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <ProductivityImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <CheckmarkImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <CheckmarkImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <TrophyImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <TrophyImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <Shield2Image className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <Shield2ImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <DollarSignImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:8200}}/>,
             selected: <DollarSignImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <NumberOneImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <NumberOneImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <ProblemSolvingImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <ProblemSolvingImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <InnovationImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:8200}}/>,
             selected: <InnovationImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <ContinuousImprovementImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <ContinuousImprovementImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
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
                return newIcons[0];
            case 'Productivity':
                return newIcons[1];
            case 'Checkmark':
                return newIcons[2];
            case 'Trophy':
                return newIcons[3];
            case 'Shield':
                return newIcons[4];
            case 'Dollar':
                return newIcons[5];
            case 'Number One':
                return newIcons[6];
            case 'ProblemSolving':
                return newIcons[7];
            case 'Innovation':
                return newIcons[8];
            case 'Improvement':
                return newIcons[9];
            default:
              return <ExtraImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: fillColor}}/>;
          }
    }

    getBgColor(index) {
        if (this.state.selectionValue == index) {
            return selectedColor
        } else {
            return ''
        }
    }

    toggle(index) {
        const myCopy = [...this.state.right]
        myCopy[index] = !myCopy[index]
        this.setState({right: myCopy})
      }

     change(event) {
         console.log(event.target.value)
         this.setState({department: event.target.value})
         this.props.setDepartment(event.target.value)
     }
    

    render() {
        const { allCats, bgColor, sq1Color, sq2Color, sq3Color, sq4Color, handIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity, showExtra, titleColor5, sq5Color, extraName, extraIcon } = this.state
        const { t } = this.props;
        const storageLanguage = localStorage.getItem('language');
        return(
            <div>
                <Row className='pt-2'>
                    {allCats.map((myCategory, index) => { 
                        const isSelected = myCategory.icon == this.state.selectedCategoryName
                        const type = isSelected?'selected':'normal'
                        const icon = this.getIcon(myCategory.icon, '#000000')
                        const myIcon = icon[type]
                        console.log(type)
                        return(
                        <Col sm="12" lg="4" md="4" style={{justifyContent: 'start', flexWrap: 'wrap'}}>
                        {/* <div className="square"  onClick={(event) => { this.changeSelectedValue(index, myCategory)}} > */}
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: '#32CD32'}} src={handIcon} /> */}
                            {/* <HandImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: myCategory.get("color")}}/> */}
                            <Row style={{justifyContent:'start', alignItems:'center'}}>
                                {/* <Col lg="12" style={{backgroundColor: 'white'}}>  */}
                                                            
                                    <div  style={{justifyContent:'center', alignItems:'center'}}>
                                    <div className='pt-3' onClick={(event) => { this.changeSelectedValue(index, myCategory)}} style={{justifyContent:'center', alignItems:'center'}}>
                                        {myIcon}
                                        <div style={{textAlign: 'center'}} className='pt-4'>
                                        <h6 style={{color: titleColor1, fontWeight: 500, color: '#303030', marginRight: 10}}>
                                            {myCategory.name}
                                            <a id={"TooltipExampleFilter" + index} className="text-right" style={{ color: 'inherit'}} className='pl-2' onClick={() => {
                                                const myCopy = [...this.state.right]
                                                myCopy[index] = !myCopy[index]
                                                this.setState({right: myCopy})
                                            }}>
                                                <InfoIcon style={{height: 10, width: 10}}></InfoIcon>
                                            </a>
                                        </h6>
                                        <Tooltip
                                            className='pl-2'
                                            open={this.state.right[index]}
                                            target={"#TooltipExampleFilter" + index}
                                            id={"TooltipExampleFilter1" + index}
                                            toggle={() => {this.toggle(index)}}
                                            >
                                            {myCategory.description}
                                        </Tooltip>
                                        </div>
                                    </div>
                                    </div>
                                {/* </Col> */}
                                {/* <Col lg="2" style={{backgroundColor: 'blue'}}>
                                <a onClick={this.handleToggleSidebar}>
                                    <i className="material-icons">info</i>
                                </a>
                                </Col> */}
                            </Row>
                            {/* <span> */}
                            {/* <Row style={{justifyContent:'center', alignItems:'center'}}>
                                <h6 style={{color: titleColor1, fontWeight: 600, color: '#303030', marginRight: 10}}>{myCategory.name}</h6>
                                <a id={"TooltipExample" + index} className="text-right" style={{ color: 'inherit'}} onClick={() => {this.setState({right: !this.state.right})}}>
                                    <i className="material-icons">info</i>
                                </a>
                                <Tooltip
                                        open={this.state.right}
                                        target={"#TooltipExample"+index}
                                        toggle={() => {this.toggle()}}
                                        >
                                        Type Category Description. Lorem ipsum dolor sit amet, consectetuer adipi- scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volut-!
                                </Tooltip>
                            </Row> */}
                                
                            {/* </span> */}
                        {/* </div> */}
                        </Col>
                    )})}
                </Row>
                <Row className='pt-4'>
                    <h6 className="mt-4"style={{fontWeight: 500,  color: '#303030'}}>{t("Which department is this idea for? *")}</h6>
                    <FormSelect
                        size="sm"
                        onChange={this.change} value={this.state.department}
                        required
                    >
                        <option key={-1} value={-1}>{t("SUBMIT_IDEA_DepartmentSelect")}</option>
                        {this.state.data.map((item, idx) => (
                        
                        <option key={idx} value={item.get("itemName")} hidden={!item.get("show")}>{item.get("itemName")}</option>
                    
                    ))}
                    </FormSelect>
                </Row>
                {/* <div className="row no-gutters">
                    <div className="col my-auto" style={{backgroundColor: sq3Color, borderRadius: '20px'}} hidden={!showProductivity}>
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(3)}}>
                           
                            <ChartImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: chartIcon}}/>
                            <span><h4 className="text-center" style={{color: titleColor3}}>{t('PRODUCTIVITY_CATEGORY')}</h4></span>
                        </div>
                    </div>
                    <div className="col my-auto" style={{backgroundColor: sq4Color, borderRadius: '20px'}} hidden={!showAction}>
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(4)}}>
                            
                            <TimeImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: clockIcon}}/>
                            <span><h4 className="text-center" style={{color: titleColor4}}>{t('IMMEDIATEACTION_CATEGORY')}</h4></span>
                        </div>
                    </div>
                </div> */}
                {/* <div className="row no-gutters">
                    <div className="col my-auto" style={{backgroundColor: sq5Color, borderRadius: '20px'}} hidden={!showExtra}>
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(5)}}>
                           
                            <ExtraImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: extraIcon}}/>
                            <span><h4 className="text-center" style={{color: titleColor5}}>{extraName[storageLanguage]}</h4></span>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default withTranslation()(IdeaFilterSelect);