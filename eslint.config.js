import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default tseslint.config([
  // Глобальные игноры
  globalIgnores([
    'dist',
    'node_modules',
    '*.config.*',
    '.env',
    '.env.*',
    'coverage'
  ]),

  // Базовые правила для всех файлов
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
      }
    },
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      // Оборачивать JSX в скобки, если многострочный
      "react/jsx-wrap-multilines": [
        "error",
        {
          "declaration": "parens-new-line",
          "assignment": "parens-new-line",
          "return": "parens-new-line",
          "arrow": "parens-new-line",
          "condition": "parens-new-line",
          "logical": "parens-new-line",
          "prop": "parens-new-line"
        }
      ],
      // Правила для тернарных выражений (чтобы не было слишком длинных строк)
      "operator-linebreak": ["error", "before"],
    }
  },

  // TypeScript правила
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  },

  // React правила
  {
    files: ['**/*.tsx'],
    extends: [
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    }
  },

  // Prettier ДОЛЖЕН быть последним!
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [prettier], // Отключает правила ESLint, которые конфликтуют с Prettier
  },
]);