import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
          style={{ height: "120px" }}
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px", height: "120px" }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "120px" }}
                src={'https://goswiftmedia.com/wp-content/uploads/2021/04/Untitled-design-1.png'}//"https://seeklogo.com/images/B/Bacardi-logo-DD0961793C-seeklogo.com.png"//"https://6erxg60qvo1qvjha44jrgpan-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/Teva_logo.svg_.png"//{require("../../../images/shards-dashboards-logo.svg")}
                alt="Shards Dashboard"
              />
              {/* {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                  CLIENT LOGO
                </span>
              )} */}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
