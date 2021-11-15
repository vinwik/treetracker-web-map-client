import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Code from "@material-ui/icons/Code";
import Email from "@material-ui/icons/Email";
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import React from "react";

const useStyles = makeStyles(theme => ({
  gridContainer:{
    padding: theme.spacing(2),
  },
}));

function ShareIcon (props) {
  const classes = useStyles();

  return (
    <Grid item className={classes.gridContainer} >
      <Grid container direction="column" alignItems="center" >
        <Grid item>
          <IconButton onClick={props.clickHandler}>
            {(() => {
              switch(props.iconSrc) {
                case "Embed":
                  return <Avatar>
                    <Code/>
                  </Avatar>
                case "Email":
                  return <Avatar>
                    <Email/>
                  </Avatar>
                case "Link":
                  return <Avatar>
                    <LinkIcon/>
                  </Avatar>
                case "Twitter":
                  return <Avatar>
                    <TwitterIcon/>
                  </Avatar>
                default:
                  return <Avatar>
                      <FacebookIcon/>
                    </Avatar>
              }
            })()}
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="button" >
            {props.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShareIcon
