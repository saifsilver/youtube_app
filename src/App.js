import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import VideoPlayer from './containers/VideoPlayer';

function App() {
  return (
    <React.Fragment>
    	<CssBaseline />
      	<Header />
      	<VideoPlayer />
    </React.Fragment>
  );
}

export default App;
