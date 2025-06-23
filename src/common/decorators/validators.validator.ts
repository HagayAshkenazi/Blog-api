import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const FORBIDDEN_WORDS = [
  'תשוש',
  'תרנגול',
  'פעמון',
  'נועה',
  'קירל',
  'מרגול',
  'קונץ',
];

function isFutureDate(value: unknown): boolean {
  return value instanceof Date && value.getTime() > Date.now();
}

function containsForbiddenWords(value: unknown): boolean {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const words = value
    .toLowerCase()
    .split(/[\s,.!?"'();:\-]+/)
    .filter(Boolean);

  return words.some((word) => FORBIDDEN_WORDS.includes(word));
}

function isMostlyHebrew(value: unknown): boolean {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const total = value.length;
  const hebrew = (value.match(/[א-ת]/g) || []).length;

  return total > 0 && hebrew / total > 0.5;
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
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
}

export function NoForbiddenWords(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
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
}

export function IsMostlyHebrew(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
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
}
