import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import 'tui-chart/dist/tui-chart.css'
import {PieChart} from '@toast-ui/react-chart'




const styles = (theme) => ({
    graph:{
        'margin-left': "10%"
    }
});

  
const ClassESL = (props) => {
    const { classes } = props

    const data = {
        categories: ['First Language'],
        series: props.classESL
    };
    
    const options = {
        chart: {
            width: 1160,
            height: 650,
            title: `Student's First Langurage`,
            format: '1,000',
        },
        yAxis: {
            title: 'Names',
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
    <div className={classes.graph}>
    <PieChart
        className={classes.graph}
        data={data} 
        options={options} 
    />
    </div>
  );
}



const mapStateToProps = state => {
    return {
        currentPeriod: state.currentPeriod,
        classESL: state.classESL
    }
  }

export default connect(mapStateToProps)( withStyles(styles)(ClassESL));