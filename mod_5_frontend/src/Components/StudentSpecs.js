import React from "react";
import {connect} from 'react-redux';
import StudentCard from './StudentCard';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StudentSpecs = props => {
  const classes = useStyles();
  return (
    <StudentCard className={classes.paper} props={props.selectedStudent}/>
  );
};

const mapStateToProps = state => {
    return {
      selectedStudent: state.selectedStudent
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(StudentSpecs);