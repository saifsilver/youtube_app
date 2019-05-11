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
    if( this.state.videos.filter(v => v.id === video.id).length === 0 ){
      this.setState(prevState => {
        let newState = {
          videos: [...prevState.videos.map(v => {
            return {
              id: v.id, 
              url: v.url,
              play: false,
              error: typeof v.error !== "undefined"?v.error: false
            }
          }), { 
            id: video.id, 
            url: video.url,
            play: true,
            error: false
          }],
          active_video_id: video.id
        };

        localStorage.setItem("youtube_app_videos", JSON.stringify(newState));

        return (newState);
      });
    } else {
      this.setState(prevState => {
        let newState = {
          videos: prevState.videos.map(v => {
            return {
              id: v.id, 
              url: v.url,
              play: video.id === v.id,
              error: typeof v.error !== "undefined"?v.error: false
            }
          }),
          active_video_id: video.id
        };

        localStorage.setItem("youtube_app_videos", JSON.stringify(newState));

        return (newState);
      });
    }
  } 

  playOnClick = (video_id) => {
    
    this.setState(prevState => {
      
      let videos = prevState.videos.map( video => {
        return {
          id: video.id, 
          url: video.url,
          play: video_id === video.id,
          error: typeof video.error !== "undefined"?video.error: false
        }
      });

      let hasError = videos.filter(v => ((typeof v.error !== "undefined" && v.error) && v.id === video_id)).length > 0;

      let newState = {
        videos: videos.filter(v => !((typeof v.error !== "undefined" && v.error) && v.id === video_id)),
        active_video_id: hasError ? false : video_id
      };

      localStorage.setItem("youtube_app_videos", JSON.stringify(newState));

      return newState;
      
    });

  }

  removeVideoOnError = () => {
    let that = this;
    this.setState(prevState => {
      let validRandomVideoId = prevState.videos.filter(v => ((typeof v.error !== "undefined" && v.error) && v.id === that.state.active_video_id));
      return {
        videos: prevState.videos.map(v => {
          return {
            id: v.id, 
            url: v.url,
            play: false,
            error: that.state.active_video_id === v.id
          }
        }),
        active_video_id: (validRandomVideoId.length > 0 ? validRandomVideoId[0] : false)
      }
    }, () => {
      localStorage.setItem("youtube_app_videos", JSON.stringify(that.state));
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
                  onError={this.removeVideoOnError}
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