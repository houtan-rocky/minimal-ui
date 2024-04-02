import * as Yup from 'yup';
import { useState, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Box, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths.constant';
import { useRouter } from 'src/routes/hooks/index.hook';

import { useBoolean } from 'src/hooks/use-boolean.hook';

import { StepIdEnum, passwordStrength } from 'src/utils/password-strength.util';
import {
  REGEX_CONTAIN_LETTERS,
  REGEX_CONTAIN_NUMBERS,
  REGEX_SPECIAL_CHARACTERS,
} from 'src/utils/regExp.util';

import { useTranslate } from 'src/locales';
import { setNewPasswordApi } from 'src/api/set-new-password.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { PasswordStrengthStepper } from '../password-strength-stepper.component';

// ----------------------------------------------------------------------

export default function ModernForgetPasswordNewCredentials() {
  const { t } = useTranslate();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');
  const [activeStep, setActiveStep] = useState<StepIdEnum>(StepIdEnum.Weak);

  // Function to update the active step based on some password strength criteria
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const pw = event.target.value;

    const step: StepIdEnum = passwordStrength(pw);

    setActiveStep(step);
  };

  const router = useRouter();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('password_is_required'))
      .min(8, t('password_must_be_at_least_8_characters'))
      .matches(REGEX_CONTAIN_LETTERS, t('password_must_contain_letters'))
      .matches(REGEX_CONTAIN_NUMBERS, t('password_must_contain_numbers'))
      .matches(REGEX_SPECIAL_CHARACTERS, t('password_must_contain_special_characters')),
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
    <Stack spacing={2} alignItems="center">
      <Controller
        name="password"
        control={methods.control}
        render={({ field }) => (
          <RHFTextField
            {...field}
            autoComplete="off"
            label={t('password')}
            type={password.value ? 'text' : 'password'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              // Call react-hook-form's onChange
              field.onChange(event);
              // Change stepper state
              handlePasswordChange(event);
            }}
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
        )}
      />

      <Box sx={{ width: 300 }}>
        <PasswordStrengthStepper activeStep={activeStep} setActiveStep={() => {}} />
      </Box>

      <RHFTextField
        name="confirmPassword"
        autoComplete="off"
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
    </Stack>
  );

  const renderHead = (
    <>
      {/* <SentIcon sx={{ height: 96 }} /> */}

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
