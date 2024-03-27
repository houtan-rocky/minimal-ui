import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AuthModernLayout from 'src/layouts/auth/modern';
import LoginVerifyPage from 'src/pages/auth/login-verify.page';
import BrokerSelectPage from 'src/pages/auth/broker-select.page';
import BrokerSignUpPage from 'src/pages/auth/broker-signup.page';
import RegisterVerifyPage from 'src/pages/auth/register-verify.page';
import RegisterNewCredentialsPage from 'src/pages/auth/register-new-credentials-page.page';

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
