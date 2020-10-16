import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    "boxShadow":"0 4px 8px 0 rgba(0,0,0,0.2)",
    "&:hover": {
        "boxShadow":"0 8px 16px 0 rgba(0,0,0,0.2)"
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClassPeriodCard = (props)=>{
  const classes = useStyles();
  const {subject,time,room_number} = props.period

  const west_time = (time)=>{
      if(time/100 < 12){
          return `${time/100}:00 AM`
      }else if(time/100 === 12){
          return `12:00 PM`
      }else{
          return `${time/100 - 12}:00 PM`
      }
    } 

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h3" component="h2">
          {subject}
        </Typography>
        <Typography variant="h5" component="p">
          Room Number: {room_number}
        </Typography>
        <Typography className={classes.pos} variant="h5" color="textSecondary">
          Time: {west_time(time)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ClassPeriodCard