import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import 'tui-chart/dist/tui-chart.css'
import {BarChart} from '@toast-ui/react-chart'

const styles = (theme) => ({
    graph:{
        'margin-left': "10%"
    }
});
  

  
const ClassAllergies = (props) => {
    const { classes } = props

    const data = {
        categories: props.classAllergy.categories,
        series: [
            {
                name: 'Allergies',
                data: props.classAllergy.series
            }
        ]
    };

    const xMax = () => {
        const max = Math.max(data['series'].data)
        switch(true){
            case (max > 30): return 35
            case (max > 25): return 30
            case (max > 20): return 25
            case (max > 15): return 20
            case (max > 10): return 15
            case (max > 5): return 10
            default:
                break;
        }
    }
    
    const options = {
    chart: {
        width: 1160,
        height: 650,
        title: 'Allergies',
        format: '1'
    },
    yAxis: {
        title: 'Names'
    },
    xAxis: {
        title: 'Amount',
        min: 0,
        max: xMax(),
        suffix: '',
        tickInterval: "auto",
        labelInterval: 1
    },
    series: {
        showLabel: true
    }
};

    const getClassAllergies = ()=> {
        console.log('getting Periods')
        fetch(`http://localhost:3001/class_allergies/${props.currentPeriod}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
        }
        })
        .then(res => res.json())
        .then(allergyArray => {
          props.setClassAllergies({categories: allergyArray.map(index => index.name),series: allergyArray.map(index=> index.count)})
        })
    }
  
  React.useEffect(getClassAllergies,[props.currentPeriod])
  return (
    <div className={classes.graph}>
        <BarChart
            data={data} 
            options={options} 
        />
    </div>
  );
}



const mapStateToProps = state => {
    return {
        currentPeriod: state.currentPeriod,
        classAllergy: state.classAllergy

    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
        setClassAllergies: (data) => {dispatch({type: 'SET_CLASS_ALLERGY', categories: data.categories, series: data.series})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(ClassAllergies));