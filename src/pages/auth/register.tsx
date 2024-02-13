import { Helmet } from 'react-helmet-async';

import { ModernRegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Register</title>
      </Helmet>

      <ModernRegisterView />
    </>
  );
}
