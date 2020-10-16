import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableheader: {
    fontSize: '30pt'
  },
  tablecell: {
    fontSize: '20pt'
  }
});

const Schedule = (props) => {
  const classes = useStyles();

  const west_time = (time)=>{
    if(time/100 < 12){
        return `${time/100}:00 AM`
    }else if(time/100 === 12){
        return `12:00 PM`
    }else{
        return `${time/100 - 12}:00 PM`
    }
  } 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className = {classes.tableheader}>Time</TableCell>
            <TableCell className = {classes.tableheader} align="left">Room Number</TableCell>
            <TableCell className = {classes.tableheader} align="left">Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedStudent.class_periods.sort((a, b) => (a.time > b.time) ? 1 : -1).map((class_period) => (
            <TableRow key={class_period.id}>
              <TableCell className = {classes.tablecell} component="th" scope="row">
                {west_time(class_period.time)}
              </TableCell>
              <TableCell className = {classes.tablecell} align="left">{class_period.room_number}</TableCell>
              <TableCell className = {classes.tablecell} align="left">{class_period.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
    return {
      selectedStudent: state.selectedStudent
    }
}
   
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Schedule);