import Message from '../Message/Message';

const Disclaimer = () => {
  return (
    <div style={{ margin: '65px 0 12px 0' }}>
      <Message collapsible disappear timeout={10000}>
        <strong>
          Disclaimer: This is not an actual online store, the products and
          associated entities being displayed are not real and thereby not
          purchasable.
        </strong>
      </Message>
    </div>
  );
};

export default Disclaimer;
