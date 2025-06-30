import { FORBIDDEN_WORDS } from '@/consts';
import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  WORD_SPLIT_REGEX,
  NON_SPACE_REGEX,
  HEBREW_CHAR_REGEX,
} from '@/consts/regex';

const FindAllForbiddenWords = (value: string): string[] => {
  const words = value.toLowerCase().split(WORD_SPLIT_REGEX).filter(Boolean);

  return FORBIDDEN_WORDS.filter(forbiddenWord =>
    words.some(
      word => word === forbiddenWord || word.startsWith(forbiddenWord),
    ),
  );
};

const HasMostlyHebrewChars = (value: string): boolean => {
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
        validate(value: string, args: ValidationArguments) {
          const forbiddenWords = FindAllForbiddenWords(value);
          if (forbiddenWords.length > 0) {
            (args.constraints as any) = [forbiddenWords];
            return false;
          }
          return true;
        },
        defaultMessage: (args: I18nValidationArguments) => {
          const forbiddenWords: string[] = args.constraints?.[0] ?? [];
          return args.t('common.validation.FORBIDDEN_WORDS', {
            args: {
              property: args.property,
              words: forbiddenWords.join(', '),
            },
          });
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
