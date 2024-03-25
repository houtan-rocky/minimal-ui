import { Helmet } from 'react-helmet-async';

import { MailView } from 'src/__sections/mail/view';

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Mail</title>
      </Helmet>

      <MailView />
    </>
  );
}
