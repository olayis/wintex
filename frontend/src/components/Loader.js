import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <Spinner
    animation='border'
    role='status'
    style={{
      width: '100px',
      height: '100px',
      margin: 'auto',
      display: 'block',
    }}
  >
    <span className='visually-hidden'>Loading...</span>
  </Spinner>
);

export default Loader;
