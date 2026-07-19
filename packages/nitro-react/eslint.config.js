import js from '@eslint/js';
import stylistic from "@stylistic/eslint-plugin";
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from "eslint-plugin-import";
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
const config = [
    { 
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.turbo/**',
            '**/.vite/**',
            '**/coverage/**',
            '**/*.d.ts',
            'eslint.config.js',
            'prettier.config.js',
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettier,
    reactHooks.configs.flat['recommended-latest'],
    {
        plugins: {
            "import": importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            '@stylistic': stylistic,
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                allowDefaultProject: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-else-return': 'warn',
            'no-lonely-if': 'warn',
            "import/no-duplicates": "warn",
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
            "@stylistic/array-bracket-spacing": ["error"],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react-hooks/exhaustive-deps': 'off',
            'react/react-in-jsx-scope': 'off',
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-return": "off"
        },
    }
];

export default config;