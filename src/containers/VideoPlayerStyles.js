export const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    fontFamily: '"Open Sans", sans-serif'
  },
  heroContent: {
    maxWidth: 640,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 30px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(640 + theme.spacing.unit * 3 * 2)]: {
      width: 640,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  YouTubePlayer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0px',
    justifyContent: 'center'
  }
});