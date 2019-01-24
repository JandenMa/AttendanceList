import React, { Component } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide
} from '@material-ui/core'

function Transition(props) {
    return <Slide direction="up" {...props} />
}

export default class AlertConfirmDialog extends Component {
    state = {
        _open: false
    }

    handleShow = () => {
        this.setState({ _open: true });
    }

    handleClose = () => {
        this.setState({ _open: false });
    }

    handleYes = () => {
        this.setState({ _open: false });
        this.props.onYesBtnClick && this.props.onYesBtnClick();
    }

    render() {
        return (
            <Dialog
                open={this.state._open}
                onClose={this.handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                TransitionComponent={Transition}
            >
                {this.props.title && <DialogTitle id="dialog-title">{this.props.title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        {this.props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        this.props.confirm &&
                        <Button variant="outlined" onClick={this.handleClose} color="secondary">
                            {this.props.cancelBtnText || 'Cancel'}
                        </Button>
                    }
                    <Button variant="outlined" onClick={this.handleYes} color="primary" autoFocus>
                        {this.props.yesBtnText || 'Yes'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}