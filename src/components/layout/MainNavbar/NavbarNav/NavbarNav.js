import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import Languages from "./Languages";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Languages/>
    {/* <Notifications /> */}
    <UserActions />
  </Nav>
);
