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

const Logo = forwardRef<HTMLDivElement, LogoProps>(
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
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.9062 31.4323C38.416 23.15 38.2822 16.0451 38.3097 10.3516C38.3176 8.68218 36.2643 7.88092 35.1382 9.11332L31.6733 12.9011C28.8935 15.8324 25.2475 19.5316 20.755 23.7958C20.2077 24.3155 19.3001 23.9355 19.2883 23.1796C19.2588 21.1243 19.2509 19.2009 19.2588 17.4153C19.2667 15.7438 17.2153 14.9406 16.0872 16.173L12.644 19.9371C9.73627 23.0043 5.87962 26.9142 1.09375 31.4323H6.94468C8.43103 29.8967 9.83667 28.4773 11.1498 27.174C11.6301 26.6976 12.4452 27.05 12.4275 27.7272C12.394 28.9163 12.3566 30.1704 12.3133 31.4342H19.5088C19.5068 31.3791 27.0961 23.1973 30.1988 20.1163C30.6791 19.6379 31.4961 19.9923 31.4784 20.6695C31.3819 24.1797 31.2422 28.247 31.0532 31.4342H38.9043L38.9062 31.4323Z"
            fill="#3B7B62"
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

export default Logo;
