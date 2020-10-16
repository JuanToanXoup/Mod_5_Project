import React from 'react';
import {connect} from 'react-redux'
import {Grid,Select} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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

const ClassSelectBox = (props) => {
  const classes = useStyles();

  const west_time = (time)=>{
    if(time/100 < 12){
        return `${time/100}:00 AM`
    }else if(time/100 === 12){
        return `12:00 PM`
    }else{
        return `${time/100 - 12}:00 PM`
    }
  } 

  return (
        <Grid>
            <Select 
                className={classes.selectBox}
                native value = {props.currentPeriod}
                onChange={(e)=>props.setCurrentPeriod(e.currentTarget.value)}
                label="Period Select"
            >
                {props.periodList.map(period => 
                    <option 
                        value={period.id}
                        key={period.id}
                    >
                        {`Subject:\u00A0${period.subject}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                        Room:\u00A0${period.room_number} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                        Time:\u00A0${west_time(period.time)}`}
                    </option>
                    )
                }
            </Select>
        </Grid>
        )
    }

const mapStateToProps = state => {
  return {
    currentPeriod: state.currentPeriod,
    periodList: state.periodList
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setCurrentPeriod: (period) => {dispatch({type: 'SET_PERIOD', period: period})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ClassSelectBox);