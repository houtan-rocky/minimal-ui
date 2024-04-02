import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Theme, alpha, SxProps, useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean.hook';

import { fCurrency } from 'src/utils/format-number.util';

import { bgGradient } from 'src/theme/css';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  cardType: string;
  balance: number;
  refundDeadlineInDays: number;
  cardNumber: string;
  cardValid: string;
};

type Props = {
  list: ItemProps[];
  sx?: SxProps<Theme>;
};

export default function HomeSuggestedPackage({ list, sx }: Props) {
  const theme = useTheme();

  const carousel = useCarousel({
    fade: true,
    speed: 100,
    ...CarouselDots({
      sx: {
        right: 16,
        bottom: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha('#7B61FF', 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        height: 262,
        borderRadius: 2,
        position: 'relative',
        color: 'common.white',
        '.slick-slider, .slick-list, .slick-track, .slick-slide > div': {
          height: 1,
        },
        '&:before, &:after': {
          left: 0,
          mx: 2.5,
          right: 0,
          zIndex: -2,
          height: 200,
          bottom: -16,
          content: "''",
          opacity: 0.16,
          borderRadius: 2,
          bgcolor: 'grey.500',
          position: 'absolute',
        },
        '&:after': {
          mx: 1,
          bottom: -8,
          opacity: 0.24,
        },
        ...sx,
      }}
    >
      <Carousel {...carousel.carouselSettings}>
        {list.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CardItemProps = {
  card: ItemProps;
};

function CardItem({ card }: CardItemProps) {
  const { id, cardType, balance, refundDeadlineInDays, cardNumber, cardValid } = card;

  const refundDeadlineContent = `${refundDeadlineInDays} روزه`;

  const { t } = useTranslate();

  const currency = useBoolean();

  const popover = usePopover();

  const handleDelete = useCallback(() => {
    popover.onClose();
    console.info('DELETE', id);
  }, [id, popover]);

  const handleEdit = useCallback(() => {
    popover.onClose();
    console.info('EDIT', id);
  }, [id, popover]);

  return (
    <>
      <Stack justifyContent="space-between" sx={{ height: 1, p: 3 }}>
        <div>
          <Typography sx={{ mb: 1, typography: 'subtitle2', opacity: 0.48 }}>
            بسته پیشنهادی
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: 'h3' }}>
              {fCurrency(balance)} {t('rial')}
            </Typography>
          </Stack>
        </div>

        <Stack justifyContent="space-between" direction="row" spacing={5}>
          <Typography variant="subtitle1">با نرخ هزینه مالی ۲۴٪</Typography>
        </Stack>

        <Stack justifyContent="space-between" direction="row" spacing={5}>
          <Stack spacing={1}>
            <Typography sx={{ typography: 'caption', opacity: 0.48 }}>مهلت بازپرداخت</Typography>
            <Typography sx={{ typography: 'subtitle1' }}>{refundDeadlineContent}</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ typography: 'subtitle1' }}
          >
            <Box
              sx={{
                bgcolor: 'white',
                lineHeight: 0,
                px: 0.75,
                borderRadius: 0.5,
                mr: 1,
              }}
            >
              {cardType === 'mastercard' && <Iconify width={24} icon="logos:mastercard" />}
              {cardType === 'visa' && <Iconify width={24} icon="logos:visa" />}
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
    </>
  );
}
