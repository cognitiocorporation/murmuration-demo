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
import clockImage from "../../images/stopwatch.svg"
import handImage from "../../images/hand.svg"
import chartImage from "../../images/line-chart.svg"
import shieldImage from "../../images/shield.svg"

// Selected
import clockImageSelected from "../../images/stopwatch_blue.svg"
import handImageSelected from "../../images/hand_blue.svg"
import chartImageSelected from "../../images/line-chart_blue.svg"
import shieldImageSelected from "../../images/shield_blue.svg"

// Defult
import { ReactComponent as PuzzleImage } from "../../images/puzzle.svg"
import { ReactComponent as GearsImage } from "../../images/gears.svg"

// Selected
import puzzleImageSelected from "../../images/puzzle_blue.svg"
import gearsImageSelected from "../../images/gears_blue.svg"

import { useTranslation, initReactI18next, withTranslation } from "react-i18next";

const selectedColor = '#FD902c';//'#ff9012';
const blueColor = '#3A7BBB'
const orangeColor = '#FD902c'
const greenColor = '#7FA86F'
const goldColor = '#DDB153'

class IdeaFilterSelect extends React.Component {

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
            handIcon: 'black',
            shieldIcon: 'black',
            chartIcon: 'black',
            clockIcon: 'black',
            puzzleIcon: blueColor,
            gearIcon: greenColor,
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
                puzzleIcon: 'black',
                gearIcon: selectedColor,
                titleColor1: selectedColor,
                titleColor2: 'black',
            })
            this.props.setFilter('innovacion');
        } else if (selectionValue === 2){
            this.setState({
                selectionValue: 'Calidad', 
                sq1Color: '',
                sq2Color: selectedColor,
                puzzleIcon: selectedColor,
                gearIcon: 'black',
                titleColor1: 'black',
                titleColor2: selectedColor,
            })
             this.props.setFilter('solucion');
        } 
    }

    render() {
        const { sq1Color, sq2Color, sq3Color, sq4Color, handIcon, gearIcon, puzzleIcon, shieldIcon, chartIcon, clockIcon, titleColor1, titleColor2, titleColor3, titleColor4, showAction, showProductivity, showQuality, showSecurity } = this.state
        const {t} = this.props;
        return(
            <div className="container">
                <div className="row no-gutters">
                    <div className="col my-auto">
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(1)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={gearIcon} /> */}
                            <GearsImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, minHeight: 80, maxHeight: 80,fill: gearIcon}}/>
                            <span><h5 className="text-center" style={{color: titleColor1}}>{t("IDEA_INNOVATION")}</h5></span>
                        </div>
                    </div>
                    <div className="col my-auto">
                        <div className="square"  onClick={(event) => { this.changeSelectedValue(2)}}>
                            {/* <img className="mx-auto d-block" style={{minWidth: 80, maxWidth:80}} src={puzzleIcon} /> */}
                            <PuzzleImage className="mx-auto d-block" style={{minWidth: 80, maxWidth:80, minHeight: 80, maxHeight: 80,fill: puzzleIcon}}/>
                            <span><h5 className="text-center" style={{color: titleColor2}}>{t("IDEA_PROBLEM")}</h5></span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withTranslation()(IdeaFilterSelect);