import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const GoBack = ({ history }) => {
  const historyGoBack = () => {
    history.goBack();
  };

  return (
    <Button
      style={{
        display: 'block',
        marginBottom: '8px',
      }}
      onClick={historyGoBack}
    >
      <Typography variant='button'>
        <ArrowBackIcon
          style={{
            verticalAlign: 'middle',
            marginRight: '5px',
          }}
        />
        Go Back
      </Typography>
    </Button>
  );
};

export default GoBack;
