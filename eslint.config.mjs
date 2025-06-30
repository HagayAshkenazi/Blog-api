import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierEslintRecommended from 'eslint-plugin-prettier/recommended';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierEslintRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      perfectionist,
      '@typescript-eslint': tsEslint.plugins['@typescript-eslint'],
      '@nestjs': 'eslint-plugin-nestjs', // Add NestJS plugin if installed
    },
    settings: {
      perfectionist: {
        type: 'line-length',
        partitionByComment: true,
        partitionByNewLine: true,
      },
    },
    rules: {
      // Perfectionist ordering
      'perfectionist/sort-objects': 'error',

      // TypeScript strictness
      '@typescript-eslint/no-explicit-any': 'error', // disallow any for stricter typing
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      // NestJS specific best practices (you need to install eslint-plugin-nestjs)
      '@nestjs/use-guards': 'warn',
      '@nestjs/use-interceptors': 'warn',
      '@nestjs/use-pipes': 'warn',
      '@nestjs/use-filters': 'warn',

      // General best practices
      'no-console': 'warn',
      'no-debugger': 'error',

      // Prettier formatting
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          arrowParens: 'avoid',
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
        },
      ],
    },
  },
);
