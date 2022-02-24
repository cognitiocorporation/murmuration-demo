import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import Parse from 'parse';
import { withTranslation } from 'react-i18next';
import PDF from '../../../../assets/HelpToolkit.pdf';



class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userName: '', 
      email: ''
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    let currUser = Parse.User.current();
    this.getUserName(currUser);
  }

  async getUserName(user) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", user.id);
    const results = await query.find();
    const firstName = results[0].get('firstName');
    const lastName = results[0].get('lastName');
    const fullName = firstName + ' ' + lastName;
    const email = results[0].get("username")
    console.log(email)
    this.setState({
      userName: fullName, 
      email: email
    });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logOut() {
    // console.log('Logout');
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
      // console.log(currentUser);
      this.props.history.push("/login");
    });
  }

  help() {
    // Open PDF
    window.open(PDF);
  }

  resetPassword() {
    var user = Parse.User.current();
    user.fetch().then((fetchedUser) => {
      var email = fetchedUser.getUsername();
      const newPassword = prompt('Enter your new password:')
      fetchedUser.set("password", newPassword)
      fetchedUser.save().then(() => {
        alert('Success.')
      });
    }, function(error){
        //Handle the error
        console.log('Error getting email.')
    });
    // console.log(email)
    // Parse.User.requestPasswordReset(email).then((succ, error) => {
    //   if (error) {
    //     console.log('Error...')
    //   } else {
    //     console.log('Success!')
    //   }
    // })
    // console.log('Logout');
    // Parse.User.logOut().then(() => {
    //   var currentUser = Parse.User.current();  // this will now be null
    //   // console.log(currentUser);
    //   this.props.history.push("/login");
    // });
  }

  render() {
    const { userName } = this.state;
    const { t } = this.props;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/user.png")}
            alt="User Avatar"
          />{" "}
          {/* <span className="d-none d-md-inline-block">{userName}</span> */}
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem className="text-success" onClick={this.resetPassword}>
            <i className="material-icons text-success">redo</i> {t('RESET_PASSWORD')}
          </DropdownItem>
          <DropdownItem className="text-warning" onClick={() => this.help()}>
            <i className="material-icons text-warning">help</i> {t('HELP')}
          </DropdownItem>
          <DropdownItem className="text-danger" onClick={this.logOut}>
            <i className="material-icons text-danger">&#xE879;</i> {t('LOGOUT')}
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default withTranslation() (withRouter(UserActions));