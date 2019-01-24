import React, { Component } from 'react'
import axios from 'axios'
import {
  Dialog,
  Typography,
  Slide,
  Toolbar,
  TextField,
  Paper,
  Button,
  Snackbar
} from '@material-ui/core'
import AlertConfirmDialog from '../AlertConfirmDialog.component'
import { Config } from '../../config'
import './index.css'

export default class DetailDialog extends Component {
  state = {
    open: this.props.open,
    firstName: '',
    lastName: '',
    email: '',
    snackbar_open: false,
    dialog_opts: {
      title: null,
      content: null,
      yesBtnText: null,
      onYesBtnClick: null,
      confirm: false
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      open: props.open
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleFirstNameInput = e => {
    this.setState({
      firstName: e.target.value
    })
  }

  handleLastNameInput = e => {
    this.setState({
      lastName: e.target.value
    })
  }

  handleEmailInput = e => {
    this.setState({
      email: e.target.value
    })
  }

  showConfirmDialog = () => {
    this.refs.acDialog.handleShow()
  }

  beforeSubmit = () => {
    if (!this.state.firstName) {
      this.setState({
        dialog_opts: {
          title: 'Error',
          content: 'First Name field is empty',
          yesBtnText: 'Continue',
          confirm: false
        }
      })
      this.showConfirmDialog()
      return false
    }
    if (!this.state.lastName) {
      this.setState({
        dialog_opts: {
          title: 'Error',
          content: 'Last Name field is empty',
          yesBtnText: 'Continue',
          confirm: false
        }
      })
      this.showConfirmDialog()
      return false
    }
    return true
  }

  handleSubmit = () => {
    if (this.beforeSubmit()) {
      const query = `mutation{
                saveEmployee(employee:{
                    firstName: "${this.state.firstName}",
                    lastName: "${this.state.lastName}",
                    email: "${this.state.email}"
                }){
                    id,firstName,lastName,email
                }
            }`
      const url = `${Config.server.host}:${Config.server.port}/employee`
      axios
        .post(url, { query })
        .then(({ data }) => {
          console.log(data)
          if (
            data.data &&
            data.data.saveEmployee &&
            data.data.saveEmployee.id
          ) {
            this.setState({
              open: false
            })
            this.props.onRefresh()
          }
        })
        .catch(err => {
          throw err
        })
    }
  }

  render() {
    const {
      title,
      content,
      confirm,
      onYesBtnClick,
      yesBtnText
    } = this.state.dialog_opts
    return (
      <Dialog
        className="detail_dialog"
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <Paper className="detail_dialog_paper" elevation={1}>
          <TextField
            onInput={this.handleFirstNameInput}
            value={this.state.title}
            label="First Name"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            onInput={this.handleLastNameInput}
            value={this.state.content}
            label="Last Name"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            onInput={this.handleEmailInput}
            value={this.state.introduction}
            label="Email"
            margin="normal"
            type="email"
            variant="outlined"
            fullWidth
          />
          <Toolbar>
            <Button
              color="primary"
              variant="outlined"
              className="detail_dialog_submit"
              onClick={this.handleSubmit}
            >
              <Typography variant="button" color="primary">
                Submit
              </Typography>
            </Button>
          </Toolbar>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snackbar_open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Saved Successfully</span>}
        />
        <AlertConfirmDialog
          confirm={confirm}
          ref="acDialog"
          title={title}
          content={content}
          yesBtnText={yesBtnText}
          onYesBtnClick={onYesBtnClick}
        />
      </Dialog>
    )
  }
}

function Transition(props) {
  return <Slide direction="right" {...props} />
}
