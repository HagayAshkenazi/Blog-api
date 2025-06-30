import { FORBIDDEN_WORDS } from 'src/consts';
import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  WORD_SPLIT_REGEX,
  NON_SPACE_REGEX,
  HEBREW_CHAR_REGEX,
} from 'src/consts/regex';

export const ContainsForbiddenWords = (value: string): boolean => {
  const words = value.toLowerCase().split(WORD_SPLIT_REGEX).filter(Boolean);

  return words.some(word =>
    FORBIDDEN_WORDS.some(
      forbiddenWord => word === forbiddenWord || word.startsWith(forbiddenWord),
    ),
  );
};

export const HasMostlyHebrewChars = (value: string): boolean => {
  const graphemes = value.normalize('NFC').match(NON_SPACE_REGEX) ?? [];
  const hebrew = graphemes.filter(char => HEBREW_CHAR_REGEX.test(char)).length;

  return graphemes.length > 0 && hebrew / graphemes.length > 0.5;
};

export const NoForbiddenWords = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'noForbiddenWords',
      target: object.constructor,
      options: validationOptions,
      validator: {
        defaultMessage: () => 'common.validation.FORBIDDEN_WORDS',
        validate(value: string) {
          return !ContainsForbiddenWords(value);
        },
      },
    });
  };
};

export const IsMostlyHebrew = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isMostlyHebrew',
      target: object.constructor,
      options: validationOptions,
      validator: {
        defaultMessage: () => 'common.validation.MOSTLY_HEBREW',
        validate(value: string) {
          return HasMostlyHebrewChars(value);
        },
      },
    });
  };
};
