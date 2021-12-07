import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";
import Parse from 'parse';
import { withTranslation } from 'react-i18next';

class SidebarNavItems extends React.Component {

  constructor(props) {
    super(props)
    const {t} = this.props;
    this.state = {
      navItems: Store.getSidebarItems(),
      type: ''
    };
    
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
    // this.getCommittees()
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  getCommittees() {
    const EvaluationComm= Parse.Object.extend("EvaluationCommittee");
    const query = new Parse.Query(EvaluationComm);
    var comittees = []
    const currentUser = Parse.User.current();
    query.find().then((results) => {
      // Now each result will have all fields except `playerName`
      console.log('comites')
      console.log(results)
      if (results.length > 0) {
        results.map((committee) => {
          const objId = currentUser.get("committees");
          console.log(objId)
          if (committee.objectId = objId) {
            console.log(committee)
          }
        })
        this.setState({type: 'super_user'})
      } else {
        this.setState({type: 'user'})
      }
    });
  }

  render() {
    const { navItems: items } = this.state;
    const { t, i18n } = this.props;

    const currentUser = Parse.User.current();
    var userType;
    if (currentUser) {
      // do stuff with the user
      userType = currentUser.get("role");
      console.log(userType)
    } else {
        // show the signup or login page
    }

    console.log(items)

    return (
      <div className="nav-wrapper">
        {items.map((nav, idx) => (
          <div key={idx}>
            <h6 className="main-sidebar__nav-title">{nav.title}</h6>
            {typeof nav.items !== "undefined" && nav.items.length && (
              <Nav className="nav--no-borders flex-column">
                {nav.items.map((item, idx) => {
                  // Type of user
                  if(item.roles.includes(userType)){
                    // Menu items depend on user type
                    return <SidebarNavItem key={idx} item={item} />
                  }
                })}
              </Nav>
            )}
          </div>
        ))}
        <div className="d-table m-auto">
          <br/>
          <small>powered by</small>
          <br/>
          <a href="http://www.mymurmuration.com/">
          
            <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1 ml-3"
                    style={{ maxWidth: "120px" }}
                    // src= {require("../../../images/logo_murmuration.png")}
                    src={'http://mymurmuration.theswiftstudio.com/wp-content/uploads/2021/11/Group-18.png'}
                    alt="Murmuration"
                  />
          </a>
        </div>
      </div>
    )
  }
}

export default withTranslation()(SidebarNavItems);
