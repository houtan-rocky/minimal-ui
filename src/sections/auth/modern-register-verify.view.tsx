import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths.constant';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks/index.hook';

import { IRANIAN_MOBILE_NUMBER_REGEX } from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { verifyRegisterApi } from 'src/api/verify-register.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernRegisterVerifyView() {
  const { palette } = useTheme();
  const router = useRouter();
  const { loginWithToken } = useAuthContext();
  const { t } = useTranslate();
  const searchParams = useSearchParams();

  const [errorMsg, setErrorMsg] = useState('');

  const VerifySchema = Yup.object().shape({
    code: Yup.string().required(t('code_is_required')).min(4, t('code_must_be_4_characters')),
  });

  /**
   * If the mobile number is not valid, redirect to the forgot password page
   */
  const mobile_number = searchParams[0].get('mobile_number');
  useEffect(() => {
    if (
      !mobile_number ||
      !mobile_number.match(IRANIAN_MOBILE_NUMBER_REGEX) ||
      mobile_number === 'null'
    ) {
      console.log(
        !mobile_number,
        !mobile_number?.match(IRANIAN_MOBILE_NUMBER_REGEX),
        mobile_number === 'null',
        'googooli'
      );
      router.push(paths.auth.jwt.forgotPassword);
    }
  }, [mobile_number, router]);

  /**
   * Form Stuff
   */
  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const verifyRegisterResponse = await verifyRegisterApi(data.code);
      const { accessToken } = verifyRegisterResponse;
      if (verifyRegisterResponse.status === 'ok') {
        await loginWithToken(accessToken);
        router.push(paths.auth.jwt.registerNewCredentials);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFCode name="code" />
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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('verify')}
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
        href={paths.auth.jwt.register}
        color="inherit"
        underline="always"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          fontSize: 14,
        }}
      >
        {t('edit_information')}
        <Iconify icon="material-symbols:arrow-back-ios" width="0.8em" height="0.8em" />
      </Link>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h3">{t('enter_the_verification_code')}</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('the_verification_code_has_been_sent_to_the_following_mobile_number', {
          mobile_number: searchParams[0].get('mobile_number'),
        })}
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}