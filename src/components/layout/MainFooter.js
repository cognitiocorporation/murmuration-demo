import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink, Tooltip } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright, linkStyle }) => (
  <footer className="main-footer d-flex p-4 px-3">
    <Container fluid={contained}>
      <Row>
        {/* <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <a style={linkStyle} rel="noopener noreferrer" href={item.to} target="_blank">{item.title}</a>
            </NavItem>
          ))}
        </Nav> */}
        <span className="copyright my-auto mr-2">{copyright}</span>
        <a id={"TooltipExampleFooter"}>hola</a>
        <span className="ml-auto">
        {menuItems.map((item, idx) => (
             <span  className="copyright my-auto mr-2">{item.title}</span>
        ))}
        
        <Tooltip
          open={false}
          target={"#TooltipExampleFooter"}
          // id={"TooltipExampleFooter"}
          toggle={() => {this.toggle()}}
          placement='left'
          >
          Type Category Description. Lorem ipsum dolor sit amet, consectetuer adipi- scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volut-!
        </Tooltip>
        </span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "© Murmuration 2022",
  menuItems: [
    // {
    //   title: '() FAQs',
    //   to: ''
    // },
    {
      title: 'Contact Customer Service',
      to: ''
    }
  ],
  linkStyle: {
    marginRight: 40,
  }
};

export default MainFooter;
