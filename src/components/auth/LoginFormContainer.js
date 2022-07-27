import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import {
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import Parse from 'parse';

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    var currentUser = Parse.User.current();
    
    this.state = {
      email: '',
      password:'',
      redirectToReffer: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    var currentUser = Parse.User.current();
    var redToReffer;

    if (currentUser) {
      redToReffer = true;
    } else {
      redToReffer = false;
    }

    this.setState({
      redirectToReffer: redToReffer
    });
  }

  emailChangeHandler = event => {
    this.setState({
      email: event.target.value
    });
  }

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  }

  needsPasswordChange() {
    const { password } = this.state;
    const validation = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16}/)
    
    return validation ? false:true
  }

  async handleFormSubmit() {
    // Form submission logic
    const needsPasswordChange = this.needsPasswordChange()
    
    if (needsPasswordChange) {
      alert("Please reset your password by pressing the 'Forgot your password?' button down below.")
    } else {
      try {
        const user = await Parse.User.logIn(String(this.state.email), String(this.state.password));
        const accountDisabled =  await this.getUserStatus(user.id)
        // Hooray! Lets use the app now.
        
      

        if (accountDisabled == false) {
          this.redToReffer = true;
          this.setState(() => ({
            redirectToReffer: this.redToReffer
          }))
        } else {
          Parse.User.logOut().then(() => {
            alert('You account has been disabled due to inactivity. Please reach out to a super user.')
          }).catch((error) => {
            alert(error)
          })
        }
        // this.redToReffer = true;
        // this.setState(() => ({
        //   redirectToReffer: this.redToReffer
        // }))
        
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    }
  }

  async getUserStatus(userId) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", userId);
    const results = await query.find();
    const myUser = results[0]

    console.log(results);
    // console.log(myUser.get("accountDisabled"))
    return myUser.get("accountDisabled")
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleFormSubmit();
    }
  }
  
  render() {

    const { redirectToReffer } = this.state
    var handleAuth =   this.props.handleAuth;
    if (redirectToReffer === true) {  
      handleAuth()
      return (
        <Redirect to="/"/>
      )
    }

    return (
      <Form>
        <FormGroup>
          <label htmlFor="loginInputEmail">User ID</label>
          <FormInput
            type="email"
            name="email"
            id="loginInputEmail"
            value={this.state.email}
            onChange={this.emailChangeHandler}
            placeholder="Enter email"
            autoComplete="email"
            onKeyDown={this.onKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="loginInputPassword">Password</label>
          <FormInput
            type="password"
            name="password"
            id="loginInputPassword"
            value={this.state.password}
            onChange={this.passwordChangeHandler}
            id="loginInputPassword"
            placeholder="Password"
            autoComplete="current-password"
            onKeyDown={this.onKeyDown}
          />
        </FormGroup>
        <Button onClick={this.handleFormSubmit}
          pill
          theme="accent"
          className="d-table mx-auto"
          type="button">
          Access Account
        </Button>
        <div className="mx-auto auth-form__meta mt-4" style={{textAlign: 'center'}}>
              <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </Form>
    );
  }
}

const Input = (props) => {
  return (  
<div className="form-group">
  <label htmlFor={props.name} className="form-label">{props.title}</label>
  <input
    className="form-input"
    id={props.name}
    name={props.name}
    type={props.type}
    value={props.value}
    onChange={props.handleChange}
    placeholder={props.placeholder} 
  />
</div>
)
}

export default withRouter(LoginFormContainer);
