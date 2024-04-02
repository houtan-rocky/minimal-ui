/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const SplashLogo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          width="158"
          height="158"
          viewBox="0 0 158 158"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M153.68 124.158C151.743 91.4426 151.215 63.378 151.323 40.8889C151.355 34.2946 143.244 31.1296 138.796 35.9976L125.11 50.9592C114.129 62.5381 99.7277 77.1498 81.9822 93.9932C79.8204 96.0462 76.2355 94.5454 76.1889 91.5593C76.0722 83.4408 76.0411 75.8434 76.0722 68.7903C76.1033 62.1882 68.0004 59.0155 63.5446 63.8834L49.9439 78.7517C38.4583 90.8672 23.2245 106.311 4.32031 124.158H27.4315C33.3026 118.092 38.8549 112.485 44.0416 107.337C45.9391 105.456 49.1585 106.847 49.0885 109.523C48.9563 114.219 48.8085 119.173 48.6374 124.165H77.0598C77.052 123.948 107.03 91.6293 119.285 79.4593C121.183 77.5697 124.41 78.9694 124.34 81.6445C123.959 95.5096 123.407 111.575 122.66 124.165H153.672L153.68 124.158Z"
            fill="white"
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default SplashLogo;
