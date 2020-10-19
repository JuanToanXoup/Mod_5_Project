import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import 'tui-chart/dist/tui-chart.css'
import {PieChart} from '@toast-ui/react-chart'

const styles = (theme) => ({
    graph:{
        display: 'flex',
        justifyContent: "center",
    }
});
  

  
const ClassGender = (props) => {
    const { classes } = props

    const data = {
        categories: ['Class Gender'],
        series: props.classGender
    };
    
    const options = {
    chart: {
        width: 1160,
        height: 650,
        title: `Class Gender`,
        format: '1,000'
    },
    yAxis: {
        title: 'Names'
    },
    xAxis: {
        title: 'Amount',
        min: 0,
        max: 100,
        suffix: ''
    },
    series: {
        showLabel: true
    }
};

  return (
    <PieChart
        className={classes.graph}
        data={data} 
        options={options} 
    />
  );
}



const mapStateToProps = state => {
    return {
        currentPeriod: state.currentPeriod,
        classGender: state.classGender
    }
  }

export default connect(mapStateToProps)( withStyles(styles)(ClassGender));