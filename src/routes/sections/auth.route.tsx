import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const LoginPage = lazy(() => import('src/pages/auth/login.page'));
const RegisterPage = lazy(() => import('src/pages/auth/register.page'));
const ForgetPasswordPage = lazy(() => import('src/pages/auth/forget-password.page'));
const ForgetPasswordNewCredentialsPage = lazy(
  () => import('src/pages/auth/forget-password-new-credentials.page')
);
const ForgetPasswordVerifyPage = lazy(() => import('src/pages/auth/forget-password-verify.page'));
const AuthModernLayout = lazy(() => import('src/layouts/auth/modern'));
const LoginVerifyPage = lazy(() => import('src/pages/auth/login-verify.page'));
const BrokerSelectPage = lazy(() => import('src/pages/auth/broker-select.page'));
const BrokerSignUpPage = lazy(() => import('src/pages/auth/broker-signup.page'));
const RegisterVerifyPage = lazy(() => import('src/pages/auth/register-verify.page'));
const LoginVerifyDisabledPage = lazy(() => import('src/pages/auth/login-verify-disable.page'));
const RegisterNewCredentialsPage = lazy(
  () => import('src/pages/auth/register-new-credentials-page.page')
);

// ----------------------------------------------------------------------

const auth = {
  path: '',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <LoginPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernLayout>
          <RegisterPage />
        </AuthModernLayout>
      ),
    },
    {
      element: (
        <AuthModernLayout>
          <Outlet />
        </AuthModernLayout>
      ),
      children: [
        { path: 'login-verify', element: <LoginVerifyPage /> },
        { path: 'login-verify-disable', element: <LoginVerifyDisabledPage /> },
        { path: 'register-verify', element: <RegisterVerifyPage /> },
        { path: 'register-new-credentials', element: <RegisterNewCredentialsPage /> },
        { path: 'forget-password', element: <ForgetPasswordPage /> },
        { path: 'forget-password-new-credentials', element: <ForgetPasswordNewCredentialsPage /> },
        { path: 'forget-password-verify', element: <ForgetPasswordVerifyPage /> },
        { path: 'broker-select', element: <BrokerSelectPage /> },
        { path: 'broker-sign-up', element: <BrokerSignUpPage /> },
      ],
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [auth],
  },
];
