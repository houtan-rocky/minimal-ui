/**
 * Password regexp
 */
export const REGEX_SPECIAL_CHARACTERS = /(?=.*[!@#$%^&*()_\-+=])/;
export const REGEX_CONTAIN_NUMBERS = /(?=.*\d)/;
export const REGEX_CONTAIN_LETTERS = /(?=.*[a-zA-Z])/;

/**
 * Iranian special regexp
 */
export const IRANIAN_MOBILE_NUMBER_REGEX = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
export const IRANIAN_NATIONAL_CODE_REGEX = /^\d{10}$/;
export const IRANIAN_POSTAL_CODE_REGEX = /^\d{10}$/;
export const IRANIAN_TELEPHONE_REGEX = /^0\d{10}$/;
export const IRANIAN_BANK_CARD_NUMBER_REGEX = /^\d{16}$/;
export const IRANIAN_BANK_SHABA_NUMBER_REGEX = /^IR\d{24}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_REGEX = /^\d{19}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_SPACES_REGEX = /^\d{4} \d{4} \d{4} \d{4}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_DASHES_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_SPACES_OR_DASHES_REGEX =
  /^\d{4} \d{4} \d{4} \d{4}$|^\d{4}-\d{4}-\d{4}-\d{4}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_SPACES_AND_DASHES_REGEX =
  /^\d{4} \d{4} \d{4} \d{4}$|^\d{4}-\d{4}-\d{4}-\d{4}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_SPACES_OR_DASHES_AND_DASHES_REGEX =
  /^\d{4} \d{4} \d{4} \d{4}$|^\d{4}-\d{4}-\d{4}-\d{4}$|^\d{4} \d{4} \d{4} \d{4}$/;
export const IRANIAN_BANK_SHETAB_CARD_NUMBER_WITH_SPACES_AND_DASHES_AND_DASHES_REGEX =
  /^\d{4} \d{4} \d{4} \d{4}$|^\d{4}-\d{4}-\d{4}-\d{4}$|^\d{4} \d{4} \d{4} \d{4}$|^\d{4}-\d{4}-\d{4}-\d{4}$/;
