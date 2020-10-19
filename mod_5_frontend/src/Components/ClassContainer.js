import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import StudentCard from './StudentCard'
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClassSelectBox from './ClassSelectBox';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  selectBox: {
    border: "2px solid black",
    fontSize: '30px',
    'text-align-last': 'center',
    "width":"100%",
    "boxShadow":"0 4px 8px 0 rgba(0,0,0,0.2)",
    "transition":"0.3s",
    "border-radius": "10px",
    "background": 'white',
    marginBottom: 20,
    marginTop: -25,
    "word-spacing": "60px"
  }
}));

const ClassContainer = (props) => {
  const classes = useStyles();

  const getClass = ()=> {
    console.log('getting Students')
    console.log(props.currentPeriod.id)
    fetch(`http://localhost:3001/getclass/${props.currentPeriod}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(classList => props.setClassList(classList))
  }
  useEffect(getClass,[props.currentPeriod])

  const getClassESL = ()=> {
    console.log('getting ESL')
    fetch(`http://localhost:3001/class_esl/${props.currentPeriod}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
    }
    })
    .then(res => res.json())
    .then(eslObject => {
      props.setClassESL(eslObject)
    })
  }
  useEffect(getClassESL,[props.currentPeriod])
  const getClassGender = ()=> {
    console.log('getting Gender')
    fetch(`http://localhost:3001/class_gender/${props.currentPeriod}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
    }
    })
    .then(res => res.json())
    .then(genderObject => {
      props.setClassGender(genderObject)
    })
  }
  useEffect(getClassGender,[props.currentPeriod])

  return (
    <div className={classes.root}>
      {<ClassSelectBox/>}
      <Grid container spacing={3}>
        {props.classList.map(student => 
        <Grid key={student.id} item xs={6} sm={3}>
          <StudentCard className={classes.paper} props={student}/>
        </Grid>
        )}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    classList: state.classList,
    currentPeriod: state.currentPeriod,
    periodList: state.periodList
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})},
    setCurrentPeriod: (period) => {dispatch({type: 'SET_PERIOD', period: period})},
    setClassESL: (data) => {dispatch({type: 'SET_CLASS_ESL', esl: data})},
    setClassGender: (data) => {dispatch({type: 'SET_CLASS_GENDER', gender: data})},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ClassContainer);
