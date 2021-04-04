import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class CustomerDelete extends React.Component{
    //constructor
    constructor(props){
        super(props);
        this.state={
            open:false
        };
    }

    //modal window pop up
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClickClose = () => {
        this.setState({
            open: false
        });
    }

    //API function - delete customer by id
    deleteCustomer(id){
        const url = '/api/customer/' + id;
        fetch(url,{
            method: 'DELETE'  //using DELETE method
        });
        this.props.stateRefresh(); //reload page after deletion
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>delete</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>
                        Alarm
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterButtom>
                            Do you want to delete this customer?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>delete</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default CustomerDelete;