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

import "./LocalStyles/CategorySelectStyle.css"

// Defult
import { ReactComponent as CheckmarkImage } from '../../images/tick.svg';
import { ReactComponent as HelpImage } from "../../images/help.svg"
import { ReactComponent as SpeedImage } from "../../images/speed.svg"
import { ReactComponent as WhiteboardImage } from "../../images/whiteboard.svg"
import { ReactComponent as CommiteeImage } from "../../images/commitee.svg"
import { ReactComponent as MinusImage } from "../../images/minus.svg"
import { withTranslation } from 'react-i18next';

// fill="#157ffb"

// Selected
import clockImageSelected from "../../images/stopwatch_blue.svg"
import handImageSelected from "../../images/hand_blue.svg"
import chartImageSelected from "../../images/line-chart_blue.svg"
import shieldImageSelected from "../../images/shield_blue.svg"




const selectedColor = '#157ffb';//'#ff9012';
const orangeColor = '#ff9012';

class EvaluationSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectionValue: '',
            sq1Color: '',
            sq2Color: '',
            sq3Color: '',
            sq4Color: '',
            titleColor1: 'black',
            titleColor2: 'black',
            titleColor3: 'black',
            titleColor4: 'black',
            titleColor5: 'black',
            titleColor6: 'black',
            handIcon: 'black',
            shieldIcon: 'black',
            chartIcon: 'black',
            clockIcon: 'black',
            minusIcon: 'black',
            commiteeIcon: 'black',
            data:[],
            showSecurity:'',
            showQuality:'',
            showProductivity:'',
            showAction:'',
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

    changeSelectedValue(selectionValue) {
        if (selectionValue === 1) {
            this.setState({
                selectionValue: 'Seguridad', 
                sq1Color: selectedColor,
                sq2Color: '',
                sq3Color: '',
                sq4Color: '',
                sq5Color: '',
                sq6Color: '',
                handIcon: selectedColor,
                shieldIcon: 'black',
                chartIcon: 'black',
                clockIcon: 'black',
                titleColor1: selectedColor,
                titleColor2: 'black',
                titleColor3: 'black',
                titleColor4: 'black',
                titleColor5: 'black',
                titleColor6: 'black'
            })
            this.props.setCategory('Ejecutar');
        } else if (selectionValue === 2){
            this.setState({
                selectionValue: 'Calidad', 
                sq1Color: '',
                sq2Color: selectedColor,
                sq3Color: '',
                sq4Color: '',
                sq5Color: '',
                sq6Color: '',
                handIcon: 'black',
                shieldIcon: selectedColor,
                chartIcon: 'black',
                clockIcon: 'black',
                titleColor1: 'black',
                titleColor2: selectedColor,
                titleColor3: 'black',
                titleColor4: 'black',
                titleColor5: 'black',
                titleColor6: 'black'
            })
            this.props.setCategory('Devuelta');
        } else if (selectionValue === 3) {
            this.setState({
                selectionValue: 'Productividad', 
                sq1Color: '',
                sq2Color: '',
                sq3Color: selectedColor,
                sq4Color: '',
                sq5Color: '',
                sq6Color: '',
                handIcon: 'black',
                shieldIcon: 'black',
                chartIcon: selectedColor,
                clockIcon: 'black',
                titleColor1: 'black',
                titleColor2: 'black',
                titleColor3: selectedColor,
                titleColor4: 'black',
                titleColor5: 'black',
                titleColor6: 'black'
            })
            this.props.setCategory('Espera');
        } else if (selectionValue === 4){
            this.setState({
                selectionValue: 'Accion Inmediata', 
                sq1Color: '',
                sq2Color: '',
                sq3Color: '',
                sq4Color: selectedColor,
                sq5Color: '',
                sq6Color: '',
                handIcon: 'black',
                shieldIcon: 'black',
                chartIcon: 'black',
                clockIcon: selectedColor,
                titleColor1: 'black',
                titleColor2: 'black',
                titleColor3: 'black',
                titleColor4: selectedColor,
                titleColor5: 'black',
                titleColor6: 'black'
            })
            this.props.setCategory('Proyecto');
        } else if (selectionValue === 5){
            this.setState({
                selectionValue: 'No Perseguido', 
                sq1Color: '',
                sq2Color: '',
                sq3Color: '',
                sq4Color: '',
                sq5Color: selectedColor,
                sq6Color: '',
                handIcon: 'black',
                shieldIcon: 'black',
                chartIcon: 'black',
                clockIcon: 'black',
                minusIcon: selectedColor,
                commiteeIcon: 'black',
                titleColor1: 'black',
                titleColor2: 'black',
                titleColor3: 'black',
                titleColor4: 'black',
                titleColor5: selectedColor,
                titleColor6: 'black'
            })
            this.props.setCategory('No Perseguido');
        } else {
            this.setState({
                selectionValue: 'Otro Comite', 
                sq1Color: '',
                sq2Color: '',
                sq3Color: '',
                sq4Color: '',
                sq5Color: '',
                sq6Color: selectedColor,
                handIcon: 'black',
                shieldIcon: 'black',
                chartIcon: 'black',
                clockIcon: 'black',
                minusIcon: 'black',
                commiteeIcon: selectedColor,
                titleColor1: 'black',
                titleColor2: 'black',
                titleColor3: 'black',
                titleColor4: 'black',
                titleColor5: 'black',
                titleColor6: selectedColor
            })
            this.props.setCategory('Otro');
        }
    }

    render() {
        const { sq1Color, sq2Color, sq3Color, sq4Color, handIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, titleColor5, titleColor6, showAction, showProductivity, showQuality, showSecurity } = this.state
        const {t} = this.props;
        return(
            <div className="container">
                <div className="row no-gutters">
                    <div className="col my-auto" style={{color: orangeColor}} hidden={!showQuality}>
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(2)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={shieldIcon} /> */}
                            <HelpImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60, maxHeight: 60, fill: titleColor2}}/>
        <span><h6 className="text-center" style={{color: titleColor2}}>{t("NEEDS_INFO_IDEA")}</h6></span>
                        </div>
                    </div>
                    <div className="col my-auto" >
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(3)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={chartIcon} /> */}
                            <SpeedImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60,fill: titleColor3}}/>
                            <span><h6 className="text-center" style={{color: titleColor3}}>{t("HOLD_IDEA")}</h6></span>
                        </div>
                    </div>
                    <div className="col my-auto" >
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(5)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={chartIcon} /> */}
                            <MinusImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60,fill: titleColor5}}/>
                            <span><h6 className="text-center" style={{color: titleColor5}}>{t("NOT_PURSUED_IDEA")}</h6></span>
                        </div>
                    </div>
                    <div className="col my-auto" >
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(1)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80,fill: '#32CD32'}} src={handIcon} /> */}
                            <CheckmarkImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60,fill: titleColor1}}/>
                            <span><h6 className="text-center" style={{color: titleColor1}}>{t("JUST_DO_IDEA")}</h6></span>
                        </div>
                    </div>
                    <div className="col my-auto" >
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(4)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={clockIcon} /> */}
                            <WhiteboardImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60, maxHeight: 60,fill: titleColor4}}/>
                            <span><h6 className="text-center" style={{color: titleColor4}}>{t("PROYECT_IDEA")}</h6></span>
                        </div>
                    </div>
                    <div className="col my-auto" >
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(6)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={clockIcon} /> */}
                            <CommiteeImage className="mx-auto d-block" style={{minWidth: 60, maxWidth:60, maxHeight: 60,fill: titleColor6}}/>
                            <span><h6 className="text-center" style={{color: titleColor6}}>{t("OTHER_COMMITTEE_IDEA")}</h6></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(EvaluationSelect);