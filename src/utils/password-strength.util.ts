/* eslint-disable prefer-regex-literals */

import {
  REGEX_CONTAIN_LETTERS,
  REGEX_CONTAIN_NUMBERS,
  REGEX_SPECIAL_CHARACTERS,
} from './regExp.util';

export enum StepIdEnum {
  Weak = 0,
  Medium = 1,
  Strong = 2,
}

export enum StepLabelEnum {
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong',
}

export function passwordStrength(password: string): StepIdEnum {
  // Strong criteria: Letters, numbers, special characters, and minimum length of 8
  const strongRegex =
    new RegExp(REGEX_CONTAIN_LETTERS) &&
    new RegExp(REGEX_CONTAIN_NUMBERS) &&
    new RegExp(REGEX_SPECIAL_CHARACTERS);

  // Medium criteria: At least two types of characters and minimum length of 6
  // This is a simplified approximation since accurately counting "two out of three" criteria
  // with regex can be complex and might need separate checks for each combination
  const mediumRegex = new RegExp(
    '^(?:(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[0-9])(?=.*[!@#$%^&*])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])).{6,}$'
  );

  if (strongRegex.test(password) && password.length >= 8) {
    return StepIdEnum.Strong;
  }
  if (mediumRegex.test(password) && password.length >= 8) {
    return StepIdEnum.Medium;
  }
  return StepIdEnum.Weak;
}
