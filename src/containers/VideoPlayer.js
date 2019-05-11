import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import YouTubeInput from './YouTubeInput';
import VideoList from '../components/VideoList';
import {styles} from './VideoPlayerStyles';

class VideoPlayer extends Component {

  constructor(props) {
    super(props);

    let initState = {
      videos: [],
      active_video_id: false
    };

    if (localStorage.getItem("youtube_app_videos") !== null) {
      initState = JSON.parse(localStorage.getItem("youtube_app_videos"));
    }

    this.state = initState;
  }

  addNewVideo = (video) => {
    this.state.videos.filter(v => v.id === video.id).length === 0 && this.setState(prevState => {

      let newState = {
        videos: [...prevState.videos.map(v => {
        return {
          id: v.id, 
          url: v.url,
          play: false
        }
        }), { 
          id: video.id, 
          url: video.url,
          play: true
        }],
        active_video_id: video.id
      };

      localStorage.setItem("youtube_app_videos", JSON.stringify(newState));

      return (newState);
    });
  } 

  playOnClick = (video_id) => {
    
    this.setState(prevState => {
      
      let videos = this.state.videos.map( video => {
        return {
          id: video.id, 
          url: video.url,
          play: video_id === video.id
        }
      });

      return {
        videos,
        active_video_id: video_id
      }
      
    });
  }

  render(){
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <YouTubeInput addNewVideo={this.addNewVideo} />
              <div className={classes.YouTubePlayer}>
                { this.state.active_video_id !== false && <YouTube       
                  videoId={this.state.active_video_id}
                  opts={{
                    height: '390',
                    width: '640',
                    playerVars: {
                      autoplay: 1
                    }
                  }}
                  onReady={event => event.target.pauseVideo()}
                /> }
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <VideoList videos={this.state.videos} playOnClick={this.playOnClick} />
          </div>
        </main>
      </React.Fragment>
    );    
  }

}

VideoPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoPlayer);