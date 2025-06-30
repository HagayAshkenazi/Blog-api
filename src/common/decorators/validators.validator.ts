import { registerDecorator, ValidationOptions } from 'class-validator';
import { FORBIDDEN_WORDS } from 'src/consts';

export function containsForbiddenWords(value: string): boolean {
  const words = value
    .toLowerCase()
    .split(/[\s.,!?"'();:\-{}<>]+/)
    .filter(Boolean);

  return words.some(word =>
    FORBIDDEN_WORDS.some(
      forbiddenWord => word === forbiddenWord || word.startsWith(forbiddenWord),
    ),
  );
}

export function isMostlyHebrew(value: string): boolean {
  const total = value.length;
  const hebrew = (value.match(/[\u05D0-\u05EA]/g) || []).length;

  return total > 0 && hebrew / total > 0.5;
}

export function NoForbiddenWords(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'noForbiddenWords',
      target: object.constructor,
      options: validationOptions,
      validator: {
        defaultMessage: () => 'common.validation.FORBIDDEN_WORDS',
        validate(value: string) {
          return !containsForbiddenWords(value);
        },
      },
    });
  };
}

export function IsMostlyHebrew(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isMostlyHebrew',
      target: object.constructor,
      options: validationOptions,
      validator: {
        defaultMessage: () => 'common.validation.MOSTLY_HEBREW',
        validate(value: string) {
          return isMostlyHebrew(value);
        },
      },
    });
  };
}
