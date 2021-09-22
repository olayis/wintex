import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Paginate = ({ pages, page, keyword = '' }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {pages > 1 && (
        <Pagination
          count={pages}
          page={page}
          shape='rounded'
          color='primary'
          showFirstButton
          showLastButton
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={
                keyword
                  ? `/search/${keyword}${
                      item.page === 1 ? '' : `/page/${item.page}`
                    }`
                  : `${item.page === 1 ? '' : `/page/${item.page}`}`
              }
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};

export default Paginate;
