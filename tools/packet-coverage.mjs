/**
 * Packet coverage: the incoming messages nothing in the client listens to and the outgoing
 * composers nothing sends, grouped by the packet's folder under nitro-packets (its feature area).
 * A packet counts as used when its class name appears anywhere in nitro-react, nitro-renderer or
 * nitro-theme source. See docs/feature-gaps.md for how to read the result.
 *
 *   node tools/packet-coverage.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packages = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'packages');

const walk = dir => (fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => (entry.isDirectory()
            ? ([ 'node_modules', 'dist' ].includes(entry.name) ? [] : walk(path.join(dir, entry.name)))
            : (/\.(ts|tsx)$/.test(entry.name) ? [ path.join(dir, entry.name) ] : [])))
    : []);

const client = [ 'nitro-react/src', 'nitro-renderer/src', 'nitro-theme/src' ]
    .flatMap(dir => walk(path.join(packages, dir)))
    .map(file => fs.readFileSync(file, 'utf8'))
    .join('\n');

/** Every exported class under `dir`, with the first folder below `dir` as its area. */
const classesIn = (dir) => {
    const classes = [];

    for (const file of walk(dir)) {
        const area = path.relative(dir, path.dirname(file)).split(path.sep)[0] || '(root)';

        for (const match of fs.readFileSync(file, 'utf8').matchAll(/export class (\w+)/g)) classes.push({ name: match[1], area });
    }

    return classes;
};

const report = (label, classes) => {
    const unused = classes.filter(({ name }) => !new RegExp(`\\b${name}\\b`).test(client));
    const byArea = {};

    for (const { name, area } of unused) (byArea[area] ??= []).push(name);

    console.log(`\n## ${label}: ${unused.length} of ${classes.length}`);

    for (const [ area, names ] of Object.entries(byArea).sort((a, b) => b[1].length - a[1].length)) {
        console.log(`${area} (${names.length}): ${names.sort().join(', ')}`);
    }
};

const packets = path.join(packages, 'nitro-packets', 'src');

report('Incoming, parsed but never listened to', classesIn(path.join(packets, 'incoming')).filter(({ name }) => !/(Parser|Data)$/.test(name)));
report('Outgoing, never sent', classesIn(path.join(packets, 'outgoing')));
