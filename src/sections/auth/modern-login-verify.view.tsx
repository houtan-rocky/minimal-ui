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
import { useAuthContext } from 'src/auth/hooks';
import { verifyLoginApi } from 'src/api/verify-login.api';

import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernLoginVerifyView() {
  const { palette } = useTheme();
  const router = useRouter();
  const { loginWithToken } = useAuthContext();
  const { t } = useTranslate();
  const [errorMsg, setErrorMsg] = useState('');

  const VerifySchema = Yup.object().shape({
    code: Yup.string().required(t('code_is_required')).min(4, t('code_must_be_4_characters')),
  });

  const { user } = useAuthContext();
  const otpExpirationTime = user?.time || null;
  const mobileNumber = user?.mobileNumber;

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

  useEffect(() => {
    if (
      !mobileNumber ||
      !mobileNumber.match(IRANIAN_MOBILE_NUMBER_REGEX) ||
      mobileNumber === 'null'
    ) {
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
      const verifyRegisterResponse = await verifyLoginApi(data.code);
      const { accessToken } = verifyRegisterResponse;
      if (verifyRegisterResponse.status === 'ok') {
        await loginWithToken(accessToken);
        router.push(paths.auth.jwt.brokerSelect);
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
        disabled={isDisabled}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('verify')}
      </LoadingButton>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'start' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {otpExpirationTime ? `${t('code_validity_time')} : ${formatTime()}` : null}
        </Typography>
      </Box>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.loginVerifyDisable}
        color="inherit"
        underline="always"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          mt: 4,
          display: 'inline-flex',
        }}
      >
        {t('do_not_have_a_code')}
      </Link>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h3">{t('enter_the_verification_code')}</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('the_verification_code_has_been_sent_to_the_following_mobile_number', {
          mobile_number: mobileNumber,
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
