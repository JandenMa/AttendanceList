import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default class List extends Component {
  render() {
    return (
      <div>
        <AppBar color="default" position="fixed">
          <Toolbar>
            <Typography variant="h5" color="inherit" noWrap>
              Attendance List
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
