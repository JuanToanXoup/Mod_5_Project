// will render content based on selected tab/navigator
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

import ClassContainer from './ClassContainer'
import ClassPeriodContainer from './ClassPeriodContainer'

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
    switch(props.navigator){
      case 'Class Period': return <ClassPeriodContainer/>
      case 'Class Room': return <ClassContainer/>
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
    navigator: state.navigator
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content))

