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
import { verifyApi } from 'src/api/verify.api';

import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgetPasswordVerifyView() {
  const { palette } = useTheme();
  const router = useRouter();
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
  const is_register = searchParams[0].get('is_register');
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
      const res = await verifyApi(data.code);
      console.log(res, 'sdlfkjewlk');
      if (res.status === 'ok') {
        if (is_register === 'true') {
          // await login?.(data.username, data.password, data.rememberMe)
          // router.push(returnTo || PATH_AFTER_LOGIN)
        } else {
          router.push(paths.auth.jwt.forgetPasswordNewCredentials);
        }
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
          sx={{ mb: 3, alignSelf: 'start' }}
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
        href={paths.auth.jwt.forgotPassword}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        {t('return_to_first_page')}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      {/* <EmailInboxIcon sx={{ height: 96 }} /> */}

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h5">{t('enter_the_verification_code')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('the_verification_code_has_been_sent_to_the_following_mobile_number', {
            mobile_number: searchParams[0].get('mobile_number'),
          })}
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
