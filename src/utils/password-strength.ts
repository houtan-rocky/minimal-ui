/* eslint-disable prefer-regex-literals */
export function passwordStrength(password: string) {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const mediumRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})');

  if (strongRegex.test(password)) {
    return 'strong';
  }

  if (mediumRegex.test(password)) {
    return 'medium';
  }

  return 'weak';
}
