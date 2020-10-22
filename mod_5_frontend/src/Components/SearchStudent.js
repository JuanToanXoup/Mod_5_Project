import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import StudentCard from './StudentCard'

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
        "padding": "2px 16px"
    },
    submit:{
        "padding": "2px 16px",
        fontSize: 20
    },
    studentArray: {
        'margin-top': '10px'
    }

});


const SearchStudent = (props)=>{
  const { classes } = props
  const [searchFirstName, setSearchFirstName] = React.useState('')
  const [searchLastName, setSearchLastName] = React.useState('')
  const [searchId, setSearchId] = React.useState('')
  const [searchBus, setSearchBus] = React.useState('')
  const [studentArray,setStudentArray] = React.useState([])

    const handleInputChange = (e)=>{
        console.log(e.target.name)
      switch(e.target.name){
        case "Student First Name": setSearchFirstName(e.target.value)
            break
        case "Student Last Name": setSearchLastName(e.target.value)
            break
        case "Student ID": setSearchId(e.target.value)
            break
        case "Student Bus": setSearchBus(e.target.value)
            break
        default:
            break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newSearch = {
          first_name: searchFirstName,
          last_name: searchLastName,
          id: searchId,
          bus_number: searchBus 
        }
        if(searchFirstName !== '' || searchLastName !== ''|| searchId !== ''|| searchBus !== ''){
          fetch('http://localhost:3001/search',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(newSearch)
          }).then(res => res.json())
          .then(searchArray => setStudentArray(searchArray))
        }else{
          alert("Text fields can not be blank.");
        }
      }



  return (
      <React.Fragment>
        <Paper levation={3}>
            <Grid className={classes.grid} container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Student First Name"
                        name="Student First Name"
                        autoComplete="Student First Name"
                        autoFocus
                        onChange = {(e)=>handleInputChange(e)}
                        className = {classes.form}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Student Last Name"
                        name="Student Last Name"
                        autoComplete="Student Last Name"
                        autoFocus
                        onChange = {(e)=>handleInputChange(e)}
                        className = {classes.form}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Student ID"
                        name="Student ID"
                        autoComplete="Student ID"
                        autoFocus
                        onChange = {(e)=>handleInputChange(e)}
                        className = {classes.form}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Student Bus"
                        name="Student Bus"
                        autoComplete="Student Bus"
                        autoFocus
                        onChange = {(e)=>handleInputChange(e)}
                        className = {classes.form}
                    />
                </Grid>
            </Grid>
        </Paper>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSubmit}
        >
        Search Student
        </Button>
        <Grid className = {classes.studentArray}container spacing={3}>
            {studentArray.map(student => 
                <Grid key={student.id} item xs={6} sm={3}>
                    <StudentCard className={classes.paper} props={student}/>
                </Grid>
            )}
        </Grid>
    </React.Fragment>
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
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(SearchStudent));