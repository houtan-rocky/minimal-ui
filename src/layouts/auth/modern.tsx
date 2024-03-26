import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive.hook';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  image?: string;
  children: React.ReactNode;
};

export default function AuthModernLayout({ children, image }: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 0, md: 8 },
      }}
    >
      <Card
        sx={{
          py: { xs: 5, md: 0 },
          px: { xs: 3, md: 0 },
          boxShadow: { md: 'none' },
          overflow: { md: 'unset' },
          bgcolor: { md: 'background.default' },
        }}
      >
        <Logo
          sx={{
            mt: { xs: 2, md: 6 },
            mb: { xs: 3, md: 5 },
          }}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: 'relative' }}>
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/background/overlay_3.jpg'}
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: 'absolute',
          backgroundSize: 'cover',
          opacity: { xs: 0.24, md: 0 },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/background/overlay_4.jpg)',
        },
      }}
    >
      {renderContent}

      {mdUp && renderSection}
    </Stack>
  );
}
