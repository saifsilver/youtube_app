import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import {
  styles
} from './YouTubeInputStyles';

class YouTubeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  youtube_parser = (url) => {
    // eslint-disable-next-line
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  onClick = (e) => {
    let that = this;
    let url = this.youtube_url.value.trim();

    if (!url) {
      that.setState({
        error: "Please enter a valid url"
      });
      return
    }

    let video_id = this.youtube_parser(url);

    if (video_id.length > 0) {
      this.props.addNewVideo({
        id: video_id,
        url: url
      });
      that.setState({
        error: false
      });
      this.youtube_url.value = "";
    } else {
      that.setState({
        error: "Please enter a valid url"
      });
    }
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <Paper className={classes.search_field} elevation={1}>
        <InputBase value={this.state.url} label={this.state.error !== false?this.state.error:null} error={this.state.error !== false} inputRef={node => this.youtube_url = node}  className={classes.input} placeholder="Enter Youtube Video URL..." />
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions" onClick={this.onClick}>
          <DirectionsIcon />
        </IconButton>
      </Paper>   
    );    
  }
}

YouTubeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YouTubeInput)