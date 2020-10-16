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

const Prescriptions = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className = {classes.tableheader}>Prescription Name</TableCell>
            <TableCell className = {classes.tableheader} align="left">Daily Dose</TableCell>
            <TableCell className = {classes.tableheader} align="left">Expiration (Year/Month/Day)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedStudent.prescriptions.sort(function(a,b) {return a.expiration - b.expiration}).map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell className = {classes.tablecell} component="th" scope="row">
                {prescription.name}
              </TableCell>
              <TableCell className = {classes.tablecell} align="left">{prescription.daily_dose}</TableCell>
              <TableCell className = {classes.tablecell} align="left">{prescription.expiration}</TableCell>
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

export default connect(mapStateToProps,mapDispatchToProps)(Prescriptions);