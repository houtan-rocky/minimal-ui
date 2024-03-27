import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths.constant';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks/index.hook';

import { useBoolean } from 'src/hooks/use-boolean.hook';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernLoginView() {
  const { palette } = useTheme();
  const { t } = useTranslate();
  // using theme colors

  const { login } = useAuthContext();
  const password = useBoolean();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const returnTo = searchParams.get('returnTo');
  const [errorMsg, setErrorMsg] = useState('');

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('username_is_required')),
    password: Yup.string().required(t('password_is_required')),
    rememberMe: Yup.boolean().required(),
  });

  const defaultValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = (await login?.(data.username, data.password, data.rememberMe)) as unknown as {
        has2fa: boolean;
        phone_number: string;
      };

      if (res.has2fa) {
        router.push(paths.auth.jwt.loginVerify(res.phone_number || ''));
        return;
      }
      router.push(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">{t('login')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{t('are_you_not_a_member')}</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          {t('create_an_account')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && (
        <Typography
          color={palette.error.main}
          fontSize={14}
          fontWeight={400}
          sx={{ mb: 3, textAlign: 'center' }}
        >
          {errorMsg}
        </Typography>
      )}
      <RHFTextField
        error={!!errorMsg || !!errors.username}
        name="username"
        placeholder={t('username_placeholder')}
        label={t('username')}
      />

      <RHFTextField
        error={!!errorMsg || !!errors.password}
        name="password"
        label={t('password')}
        placeholder={t('password_placeholder')}
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="flex-center">
        <RHFCheckbox name="rememberMe" label={t('remember_me')} data-testid="remember_me_input" />
        <Link
          component={RouterLink}
          href={paths.auth.jwt.forgotPassword}
          variant="body2"
          color={palette.primary.light}
          underline="always"
          sx={{ alignSelf: 'center' }}
          data-testid="forget_password_link"
        >
          {t('forget_password')}
        </Link>
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        {t('login')}
      </LoadingButton>

      {/* <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="outlined"
        loading={isSubmitting}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        {t('login_with_one_time_password')}
      </LoadingButton> */}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
