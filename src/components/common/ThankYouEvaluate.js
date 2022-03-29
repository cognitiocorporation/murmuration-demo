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
import ThankYouEvaluateImage from "../../images/thankyou_evaluate.png"


// New
import { ReactComponent as UrgentImage} from '../../images/Icons_Idle_01_Urgent.svg';
import { ReactComponent as ProductivityImage } from "../../images/Icons_Idle_02_Productivity.svg"
import { ReactComponent as CheckmarkImage} from "../../images/Icons_Idle_03_Checkmark.svg"
import { ReactComponent as TrophyImage } from "../../images/Icons_Idle_04_Trophy.svg"
import { ReactComponent as Shield2Image } from "../../images/Icons_Idle_05_Shield.svg"
import { ReactComponent as DollarSignImage } from "../../images/Icons_Idle_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImage } from "../../images/Icons_Idle_07_Number One.svg"

// New Selected
import { ReactComponent as UrgentImageSelected} from '../../images/Icons_Selected_01_Urgent.svg';
import { ReactComponent as ProductivityImageSelected } from "../../images/Icons_Selected_02_Productivity.svg"
import { ReactComponent as CheckmarkImageSelected } from "../../images/Icons_Selected_03_Checkmark.svg"
import { ReactComponent as TrophyImageSelected } from "../../images/Icons_Selected_04_Trophy.svg"
import { ReactComponent as Shield2ImageSelected } from "../../images/Icons_Selected_05_Shield.svg"
import { ReactComponent as DollarSignImageSelected } from "../../images/Icons_Selected_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImageSelected } from "../../images/Icons_Selected_07_Number One.svg"

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

class ThankYouEvaluate extends React.Component {

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
            right: false,
            selectedCategoryName: ''
          }
          this.fetchCategoryData = this.fetchCategoryData.bind(this);
    }

    componentDidMount() {
        this.fetchCategoryData();
    }

    fetchCategoryData() {
        const className = "IdeaCategory";
  
        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);


        const filterSelectData = [
            {
                name:'Problem Solving',
                icon: 'Urgent'
            },
        ]

        this.setState({allCats: filterSelectData})
  
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

    changeSelectedValue(selectionValue, category) {
        const myExtraValue = category.get("itemName")
        
        // Old Selection
        this.setState({
            selectionValue: selectionValue,
            selectedCategoryName: category.get("icon")
        })
        this.props.setCategory(myExtraValue, category.get('icon'));
        console.log(selectionValue)
        console.log(category)
    }

    getIcon(name, fillColor) {
        const {selectionValue, selectedCategoryName} = this.state;

        const newIcons = [
            {normal: <UrgentImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <UrgentImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <ProductivityImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <ProductivityImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <CheckmarkImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <CheckmarkImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <TrophyImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <TrophyImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <Shield2Image className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <Shield2ImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <DollarSignImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:8200}}/>,
             selected: <DollarSignImageSelected className="mr-auto d-block" style={{minWidth: 80, maxWidth:80}}/>
            },
            {normal: <NumberOneImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
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

    toggle() {
        // alert('hover')
        this.setState({
          open: !this.state.right
        });
      }
    

    render() {
        const { allCats, bgColor, sq1Color, sq2Color, sq3Color, sq4Color, handIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity, showExtra, titleColor5, sq5Color, extraName, extraIcon } = this.state
        const { t, idea } = this.props;
        const storageLanguage = localStorage.getItem('language');
        return(
            <div>
                <Row className='pt-4'>
                    
                        <Col sm="6" lg="6" md="6">
                            <Row>   
                                    <div className="mx-auto mb-4 mt-4">
                                        <div>
                                            <img src={ThankYouEvaluateImage} className="mx-auto d-block" style={{minWidth: 300, maxWidth:300}}/>
                                        </div>
                                    </div>
                            </Row>
                        </Col>
                        <Col sm="6" lg="6" md="6">
                        {/* <div className="square"  onClick={(event) => { this.changeSelectedValue(index, myCategory)}} > */}
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: '#32CD32'}} src={handIcon} /> */}
                            {/* <HandImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: myCategory.get("color")}}/> */}
                            <Row className="mt-=4">   
                                <h5 style={{color: titleColor1, fontWeight: 400, color: '#303030', marginRight: 10}}>This idea was developed and submitted by:</h5>
                            </Row>
                            {/* <span> */}
                            <Row className="mt-2">
                                <h5 style={{color: titleColor1, fontWeight: 400, color: '#303030', marginRight: 10}}>{idea && idea.get("proponentName")}</h5>
                               
                            </Row>
                            {/* <Row>
                                <p>Operations Team</p> 
                            </Row> */}
                            {/* <Row>
                                <h6 style={{color: titleColor1, fontWeight: 400, color: '#303030', marginRight: 10}}></h6>
                                <p>Supervisor: Yolanda Lassalle</p>
                            </Row> */}
                                
                            {/* </span> */}
                        {/* </div> */}
                        </Col>
                   
                </Row>
            </div>
        )
    }
}

export default withTranslation()(ThankYouEvaluate);