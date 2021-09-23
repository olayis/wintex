import Message from '../Message/Message';

const Disclaimer = () => {
  return (
    <div style={{ margin: '65px 0 12px 0' }}>
      <Message collapsible disappear>
        <strong>
          Disclaimer: This is not an actual online store, the products are
          thereby not purchasable.
        </strong>
      </Message>
    </div>
  );
};

export default Disclaimer;
