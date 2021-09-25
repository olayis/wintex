import CircularLoader from '../../../components/Loaders/CircularLoader';
import Message from '../../../components/Message/Message';

const ProductDataStates = ({
  loadingDelete,
  successDelete,
  loadingCreate,
  errorCreate,
  loadingUpdate,
  successUpdate,
  errorUpdate,
}) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ marginBottom: '5px' }}>
        {loadingDelete && (
          <>
            <CircularLoader />
            <p style={{ textAlign: 'center' }}>Deleting...</p>
          </>
        )}
        {successDelete && (
          <Message severity='success' collapsible>
            Product has been deleted successfully
          </Message>
        )}
      </div>

      <div style={{ marginBottom: '5px' }}>
        {loadingCreate && (
          <>
            <CircularLoader />
            <p style={{ textAlign: 'center' }}>Creating a new product...</p>
          </>
        )}
        {errorCreate && (
          <Message severity='error' collapsible>
            {errorCreate}
          </Message>
        )}
      </div>

      <div style={{ marginBottom: '5px' }}>
        {loadingUpdate && (
          <>
            <CircularLoader />
            <p style={{ textAlign: 'center' }}>Updating...</p>
          </>
        )}
        {successUpdate && (
          <Message severity='success' collapsible>
            Order has been updated successfully
          </Message>
        )}
        {errorUpdate && (
          <Message severity='error' collapsible>
            {errorUpdate}
          </Message>
        )}
      </div>
    </div>
  );
};

export default ProductDataStates;
