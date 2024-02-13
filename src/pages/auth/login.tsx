import { Helmet } from 'react-helmet-async';

import { ModernLoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Login</title>
      </Helmet>

      <ModernLoginView />
    </>
  );
}
