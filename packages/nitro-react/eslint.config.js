/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactCompiler from 'eslint-plugin-react-compiler';

import base from '../../eslint.base.config.js';

export default defineConfig([
    ...base,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: { version: 'detect' },
        },
    },
    reactHooks.configs.flat['recommended-latest'],
    {
        plugins: {
            'react-compiler': reactCompiler,
            'react-refresh': reactRefresh,
        },
        rules: {
            'react-compiler/react-compiler': 'error',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/react-in-jsx-scope': 'off',
        },
    }
]);
