import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router';
import first_back from '../../Assets/Images/LoginPhotos/1.jpg';
import second_back from '../../Assets/Images/LoginPhotos/2.jpg';
import third_back from '../../Assets/Images/LoginPhotos/3.jpg';
import RollCall from '../../Assets/Images/Roll_Call.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       John Doan Co.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const imgRender = ()=>{
  switch(Math.floor(Math.random() * 3) + 1  ){
    case 1: return first_back
    case 2: return second_back
    case 3: return third_back
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${imgRender()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleInputChange = (e)=>{
    switch(e.target.name){
      case 'username':
        setUsername(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      username: username,
      password: password
    }
    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(userHash => {
      if(userHash['auth_key']){
        localStorage.setItem('auth_key',userHash['auth_key'])
        props.set_userType(userHash['user'].user_type)
        props.set_isLoggedIn(true)
        props.history.push('/')
      }else{
        alert(userHash['msg']);
      }
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={RollCall} alt="Roll Call Logo"/>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange = {(e)=>handleInputChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e)=>handleInputChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleSubmit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: (event) => {dispatch({type: 'handleInputChange', event: event})},
    set_isLoggedIn: (value) => {dispatch({type: 'isLoggedIn', value: value})},
    set_currentUser: (user) => {dispatch({type: 'SET_USER', user: user})},
    set_userType: (userType) => {dispatch({type: 'SET_TYPE', userType: userType})}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));