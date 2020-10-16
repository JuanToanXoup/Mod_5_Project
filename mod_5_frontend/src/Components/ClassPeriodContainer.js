import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ClassPeriodCard from './ClassPeriodCard'


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

const ClassPeriodContainer = (props) => {
  const classes = useStyles();

  const getPeriods = ()=> {
    console.log('getting Periods')
    fetch(`http://localhost:3001/class_periods/${props.currentUser.room_number}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(periodList => {
      props.setPeriodList(periodList);
      if(periodList.length !== 0){
        props.setCurrentPeriod(periodList[0].id)
      }
    })
  }
  useEffect(getPeriods,[props.currentUser])


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.periodList.map(period => 
        <Grid onClick={()=>{props.setCurrentPeriod(period.id);props.set_navigator('Class Room')}} key={period.id} item xs={6} sm={3}>
          {<ClassPeriodCard period={period}/>}
        </Grid>
        )}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    periodList: state.periodList,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPeriodList: (list) => {dispatch({type: 'GET_PERIODS', periodList: list})},
    setCurrentPeriod: (period) => {dispatch({type: 'SET_PERIOD', period: period})},
    set_navigator: (navigator) => {dispatch({type: 'SET_NAVIGATOR', value: navigator})}
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ClassPeriodContainer);