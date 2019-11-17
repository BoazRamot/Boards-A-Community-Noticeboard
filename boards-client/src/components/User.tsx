import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import IUser from '../models/IUser';
import BoundDataService from '../services/BoundDataService';
import { DataCollections } from '../services/data.service';
import Loading from './Loading';

const User: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [user, setUser] = useState<IUser>();
  const userDataService = new BoundDataService<IUser>(
    '',
    DataCollections.Users,
  );
  // get data on mount
  useEffect(() => {
    const getUser = async (id: string) => {
      userDataService.getById(id).then(data => {
        if (data) {
          setUser(data);
        }
      });
    };
    if (match.params.id) {
      getUser(match.params.id);
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  if (!user) {
    return <Loading />;
  }

  return (
    <Grid container={true} justify="center">
      <div>place holder</div>
    </Grid>
  );
};

export default User;
