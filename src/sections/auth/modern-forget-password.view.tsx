import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths.constant';
import { useRouter } from 'src/routes/hooks/index.hook';

import { IRANIAN_MOBILE_NUMBER_REGEX, IRANIAN_NATIONAL_CODE_REGEX } from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { forgetPasswordApi } from 'src/api/forget-password.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgetPasswordView() {
  const { forgetPasswordCall } = useAuthContext();
  const { palette } = useTheme();
  const router = useRouter();
  const { t } = useTranslate();
  const [errorMsg, setErrorMsg] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    national_code: Yup.string()
      .matches(IRANIAN_NATIONAL_CODE_REGEX, t('national_code_invalid'))
      .required(t('national_code_is_required')),
    mobile_number: Yup.string()
      .matches(IRANIAN_MOBILE_NUMBER_REGEX, t('mobile_number_invalid'))
      .required(t('mobile_number_is_required')),
  });

  const defaultValues = {
    national_code: '1234567890',
    mobile_number: '09123456789',
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
      if (forgetPasswordCall === undefined) throw new Error('forgetPasswordApi is not defined');
      const res = await forgetPasswordApi(data.national_code, data.mobile_number);
      await forgetPasswordCall(data.national_code, data.mobile_number);

      if (res.status === 'ok') {
        router.push(`${paths.auth.jwt.forgetPasswordVerify}`);
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
        error={!!errorMsg || !!errors.national_code}
        autoComplete="off"
        name="national_code"
        label={t('national_code')}
      />

      <RHFTextField
        error={!!errorMsg || !!errors.mobile_number}
        autoComplete="off"
        name="mobile_number"
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
    </Stack>
  );

  const renderHead = (
    <Stack alignItems="end">
      {/* <PasswordIcon sx={{ height: 96 }} /> */}
      <Iconify
        justifySelf="end"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push(paths.auth.jwt.login)}
        icon="eva:arrow-back-fill"
        width={30}
      />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{t('forget_password')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('forget_password_description')}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
