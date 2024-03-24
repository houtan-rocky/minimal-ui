import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { PasswordIcon } from 'src/assets/icons';
import { forgetPasswordApi } from 'src/api/forget-password.api';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgotPasswordView() {
  const { t } = useTranslate();
  const [errorMsg, setErrorMsg] = useState('');

  const NATIONAL_CODE_REGEX = /^[0-9]{10}$/;
  const MOBILE_NUMBER_REGEX = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
  const ForgotPasswordSchema = Yup.object().shape({
    nationalCode: Yup.string()
      .matches(NATIONAL_CODE_REGEX, t('national_code_invalid'))
      .required(t('national_code_is_required')),
    mobileNumber: Yup.string()
      .matches(MOBILE_NUMBER_REGEX, t('mobile_number_invalid'))
      .required(t('mobile_number_is_required')),
  });

  const defaultValues = {
    nationalCode: '1234567890',
    mobileNumber: '09123456789',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgetPasswordApi(data.nationalCode, data.mobileNumber);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="nationalCode" label={t('national_code')} />

      <RHFTextField name="mobileNumber" label={t('mobile_number')} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        {t('continue')}
      </LoadingButton>

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
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{t('forget_password')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('forget_password_description')}
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
