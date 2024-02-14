import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernRegisterView() {
  const { t } = useTranslate();

  const RegisterSchema = Yup.object().shape({
    nationalCode: Yup.string().required(t('national_code_is_required')),
    mobileNumber: Yup.string().required(t('mobile_number_is_required')),
    referralCode: Yup.string(),
  });

  const defaultValues = {
    nationalCode: '',
    mobileNumber: '',
    referralCode: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
      <RHFTextField name="nationalCode" label={t('national_code')} />

      <RHFTextField name="mobileNumber" label={t('mobile_number')} />

      <RHFTextField name="referralCode" label={t('referral_code')} />

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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}

      {renderTerms}
    </FormProvider>
  );
}
