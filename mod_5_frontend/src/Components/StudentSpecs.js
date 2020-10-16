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

  const renderSpecs = () => {
    if(props.selectedStudent.length === 0){
      return (
        props.set_navigator("Search Student"),
        props.set_tab({name: "",value: 0})
      )
    }else{
      return <StudentCard className={classes.paper} props={props.selectedStudent}/>
    }
  }

  return (
    <React.Fragment>
      {renderSpecs()}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
    return {
      selectedStudent: state.selectedStudent
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
      set_navigator: (navigator) => {dispatch({type: 'SET_NAVIGATOR', value: navigator})},
      set_tab: (tab) => {dispatch({type: 'SET_TAB', name: tab.name, value: tab.value})}
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(StudentSpecs);