import React from "react";
import {withRouter} from 'react-router';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import Parse from 'parse';
import i18next from 'i18next';

var currUser;

class Languages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notificationCount: 0,
      notificationMessages: []
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  componentWillMount() {
    currUser = Parse.User.current();
    this.getNotifications(currUser);
  }

  async getNotifications(user) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", user.id);
    const results = await query.find();
    const count = results[0].get('notificationCount');
    const messages = results[0].get("notificationMessages");
    this.setState({
      notificationCount: count,
      notificationMessages: messages
    });
  }

  async resetCount(user) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", user.id);
    const results = await query.find();
    const currUser = results[0];

    currUser.set("notificationCount", 0);
    currUser.set("notificationMessages", []);
    await currUser.save().catch(error => {
      // This will error, since the Parse.User is not authenticated
    }).then(() => 
      this.setState({
        notificationCount: '',
      })
    );
  }

  toggleNotifications() {
    if (this.state.visible) {
      this.removeMessages();
    }
    this.setState({
      visible: !this.state.visible,
    });
    this.resetCount(currUser);
  }

  removeMessages() {
    this.setState({
      notificationMessages: [],
    })
  }

  changeLanguage() {
    console.log('CHANGING LANGUAGE')
    console.log(i18next.language)
    // window.confirm("Warning! The page will be reloaded and you will lose any unsaved data.")
    // window.confirm('Are you sure you wish to delete this item?') ? this.onConfirm("english") : ''
    if (window.confirm('Warning! The page will be reloaded and you will lose any unsaved data.')) this.onConfirm('english')
    // localStorage.setItem('language', 'en')
    // window.location.reload();
    // console.log(i18next.language)
  }

  onConfirm(lang){
    if (lang == 'english') {
      localStorage.setItem('language', 'en')
      window.location.reload();
    } else {
       localStorage.setItem('language', 'es')
       window.location.reload();
    }
  }

  checkLanguageSpanish() {
    console.log('CHECKING LANGUAGE')
    console.log(i18next.language)
    if (window.confirm('Warning! The page will be reloaded and you will lose any unsaved data.')) this.onConfirm('spanish')
    // localStorage.setItem('language', 'es')
    // window.location.reload();
    console.log(i18next.language)
    // console.log(i18next.language)
  }

  render() {
    const {notificationCount, notificationMessages} = this.state;
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">emoji_flags</i>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          
          
            <DropdownItem onClick={() => this.changeLanguage()} className="notification__all text-center">
                English 🇺🇸
            </DropdownItem>
            <DropdownItem onClick={() => this.checkLanguageSpanish()} className="notification__all text-center">
                Español 🇪🇸
            </DropdownItem> 

          {/* <DropdownItem className="notification__all text-center">
            No new notifications.
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(Languages);