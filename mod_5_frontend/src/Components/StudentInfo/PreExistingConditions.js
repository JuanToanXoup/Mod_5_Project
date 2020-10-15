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

const PreExistingConditions = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pre-Existing Condition Name</TableCell>
            <TableCell align="left">Symptoms</TableCell>
            <TableCell align="left">Recommended Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedStudent.pre_existing_conditions.map((condition) => (
            <TableRow key={condition.id}>
              <TableCell component="th" scope="row">
                {condition.name}
              </TableCell>
              <TableCell align="left">{condition.symptoms}</TableCell>
              <TableCell align="left">{condition.recommended_action}</TableCell>
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

export default connect(mapStateToProps,mapDispatchToProps)(PreExistingConditions);