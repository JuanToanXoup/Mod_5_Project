import React from "react";
import {connect} from 'react-redux';
import StudentCard from './StudentCard';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },
  flex: {
    "flex-direction": "row"
  },
  table: {
    minWidth: 650,
  },
  tableheader: {
    fontSize: '26pt',
    'text-align': 'left'
  },
  tablecell: {
    fontSize: '17pt'
  },
  form: {
    background: "white",
  },
  tablerow: {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  },
  left: {
    "float":"left",
    "display":"inline",
    "width": "17%"
  },
  right: {
    "float":"left",
    "display":"inline",
    "width": "83%"
  },
  tabletitle: {
    fontSize: '30pt',
    'text-align': 'center',
    marginBottom: 10
  }
}));

const StudentSpecs = props => {
  const classes = useStyles();

  const renderBusOrRoom = ()=>{
    switch(props.currentUser.user_type){
      case 'teacher': return <Paper className={classes.paper}>Room Number: {props.currentUser.room_number}</Paper>
      case 'student': return <Paper className={classes.paper}>Bus Number: {props.currentUser.bus_number}</Paper>
    }
  }

  const renderSpecs = () => {
    if(props.currentUser.length === 0){
      return (
        props.set_navigator("Search Student"),
        props.set_tab({name: "",value: 0})
      )
    }else{
      return (
        <React.Fragment>
      <div className = {classes.left}>
        <StudentCard props={props.currentUser}/>
      </div>
      <div className = {classes.right}>
      <Card className = {classes.tabletitle}>Emergeny Contacts</Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className = {classes.tablerow}>
              <TableCell className = {classes.tableheader} >Name</TableCell>
              <TableCell className = {classes.tableheader} >Relationship</TableCell>
              <TableCell className = {classes.tableheader} >Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.currentUser.emergency_contacts.map((contact) => (
              <TableRow className = {classes.tablerow} key={contact.id}>
                <TableCell className = {classes.tablecell} align="left">{contact.contact_name}</TableCell>
                <TableCell className = {classes.tablecell} align="left">{contact.contact_relationship}</TableCell>
                <TableCell className = {classes.tablecell} align="left">{contact.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Age: {props.currentUser.age}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Gender: {props.currentUser.gender}</Paper>
          </Grid>
          <Grid item xs={4}>
            {renderBusOrRoom()}
          </Grid>
        </Grid>
      </div>
      </React.Fragment>
      )
    }
  }

  return (
    <div className={classes.flex}>
      {renderSpecs()}
    </div>
  );
};

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
      set_navigator: (navigator) => {dispatch({type: 'SET_NAVIGATOR', value: navigator})},
      set_tab: (tab) => {dispatch({type: 'SET_TAB', name: tab.name, value: tab.value})}
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(StudentSpecs);