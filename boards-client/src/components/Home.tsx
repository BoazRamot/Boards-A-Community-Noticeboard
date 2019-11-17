import React, { useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppBar, createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {resetPageNotFoundAction} from "../store/actions/action.userDataReducer";
import Box from "@material-ui/core/Box";
import boardBackground from "../boardBackground.jpg";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
      // ...theme.mixins.toolbar,
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
  }),
);

interface IProps {
  resetPageNotFound: Function
  pageNotFound: boolean
}

const Home: React.FC<IProps> = ({pageNotFound, resetPageNotFound}) => {
  const classes = useStyles();

  useEffect(() => {
    if (pageNotFound) {
      resetPageNotFound();
    }
  }, []);

  return (
    <div style={{
      backgroundColor: "#FEF2F2",
      height: '100vh'
    }}>
      <AppBar
        // style={{ backgroundColor: "#FEF2F2" }}
        position='relative'
        color="default"
        className={classes.drawerHeader}
        style={{
          backgroundImage: `url(${boardBackground})`,
          height: '100vh',

          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // height: '100vh',
          width: '100vw',
          // background: 'rgb(14, 30, 37)',
          color: 'white',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            // minHeight: '100vh'
          }}
        >
          <Grid>
            <Grid item xs={12}>
              <Typography
                variant={"h3"}
                component={"h1"}
                gutterBottom
                style={{
                  display: "flex",
                  justifyContent: "center",

                  // display: 'block',
                  // font-size: 2em;
                  marginBlockStart: '0.67em',
                  marginBlockEnd: '0.67em',
                  marginInlineStart: '0px',
                  marginInlineEnd: '0px',
                  fontWeight: 'bold',
                }}
              >
                Boards
              </Typography>

            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={"h4"}
                component={"h1"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBlockStart: '1em',
                  marginBlockEnd: '1em',
                  marginInlineStart: '0px',
                  marginInlineEnd: '0px',}}
              >
                Community Notice Board Web App
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RouterLink
                to={`/map`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: 'white',
                  }}
              >
                <Typography
                  component="button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlockStart: '1em',
                    marginBlockEnd: '1em',
                    marginInlineStart: '0px',
                    marginInlineEnd: '0px',}}
                >
                  Find Your Community
                </Typography>

              </RouterLink>
            </Grid>
          </Grid>
        </Grid>

      </AppBar>

    </div>
  );
};


const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
