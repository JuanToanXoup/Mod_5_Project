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
});

const Schedule = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="left">Room Number</TableCell>
            <TableCell align="left">Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedStudent.class_periods.map((class_period) => (
            <TableRow key={class_period.id}>
              <TableCell component="th" scope="row">
                {class_period.time}
              </TableCell>
              <TableCell align="left">{class_period.room_number}</TableCell>
              <TableCell align="left">{class_period.subject}</TableCell>
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