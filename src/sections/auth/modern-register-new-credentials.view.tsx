import * as Yup from 'yup';
import { useState, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, List, ListItem, useTheme, IconButton, InputAdornment } from '@mui/material';

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
import { registerSetUsernamePasswordApi } from 'src/api/register-set-username-password.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { PasswordStrengthStepper } from './password-strength-stepper.component';

// ----------------------------------------------------------------------

export default function ModernRegisterNewCredentialsView() {
  const { palette } = useTheme();
  const router = useRouter();
  const password = useBoolean();
  const { t } = useTranslate();
  const [errorMsg, setErrorMsg] = useState('');
  const [activeStep, setActiveStep] = useState<StepIdEnum>(StepIdEnum.Weak);

  const registerSetUsernamePasswordSchema = Yup.object().shape({
    username: Yup.string().required(t('username_is_required')),
    password: Yup.string()
      .required(t('password_is_required'))
      .min(8, t('password_must_be_at_least_8_characters'))
      .matches(REGEX_CONTAIN_LETTERS, t('password_must_contain_letters'))
      .matches(REGEX_CONTAIN_NUMBERS, t('password_must_contain_numbers'))
      .matches(REGEX_SPECIAL_CHARACTERS, t('password_must_contain_special_characters')),
    password_confirm: Yup.string()
      .required(t('password_confirm_is_required'))
      .oneOf([Yup.ref('password')], t('passwords_must_match')),
  });

  const defaultValues = {
    username: '',
    password: '',
    password_confirm: '',
  };

  const methods = useForm({
    resolver: yupResolver(registerSetUsernamePasswordSchema),
    defaultValues,
  });

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const pw = event.target.value;

    const step: StepIdEnum = passwordStrength(pw);

    setActiveStep(step);
  };

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await registerSetUsernamePasswordApi(
        data.username,
        data.password,
        data.password_confirm
      );

      if (res.status === 'ok') {
        router.push(paths.dashboard.root);
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
        error={!!errorMsg || !!errors.username}
        name="username"
        size="medium"
        autoComplete="off"
        placeholder={t('username_placeholder')}
        label={t('username')}
      />

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
              autoComplete: 'new-password', // disable autocomplete,
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
        name="password_confirm"
        label={t('password_confirm')}
        autoComplete="off"
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
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        {t('continue')}
      </LoadingButton>
    </Stack>
  );

  const renderHead = (
    <Stack alignItems="end">
      {/* <PasswordIcon sx={{ height: 96 }} /> */}
      <Stack spacing={1} sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h3">{t('set_password')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <List>
            <ListItem>{t('set_password_description_1')}</ListItem>

            <ListItem>{t('set_password_description_2')}</ListItem>
          </List>
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
