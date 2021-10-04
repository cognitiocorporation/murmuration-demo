import React from "react";
import {withRouter} from 'react-router';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import Parse from 'parse';

var currUser;

class Notifications extends React.Component {
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

  render() {
    const {notificationCount, notificationMessages} = this.state;
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              {notificationCount == 0? '':notificationCount}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Progreso de Idea</span>
              <p>
                Su idea ha pasado al proximo nivel. {" "} Ha llegado al
                <span className="text-success text-semibold"> 50%</span> de terminacion.
              </p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Nueva Idea</span>
              <p>
                Hay una nueva idea para ser evaluada.{" "} Favor tomar
                <span className="text-danger text-semibold">accion</span>. 
              </p>
            </div>
          </DropdownItem> */}
          {/* <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem> */}
          {notificationMessages.length >0?notificationMessages.map((item, i) =>
            <DropdownItem onClick={() => this.props.history.push("/idea-management")} className="notification__all text-center">
                      {item}
                   </DropdownItem>
          ): <DropdownItem className="notification__all text-center">
          No new notifications.
        </DropdownItem> }

          {/* <DropdownItem className="notification__all text-center">
            No new notifications.
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(Notifications);