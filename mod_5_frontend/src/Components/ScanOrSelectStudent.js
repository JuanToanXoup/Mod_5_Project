import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core';
import MagGlass from '../Assets/Images/mag_glass.png';
import QRCode from '../Assets/Images/qr_code.png';

const styles = (theme) => ({
    "card":{
        "width":"250px",
        "boxShadow":"0 4px 8px 0 rgba(0,0,0,0.2)",
        "transition":"0.3s",
        "border-radius": "10px",
        "background": 'white',
        "&:hover": {
            "boxShadow":"0 8px 16px 0 rgba(0,0,0,0.2)"
        }
    },
    "container":{
        "padding":"2px 16px",
        "width":"100%"
    },
    "image":{
        "alignSelf":"stretch",
        "margin-left": "auto",
        "margin-right": "auto",
        "width": "100%"
    },
    "name":{
        "text-align": "center",
    },
    'grid':{
        "margin-left": '27%',
        "margin-top": '4%'
    }

});


const ScanOrSelectStudent = (props)=>{
  const { classes } = props

  return (
    <Grid className={classes.grid} container spacing={2}>
        <Grid onClick={()=>{props.set_navigator("Search Student");props.set_tab({name: "",value: 1})}} item xs={6} sm={3}>
            <div className ={classes.card}>
            <img src={QRCode} alt="Avatar" className={classes.image}/>
                <div className={classes.container}>
                    <h2 className={classes.name}><b>{"Scan ID"}</b></h2>
                </div>
            </div>
        </Grid>
        <Grid onClick={()=>{props.set_navigator("Search Student");props.set_tab({name: "",value: 2})}} item xs={6} sm={2}>
        <div className ={classes.card}>
        <img src={MagGlass} alt="Avatar" className={classes.image}/>
            <div className={classes.container}>
                <h2 className={classes.name}><b>{"Search Student"}</b></h2>
            </div>
        </div>
        </Grid>
    </Grid>
  );
}



const mapStateToProps = state => {
    return {
      navigator: state.navigator
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
      set_navigator: (navigator) => {dispatch({type: 'SET_NAVIGATOR', value: navigator})},
      set_tab: (tab) => {dispatch({type: 'SET_TAB', name: tab.name, value: tab.value})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(ScanOrSelectStudent));