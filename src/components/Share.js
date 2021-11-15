import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Close from "@material-ui/icons/Close";
import MaterialShareIcon from "@material-ui/icons/Share";
import log from "loglevel";
import React from "react"

import ShareIcon from "./ShareIcon";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: 0,
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  box1: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    paddingTop: 0,
  },
  box2:{
    padding: theme.spacing(2),
  },
  code: {
    minWidth: 400,
    margin: 10,
  },
  icon: {
    color: 'white',
  },
}));

function Share(props){
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEmbedOpen, setEmbedOpen] = React.useState(false);
  const [embedCode, setEmbedCode] = React.useState("");
  const [isMessageOpen, setMessageOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function handleClick(){
    setIsOpen(true);
  }

  function handleClose(){
    setIsOpen(false);
  }

  function handleTwitter(){
    window.open(`https://twitter.com/intent/tweet?url=${props.shareUrl}&via=green_stand&related=Greestand,treetracker`);
  }

  function handleFaceBook(){
    window.open(`https://www.facebook.com/dialog/share?app_id=87741124305&href=${props.shareUrl}&display=popup`);
  }

  function handleEmail() {
    window.open(`mailto:?subject=A tree from Greenstand&body=I want to share this tree from Greenstand with you, please click this link to check it! ${props.shareUrl}`, '_self');
  }

  function showMessage(text){
    setMessage(text);
    setMessageOpen(true);
  }

  function handleCopyLink() {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(props.shareUrl).then(() => {
        showMessage("Link has been copied!");
      });
    }
  }

  function handleEmbed(){
    setIsOpen(false);
    setEmbedOpen(true);
  }

  function handleEmbedClose(){
    setEmbedOpen(false);
  }

  function handleChange(e){
    setEmbedCode(e.target.value);
  }

  React.useEffect(() => {
    setEmbedCode(`<iframe width="560" height="315" src="${props.shareUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  }, []);

  function handleCopy(){
    log.log("copy...");
    const copyTextarea = document.getElementById('EmbedCode');
    copyTextarea.focus();
    copyTextarea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      log.log(`Copying text command was ${msg}`);
    } catch (err) {
      log.log('Oops, unable to copy');
    }
    showMessage("Code has been copied!");
  }

  function handleMessageClose(){
    setMessageOpen(false);
    setMessage("");
  }

  return(
    <>
      <Tooltip title="share tree" >
        <IconButton
          onClick={handleClick}
        >
          <MaterialShareIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle className={classes.title}>
          <Grid container justify="space-between" alignItems="center" >
            <Grid item xs={8} >
              Share
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose} >
                <Close/>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Grid container justify="center" className={classes.box1} >
          <ShareIcon
            name="Link"
            iconSrc="Link"
            clickHandler={handleCopyLink}
          />
          <ShareIcon
            name="Embed"
            iconSrc="Embed"
            clickHandler={handleEmbed}
          />
          <ShareIcon
            name="Twitter"
            iconSrc="https://dadior.s3-ap-northeast-1.amazonaws.com/twitter2.svg"
            clickHandler={handleTwitter}
          />
          <ShareIcon
            name="Facebook"
            iconSrc="https://dadior.s3-ap-northeast-1.amazonaws.com/facebook.svg"
            clickHandler={handleFaceBook}
          />
          <ShareIcon
            name="Email"
            iconSrc="Email"
            clickHandler={handleEmail}
          />
        </Grid>
      </Dialog>
      <Dialog
        open={isEmbedOpen}
        onClose={handleEmbedClose}
      >
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center" >
            <Grid item xs={8} >
              Embed Greenstand
            </Grid>
            <Grid item>
              <IconButton onClick={handleEmbedClose} >
                <Close/>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <TextField
          id="EmbedCode"
          multiline
          variant="outlined"
          value={embedCode}
          rowsMax={4}
          onChange={handleChange}
          className={classes.code}
        />
        <DialogActions>
          <Button onClick={handleEmbedClose} >Cancel</Button>
          <Button onClick={handleCopy} >Copy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton color="primary" onClick={handleMessageClose}>
              <Close/>
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  )
}

export default Share;
