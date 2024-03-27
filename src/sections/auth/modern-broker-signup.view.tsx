/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths.constant';
import { useRouter } from 'src/routes/hooks/use-router.hook';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { useAvailableBrokers } from 'src/api/broker-signup-get-available-brokers.api';

import Iconify from 'src/components/iconify';

const BrokerageItem = styled(Button)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  ':hover': {
    outline: '2px solid #000000',
  },
  borderWidth: isActive ? 2 : 1,
  borderStyle: 'solid',
  borderColor: isActive ? theme.palette.text.primary : theme.palette.divider,
}));

const BrokerageItemContent = styled(Box)({
  flexGrow: 1,
  marginRight: '1rem',
});

const BrokerageItemLogo = styled('img')({
  width: 32,
  height: 32,
});

interface BrokerageItemProps {
  name: string;
  imageSrc: string;
  isActive: boolean;
}

export default function ModernBrokerSignUpView() {
  const router = useRouter();
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const { data, isError, isLoading } = useAvailableBrokers();

  const brokers = data?.brokers;

  const hasNoBroker = brokers === undefined || brokers.length === 0;

  const emptyBrokerage = (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        mx: 'auto',
        width: '100%',
        fontSize: 14,
        fontWeight: 'bold',
        maxWidth: 480,
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        انتخاب کارگزاری
      </Typography>
      <Box
        component="img"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c82d1b3a0b109a853eabfb8a8220119ef2fc3b318b6b18301892c854ebf92818?apiKey=27b612e9acb645b2a27d487a421e7c74&"
        alt=""
        sx={{
          alignSelf: 'center',
          mt: 7,
          width: '4rem',
          aspectRatio: '1/1',
        }}
      />

      <Typography
        variant="body1"
        sx={{
          mt: 1,
          textAlign: 'center',
          color: 'error.main',
          lineHeight: '157%',
        }}
      >
        کارگزاری طرف قراردادی برای شما تعریف نشده است
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          lineHeight: 1.5,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        شما در حال حاضر کارگزاری فعالی ندارید!
      </Typography>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth={480}
      fontWeight="bold"
      color="text.primary"
    >
      <Box width="100%">
        {hasNoBroker ? (
          emptyBrokerage
        ) : (
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                افتتاح حساب در کارگزاری
                <Iconify
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(paths.auth.jwt.brokerSelect)}
                  icon="eva:arrow-back-fill"
                  width={30}
                />
              </Stack>
            </Typography>
            <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                کارگزاری های طرف قرارداد
              </Typography>
              <Box px={3} pb={3} mt={4}>
                {brokers.map((brokerage) => (
                  <BrokerageItem
                    LinkComponent={Button}
                    rel="noreferrer"
                    href={brokerage.link}
                    key={brokerage.name}
                    // isActive={brokerage.is_active}
                  >
                    <BrokerageItemContent>
                      <Typography variant="body1">{brokerage.name}</Typography>
                    </BrokerageItemContent>
                    <BrokerageItemLogo src={brokerage.image_src} alt={`${brokerage.name} logo`} />
                  </BrokerageItem>
                ))}
              </Box>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
}
