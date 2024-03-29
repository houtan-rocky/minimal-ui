/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Alert,
  styled,
  Typography,
  AlertTitle,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths.constant';
import { useRouter } from 'src/routes/hooks/use-router.hook';

import { useBoolean } from 'src/hooks/use-boolean.hook';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { LoginVerifyDisable } from 'src/api/login-verify-disable.api';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

interface SecurityCodeImageProps {
  src: string;
}

const SecurityCodeImage: React.FC<SecurityCodeImageProps> = ({ src }) => (
  <StyledSecurityCodeImage src={src} />
);

const StyledSecurityCodeImage = styled('img')({
  objectPosition: 'center',
  width: '250px',
});

const ModernLoginVerifyDisableView: React.FC = () => {
  // ---------------------- setup -----------------------
  const { t } = useTranslate();

  const LoginDisabledVerifySchema = Yup.object().shape({
    username: Yup.string().required(t('username_is_required')),
    password: Yup.string().required(t('password_is_required')),
    captcha: Yup.string().required(t('captcha_is_required')),
    // .min(8, t('password_must_be_at_least_8_characters'))
  });

  const auth = useAuthContext();
  // ---------------------- States --------------------------
  const password = useBoolean();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState('');

  const defaultValues = {
    username: '',
    password: '',
    captcha: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginDisabledVerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const recaptchaRef = React.useRef(null);

  // create a reset function
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      // @ts-ignore
      recaptchaRef.current?.reset();
      console.log('first', recaptchaRef.current);
    }
  };

  // ----------------------- handlers -----------------------
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await LoginVerifyDisable(data.username, data.password, data.captcha);

      if (res.status === 'ok') {
        router.push(paths.dashboard.root);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  // const handleRefreshSecurityCode = () => {
  //   // Logic to refresh security code
  // };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <ContentWrapper>
        <Header
          sx={{
            mb: 2,
          }}
        >
          <Title>غیرفعال‌سازی کد دوعاملی</Title>
          <Iconify
            justifySelf="end"
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push(paths.auth.jwt.login)}
            icon="eva:arrow-back-fill"
            width={30}
          />
        </Header>
        <Alert severity="warning">
          <AlertTitle>
            <Typography variant="body2">
              کاربر گرامی، در صورت عدم دسترسی به شناسه دوعاملی، می توانید از طریق این صفحه اقدام به
              حذف شناسه دوعاملی از حساب کاربری خود نمایید. همچنین در صورت تکمیل این پروسه و حذف
              شناسه دوعاملی امکان فعالیت های اعتباری برای شما به مدت 24 ساعت محدود خواهد شد.
            </Typography>
          </AlertTitle>
        </Alert>
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
              placeholder={t('password_placeholder')}
              label={t('password')}
              type={password.value ? 'text' : 'password'}
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

        <SecurityCodeWrapper>
          <SecurityCodeImage src="/_mock/captcha.svg" />
          <RefreshButtonWrapper>
            <Iconify icon="mdi:speakerphone" width="2em" height="2em" />
            <Iconify
              sx={{ cursor: 'pointer' }}
              onClick={resetRecaptcha}
              icon="iconoir:refresh"
              width="1.5em"
              height="1.5em"
            />
          </RefreshButtonWrapper>
        </SecurityCodeWrapper>
        <RHFTextField
          error={!!errorMsg || !!errors.username}
          name="captcha"
          size="medium"
          autoComplete="off"
          placeholder={t('captcha_placeholder')}
          label={t('captcha')}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
        >
          ورود
        </LoadingButton>
      </ContentWrapper>
    </FormProvider>
  );
};

const ContentWrapper = styled(Box)({
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: 'var(--background-default, #fff)',
  borderRadius: 'var(--card-radius, 16px)',
  boxSizing: 'border-box',
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
});

const Title = styled(Typography)({
  fontSize: '20px',
  color: 'var(--text-primary, #212b36)',
  fontWeight: 700,
  lineHeight: '150%',
  fontFamily: 'Bonyade Koodak FaNum, -apple-system, Roboto, Helvetica, sans-serif',
});

const SecurityCodeWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  marginTop: '10px',
});

const RefreshButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export default ModernLoginVerifyDisableView;
