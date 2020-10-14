// Header and Renderer of Tabs
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  mainAppBar: {
    minHeight: 79
  },
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  title: {
    fontSize: 80
  }
});

const Header = (props)=>{
  const { classes, onDrawerToggle } = props;

  const renderTabs = ()=> {
    switch(props.navigator){
      case 'Class Periods':
        return (
          <Tabs value={props.tab.value} textColor="inherit">
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 0})} textColor="inherit" label="Your Class Periods" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 1})} textColor="inherit" label="Sign-in method" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 2})} textColor="inherit" label="Templates" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 3})} textColor="inherit" label="Usage" />
         </Tabs>
        )     
      case 'Class Room':
        return (
          <Tabs value={props.tab.value} textColor="inherit">
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 0})} textColor="inherit" label="Your Students" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 1})} textColor="inherit" label="Sign-in method" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 2})} textColor="inherit" label="Templates" />
            <Tab onClick={(e)=>props.set_tab({name: e.currentTarget.innerText,value: 3})} textColor="inherit" label="Usage" />
          </Tabs>
        )
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <AppBar className={classes.mainAppBar} color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
          <Grid item xs>
              <Typography title={classes.title} color="inherit" variant="h2" component="h2">
                {props.navigator}
              </Typography>
            </Grid>
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} href="/logout" variant="body2">
               Logout
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src={props.currentUser.avatar} alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Button className={classes.button} variant="outlined" color="inherit" size="small">
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        {renderTabs()}
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    navigator: state.navigator,
    tab: state.tab,
    currentUser: state.currentUser
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    set_tab: (tab) => {dispatch({type: 'SET_TAB', name: tab.name, value: tab.value})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))