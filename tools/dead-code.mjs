/**
 * Code in nitro-react nothing can reach - [Client code conventions](../docs/client-conventions.md):
 * "a file nothing imports ... is deleted, not kept for later".
 *
 * - A module nothing imports: `WiredWindowWrapper.tsx` sat in the wired kit with no user.
 * - An export nothing else names. A barrel re-exports everything, so a module can be "imported"
 *   through its barrel while no file uses what it exports - ten files and a dozen functions sat like
 *   that. Left out: UPPER_CASE constants (a Flash class is mirrored whole, readers or not) and types.
 *   An action hook is not exempt: a slice has one only where a component calls its actions - 26 sat
 *   unimported. The tool tests count as users.
 * - A window nothing opens: every `WindowRegistry` name needs a `showWindow('<name>')` /
 *   `toggleWindow('<name>')` somewhere, or a `useWindowVisibility('<name>')` whose `show` / `toggle`
 *   is used. The messenger window was mounted and registered, and nothing ever opened it, so its
 *   placeholder view could never draw; `layout_browser` was registered with no window at all.
 *
 * Barrels (`index.ts`), the entry point, type declarations and `*.check.ts` files (type assertions only
 * `tsc` reads, as `clientModuleSdk.check.ts`) are not modules anything names by path.
 *
 *   node tools/dead-code.mjs
 *
 * Prints `ok` or one `DRIFT` line per finding (the format of the local drift checks) and exits 1 when
 * it found anything.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../packages/nitro-react/src/', import.meta.url));
const TOOLS = fileURLToPath(new URL('.', import.meta.url));
const ENTRY = new Set([ 'index.tsx', 'index.ts', 'vite-env.d.ts' ]);
const EXPORT = /^export (?:const|function|class|abstract class) ([A-Za-z_]\w*)/gm;

/**
 * Exports nothing else uses that stay exported on purpose: name -> why. Each entry is a decision; the
 * check reports one that no module exports any more, or that something now uses.
 */
const EXPORTS_UNUSED = new Map();

const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const occurrences = (name, text) => text.match(new RegExp(`\\b${escape(name)}\\b`, 'g'))?.length ?? 0;

/** Every `.ts` / `.tsx` file under `root`, by its path from `root` with `/` separators. */
const sourcesUnder = (root) => {
    const found = new Map();
    const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const path = join(dir, entry.name);

            if (entry.isDirectory()) walk(path);
            else if (/\.tsx?$/.test(entry.name)) found.set(relative(root, path).split('\\').join('/'), readFileSync(path, 'utf8'));
        }
    };

    walk(root);

    return found;
};

const report = (problems, title) => {
    if (!problems.length) {
        console.log(`ok     ${title}`);
        return;
    }

    for (const problem of problems) console.log(`DRIFT  ${title}: ${problem}`);

    process.exitCode = 1;
};

try {
    const sources = sourcesUnder(SRC);
    const everything = [ ...sources.values() ].join('\n');
    const sorted = [ ...sources ].sort(([ a ], [ b ]) => (a < b ? -1 : (a > b ? 1 : 0)));
    const problems = [];

    for (const [ where ] of sorted) {
        const name = where.split('/').pop();

        if (ENTRY.has(name) || name.endsWith('.d.ts') || name.endsWith('.check.ts') || (!where.includes('/') && name.startsWith('index'))) continue;

        const stem = escape(name.replace(/\.[^.]*$/, ''));

        if (!new RegExp(`(?:from|import\\(?)\\s*'[^']*(?:/|^)${stem}'`).test(everything)) problems.push(`${where}: nothing imports it`);
    }

    // The tool tests (and other tools) count as users; these two checks name code, they do not use it.
    const tools = readdirSync(TOOLS)
        .filter(file => file.endsWith('.mjs') && ![ 'dead-code.mjs', 'store-access.mjs' ].includes(file))
        .map(file => readFileSync(join(TOOLS, file), 'utf8'))
        .join('');
    const words = new Map();

    for (const [ where, source ] of sources) {
        if (where.endsWith('/index.ts')) continue;

        for (const [ word ] of source.matchAll(/\b[A-Za-z_]\w*\b/g)) {
            if (!words.has(word)) words.set(word, new Set());

            words.get(word).add(where);
        }
    }

    for (const [ where, source ] of sorted) {
        if (where.endsWith('/index.ts')) continue;

        for (const [ , name ] of source.matchAll(EXPORT)) {
            if (/^[A-Z0-9_]+$/.test(name)) continue;

            const users = new Set(words.get(name) ?? []);

            users.delete(where);

            if (users.size || occurrences(name, tools)) continue;
            // Used in its own file only: exported needlessly, but not dead.
            if (occurrences(name, source) > 1) continue;
            if (EXPORTS_UNUSED.has(name)) continue;

            problems.push(`${where}: ${name} is exported and nothing else uses it`);
        }
    }

    for (const name of [ ...EXPORTS_UNUSED.keys() ].sort()) {
        const exported = new RegExp(`^export (?:const|function|class|abstract class) ${escape(name)}\\b`, 'm');

        if (![ ...sources.values() ].some(source => exported.test(source))) problems.push(`${name} is listed in EXPORTS_UNUSED but no module exports it any more`);
        else if ((words.get(name)?.size ?? 0) > 1) problems.push(`${name} is listed in EXPORTS_UNUSED but is used now`);
    }

    const registry = sources.get('context/system/store/WindowRegistry.ts');
    let body = registry.slice(registry.indexOf('export type WindowRegistry = {'));

    body = body.slice(0, body.indexOf('\n};'));

    for (const [ , window ] of body.matchAll(/^\s+([a-z_]+):\s*\w/gm)) {
        let opened = new RegExp(`(?:showWindow|toggleWindow)\\(\\s*'${window}'`).test(everything);

        if (!opened) {
            opened = [ ...sources.values() ].some(source => source.includes(`useWindowVisibility('${window}')`) && /\b(?:show|toggle)\(/.test(source));
        }

        if (!opened) problems.push(`window ${window} is registered and nothing opens it`);
    }

    report(problems, `dead code (${sources.size} modules, every window opened)`);
} catch (error) {
    console.error(error);
    process.exitCode = 2;
}
