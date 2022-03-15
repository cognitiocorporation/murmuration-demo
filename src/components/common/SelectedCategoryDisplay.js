import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  FormSelect
} from "shards-react";
import Parse from 'parse';
import i18n from 'i18next';

import "./LocalStyles/CategorySelectStyle.css"

// Translation
import { withTranslation } from 'react-i18next';

// Defult
import { ReactComponent as ExtraImage } from '../../images/innovation.svg';
import { ReactComponent as HandImage } from "../../images/hand.svg"
import { ReactComponent as ChartImage } from "../../images/line-chart.svg"
import { ReactComponent as ShieldImage } from "../../images/shield.svg"
import { ReactComponent as TimeImage } from "../../images/time.svg"
import { ReactComponent as TeamImage } from "../../images/team.svg"
import { ReactComponent as DollarImage } from "../../images/dollar-symbol.svg"
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
            bgColor: ''
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
            this.setState({allCats: results})
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
        this.setState({
            selectionValue: selectionValue
        })
        this.props.setCategory(myExtraValue);
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
            {normal: <DollarSignImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <DollarSignImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
            },
            {normal: <NumberOneImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>,
             selected: <NumberOneImageSelected className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
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
            default:
              return <img src={selectIdeaImage} width="200" height="200" />//<SelectIdeaImage className="mr-auto d-block" style={{minWidth: 200, maxWidth:200}}/>
          }
    }

    getBgColor(index) {
        if (this.state.selectionValue == index) {
            return selectedColor
        } else {
            return ''
        }
    }

    render() {
        const { allCats, bgColor, sq1Color, sq2Color, sq3Color, sq4Color, handIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity, showExtra, titleColor5, sq5Color, extraName, extraIcon } = this.state
        const { t, categoryName, categoryIcon } = this.props;
        const storageLanguage = localStorage.getItem('language');
        return(
            <div className="container">
                <Row>
                    
                {/* <Col sm="12" lg="12" md="12" style={{borderRadius: '20px', backgrounColor: 'black'}}> */}
                <div className="square pt-2" onClick={(event) => { this.changeSelectedValue(0, 'HandImage')}} >
                    {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: '#32CD32'}} src={handIcon} /> */}
                    {/* <HandImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, fill: myCategory.get("color")}}/> */}
                    {this.getIcon(categoryName, 'Black')}
                    <div className="mr-auto mt-4" style={{width: '70%', backgrounColor: 'black'}}>
                        {categoryName && <p style={{color: titleColor1, textAlign: 'left', fontSize: 12, fontWeight: 600}}>{'Type Category Description Here. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh euismod tincidunt'}</p>}
                    </div>
                </div>
                {/* </Col> */}
                    
                </Row>
            </div>
        )
    }
}

export default withTranslation()(CategorySelect);