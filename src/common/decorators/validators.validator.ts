import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export const FORBIDDEN_WORDS = [
  'תשוש',
  'תרנגול',
  'פעמון',
  'נועה',
  'קירל',
  'מרגול',
  'קונץ',
];

export const isFutureDate = (value: unknown): boolean =>
  value instanceof Date && value.getTime() > Date.now();

export const containsForbiddenWords = (value: unknown): boolean => {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const words = value
    .toLowerCase()
    .split(/[\s,.!?"'();:\-]+/)
    .filter(Boolean);

  return words.some((word) => FORBIDDEN_WORDS.includes(word));
};

export const isMostlyHebrew = (value: unknown): boolean => {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const total = value.length;
  const hebrew = (value.match(/[א-ת]/g) || []).length;

  return total > 0 && hebrew / total > 0.5;
};

export const IsFutureDate = (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: isFutureDate,
        defaultMessage: () => 'Publish time must be in the future',
      },
    });
  };

export const NoForbiddenWords = (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'noForbiddenWords',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: unknown) => !containsForbiddenWords(value),
        defaultMessage: () => 'The title contains a forbidden word',
      },
    });
  };

export const IsMostlyHebrew = (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isMostlyHebrew',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: isMostlyHebrew,
        defaultMessage: () => 'At least 50% of the content must be in Hebrew',
      },
    });
  };
