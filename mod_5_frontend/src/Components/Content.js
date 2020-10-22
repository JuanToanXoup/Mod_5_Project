// will render content based on selected tab/navigator
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'

import ScanOrSelectStudent from './ScanOrSelectStudent'
import ClassContainer from './ClassContainer'
import ClassPeriodContainer from './ClassPeriodContainer'
import StudentSpecs from './StudentSpecs'
import Allergies from './StudentInfo/Allergies'
import Prescriptions from './StudentInfo/Prescriptions'
import PreExistingConditions from './StudentInfo/PreExistingConditions'
import Schedule from './StudentInfo/Schedule'
import Notes from './StudentInfo/Notes'
import QrContainer from './QrContainer'
import ClassAllergies from './ClassInfo/ClassAllergies'
import ClassESL from './ClassInfo/ClassESL'
import ClassGender from './ClassInfo/ClassGender'
import SearchStudent from './SearchStudent'


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {

  const renderContent = () => {
    switch(props.navigator+props.tab.value){
      case 'Search Student0': return <ScanOrSelectStudent/>
      case 'Search Student1': return <QrContainer/>
      case 'Search Student2': return <SearchStudent/>
      case 'Class Periods0': return <ClassPeriodContainer/>
      case 'Class Room0': return <ClassContainer/>
      case 'Class Room1': return <ClassAllergies/>
      case 'Class Room2': return <ClassESL/>
      case 'Class Room3': return <ClassGender/>
      case 'Student Page0': return <StudentSpecs/>
      case 'Student Page1': return <Schedule/>
      case 'Student Page2': return <Allergies/>
      case 'Student Page3': return <Prescriptions/>
      case 'Student Page4': return <PreExistingConditions/>
      case 'Student Page5': return <Notes/>
      case 'Profile Page0': {
        props.setCurrentStudent(props.currentUser)
        return <StudentSpecs/>
      }
      

      default:
      break;
    }
  }

  return (
    <React.Fragment>
      {renderContent()}
    </React.Fragment>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    navigator: state.navigator,
    tab: state.tab,
    currentUser: state.currentUser

  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})},
    setCurrentStudent: (student)=> {dispatch({type: 'SET_STUDENT', student: student})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content))

