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
      case 'Class Periods0': return <ClassPeriodContainer/>
      case 'Class Room0': return <ClassContainer/>
      case 'Student Page0': return <StudentSpecs/>
      case 'Student Page1': return <Schedule/>
      case 'Student Page2': return <Allergies/>
      case 'Student Page3': return <Prescriptions/>
      case 'Student Page4': return <PreExistingConditions/>
      case 'Student Page5': return <Notes/>
      

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
    tab: state.tab

  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content))

