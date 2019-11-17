import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

const community = [
  { value: 'General Community' },
  { value: 'Residential Community' },
  { value: 'Commercial Community' },
  { value: 'Work Community' },
  { value: 'School Community' },
  { value: 'Academic Community' },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
      // width: '35vw'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }),
);

interface IState {
  address: string;
  name: string;
  info: string;
  community: string;
  description: string;
}

interface IProps {
  handleNewBoardClose: any; // todo: type
  openNewBoard: boolean;
  address: string;
  latLng: any; // todo: type
  createNewBoard: any; // todo: type
  handleNewBoardCreatedOpen: any; // todo: type
}

const AddNewBoard: React.FC<IProps> = ({
  handleNewBoardCreatedOpen,
  createNewBoard,
  latLng,
  handleNewBoardClose,
  openNewBoard,
  address,
}) => {
  const formEl = useRef<HTMLFormElement>(null);
  const classes = useStyles();
  const [values, setValues] = useState<IState>({
    address,
    name: address,
    info: '',
    community: 'General Community',
    description: '',
  });

  const handleChange = (name: keyof IState) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const board = {
      // _id: values.name,
      name: values.name,
      community: values.community,
      description: values.description,
      geoLocation: {
        type: 'Point',
        coordinates: [latLng.lng, latLng.lat],
      },
      location: {
        address: values.address,
        info: values.info,
        latitude: latLng.lat,
        longitude: latLng.lng,
      },
    };
    console.log('board', board);
    createNewBoard(board);
    handleNewBoardClose();
    handleNewBoardCreatedOpen();
  };

  return (
    <div>
      <Dialog
        open={openNewBoard}
        onClose={handleNewBoardClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          ref={formEl}
          className={classes.container}
        >
          <DialogContent>
            <TextField
              id="outlined-read-only-input"
              label="The Board Address Is"
              value={values.address}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-name"
              label="More Location Info"
              className={classes.textField}
              value={values.info}
              onChange={handleChange('info')}
              margin="normal"
              variant="outlined"
              fullWidth
              placeholder="For Example Floor Level, Office or Classroom"
            />
            <TextField
              required
              id="outlined-name"
              label="Board Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Community Category"
              className={classes.textField}
              value={values.community}
              onChange={handleChange('community')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please Select Your Community Category"
              margin="normal"
              variant="outlined"
            >
              {community.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-dense-multiline"
              label="Board Description"
              className={clsx(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
              multiline
              fullWidth
              rowsMax="4"
              value={values.description}
              onChange={handleChange('description')}
            />
            {/* todo: add static map*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewBoardClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddNewBoard;
