import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import StudentCard from './StudentCard'
import Grid from '@material-ui/core/Grid';
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

const ClassContainer = (props) => {
  const classes = useStyles();

  const getClass = ()=> {
    console.log('getting Students')
    fetch('http://localhost:3001/users',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(classList => props.setClassList(classList))
  }
  useEffect(getClass,[props.isLoggedIn])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.classList.map(student => 
        <Grid key={student.id} item xs={6} sm={3}>
          <StudentCard  className={classes.paper} props={student}/>
        </Grid>
        )}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    classList: state.classList
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ClassContainer);
