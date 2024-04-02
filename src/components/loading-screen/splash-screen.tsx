import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { SplashLogo } from '../logo';

const Container = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #3b7b62 0%, #224537 99.24%)',
  width: '100%',
  height: '100%',
  fontSize: '16px',
  color: '#fff',
  fontWeight: 400,
  textAlign: 'center',
  lineHeight: '150%',
  margin: '0 auto',
  padding: '76px 60px',
});

const LogoWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 200,
  width: '158px',
  maxWidth: '100%',
});

const VersionText = styled(Typography)({
  fontFamily: 'Bonyade Koodak FaNum, -apple-system, Roboto, Helvetica, sans-serif',
  position: 'absolute',
  bottom: 50,
});
// ----------------------- Constants ----------------------------
const version = '1.0.0' as const;
function SplashScreen() {
  return (
    <Container>
      <LogoWrapper>
        <SplashLogo disabledLink sx={{ width: 64, height: 64 }} />
        <VersionText>{version}</VersionText>
      </LogoWrapper>
    </Container>
  );
}

export default SplashScreen;
