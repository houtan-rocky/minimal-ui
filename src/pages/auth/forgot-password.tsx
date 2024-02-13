import { Helmet } from 'react-helmet-async';

import { ModernForgotPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Forgot Password</title>
      </Helmet>

      <ModernForgotPasswordView />
    </>
  );
}
