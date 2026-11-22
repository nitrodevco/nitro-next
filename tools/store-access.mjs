/**
 * How nitro-react reaches its stores, against [Client code conventions](../docs/client-conventions.md)
 * ("Stores"):
 *
 * - a view or a component never calls `xStore.getState()` - that belongs to handlers and commands;
 * - an action is taken from the feature's action hook (`useXActions`), read off the store once,
 *   never through a selector (`useXStore(x => x.setFoo)`), so an action user never re-renders.
 *
 * Nothing fails when either is broken, which is how three components came to select `setGiftReceiver`
 * and `setInventoryMoverRequested` from their stores, one of them from a slice with no action hook.
 *
 *   node tools/store-access.mjs
 *
 * Prints `ok` or one `DRIFT` line per finding (the format of the local drift checks) and exits 1 when
 * it found anything.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../packages/nitro-react/src/', import.meta.url));
const GET_STATE = /\b\w+Store\.getState\(\)/g;
const ACTION_SELECTOR = /\buse\w+Store\(\s*\w+\s*=>\s*\w+\.((?:set|add|remove|reset|toggle|update|clear|select|record|rename|step)[A-Z]\w*)\s*\)/g;
// Every name an action hook hands out is an action, whatever its verb: a verb list alone let
// `showConfirm`, `showAlert` and `getLocalizationValue` be selected from the system store.
const FIELD_SELECTOR = /\buse\w+Store\(\s*\w+\s*=>\s*\w+\.(\w+)\s*\)/g;
const ACTION_HOOK_ENTRY = /^\s*(\w+): state\.\w+,?\s*$/gm;

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
    const actions = new Set();

    for (const [ where, source ] of sources) {
        if (/^context\/.+\/actions\/use[^/]*Actions\.ts$/.test(where)) {
            for (const [ , name ] of source.matchAll(ACTION_HOOK_ENTRY)) actions.add(name);
        }
    }

    const problems = [];

    for (const [ where, source ] of [ ...sources ].sort(([ a ], [ b ]) => a.localeCompare(b))) {
        if (where.startsWith('views/') || where.startsWith('components/')) {
            for (const [ match ] of source.matchAll(GET_STATE)) problems.push(`${where} calls ${match}: a view or component reads stores through selector and action hooks`);
        }

        // A store's own hooks (`useTranslation` hands out `getLocalizationValue`) are where an action may be read.
        const selected = new Set([ ...source.matchAll(ACTION_SELECTOR) ].map(([ , name ]) => name));

        if (!where.startsWith('context/')) {
            for (const [ , name ] of source.matchAll(FIELD_SELECTOR)) {
                if (actions.has(name)) selected.add(name);
            }
        }

        for (const action of [ ...selected ].sort()) problems.push(`${where} selects the action ${action} from a store: take it from the feature's action hook`);
    }

    report(problems, `store access (${sources.size} files)`);
} catch (error) {
    console.error(error);
    process.exitCode = 2;
}
