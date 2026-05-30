/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.turbo/**',
        '**/.vite/**',
        '**/coverage/**',
        '**/*.d.ts',
    ]},
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    prettier,
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-else-return': 'warn',
            'no-lonely-if': 'warn',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        }
    }
];
