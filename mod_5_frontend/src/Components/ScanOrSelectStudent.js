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
    }
});


const ScanOrSelectStudent = (props)=>{
  const { classes } = props

  return (
    <Grid container spacing={2}>
        <Grid item xs={6} sm={2}>
        <div className ={classes.card}>
        <img src={QRCode} alt="Avatar" className={classes.image}/>
            <div className={classes.container}>
                <h2 className={classes.name}><b>{"Scan ID"}</b></h2>
            </div>
        </div>
        </Grid>
        <Grid item xs={6} sm={2}>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_nagivation: (navigation)=> {dispatch({type: 'SET_NAVIGATOR', value: navigation})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(ScanOrSelectStudent));