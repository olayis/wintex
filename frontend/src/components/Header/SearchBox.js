import { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const SearchBox = ({ classes, history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <InputBase
        placeholder='Search for items, brands and categories...'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type='submit' variant='contained'>
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
