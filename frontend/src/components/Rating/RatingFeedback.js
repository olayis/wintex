import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0: 'No rating',
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const RatingFeedback = ({ value, setValue }) => {
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name='hover-feedback'
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default RatingFeedback;
