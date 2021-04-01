import './App.css';
import React from 'react';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/core/styles';

const styles = theme=>({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    midWidth: 1080
  }
})

const customers=[
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any',
    'name': 'Kate Smith',
    'birthday': 'March 03 1993',
    'gender': 'Female',
    'job': 'designer'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/any',
    'name': 'Don Jo',
    'birthday': 'June 30 2003',
    'gender': 'Male',
    'job': 'student'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/any',
    'name': 'Tom Cruise',
    'birthday': 'December 20 1988',
    'gender': 'Male',
    'job': 'actor'
  }
]

class App extends React.Component{
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
            {customers.map(c=>{return (<Customer key={c.id} id={c.id} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>);})}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);