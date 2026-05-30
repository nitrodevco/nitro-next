import { defineConfig } from 'eslint/config';

import base from './eslint.base.config.js';

export default defineConfig([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...base,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.config.js', '*.config.ts', 'packages/*/*.config.js', 'packages/*/*.config.ts'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
]);
