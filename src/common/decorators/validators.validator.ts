import { registerDecorator, ValidationOptions } from 'class-validator';

export const FORBIDDEN_WORDS = [
  'תשוש',
  'תרנגול',
  'פעמון',
  'נועה',
  'קירל',
  'מרגול',
  'קונץ',
];

export const containsForbiddenWords = (value: string): boolean => {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const words = value
    .toLowerCase()
    .split(/[\s,.!?"'();:\-]+/)
    .filter(Boolean);

  return words.some((word) => FORBIDDEN_WORDS.includes(word));
};

export const isMostlyHebrew = (value: string): boolean => {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const total = value.length;
  const hebrew = (value.match(/[א-ת]/g) || []).length;

  return total > 0 && hebrew / total > 0.5;
};

export const NoForbiddenWords =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'noForbiddenWords',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: string) => !containsForbiddenWords(value),
        defaultMessage: () => 'common.validation.FORBIDDEN_WORDS',
      },
    });
  };

export const IsMostlyHebrew =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isMostlyHebrew',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: isMostlyHebrew,
        defaultMessage: () => 'common.validation.MOSTLY_HEBREW',
      },
    });
  };