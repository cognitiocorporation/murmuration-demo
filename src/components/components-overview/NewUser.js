import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormTextarea,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Button
} from "shards-react";
import Parse from 'parse';
import { useTranslation, initReactI18next, withTranslation } from "react-i18next";
import {users} from './UserList'

class NewUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      required: false,
      firstName: '',
      lastName: '',
      email: '',
      role:'',
      department:'',
      userId:''
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleUserDeparmentChange = this.handleHandleUserDepartmentChange.bind(this);
  }

  componentDidMount() {
    this.fetchNewData();
  }

  fetchNewData() {
    const className = "IdeaDepartment";

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

  handleUserTypeChange(event) {
    var myRole = event.target.value

    if (myRole === 'coach') {
        myRole = 'user ' + myRole
    }


    this.setState({role: myRole});
  }

  handleUserDepartmentChange(event) {
    var department = event.target.value
    // console.log(myRole)

    this.setState({department: department});
  }

  handleRequiredChange(event) {
    console.log(event.target.value);
    this.setState({required: !this.state.required});
    // this.setState({value: this.props.value});
  }

  handleChange(e) {
    this.setState({required: !this.state.required});
  }

  handleFirstNameTextChange(event) {
    console.log(event.target.value);
    this.setState({firstName: event.target.value});
    // this.setState({value: this.props.value});
  }

  handleLastNameTextChange(event) {
    console.log(event.target.value);
    this.setState({lastName: event.target.value});
    // this.setState({value: this.props.value});
  }

  handleEmailTextChange(event) {
    console.log(event.target.value);
    this.setState({email: event.target.value});
    // this.setState({value: this.props.value});
  }

  handleUserIdTextChange(event) {
    console.log(event.target.value);
    this.setState({userId: event.target.value});
    // this.setState({value: this.props.value});
  }

  resetForm() {
    this.setState({
      required: false,
      questionText: '',
      category: 'Todas',
    });
  }

  async handleSubmit(event) {
    const {questionText, questionTextSpanish, firstName, lastName, email, role, department, userId} = this.state;

    var sessionToken = Parse.User.current().getSessionToken();
    var user = new Parse.User();

    if (firstName == '' || lastName == '' || email == '' || role == '' || department == '' || userId == '') {
      alert('Please enter all required information.');
    } else {
        user.set("username", userId);
        user.set("password", firstName + lastName + "123");
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("evaluationCriteria", [])
        user.set("email", email);
        user.set("role", role)
        user.set("department", department)
        user.set("notificationCount", 0)
        user.set("notificationMessages", [])

        try {
            await user.signUp();
            Parse.User.become(sessionToken);
            // Hooray! Let them use the app now.
            alert('¡La operacion fue exitosa!');
          } catch (error) {
            // Show the error message somewhere and let the user try again.
            alert('Hubo un error en la operacion: ' + error.message);
          }
      
    //   newItem.save()
    //   .then((item) => {
    //   // Execute any logic that should take place after the object is saved.
    //     this.resetForm()
    //     alert('¡La operacion fue exitosa!');
    //   }, (error) => {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Hubo un error en la operacion: ' + error.message);
    //   });
    }
  }

  async handleSubmitPre(event) {
    // const {questionText, questionTextSpanish, firstName, lastName, email, role, department} = this.state;

    var sessionToken = Parse.User.current().getSessionToken();
    
    users.map(async (lUser) => {
      const isCoach = lUser.Coach == 'X'
      const isSuperUser = lUser["Super User"] == 'X'
      var user = new Parse.User();
      user.set("username", lUser.username);
      user.set("password", lUser.username + "123");
      user.set("firstName", lUser.firstName);
      user.set("lastName", lUser.lastName);
      user.set("evaluationCriteria", [])
      user.set("email", lUser.email);
      user.set("role", isSuperUser?'super_user':'user')
      user.set("coach", isCoach)
      user.set("department", lUser.department)
      user.set("notificationCount", 0)
      user.set("notificationMessages", [])

      await user.signUp();
      Parse.User.become(sessionToken);
    })

    // if (firstName == '' || lastName == '' || email == '' || role == '' || department == '') {
    //   alert('Please enter all required information.');
    // } else {
    //     user.set("username", email);
    //     user.set("password", firstName + lastName + "123");
    //     user.set("firstName", firstName);
    //     user.set("lastName", lastName);
    //     user.set("evaluationCriteria", [])
    //     user.set("email", email);
    //     user.set("role", role)
    //     user.set("department", department)
    //     user.set("notificationCount", 0)
    //     user.set("notificationMessages", [])

    //     try {
    //         await user.signUp();
    //         Parse.User.become(sessionToken);
    //         // Hooray! Let them use the app now.
    //         alert('¡La operacion fue exitosa!');
    //       } catch (error) {
    //         // Show the error message somewhere and let the user try again.
    //         alert('Hubo un error en la operacion: ' + error.message);
    //       }
      
    //   newItem.save()
    //   .then((item) => {
    //   // Execute any logic that should take place after the object is saved.
    //     this.resetForm()
    //     alert('¡La operacion fue exitosa!');
    //   }, (error) => {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Hubo un error en la operacion: ' + error.message);
    //   });
  }

  render() {
    const { required, questionText, questionTextSpanish, category, data, email, lastName, firstName, department, userId } = this.state;
    const {t} = this.props
    return(
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('NEW_USER')}</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputAddress2">{t('ENTER_NAME')}</label>
                            <FormTextarea value={firstName} onChange={this.handleFirstNameTextChange.bind(this)}
                                id="feInputAddress2"
                                placeholder={t('FIRST_NAME_PLACEHOLDER')}
                            />
                        </Col>
                        <Col md="6" className="form-group">
                            <label htmlFor="feInputAddress2">{t('ENTER_LAST_NAME')}</label>
                            <FormTextarea value={lastName} onChange={this.handleLastNameTextChange.bind(this)}
                                id="feInputAddress2"
                                placeholder={t('LAST_NAME_PLACEHOLDER')}
                            />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputAddress2">{'EMAIL'}</label>
                          <FormTextarea value={email} onChange={this.handleEmailTextChange.bind(this)}
                              id="feInputAddress2"
                              placeholder={t('EMAIL_PLACEHOLDER')}
                            />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputAddress2">{'USERID'}</label>
                          <FormTextarea value={userId} onChange={this.handleUserIdTextChange.bind(this)}
                              id="feInputAddress2"
                              placeholder={t('USERID_PLACEHOLDER')}
                            />
                        </Col>
                    </Row>
                    {/* <br></br> */}
                  
                  </FormGroup>

                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feInputAddress2">{'DEPARTMENT'}</label>
                      <FormSelect id="feInputState" onChange={this.handleUserDepartmentChange.bind(this)} value={department}>
                        {data.map((department, i) => {
                          return <option>{department.get('itemName')}</option>
                        } )}
                        {/*  */}
                      </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="feInputState">{t('USER_TYPE')}</label>
                      <FormSelect id="feInputState" onChange={this.handleUserTypeChange.bind(this)} value={category}>
                        <option>user</option>
                        <option>super_user</option>
                        <option>coach</option>
                      </FormSelect>
                    </Col>
                  </Row>
                  <Button onClick={e => this.handleSubmit(e)}>{t('ADD_USER_BTN')}</Button>
                </Form>
                {/* <div>
                  <br></br>
                <Button outline theme="light" onClick={e => this.handleSubmitPre(e)}>PRE-LOAD</Button>
                </div> */}
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
    )
  }
}

export default withTranslation()(NewUser);