import React, { Component } from "react";
import PropTypes from "prop-types";
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
  FormInput
} from "shards-react";
import Parse from 'parse';




// var IdeaCategory = Parse.Object.extend("IdeaCategory");
// var query = new Parse.Query(IdeaCategory);
// console.log('HEY');
// query.get("bD4NRtUH6S")
// .then((category) => {
//   // The object was retrieved successfully.
//   console.log(category.categoryName);
// }, (error) => {
//     console.log(error);
//   // The object was not retrieved successfully.
//   // error is a Parse.Error with an error code and message.
// });

class IdeaCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title:'Categorias',
        }

        var IdeaCategory = Parse.Object.extend("IdeaCategory");
        var query = new Parse.Query(IdeaCategory);
        
        const title = this.state.title;
      }
      render() {
          return(
            <Card small className="mb-3">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{this.title}</h6>
            </CardHeader>
            <CardBody className="p-0">
              <ListGroup flush>
                <ListGroupItem className="px-3 pb-2">
                  <FormCheckbox className="mb-1" value="uncategorized" defaultChecked>
                    Uncategorized
                  </FormCheckbox>
                  <FormCheckbox className="mb-1" value="design" defaultChecked>
                    Design
                  </FormCheckbox>
                  <FormCheckbox className="mb-1" value="development">
                    Development
                  </FormCheckbox>
                  <FormCheckbox className="mb-1" value="writing">
                    Writing
                  </FormCheckbox>
                  <FormCheckbox className="mb-1" value="books">
                    Books
                  </FormCheckbox>
                </ListGroupItem>
        
                <ListGroupItem className="d-flex px-3">
                  <InputGroup className="ml-auto">
                    <FormInput placeholder="Nueva Categoria" />
                    <InputGroupAddon type="append">
                      <Button theme="white" className="px-2">
                        <i className="material-icons">add</i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
            
            );
      }
}

// IdeaCategories.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string
// };

IdeaCategories.defaultProps = {
  title: "Categorias"
};

export default IdeaCategories;
