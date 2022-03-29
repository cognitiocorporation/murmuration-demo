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
import { ReactComponent as UserImage } from "../../images/user.svg"
import { ReactComponent as GearsImage } from "../../images/gears.svg"

// Selected
import puzzleImageSelected from "../../images/puzzle_blue.svg"
import gearsImageSelected from "../../images/gears_blue.svg"
import { withTranslation } from 'react-i18next';

import Select from 'react-select';

const selectedColor = '#157ffb';//'#ff9012';

class ExecutionSelectNew extends React.Component {

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
            puzzleIcon: 'black',
            gearIcon: 'black',
            data:[],
            showSecurity:'',
            showQuality:'',
            showProductivity:'',
            showAction:'',
            selectedPerson:this.props.selectedVal,
          }
          this.fetchCategoryData = this.fetchCategoryData.bind(this);
          this.handleSelectedPersonChange = this.handleSelectedPersonChange.bind(this);
    }

    componentDidMount() {
        this.fetchCategoryData();
    }

    fetchCategoryData() {
        const className = "User";
  
        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);
        query.limit(1000)
        query.ascending("firstName").find()
        .then((results) => {
            const options = []
            var coaches = []
            {
                results.map((result, idx) => options.push({"value":result, "label":this.getFullName(result)}))
                var myCoaches = results.filter((result) => {return result.get("coach") == true})
                myCoaches.map((result, idx) => coaches.push({"value":result, "label":this.getFullName(result)}))
            }
            
            this.setState({
                data: results, 
                coaches: coaches,
                options: options
            });
            // this.props.setResponsible(results[0], -1);
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

    handleSelectedPersonChange(event) {
        const {data} = this.state;
        // const idx = event.target.value;
        console.log(event)
        this.props.setResponsible(event, 0);
    }

    getFullName(result) {
        if (result) {
            return result.get("firstName") + ' ' + result.get("lastName");
        }
    }

    render() {
        const { selectedPerson, data, options, coaches } = this.state;
        const { selectedVal, t } = this.props;
        console.log(selectedVal)
        return(
            
               
                    this.props.evalType=="execution"?
                        // <FormSelect id="feInputState" onChange={this.handleSelectedPersonChange} value={selectedVal}>
                        //     {data.map((result, idx) =>
                        //         <option value={idx}>{this.getFullName(result)}</option>
                        //     )}
                        // </FormSelect>
                                <div  style={{width: '100%'}}>
                                    <Select
                                        value={selectedVal}
                                        onChange={this.handleSelectedPersonChange}
                                        options={options}
                                        placeholder={'Choose employee'}
                                        clearable={false}
                                    />
                                </div>
                                
                           
                        :
                        
                        <div  style={{minWidth: 250}}>
                            <Select
                                value={selectedVal}
                                onChange={this.handleSelectedPersonChange}
                                options={coaches}
                                placeholder={'No Coach'}
                            />
                        </div>
                    
                    
        )
    }
}

export default withTranslation()(ExecutionSelectNew);

const myStyles = {
    container: {
        marginRight: 10,
        marginLeft: 10
    }
  }