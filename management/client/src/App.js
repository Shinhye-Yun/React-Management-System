import './App.css';
import React from 'react';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = theme=>({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    midWidth: 1080
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
})

/*
Rest component lifecycle:
<when component starts running>
  1) constructor()
  2) componentWillMount()
  3) render()
  4) componentDidMount()

<when props/states change>
  1) shouldComponentUpdate()
  2) render() - update View //this part is done by React. 
                            //React automatically sense changes and reflect those on the view
*/



class App extends React.Component{
  state={
    customers: "",
    completed: 0
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async()=>{ // call api asyncronically
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  //=()=> is for binding
  progress = () =>{
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
    const {classes} = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c=>{
              return (
              <Customer key={c.id} id={c.id} picture={c.picture} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
              ;}):
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.pregress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);