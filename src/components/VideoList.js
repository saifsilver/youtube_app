import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {styles} from './VideoListStyles';

import PlayCircleFilledRounded from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledRounded from '@material-ui/icons/PauseCircleFilledRounded';

function VideoList(props) {
  let { classes, playOnClick, videos} = props;

  const videos_objs = videos.length > 0 ? videos.map( video => {
    return (
      <ListItem button className={classes.videoItem} alignItems="flex-start" key={`video-${video.id}`} onClick={playOnClick.bind(this,video.id.toString())}>
        { video.play ? <PauseCircleFilledRounded className={classes.icons} /> : <PlayCircleFilledRounded className={classes.icons} /> }
        <ListItemText
          primary="Video"
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {video.url}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }) : null;

  return (
    <React.Fragment>
      <h3 className={classes.title}>History</h3>
      {videos_objs}
    </React.Fragment>
  );
}

VideoList.propTypes = {
  playOnClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    play: PropTypes.bool,
    url: PropTypes.string.isRequired
  }).isRequired).isRequired,
};

export default withStyles(styles)(VideoList)