import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableheader: {
    fontSize: '30pt'
  },
  tablecell: {
    fontSize: '20pt'
  },
  form: {
    background: "white",
  },
  tablerow: {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  }
});

const Notes = (props) => {
  const classes = useStyles();
  const [note, setNote] = React.useState('')
  const [target,setTarget] = React.useState('')

  const handleInputChange = (e)=>{
    setNote(e.target.value)
    setTarget(e.target)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNote = {
      user_id: props.selectedStudent.id,
      teacher: `${props.currentUser.first_name} ${props.currentUser.last_name}`,
      text: note
    }
    if(note !== ''){
      fetch('http://localhost:3001/notes',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newNote)
      }).then(res => res.json())
      .then(userHash => {
        let new_student = {...props.selectedStudent}
        let new_note_array = [...props.selectedStudent.notes];
        new_note_array.push(userHash);
        new_student.notes = new_note_array;
        props.setNewNote(new_student);
        target.value = ''
        setNote('')
      })
    }else{
      alert("Text field can not be blank.");
    }
  }

  const deleteNote = (id)=>{
    fetch(`http://localhost:3001/notes/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(deleted_note => {
      let new_student = {...props.selectedStudent}
      new_student.notes = [...props.selectedStudent.notes].filter(note => note.id !== deleted_note.id)
      props.setNewNote(new_student);
    })
  }

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className = {classes.tablerow}>
            <TableCell className = {classes.tableheader} ></TableCell>
            <TableCell className = {classes.tableheader} >Teacher</TableCell>
            <TableCell className = {classes.tableheader} >Date</TableCell>
            <TableCell className = {classes.tableheader} align="left">Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedStudent.notes.map((note) => (
            <TableRow className = {classes.tablerow} key={note.id}>
              <TableCell className = {classes.tablecell} onClick={()=>deleteNote(note.id)} component="th" scope="row">X</TableCell>
              <TableCell className = {classes.tablecell} align="left">{note.teacher}</TableCell>
              <TableCell className = {classes.tablecell} align="left">{note.created_at}</TableCell>
              <TableCell className = {classes.tablecell} align="left">{note.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Create Student Note"
              name="create student note"
              autoComplete="Student Note"
              autoFocus
              onChange = {(e)=>handleInputChange(e)}
              className = {classes.form}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleSubmit}
            >
              Post
            </Button>
    
  </React.Fragment>

  );
}

const mapStateToProps = state => {
    return {
      selectedStudent: state.selectedStudent,
      currentUser: state.currentUser
    }
}
   
const mapDispatchToProps = dispatch => {
    return {
      setNewNote: (student)=> {dispatch({type: 'SET_NOTE', student: student})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notes);