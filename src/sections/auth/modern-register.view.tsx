import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths.constant';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks/index.hook';

import { IRANIAN_MOBILE_NUMBER_REGEX, IRANIAN_NATIONAL_CODE_REGEX } from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernRegisterView() {
  const { register } = useAuthContext();
  const searchParams = new URLSearchParams(window.location.search);
  const referralCode = searchParams.get('referral_code');
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslate();

  const RegisterSchema = Yup.object().shape({
    nationalCode: Yup.string()
      .required(t('national_code_is_required'))
      .matches(IRANIAN_NATIONAL_CODE_REGEX, t('national_code_is_invalid')),
    mobileNumber: Yup.string()
      .required(t('mobile_number_is_required'))
      .matches(IRANIAN_MOBILE_NUMBER_REGEX, t('mobile_number_is_invalid')),
    referralCode: Yup.string(),
  });

  const defaultValues = {
    nationalCode: '',
    mobileNumber: '',
    referralCode: referralCode || '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const res = await registerApi(data.nationalCode, data.mobileNumber, data.referralCode || '');
      const res = await register(data.nationalCode, data.mobileNumber);
      console.log(res, 'sdfsdfsadfsf');
      if (res.data.status === 'ok') {
        router.push(paths.auth.jwt.registerVerify(data.mobileNumber));
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">{t('register')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{t('already_have_an_account')}</Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          {t('login')}
        </Link>
      </Stack>
    </Stack>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      <Link underline="always" color="text.primary">
        {t('terms_of_service')}
      </Link>
      {t('and')}
      <Link underline="always" color="text.primary">
        {t('privacy_policy')}
      </Link>
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField
        error={!!errorMsg || !!errors.nationalCode}
        name="nationalCode"
        placeholder={t('national_code_placeholder')}
        label={t('national_code')}
      />

      <RHFTextField
        error={!!errorMsg || !!errors.mobileNumber}
        name="mobileNumber"
        placeholder={t('mobile_number_placeholder')}
        label={t('mobile_number')}
      />

      <RHFTextField
        error={!!errorMsg || !!errors.referralCode}
        name="referralCode"
        placeholder={t('referral_code_placeholder')}
        disabled={!!referralCode}
        label={t('referral_code')}
      />

      <LoadingButton
        fullWidth
        color="inherit"
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

  return (
    <>
      {errorMsg && (
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="h6" color="error">
            {errorMsg}
          </Typography>
        </Stack>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}

        {/* {renderTerms} */}
      </FormProvider>
    </>
  );
}
