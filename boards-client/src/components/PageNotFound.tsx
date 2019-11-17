import React, { useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppBar, createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {resetPageNotFoundAction, setPageNotFoundAction} from "../store/actions/action.userDataReducer";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 57px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paperRoot: {
      // width: '30vw',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '80vw',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '60vw',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        width: '50vw',
      },
      [theme.breakpoints.between('lg', 'xl')]: {
        width: '45vw',
      },
      display: 'flex',
      alignItems: 'center',
      padding: `0 12px`,
      textOverflow: `ellipses`,
      position: 'absolute',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      // width: drawerWidth,
      flexShrink: 0,
    },
    drawerRoot: {
      height: 'calc(100%)',
      display: 'flex',
      flexDirection: 'column',
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      // width: drawerWidth,
    },
    drawerHeader: {
      // width: `calc(${drawerWidth} - 8px)`,
      // position:'fixed',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    drawerHeaderButton: {
      alignSelf: 'center',
      padding: theme.spacing(1),
    },
    content: {
      display: 'flex',
      flex: 1,
      alignSelf: 'stretch',
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // marginLeft: '-' + drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },


    card: {
      minWidth: 275,
    },
    header: {
      // margin: 0,
      fontSize: '22px',
      lineHeight: '24px',
      fontWeight: 'bold',
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
    link: {
      margin: 0,
      textDecoration: 'none',
      fontWeight: 600,
      lineHeight: '24px',
      color: '#00ad9f',
    }
  }),
);

interface IProps {
  setPageNotFound: Function;
  resetPageNotFound: Function;
}

const PageNotFound: React.FC<IProps> = ({setPageNotFound, resetPageNotFound}) => {
  const classes = useStyles();

  useEffect(() => {
    setPageNotFound();
  }, []);

  const handleBackToSite = () => {
    resetPageNotFound();
  };

  return (
    <Box
      style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      background: 'rgb(14, 30, 37)',
      color: 'white',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.header}
            variant={"h5"}
            component={"h1"}
            gutterBottom
            style={{
              display: 'block',
              // font-size: 2em;
              marginBlockStart: '0.67em',
              marginBlockEnd: '0.67em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              fontWeight: 'bold',
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            component="p"
            style={{
              display: 'block',
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',}}
          >
            Looks like you've followed a broken link or entered
            <br />
            a URL that doesn't exist on this site.
          </Typography>
        </CardContent>
        <CardActions>
          <RouterLink
            to={`/`}
            onClick={handleBackToSite}
            // className={classes.link}
          >
            <IconButton >
              <ChevronLeftIcon />
              <Typography className={classes.link}>
                Back to our site
              </Typography>
            </IconButton>
          </RouterLink>
        </CardActions>
      </Card>
    </Box>
  );
};


const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPageNotFound: () => dispatch(setPageNotFoundAction()),
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageNotFound);
