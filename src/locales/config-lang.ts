import merge from 'lodash/merge';
// date fns
import { arSA as arSAAdapter } from 'date-fns/locale';

// date pickers (MUI)
// core (MUI)
import { arSA as arSACore } from '@mui/material/locale';
// data grid (MUI)
import { arSD as arSDDataGrid } from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  // {
  //   label: 'English',
  //   value: 'en',
  //   systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
  //   adapterLocale: enUSAdapter,
  //   icon: 'flagpack:gb-nir',
  //   numberFormat: {
  //     code: 'en-US',
  //     currency: 'USD',
  //   },
  // },
  // {
  //   label: 'Arabic',
  //   value: 'ar',
  //   systemValue: merge(arSDDataGrid, arSACore),
  //   adapterLocale: arSAAdapter,
  //   icon: 'flagpack:sa',
  //   numberFormat: {
  //     code: 'ar',
  //     currency: 'AED',
  //   },
  // },
  {
    label: 'Farsi',
    value: 'fa',
    systemValue: merge(arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: 'flagpack:ir',
    numberFormat: {
      code: 'fa',
      currency: 'IRR',
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
