import React from 'react';
import IBoard from '../models/IBoard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {useHistory} from "react-router";
import boardsLogoBig from "../boardsLogoBig.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  }),
);

interface IProps {
  board: IBoard;
  saveMapDataNow: Function;
}

const BoardDetails: React.FC<IProps> = ({ board, saveMapDataNow }) => {
  let history = useHistory();
  const classes = useStyles();

  const handleImageClick = () => {
    saveMapDataNow();
    history.push("/map");
  };

  return (
    <Grid item xs={12} sm >
      <Card className={classes.card}>
        <CardActionArea onClick={handleImageClick}>
          <CardMedia className={classes.media}>
            <GridList cols={1}>
              <GridListTile >
                <img src={boardsLogoBig} alt={board.name}
                     style={{maxWidth: "100%", height: "140", objectFit: "cover"}}/>
              </GridListTile>
            </GridList>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {board.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {board.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {board.location.address}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {board.location.info}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {board.community}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Join Community
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BoardDetails;
