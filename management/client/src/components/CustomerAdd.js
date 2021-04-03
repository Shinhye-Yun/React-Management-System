//form to add customers

import React from 'react';
import {post} from 'axios';

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
            fileName:''
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
            })
        /*
        //temporary method to reload the whole page as data updated
        //reset state empty
        this.setState({
            file: null,
            firstName: '',
            lastName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        })
        window.location.reload();
        */
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



    render(){
        //form html when post requested
        return(
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
        );
    }

}


export default CustomerAdd;