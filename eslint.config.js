import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Single root config for every workspace (packages/*) - flat config resolves to the nearest
 * eslint.config.js by walking up from the current working directory, so having one shared file
 * here means `eslint <anything under packages/>` finds and uses this no matter which package
 * you run it from, instead of each package needing (and inevitably drifting from) its own copy.
 *
 * This also replaces Prettier as the formatter for .js/.jsx/.ts/.tsx (see root .prettierignore -
 * Prettier still formats non-code files like JSON/CSS/MD). Prettier's own formatter actively
 * fights two things this project wants: it strips any spacing added inside array literals
 * (`[ 1, 2 ]` -> `[1, 2]`) with no option to disable that, and it collapses multi-prop JSX back
 * onto one line whenever it fits the print width, with no "always break" option either -
 * confirmed by testing both directly against this project's prettier.config.js. `@stylistic`'s
 * `customize()` below is a comprehensive drop-in replacement for everything prettier.config.js
 * used to configure (indent/quotes/semicolons/trailing commas/arrow-paren style), with explicit
 * overrides afterward for the two properties customize()'s own defaults don't force unconditionally.
 */
const stylisticConfig = stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: true,
    jsx: true,
    arrowParens: false,
    braceStyle: '1tbs',
    blockSpacing: true,
    quoteProps: 'as-needed',
    commaDangle: 'always-multiline',
});

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
            '**/eslint.config.js',
            '**/postcss.config.js',
            '**/vite.config.*',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    stylisticConfig,
    {
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                allowDefaultProject: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-else-return': 'warn',
            'no-lonely-if': 'warn',

            // Imports: auto-sort, merge same-source imports, drop unused ones. 'error' (not
            // 'warn') so `eslint --fix` (and the editor's fixAll-on-save) always normalizes
            // these rather than leaving them as ignorable warnings.
            'import/no-duplicates': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',

            // --- Explicit overrides on top of the customize() baseline above ---
            // Deliberately the opposite of Prettier's own (non-configurable) array formatting.
            '@stylistic/array-bracket-spacing': ['error', 'always'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
            // customize()'s own jsx-max-props-per-line/jsx-first-prop-new-line defaults only
            // force a break once a tag is *already* multiline - these three force it whenever a
            // tag has more than one prop, regardless of how short the line would otherwise be.
            '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
            '@stylistic/jsx-first-prop-new-line': ['error', 'multiprop'],
            '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        },
    },
    {
        // Both packages carried this override in their old per-package configs (large amounts
        // of legacy/ported code rely on assignments that are dead by this rule's definition,
        // e.g. reused loop-scratch variables) - preserved here to avoid a wave of new errors
        // unrelated to this config consolidation.
        files: ['packages/nitro-renderer/**/*.{ts,tsx}', 'packages/nitro-imager/**/*.{ts,tsx}'],
        rules: {
            'no-useless-assignment': 'off',
        },
    },
    {
        files: ['packages/nitro-react/**/*.{ts,tsx}'],
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
            'react-hooks/exhaustive-deps': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
];

export default config;
