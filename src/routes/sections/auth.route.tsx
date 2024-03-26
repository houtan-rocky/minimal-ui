import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AuthModernLayout from 'src/layouts/auth/modern';
import VerifyRegisterPage from 'src/pages/auth/verify-register.page';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const LoginPage = lazy(() => import('src/pages/auth/login.page'));
const RegisterPage = lazy(() => import('src/pages/auth/register.page'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password.page'));
const NewPasswordPage = lazy(() => import('src/pages/auth/new-password.page'));
const VerifyPage = lazy(() => import('src/pages/auth/verify.page'));

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
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'new-password', element: <NewPasswordPage /> },
        { path: 'verify', element: <VerifyPage /> },
        { path: 'verify-register', element: <VerifyRegisterPage /> },
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