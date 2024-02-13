import { Helmet } from 'react-helmet-async';

import { ModernVerifyView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Verify</title>
      </Helmet>

      <ModernVerifyView />
    </>
  );
}
