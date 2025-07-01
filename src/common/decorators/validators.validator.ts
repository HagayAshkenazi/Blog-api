import { FORBIDDEN_WORDS } from '@/constants';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import {
  WORD_SPLIT_REGEX,
  NON_SPACE_REGEX,
  HEBREW_CHAR_REGEX,
} from '@/constants/regex';

const FindAllForbiddenWords = (value: string): string[] => {
  const words = value.toLowerCase().split(WORD_SPLIT_REGEX).filter(Boolean);

  return FORBIDDEN_WORDS.filter((forbiddenWord: string) =>
    words.some(
      (word) => word === forbiddenWord || word.startsWith(forbiddenWord),
    ),
  );
};

const HasMostlyHebrewChars = (value: string): boolean => {
  const graphemes = value.normalize('NFC').match(NON_SPACE_REGEX) ?? [];
  const hebrew = graphemes.filter((char: string) =>
    HEBREW_CHAR_REGEX.test(char),
  ).length;

  return graphemes.length > 0 && hebrew / graphemes.length > 0.5;
};

export const NoForbiddenWords = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'NoForbiddenWords',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const forbiddenWords = FindAllForbiddenWords(value);

          if (forbiddenWords.length > 0) {
            args.object[`__forbiddenWords_${args.property}`] = forbiddenWords;
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          const forbiddenWords =
            args.object[`__forbiddenWords_${args.property}`] ?? [];

          return `common.validation.FORBIDDEN_WORDS|${forbiddenWords.join(', ')}`;
        },
      },
    });
  };
};

export const IsMostlyHebrew = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsMostlyHebrew',
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
