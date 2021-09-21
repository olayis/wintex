import { green } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const convertStatusToIcon = (status) =>
  status ? (
    <CheckIcon style={{ color: green[500] }} />
  ) : (
    <CloseIcon color='error' />
  );

const convertEmailToLink = (email) => (
  <Link href={`mailto:${email}`} target='_blank' rel='noopener'>
    {email}
  </Link>
);

const convertItemToLink = (link, text) => <Link href={link}>{text}</Link>;

export { convertStatusToIcon, convertEmailToLink, convertItemToLink };
