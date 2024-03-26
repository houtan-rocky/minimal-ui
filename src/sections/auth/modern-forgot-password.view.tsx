import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths.constant';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks/index.hook';

import { IRANIAN_MOBILE_NUMBER_REGEX, IRANIAN_NATIONAL_CODE_REGEX } from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { forgetPasswordApi } from 'src/api/forget-password.api';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgotPasswordView() {
  const { palette } = useTheme();
  const router = useRouter();
  const { t } = useTranslate();
  const [errorMsg, setErrorMsg] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    nationalCode: Yup.string()
      .matches(IRANIAN_NATIONAL_CODE_REGEX, t('national_code_invalid'))
      .required(t('national_code_is_required')),
    mobileNumber: Yup.string()
      .matches(IRANIAN_MOBILE_NUMBER_REGEX, t('mobile_number_invalid'))
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
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await forgetPasswordApi(data.nationalCode, data.mobileNumber);

      if (res.status === 'ok') {
        router.push(`${paths.auth.jwt.verify(data.mobileNumber)}`);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
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
        error={!!errorMsg || !!errors.nationalCode}
        name="nationalCode"
        label={t('national_code')}
      />

      <RHFTextField
        error={!!errorMsg || !!errors.mobileNumber}
        name="mobileNumber"
        label={t('mobile_number')}
      />

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
      {/* <PasswordIcon sx={{ height: 96 }} /> */}

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{t('forget_password')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('forget_password_description')}
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}