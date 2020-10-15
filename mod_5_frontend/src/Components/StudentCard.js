import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const styles = (theme) => ({
    "card":{
        "width":"250px",
        "boxShadow":"0 4px 8px 0 rgba(0,0,0,0.2)",
        "transition":"0.3s",
        "border-radius": "10px",
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


const StudentCard = (props)=>{
  const { classes } = props;
  const {first_name,last_name,avatar,id} = props.props

  const getStudent = ()=> {
    console.log('getting Student')
    fetch(`http://localhost:3001/users/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(student => props.setCurrentStudent(student))
    }

  return (
        <div onClick={getStudent} className ={classes.card}>
        <img src={avatar} alt="Avatar" className={classes.image}/>
            <div className={classes.container}>
                <h2 className={classes.name}><b>{first_name+" "+last_name}</b></h2>
            </div>
        </div>
  );
}



const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentStudent: (student)=> {dispatch({type: 'SET_STUDENT', student: student})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(StudentCard));