import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './HeaderStyles';

function Header(props) {
  const { classes } = props;

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <VideoLibrary className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          A Video Player
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);