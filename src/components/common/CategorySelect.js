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
import { ReactComponent as CheckmarkImage} from "../../images/check1.svg"
import { ReactComponent as TrophyImage } from "../../images/Icons_Idle_04_Trophy.svg"
import { ReactComponent as Shield2Image } from "../../images/Icons_Idle_05_Shield.svg"
import { ReactComponent as DollarSignImage } from "../../images/Icons_Idle_06_Dollar Sign.svg"
import { ReactComponent as NumberOneImage } from "../../images/Icons_Idle_07_Number One.svg"

// New Selected
import { ReactComponent as UrgentImageSelected} from '../../images/Icons_Selected_01_Urgent.svg';
import { ReactComponent as ProductivityImageSelected } from "../../images/Icons_Selected_02_Productivity.svg"
import { ReactComponent as CheckmarkImageSelected } from "../../images/check1_selected.svg"
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

class CategorySelect extends React.Component {

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
  
        query.find()
        .then((results) => {
            // this.setState({
            //     data: results
            // });
            this.setState({allCats: results, right:[false, false, false, false, false, false, false, false, false, false]})
            
            console.log(results)
            
            for (var i = 0; i < results.length; i++) {
                // console.log(results[i].get("show"));
                // console.log(results[i].get("itemName"));
                if (results[i].get("itemName") == "Seguridad") {
                    this.setState({
                        showSecurity: results[i].get("show")
                    });
                } else if (results[i].get("itemName") == "Calidad") {
                    this.setState({
                        showQuality: results[i].get("show")
                    });
                } else if (results[i].get("itemName") == "Productividad") {
                    this.setState({
                        showProductivity: results[i].get("show")
                    });
                } else if (results[i].get("itemName") == "Accion Inmediata") {
                    this.setState({
                        showAction: results[i].get("show")
                    });
                } else {
                    this.setState({
                        showExtra: results[i].get("show"),
                        extraName: results[i].get("itemNameTrans"),
                        extraValue: results[i].get("itemName")
                    });
                } 
              }
            // console.log(results[0].get("show"));
        }, (error) => {
            this.setState({
                data: []
            });
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      }

    changeSelectedValue(selectionValue, category) {
        const myExtraValue = category.get("itemName")
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
            selectedCategoryName: category.get("icon")
        })
        this.props.setCategory(myExtraValue, category.get('icon'), category.get("categoryDescription"), category.id);
        console.log(selectionValue)
        console.log(category)
    }

    getIcon(name, fillColor) {
        const {selectionValue, selectedCategoryName} = this.state;
        
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
                return newIcons[0];
            case 'Productivity':
                return newIcons[1];
            case 'Checkmark':
                return newIcons[2];
            case 'Trophy':
                return newIcons[3];
            case 'Shield Image':
                return newIcons[4];
            case 'Dollar':
                return newIcons[5];
            case 'Dollar Sign':
                return newIcons[5];
            case 'Dollar Sign':
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

    toggle(index) {
        // alert('hover')
        const myCopy = [...this.state.right]
        myCopy[index] = !myCopy[index]
        this.setState({right: myCopy})
      }
    

    render() {
        const { allCats, bgColor, sq1Color, sq2Color, sq3Color, sq4Color, handIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity, showExtra, titleColor5, sq5Color, extraName, extraIcon } = this.state
        const { t } = this.props;
        const storageLanguage = localStorage.getItem('language');
        return(
            <div>
                <Row className='pt-2'>
                    {allCats.map((myCategory, index) => { 
                        const isSelected = myCategory.get('icon') == this.state.selectedCategoryName
                        const type = isSelected?'selected':'normal'
                        const icon = this.getIcon(myCategory.get("icon"), myCategory.get("color"))
                        const myIcon = icon[type]
                        const description = myCategory.get('categoryDescription')
                        const myDescription = description[storageLanguage]
                        console.log(t(myCategory.get("itemNameTrans")[storageLanguage]))
                        console.log(index)
                        return(
                        <Col sm="6" lg="3" md="3" hidden={!myCategory.get("show")}>
                        {/* <div className="square"  onClick={(event) => { this.changeSelectedValue(index, myCategory)}} > */}
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: '#32CD32'}} src={handIcon} /> */}
                            {/* <HandImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: myCategory.get("color")}}/> */}
                            <Row>
                                {/* <Col lg="12" style={{backgroundColor: 'white'}}>  */}
                                
                                    <div className="text-right" >
                                    <div onClick={(event) => { this.changeSelectedValue(index, myCategory)}}>
                                        {myIcon}
                                    </div>
                                    {/* <a className="text-center" onClick={() => {this.setState({right: !this.state.right})}}>
                                        <i className="material-icons">info</i>
                                    </a> */}
                                    </div>
                                {/* </Col> */}
                                {/* <Col lg="2" style={{backgroundColor: 'blue'}}>
                                <a onClick={this.handleToggleSidebar}>
                                    <i className="material-icons">info</i>
                                </a>
                                </Col> */}
                            </Row>
                            {/* <span> */}
                            <Row>
                                <h6 style={{color: titleColor1, fontWeight: 600, color: '#303030', marginRight: 10}}>{t(myCategory.get("itemNameTrans")[storageLanguage])}</h6>
                                <a id={"TooltipExample" + index} className="text-right" style={{ color: 'inherit'}} onClick={() => {
                                    const myCopy = [...this.state.right]
                                    myCopy[index] = !myCopy[index]
                                    this.setState({right: myCopy})
                                }}>
                                    <InfoIcon style={{height: 10, width: 10, marginTop: 3}}></InfoIcon>
                                </a>
                                <Tooltip
                                        open={this.state.right[index]}
                                        target={"#TooltipExample"+ index}
                                        id={"TooltipExample1"+ index}
                                        toggle={() => {this.toggle(index)}}
                                        >
                                        {myDescription}
                                </Tooltip>
                            </Row>
                                
                            {/* </span> */}
                        {/* </div> */}
                        </Col>
                    )})}
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

export default withTranslation()(CategorySelect);