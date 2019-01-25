import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Checkbox,
  TextField,
  Toolbar,
  Typography,
  Tooltip,
  Button
} from "@material-ui/core";
import Detail from "../Detail.component";
import { Config } from "../../config";
import "./index.css";

export default class List extends Component {
  state = {
    empData: [],
    attendData: [],
    dialog_open: false
  };

  columns = ["First Name", "Last Name", "Email", "Check In"];

  componentWillMount() {
    this.handleQuery();
  }

  handleQuery = key => {
    const eQuery = key
      ? `{
            getEmployees(key:"${key}"){
                id,firstName,lastName,email
            }
        }`
      : `{
            getEmployees{
                id,firstName,lastName,email
            }
        }`;
    const aQuery = `{
            getAttendLists(id:"A${moment().format("YYYYMMDD")}"){
                attendances
            }
        }`;
    const eurl = `${Config.server.host}:${Config.server.port}/employee`;
    const aurl = `${Config.server.host}:${Config.server.port}/attendList`;
    axios
      .post(eurl, { query: eQuery })
      .then(({ data }) => {
        let empData = data.data.getEmployees;
        axios.post(aurl, { query: aQuery }).then(({ data }) => {
          let attendData = [];
          if (data.data && data.data.getAttendLists[0]) {
            attendData = data.data.getAttendLists[0].attendances;
          }
          for (let i = 0, elen = empData.length; i < elen; i++) {
            let emp = empData[i];
            emp.check = false;
            for (let j = 0, alen = attendData.length; j < alen; j++) {
              let attend = attendData[j];
              if (attend === emp.id) {
                emp.check = true;
                break;
              }
            }
          }
          this.setState({
            attendData,
            empData,
            dialog_open: false
          });
        });
      })
      .catch(err => {
        throw err;
      });
  };

  handleAdd = () => {
    this.setState({
      dialog_open: true
    });
  };

  handleSearch = e => {
    this.handleQuery(e.target.value);
  };

  handleEmailChange = (eid, e) => {
    let val = e.target.value || "";
    const url = `${Config.server.host}:${Config.server.port}/employee`;
    const query = `mutation{
        saveEmployee(employee:{
            id: "${eid}",
            email: "${val}"
        }){
            id,firstName,lastName,email
        }
    }`;
    axios
      .post(url, { query })
      .then(({ data }) => {
        if (data.data && data.data.saveEmployee && data.data.saveEmployee.id) {
          let empData = this.state.empData.map(emp => {
            if (eid === emp.id) {
              emp.email = val;
            }
            return emp;
          });
          this.setState({ empData });
        }
      })
      .catch(err => {
        throw err;
      });
  };

  handleChkChange = (eid, e) => {
    const val = e.target.checked;
    let { attendData, empData } = this.state;
    if (val) {
      let isRepeat = false;
      attendData.forEach(id => {
        if (eid === id) {
          isRepeat = true;
          return false;
        }
      });
      if (!isRepeat) {
        attendData.push(eid);
      }
    } else {
      attendData.forEach((id, index) => {
        if (eid === id) {
          attendData.splice(index, 1);
        }
      });
    }
    empData.forEach(emp => {
      if (emp.id === eid) {
        emp.check = val;
      }
    });
    const url = `${Config.server.host}:${Config.server.port}/attendList`;
    const query = `mutation{
        saveAttendList(attendList:{
            attendances: [${attendData.map(attend => {
              return `"${attend}"`;
            })}]
        }){
            id,attendances
        }
    }`;
    axios
      .post(url, { query })
      .catch(err => {
        throw err;
      })
      .then(({ data }) => {
        if (data && data.data && data.data.saveAttendList) {
          this.setState({ attendData, empData });
        }
      });
  };

  renderHeadCell = () => {
    return this.columns.map((colName, index) => {
      return (
        <TableCell key={index}>
          <Typography variant="h6">{colName}</Typography>
        </TableCell>
      );
    });
  };

  renderBody = () => {
    return this.state.empData.map(
      ({ id, firstName, lastName, email, check }) => {
        return (
          <TableRow key={id} className="list-table-body-row" hover>
            <TableCell>
              <Tooltip title={firstName}>
                <Typography variant="subtitle1">{firstName}</Typography>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title={lastName}>
                <Typography variant="subtitle1">{lastName}</Typography>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title={email}>
                <TextField
                  variant="standard"
                  value={email}
                  onChange={e => this.handleEmailChange(id, e)}
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Checkbox
                color="primary"
                checked={check}
                onChange={e => this.handleChkChange(id, e)}
              />
            </TableCell>
          </TableRow>
        );
      }
    );
  };

  render() {
    return (
      <div className="list-box">
        <Toolbar variant="dense">
          <TextField
            id="outlined-search"
            label="Search Name"
            type="search"
            margin="dense"
            variant="outlined"
            onInput={this.handleSearch}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ position: "absolute", right: "1.2rem" }}
            onClick={this.handleAdd}
          >
            <Typography variant="button" color="primary">
              Add
            </Typography>
          </Button>
        </Toolbar>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            {moment().format("MMMDD")}
          </Typography>
        </Toolbar>
        <Table className="list-table">
          <TableHead className="list-table-head">
            <TableRow>{this.renderHeadCell()}</TableRow>
          </TableHead>
          <TableBody>{this.renderBody()}</TableBody>
        </Table>
        <Detail open={this.state.dialog_open} onRefresh={this.handleQuery} />
      </div>
    );
  }
}
