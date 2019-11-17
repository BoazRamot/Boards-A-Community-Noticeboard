import React, { ReactEventHandler } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface IProps {
  userName: any;
  avatar: any;
  handleNewPostOpen: ReactEventHandler;
  userLogin: boolean;
}

const PostInput: React.FC<IProps> = ({ handleNewPostOpen, userName, avatar, userLogin }) => {

  return (
    <Grid item>
      <Box mb={2} ml={1}>
        <Card onClick={handleNewPostOpen} style={{cursor: "pointer"}} >
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p" >
              Create A Post
            </Typography>
            <CardHeader
              avatar={ userLogin ? (<Avatar alt={userName} src={avatar} />) : (<AccountCircle />) }
              title={`What's On Your Mind, ${userLogin ? userName : "Guest"}?`}
            />
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
  userLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostInput);
