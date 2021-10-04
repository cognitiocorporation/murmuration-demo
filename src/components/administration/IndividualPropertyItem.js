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
  InputGroupText,
  FormCheckbox,
  FormInput,
  ButtonGroup,
} from "shards-react";
import Parse from 'parse';

class IndividualPropertyItem extends Component {
    
    constructor(props) {
        super(props);

      }

      render() {
          return(
              
            <ButtonGroup className="d-table ml-auto">
            <Button size="sm" theme="white">
                Delete
            </Button>
            </ButtonGroup>
            
            );
      }
}

export default IndividualPropertyItem;
