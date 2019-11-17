import {ListItem, ListItemText, Typography} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const boardsAtThisLocation = (
  mapBoards: any,
  latLng: any,
  markersMap: any,
  boardDataSet: Function,
) => {
  const list = mapBoards.filter(
    (board: any) =>
      board.location.latitude.toFixed(3) === latLng.lat.toFixed(3) &&
      board.location.longitude.toFixed(3) === latLng.lng.toFixed(3),
  );
  return list.length !== 0
    ? boardsList(list, markersMap, boardDataSet)
    : 'No Community Boards At This Location';
};

export const boardsCloseToThisLocation = (
  mapBoards: any,
  latLng: any,
  markersMap: any,
  boardDataSet: Function,
) => {
  const list = mapBoards.filter(
    (board: any) =>
      board.location.latitude.toFixed(4) !== latLng.lat.toFixed(4) &&
      board.location.longitude.toFixed(4) !== latLng.lng.toFixed(4),
  );
  return list.length !== 0
    ? boardsList(list, markersMap, boardDataSet)
    : 'No Community Boards Close To This Location';
};

const boardsList = (list: any, markersMap: any, boardDataSet: Function) => {
  const handleMouseEnter = (boardId: any) => {
    const marker = markersMap.get(boardId);
    if (marker) {
      marker.setIcon('');
    }
  };

  const handleMouseLeave = (boardId: any) => {
    const marker = markersMap.get(boardId);
    if (marker) {
      marker.setIcon(
        'http://s3.amazonaws.com/besport.com_images/status-pin.png',
      );
    }
  };

  const handleClick = (board: any) => {
    boardDataSet(board);
  };

  return (
    <div>
      {list &&
        list.map((board: any) => (
          <RouterLink
            key={board._id}
            to={`/boards/${board._id}`}
            // to={`/boards/${board.name}`}
            onMouseEnter={handleMouseEnter.bind(null, board._id)}
            onMouseLeave={handleMouseLeave.bind(null, board._id)}
            onClick={handleClick.bind(null, board)}
          >
            <ListItem button style={{color: 'white'}}>
              <ListItemText
                primary={board.name}
                secondary={
                  <Typography variant={"subtitle2"} component={'p'}>
                    {board.location.address}
                  </Typography>
                }
                // secondary={board.location.address}
              />
            </ListItem>
          </RouterLink>
        ))}
    </div>
  );
};
{/*<Typography variant="h5" color="textSecondary" component="p">*/}
{/*  likes {post.likes.length}*/}
{/*</Typography>*/}
