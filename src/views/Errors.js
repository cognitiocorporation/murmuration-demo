import React from "react";
import { Container, Button } from "shards-react";
import { Redirect, withRouter } from 'react-router-dom';

const Errors = withRouter(({ history }) => (
  
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Something went wrong!</h3>
        <p>The requested URL was not found on this server.</p>
        <Button onClick={() => history.push('/login')} pill>&larr; Go Back</Button>
      </div>
    </div>
  </Container>
));

export default Errors;
