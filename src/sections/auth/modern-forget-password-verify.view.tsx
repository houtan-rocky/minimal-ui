import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Box, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths.constant';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks/index.hook';

import { IRANIAN_MOBILE_NUMBER_REGEX } from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { verifyApi } from 'src/api/verify.api';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgetPasswordVerifyView() {
  const { user } = useAuthContext();
  const otpExpirationTime = user?.time || null;
  const mobileNumber = user?.mobileNumber;
  const { palette } = useTheme();
  const router = useRouter();
  const { t } = useTranslate();

  const [errorMsg, setErrorMsg] = useState('');

  const VerifySchema = Yup.object().shape({
    code: Yup.string().required(t('code_is_required')).min(4, t('code_must_be_4_characters')),
  });

  // ---------------------------- Timer ----------------------------
  // Calculate the time difference to set the initial countdown
  const calculateInitialTime = () => {
    // If otpExpirationTime is a future timestamp, calculate the difference
    // from the current time. Otherwise, use it directly if it's a duration.
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return otpExpirationTime > currentTime ? otpExpirationTime - currentTime : otpExpirationTime;
  };

  // State to keep track of remaining time
  const [time, setTime] = useState(calculateInitialTime);
  const isDisabled = time <= 0;

  useEffect(() => {
    // Decrease time every second
    const interval = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Stop the timer
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the time in minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // ----------------------------------------------------------------------

  /**
   * If the mobile number is not valid, redirect to the forgot password page
   */
  useEffect(() => {
    if (
      !mobileNumber ||
      !mobileNumber.match(IRANIAN_MOBILE_NUMBER_REGEX) ||
      mobileNumber === 'null'
    ) {
      console.log(
        !mobileNumber,
        !mobileNumber?.match(IRANIAN_MOBILE_NUMBER_REGEX),
        mobileNumber === 'null',
        'googooli'
      );
      router.push(paths.auth.jwt.forgotPassword);
    }
  }, [mobileNumber, router]);

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
        router.push(paths.auth.jwt.forgetPasswordNewCredentials);
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

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'start' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {otpExpirationTime ? `${t('code_validity_time')} : ${formatTime()}` : null}
        </Typography>
      </Box>

      <LoadingButton
        disabled={isDisabled}
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
        <Iconify icon="material-symbols:arrow-back-ios" width="0.8em" height="0.8em" />
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
            mobile_number: mobileNumber,
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
