import React from "react";
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

// import Parse from 'parse';
// var GameScore = Parse.Object.extend("GameScore");
// var query = new Parse.Query(GameScore);
// query.get("xWMyZ4YEGZ")
// .then((gameScore) => {
//   // The object was retrieved successfully.
// }, (error) => {
//   // The object was not retrieved successfully.
//   // error is a Parse.Error with an error code and message.
// });

const Departments = ({ title }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
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
            <FormInput placeholder="Nuevo Department Spanish" />
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

Departments.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Departments.defaultProps = {
  title: "Departamentos"
};

export default Departments;
