import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';
import { SentIcon } from 'src/assets/icons';
import { setNewPasswordApi } from 'src/api/set-new-password.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernNewPasswordView() {
  const { t } = useTranslate();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().required(t('password_is_required')).min(8, t('password_condition')),
    confirmPassword: Yup.string()
      .required(t('password_confirm_is_required'))
      .oneOf([Yup.ref('password')], t('passwords_must_match')),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await setNewPasswordApi(data.password, data.confirmPassword);

      if (res.status === 'ok') {
        console.info('MESSAGE', res.message);
        router.push(paths.auth.jwt.login);
      }
      console.info('DATA', data);
    } catch (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="password"
        label={t('password')}
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

      <RHFTextField
        name="confirmPassword"
        label={t('password_confirm')}
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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('apply')}
      </LoadingButton>

      <Typography variant="body2">
        {t('do_not_have_a_code')}
        &nbsp;
        <Link
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
          }}
        >
          {t('resend')}
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        {t('return_to_previous_page')}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{t('new_password')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('new_password_description')}
        </Typography>
      </Stack>
    </>
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
      </FormProvider>
    </>
  );
}
