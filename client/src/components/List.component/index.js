import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    TableFooter,
    TablePagination,
    Checkbox,
    TextField,
    Toolbar,
    Typography,
    Tooltip,
    Button
} from '@material-ui/core';
import Detail from '../Detail.component'
import { Config } from '../../config';
import './index.css'

export default class List extends Component {

    state = {
        empData: [],
        dialog_open: false
    }

    columns = ['First Name', 'Last Name', 'Email', 'Check In'];

    componentWillMount() {
        this.handleQuery();
    }

    handleQuery = (key) => {
        const query = key ? `{
            getEmployees(key:"${key}"){
                id,firstName,lastName,email
            }
        }`: `{
            getEmployees{
                id,firstName,lastName,email
            }
        }`;
        const url = `${Config.server.host}:${Config.server.port}/employee`;
        axios.post(url, { query, operationName: null }).then(({ data }) => {
            this.setState({
                empData: data.data.getEmployees,
                dialog_open: false
            })
        }).catch(err => { throw err });
    }

    handleAdd = () => {
        this.setState({
            dialog_open: true
        })
    }

    handleSearch = (e) => {
        this.handleQuery(e.target.value);
    }

    renderHeadCell = () => {
        return this.columns.map((colName, index) => {
            return (
                <TableCell key={index}>
                    <Typography variant="h6">{colName}</Typography>
                </TableCell>
            )
        })
    }

    renderBody = () => {
        return this.state.empData.map(({ id, firstName, lastName, email }) => {
            return (
                <TableRow key={id} className="list-table-body-row">
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
                            <Typography variant="subtitle1">{email}</Typography>
                        </Tooltip>
                    </TableCell>
                    <TableCell>
                        <Checkbox color="primary"></Checkbox>
                    </TableCell>
                </TableRow>
            )
        })
    }

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
                    <Button variant="outlined" color="primary" size="large"
                        style={{ position: "absolute", right: "1.2rem" }}
                        onClick={this.handleAdd}>
                        <Typography variant="button" color="primary">Add</Typography>
                    </Button>
                </Toolbar>
                <Table className="list-table">
                    <TableHead className="list-table-head">
                        <TableRow>
                            {this.renderHeadCell()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderBody()}
                    </TableBody>
                    {/* <TableFooter>
                        <TablePagination page={1} rowsPerPage={10}></TablePagination>
                    </TableFooter> */}
                </Table>
                <Detail open={this.state.dialog_open} onRefresh={this.handleQuery} />
            </div>
        )
    }
}
