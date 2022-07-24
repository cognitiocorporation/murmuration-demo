import React, { Component } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  Container,
  Col,
  Row,
  FormInput
} from "shards-react";
import Parse from 'parse';
import { withTranslation } from "react-i18next";

const storageLanguage =  localStorage.getItem('language') != null?localStorage.getItem('language'):'en';

class PropertyManager extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            /* initial state */ 
            data:[],
            newItem:'',
            newItemSpanish:'',
            newCat:'',
            newCatSpanish:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleChangeSpanish = this.handleChangeSpanish.bind(this);
        this.handleCatChangeSpanish = this.handleCatChangeSpanish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
      }

      handleChange(event) {
        this.setState({newItem: event.target.value});
      }

      handleChangeSpanish(event) {
        this.setState({newItemSpanish: event.target.value});
      }

      handleCatChange(event) {
        this.setState({newCat: event.target.value});
      }

      handleCatChangeSpanish(event) {
        this.setState({newCatSpanish: event.target.value});
      }

      componentDidMount() {
        this.fetchNewData();
      }

      fetchNewData() {
        const className = this.props.className;

        var ItemClass = Parse.Object.extend(className);
        var query = new Parse.Query(ItemClass);

        query.find()
        .then((results) => {
          console.log('RESULTS: ' + results);
            this.setState({
                data: results
            });
        }, (error) => {
            this.setState({
                data: []
            });
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
        });
      }

      handleSubmit(event) {
        const className = this.props.className;
        const PropertyItem = Parse.Object.extend(className);
        const newItem= new PropertyItem();
        
        newItem.set("itemName", this.state.newItem);
        newItem.set("itemNameTrans", {"en":this.state.newItem,"es":this.state.newItemSpanish})

        if (className == "IdeaCategory") {
          newItem.set("show", false);
        }
        
        newItem.save()
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          this.fetchNewData();
          alert('¡La operacion fue exitosa!');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }

      handleCategorySubmit(event) {
        const className = this.props.className;
        const PropertyItem = Parse.Object.extend(className);
        const newItem= new PropertyItem();
        
        newItem.set("itemName", this.state.newCatSpanish);
        newItem.set("extra", true);
        newItem.set("itemNameTrans", {"en":this.state.newCat,"es":this.state.newCatSpanish})

        // if (className == "IdeaCategory") {
        //   newItem.set("show", false);
        // }
        
        newItem.save()
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          this.fetchNewData();
          alert('¡La operacion fue exitosa!');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }

      handleToggle(item) {
        const className = this.props.className;
        console.log('clicked');
        if (className == "IdeaCategory" || className == "IdeaDepartment") {
          console.log(item);
          const isShowing = item.get("show");
          item.set("show", !isShowing);
          item.save().then((item) => {
            // Now let's update it with some new data. In this case, only cheatMode and score
            // will get sent to the cloud. playerName hasn't changed.
            this.fetchNewData();
          });
        } 
      }

      deleteItem(item) {
        item.destroy({})
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          this.fetchNewData();
          alert('¡La operacion fue exitosa!');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }
      render() {
        const {t} = this.props
          return(
            <Card small className="mb-3">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{this.props.title}</h6>
            </CardHeader>
            <CardBody className="p-0">
              <ListGroup flush>
              <ListGroupItem className="p-3"> 
                    { this.state.data.map((item, idx) => (
                     
                     <span className="d-flex mb-2">
                        <FormCheckbox onChange={e => this.handleToggle(item)} className="mb-1" checked={item.get("show")} key={idx}> 
                          {this.props.className == "IdeaCategory"?(item.get("itemNameTrans")[storageLanguage]):item.get("itemName")}
                        </FormCheckbox>
                        { this.props.className == "IdeaDepartment" && 
                          <a danger className="ml-auto" onClick={e => this.deleteItem(item)}>
                            X
                          </a>

                          
                        }
                        { item.get("extra") == true &&
                          <a danger className="ml-auto" onClick={e => this.deleteItem(item)}>
                            X
                          </a>
                        }
                     </span>
                   
                    ))}
                    </ListGroupItem>
                { this.props.className == "IdeaDepartment" &&
                <ListGroupItem className="d-flex px-3">
                  <InputGroup className="ml-auto">
                    <FormInput value={this.state.value} onChange={this.handleChange} placeholder={t('ENGLISH')} />
                    <FormInput value={this.state.value} onChange={this.handleChangeSpanish} placeholder={t('SPANISH')} />
                    <InputGroupAddon type="append">
                      <Button onClick={e => this.handleSubmit(e)} theme="white" className="px-2">
                        <i className="material-icons">add</i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </ListGroupItem>
                }
                { this.props.className == "IdeaCategory" && this.state.data.length < 6 &&
                <ListGroupItem className="d-flex px-3">
                  <InputGroup className="ml-auto">
                    <FormInput value={this.state.value} onChange={this.handleCatChange} placeholder={t('ENGLISH')} />
                    <FormInput value={this.state.value} onChange={this.handleCatChangeSpanish} placeholder={t('SPANISH')} />
                    <InputGroupAddon type="append">
                      <Button onClick={e => this.handleCategorySubmit(e)} theme="white" className="px-2">
                        <i className="material-icons">add</i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </ListGroupItem>
                }
              </ListGroup>
            </CardBody>
          </Card>
            
            );
      }
}


PropertyManager.defaultProps = {
  title: "Categorias"
};

export default withTranslation()(PropertyManager);
