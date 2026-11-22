/**
 * How the tools tests load the repository's TypeScript: transpiled with esbuild, then run in a fresh
 * context with stubs for what it imports. They used TypeScript's `transpileModule`, which TypeScript 7
 * does not have.
 *
 * `transpile` turns a source into JavaScript - CommonJS by default, an ES module (`format: 'esm'`, for an
 * `import()` of a `data:` url), or a plain script (`format: 'script'`, for code with no imports or exports).
 * Its CommonJS writes its exports onto the `exports` object of the context it runs in, as TypeScript's
 * output did. Class fields keep ES2022's define semantics, as TypeScript gave them for that target.
 *
 * `loadModule` is the common case: the module run with `require` answering each import from
 * `dependencies` (one it does not list fails the test) and `globals` in its context; its exports back.
 *
 * `classMembers` is the source of some members of a module's first class, in their order, for a test that
 * runs a few methods of a class it cannot construct (a canvas with no GPU).
 */
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';

import { parse } from '@babel/parser';
import { transformSync } from 'esbuild';

export const transpile = (source, { format = 'cjs', tsx = false } = {}) => {
    const { code } = transformSync(source, {
        loader: tsx ? 'tsx' : 'ts',
        format: (format === 'script') ? undefined : format,
        target: 'es2022',
        tsconfigRaw: { compilerOptions: { useDefineForClassFields: true } },
    });

    // esbuild's CommonJS assigns `module.exports`; the tests hand the module an `exports` object.
    return (format === 'cjs') ? `var module = { exports: {} };\n${code}\nObject.defineProperties(exports, Object.getOwnPropertyDescriptors(module.exports));\n` : code;
};

export const loadModule = (source, dependencies = {}, globals = {}) => {
    const exports = {};

    runInNewContext(transpile(source), { ...globals, exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

export const classMembers = (source, names) => {
    const { program } = parse(source, { sourceType: 'module', plugins: [ 'typescript' ] });
    const statement = program.body.find(node => (node.type === 'ClassDeclaration') || (node.declaration?.type === 'ClassDeclaration'));
    const declaration = (statement.type === 'ClassDeclaration') ? statement : statement.declaration;

    return declaration.body.body
        .filter(member => names.includes(member.key?.name ?? member.key?.id?.name))
        .map(member => source.slice(member.start, member.end));
};
