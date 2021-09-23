import React from 'react';
import Illustration from './Illustration/Illustration';
import engineerImage from '../static/images/qa_engineer.svg';
import Typography from '@material-ui/core/Typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log Error here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
          }}
        >
          <div>
            <Typography
              variant='h4'
              align='center'
              color='textSecondary'
              component='h1'
            >
              Oops! An error occured
            </Typography>
            <Illustration
              actionLink='/'
              actionText='Go to Homepage'
              altText='Quality Assurance Engineer'
              heading=''
              image={engineerImage}
              imgHeight='215'
              imgWidth='300'
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
