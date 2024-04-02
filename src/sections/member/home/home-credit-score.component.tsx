import React from 'react';

import { Box, Card, Grid, Button, Typography, CardContent, CardActions } from '@mui/material';

// eslint-disable-next-line perfectionist/sort-imports

import Iconify from 'src/components/iconify';

import RadialChart from '../../../../public/assets/radial-chart.svg';

interface CreditLevelIndicatorProps {
  color: string;
}

const CreditLevelIndicator: React.FC<CreditLevelIndicatorProps> = ({ color }) => (
  <Box
    sx={{
      borderRadius: '7px',
      backgroundColor: color,
      width: '12px',
      height: '12px',
      margin: 'auto 0',
    }}
  />
);

interface CreditScoreProps {
  creditScoreImageUrl: string;
  creditHistoryImageUrl: string;
}

const CreditScore: React.FC<CreditScoreProps> = ({
  creditScoreImageUrl,
  creditHistoryImageUrl,
}) => {
  const creditLevels = [
    { label: 'عالی', color: 'rgba(255, 255, 255, 0.8)' },
    { label: 'خوب', color: 'rgba(255, 255, 255, 0.56)' },
    { label: 'متوسط', color: 'rgba(255, 255, 255, 0.24)' },
    { label: 'ضعیف', color: 'rgba(255, 255, 255, 0.12)' },
  ];

  return (
    <Card
      sx={{
        justifyContent: 'space-between',
        borderRadius: '16px',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        backgroundColor: '#30624e',
        display: 'flex',
        width: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        fontSize: '13px',
        color: '#fff',
        fontWeight: 700,
        textAlign: 'right',
        lineHeight: '169%',
        margin: '0 auto',
        '@media (max-width: 991px)': {
          marginTop: '24px',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            gap: '20px',
            fontSize: '18px',
            lineHeight: '156%',
            '@media (max-width: 991px)': {
              padding: '0 20px',
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Bonyade Koodak FaNum, -apple-system, Roboto, Helvetica, sans-serif',
              margin: 'auto 0',
            }}
          >
            امتیاز اعتبار شما
          </Typography>

          <Iconify icon="ic:baseline-share" width={30} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginTop: '67px',
            flexDirection: 'column',
            color: '#fff',
            textAlign: 'center',
            padding: '0 24px',
            '@media (max-width: 991px)': {
              marginTop: '40px',
              padding: '0 20px',
            },
          }}
        >
          <img
            src={RadialChart}
            alt="Credit History Icon"
            style={{
              aspectRatio: 1,
              objectFit: 'scale-down',
              objectPosition: 'center',
              margin: '0 28px',
            }}
          />
          <Button
            variant="outlined"
            sx={{
              fontFamily: 'Bonyade Koodak FaNum, -apple-system, Roboto, Helvetica, sans-serif',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 1)',
              padding: '4px 8px',
              '@media (max-width: 991px)': {
                padding: '0 20px',
              },
            }}
          >
            مشاهده سوابق امتیازات
          </Button>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center',
          borderTop: '1px dashed rgba(22, 28, 36, 0.8)',
          display: 'flex',
          gap: '16px',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          padding: '24px 42px',
          '@media (max-width: 991px)': {
            marginTop: '40px',
            whiteSpace: 'initial',
            padding: '0 20px',
          },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {creditLevels.map(({ label, color }) => (
            <Grid item key={label}>
              <Box sx={{ display: 'flex', gap: '8px', py: 1 }}>
                <Typography
                  sx={{
                    fontFamily:
                      'Bonyade Koodak FaNum, -apple-system, Roboto, Helvetica, sans-serif',
                  }}
                >
                  {label}
                </Typography>
                <CreditLevelIndicator color={color} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CreditScore;
