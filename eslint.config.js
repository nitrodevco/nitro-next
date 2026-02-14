import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const TS_PROJECTS = ['./tsconfig.base.json', './packages/*/tsconfig.json'];

export default [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.turbo/**',
            '**/.vite/**',
            '**/coverage/**',
            '**/*.d.ts',
        ],
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                // This enables type-aware rules across the monorepo
                project: TS_PROJECTS,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            indent: ['warn', 4, { SwitchCase: 1 }],
            'no-console': 'off',
            'no-debugger': 'warn',
            'prefer-const': 'warn',
            'no-else-return': 'warn',
            'no-lonely-if': 'warn',
            'no-tabs': 'error',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            '@typescript-eslint/indent': ['warn', 4],
            '@typescript-eslint/prefer-as-const': 'warn',
            '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
        },
    },

    // 4) React-only rules for your React package(s)
    {
        files: ['packages/**/src/**/*.{ts,tsx,js,jsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // Vite React refresh: only export components
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

    // 6) Disable formatting conflicts if you use Prettier
    prettier,
];
