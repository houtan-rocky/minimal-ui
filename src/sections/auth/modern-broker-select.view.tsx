/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Card, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths.constant';
import { useRouter } from 'src/routes/hooks/use-router.hook';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { useActiveBrokers } from 'src/api/broker-select-get-user-active-brokers.api';

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

export default function ModernBrokerSelectView() {
  const router = useRouter();
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const { data, isError, isLoading } = useActiveBrokers('1234567890');
  const brokers = data?.brokers;

  console.log(brokers, 'dflkwjl2k3');

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
        شما در حال حاضر کارگزاری فعالی ندارید!
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
        برای استفاده از خدمات مارجینکس لازم است ابتدا در یکی از کارگزاری های طرف قرارداد حساب فعال
        داشته باشید.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push(paths.auth.jwt.brokerSingUp)}
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          px: 2,
          py: 1.5,
          mt: 6,
          fontSize: '1rem',
          lineHeight: '1.75rem',
          textAlign: 'center',
          color: 'common.white',
          backgroundColor: 'grey.800',
          borderRadius: '0.5rem',
        }}
      >
        <Box
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf096bfb1720c5864481f6242defde038ea3f1eadd3e28a50ba061ed1f31c9ac?apiKey=27b612e9acb645b2a27d487a421e7c74&"
          alt=""
          sx={{
            flexShrink: 0,
            alignSelf: 'start',
            width: '1.5rem',
            aspectRatio: '1/1',
          }}
        />
        <span>ثبت نام در کارگزاری جدید</span>
      </Button>
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
            <Box>
              <Typography variant="h6" component="div" gutterBottom>
                انتخاب کارگزاری
              </Typography>
              <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  کارگزاری های فعال شما
                </Typography>
                <Box px={3} pb={3} mt={4}>
                  {brokers.map((brokerage) => (
                    <BrokerageItem
                      key={brokerage.name}
                      onClick={() => router.push(paths.dashboard.root)}
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
          </Box>
        )}
      </Box>
    </Box>
  );
}