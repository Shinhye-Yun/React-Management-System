//form to add customers
import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';

//desing style for modal 
const styles = theme => ({
    hidden: {
        display: 'none'
    }
});


class CustomerAdd extends React.Component{
    //constructor
    constructor(props){
        super(props);
        this.state={
            file: null, //user profile image
            firstName: '',
            lastName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false //to check if dialog winodw is oepned
        };
    }

    //event handling functions
    //post method - connect and call method to post data to server
    handleFormSubmit = (e) => {
        //prevent error from data being sent to server
        e.preventDefault();
        this.addCustomer() //post data to server
            .then((response) => {
            //received response for connection from server
                console.log(response.data);
                this.props.stateRefresh(); //method from parent (App.js)
            });
        this.setState({
            file: null,
            firstName: '',
            lastName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        });
        //window.location.reload();
       //react operates SPA-single page application
       //reuploading a whole page is inefficient.
       //by updating state values, we can upload necessary part on the page
       //by passing data from parent component to child component in 'props' form
       //let's use the easiest way to do it: reuploading a list after updates
        
    }

    handleFileChange = (e) =>{
        this.setState({
            file: e.target.files[0], //e.target: input of the event. files[0] means only one file
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    //module - post data to server
    addCustomer = () => {
        const url = 'api/customer';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //header
        const config={
            headers:{
                'content-type': 'multipart/form-data' //when data contains 'file(image)' data
            }
        }
        return post(url, formData, config); //send data in 'formData' with 'config' to 'url' of server
    }


    //modal window pop up
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClickClose = () => {
        this.setState({
            file: null,
            firstName: '',
            lastName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        });
    }

    render(){
        const {classes} = this.props; //for design class
        //form html when post requested
        return(
            <div> 
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add Customer
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>
                        Add New Customer
                    </DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accpet="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>  
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Choose profile image" : this.state.fileName}
                            </Button>
                        </label>
                        <br/><br/>
                        First name <br/><TextField type="text" name="firstName" value={this.state.firstName} onChange={this.handleValueChange}/>
                        <br/><br/>
                        Last name <br/><TextField type="text" name="lastName" value={this.state.lastName} onChange={this.handleValueChange}/>
                        <br/><br/>
                        Birthday <br/> <TextField type="date" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/>
                        <br/><br/>
                        Gender <br/><TextField type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/>
                        <br/><br/>
                        Job <br/><TextField type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Add</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>Cancel</Button>
                    </DialogActions>

                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add customer</h1>
                profile image: <input type="file" name="file" 
                    file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>  
                <br/> 
                first name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleValueChange}/>
                <br/>
                last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleValueChange}/>
                <br/>
                birthday: <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/>
                <br/>
                gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/>
                <br/>
                job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
                <br/>
                <button type="submit">submit</button>
            </form>
            */
        );
    }

}


export default withStyles(styles)(CustomerAdd);