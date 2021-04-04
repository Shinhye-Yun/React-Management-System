import './App.css';
import React from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
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
  //constructor
  constructor(props){
    super(props);
    this.state={
      customers: '',
      completed: 0
    }
  }
  
  stateRefresh = () => {
    this.setState({
      customers:'',
      completed:0
    });
    this.callApi()
      .then(res=> this.setState({customers:res})) //json form data to customer variable
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async()=>{ // call api asyncronically
    const response = await fetch('api/customer');
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
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c=>{
                return (
                <Customer key={c.id} id={c.ID} image={c.Image} firstName={c.FirstName} lastName={c.LastName} birthday={c.Birthday} gender={c.Gender} job={c.Job}/>)
                ;}):
                <TableRow>
                  <TableCell colSpan="7" align="center">
                    <CircularProgress className={classes.pregress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/> 
      </div>
    );
  }
}

export default withStyles(styles)(App);