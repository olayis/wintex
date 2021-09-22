import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Wintex | Shop for all products',
  description:
    'Wintex is the online store that offers the best products at the best prices',
};

export default Meta;
