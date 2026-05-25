/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
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
    ...tseslint.configs.recommendedTypeChecked,
    prettier,
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            globals: {
                ...globals.browser
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        '*.config.js',
                        '*.config.ts',
                        'packages/*/*.config.js',
                        'packages/*/*.config.ts',
                    ],
                },
                tsconfigRootDir: import.meta.dirname,
            },
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
        },
    },

    // React-only rules
    {
        files: ['packages/**/src/**/*.{ts,tsx,js,jsx}'],
        plugins: {
            ...reactHooks.configs.flat['recommended-latest'].plugins,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...reactHooks.configs.flat['recommended-latest'].rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/react-in-jsx-scope': 'off',
        },
    },

    // 5) Node/server packages (optional narrower override)
    {
        files: ['packages/**/src/**/*.{ts,js}'],
        ignores: ['packages/**/src/**/*.test.*'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]);
