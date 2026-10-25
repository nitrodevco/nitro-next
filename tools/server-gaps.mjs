/**
 * Server gaps: the packets the client uses that the Turbo checkout does not answer. For every
 * composer the client sends, whether Turbo registers a parser for its header and a handler for the
 * message the parser builds; for every message the client listens to, whether Turbo registers a
 * serializer for its header and refers to that composer anywhere outside the revision's
 * registration, the message primitives and the tests (a composer nothing refers to is never sent).
 * Packets are matched by header id, so differing names on the two sides do not matter.
 *
 * A packet counts as used by the client when its class name appears in nitro-react's source. A
 * Turbo composer counts as sent when anything refers to it, which can over-count (a method nothing
 * calls) but never misses a target-typed `new()`. See docs/server-gaps.md for how to read it.
 *
 *   node tools/server-gaps.mjs <turbo-cloud checkout>      (or TURBO_ROOT=<checkout>)
 *   node tools/server-gaps.mjs <checkout> --json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packages = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'packages');
const args = process.argv.slice(2);
const turbo = args.find(arg => !arg.startsWith('--')) ?? process.env.TURBO_ROOT;
const asJson = args.includes('--json');

if (!turbo || !fs.existsSync(turbo)) {
    console.error('Usage: node tools/server-gaps.mjs <turbo-cloud checkout>  (or set TURBO_ROOT)');
    process.exit(1);
}

const walk = (dir, pattern) => (fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => (entry.isDirectory()
            ? ([ 'node_modules', 'dist', 'bin', 'obj' ].includes(entry.name) ? [] : walk(path.join(dir, entry.name), pattern))
            : (pattern.test(entry.name) ? [ path.join(dir, entry.name) ] : [])))
    : []);
const read = file => fs.readFileSync(file, 'utf8');
const slash = file => file.split(path.sep).join('/');

// --- the client
const headersOf = file => new Map([ ...read(file).matchAll(/public static (\w+) = (\d+);/g) ].map(m => [ m[1], Number(m[2]) ]));
const registryOf = (file, kind) => new Map([ ...read(file).matchAll(new RegExp(`${kind}\\.(\\w+)\\]: (\\w+),`, 'g')) ].map(m => [ m[1], m[2] ]));

const incomingHeaders = headersOf(path.join(packages, 'nitro-packets/src/IncomingHeader.ts'));
const outgoingHeaders = headersOf(path.join(packages, 'nitro-packets/src/OutgoingHeader.ts'));
const incoming = registryOf(path.join(packages, 'nitro-packets/src/GetIncomingPackets.ts'), 'IncomingHeader');
const outgoing = registryOf(path.join(packages, 'nitro-packets/src/GetOutgoingPackets.ts'), 'OutgoingHeader');

const clientRoot = path.join(packages, 'nitro-react/src');
const clientFiles = walk(clientRoot, /\.(ts|tsx)$/).map(file => ({ file: slash(path.relative(clientRoot, file)), text: read(file) }));
const clientUses = name => clientFiles.filter(({ text }) => new RegExp(`\\b${name}\\b`).test(text)).map(({ file }) => file);

const parserFiles = walk(path.join(packages, 'nitro-packets/src/incoming'), /\.ts$/);
/** A message with fields: the client's parser reads something. */
const clientParserReads = (name) => {
    const file = parserFiles.find(candidate => path.basename(candidate, '.ts') === name);

    return !!file && /wrapper\.read|Parse\w*\(wrapper|Parser\(wrapper|\.parse\(wrapper/.test(read(file));
};

// --- Turbo
const revisionDir = walk(turbo, /^Headers\.cs$/).map(file => path.dirname(file)).sort().pop();

if (!revisionDir) {
    console.error(`No Turbo revision (Headers.cs) under ${turbo}`);
    process.exit(1);
}

const headersCs = read(path.join(revisionDir, 'Headers.cs'));
const section = (from, to) => headersCs.slice(headersCs.indexOf(from), to ? headersCs.indexOf(to) : undefined);
const constsOf = text => new Map([ ...text.matchAll(/const int (\w+) = (\d+);/g) ].map(m => [ Number(m[2]), m[1] ]));
const turboEvents = constsOf(section('class MessageEvent', 'class MessageComposer'));
const turboComposers = constsOf(section('class MessageComposer'));

const revisionCs = walk(revisionDir, /^Revision\d+\.cs$/).map(read).join('\n');
const turboParsers = new Map([ ...revisionCs.matchAll(/MessageEvent\.(\w+),\s*new (\w+)\(\)/g) ].map(m => [ m[1], m[2] ]));
const turboSerializers = new Map();

for (const m of revisionCs.matchAll(/typeof\((\w+)\),\s*new (\w+)\(\s*MessageComposer\.(\w+)/g)) {
    if (!turboSerializers.has(m[3])) turboSerializers.set(m[3], []);
    turboSerializers.get(m[3]).push(m[1]);
}

const turboFiles = walk(turbo, /\.cs$/).map(file => ({ file: slash(file), text: read(file) }));

/** Parser class -> the message it builds: `new XMessage`, a `typeof(XMessage)` for the wired parsers' base, else its name less `Parser`. */
const parserMessage = new Map();

for (const { file, text } of turboFiles) {
    if (!file.includes('/Parsers/')) continue;

    const parser = text.match(/class (\w+)\s*:[^{]*\bIParser\b/);

    if (!parser) continue;

    const message = text.match(/new (\w+Message)\b/) ?? text.match(/typeof\((\w+Message)\)/);

    parserMessage.set(parser[1], message ? message[1] : parser[1].replace(/Parser$/, ''));
}

const handled = new Set(turboFiles.flatMap(({ text }) => [ ...text.matchAll(/(?:IMessageHandler|\w+MessageHandler)<(\w+)>/g) ].map(m => m[1])));
const outsideRegistration = turboFiles.filter(({ file }) => !file.includes('/Turbo.Revisions/') && !file.includes('/Turbo.Primitives/Messages/') && !file.includes('/Turbo.Tests/'));
const referenced = name => outsideRegistration.some(({ text }) => new RegExp(`\\b${name}\\b`).test(text));

// --- compare
const sends = [];
const listens = [];

for (const [ name, cls ] of [ ...outgoing ].sort()) {
    const where = clientUses(cls);

    if (!where.length) continue;

    const event = turboEvents.get(outgoingHeaders.get(name));
    let status;

    if (!event) status = 'no Turbo header';
    else if (!turboParsers.has(event)) status = 'no parser';
    else if (!handled.has(parserMessage.get(turboParsers.get(event)))) status = 'no handler';

    if (status) sends.push({ packet: cls, header: outgoingHeaders.get(name), status, where });
}

for (const [ name, cls ] of [ ...incoming ].sort()) {
    const where = clientUses(cls).filter(file => !file.endsWith('index.ts'));

    if (!where.length) continue;

    const composer = turboComposers.get(incomingHeaders.get(name));
    const registered = composer ? (turboSerializers.get(composer) ?? []) : [];
    let status;

    if (!composer) status = 'no Turbo header';
    else if (!registered.length) status = 'no serializer';
    else if (!registered.some(referenced)) status = 'never sent';

    if (status) listens.push({ packet: cls, header: incomingHeaders.get(name), status, fields: clientParserReads(cls), where });
}

if (asJson) {
    console.log(JSON.stringify({ sends, listens }, null, 2));
} else {
    console.log(`## Sent by the client, not handled by Turbo: ${sends.length}`);
    for (const entry of sends) console.log(`${entry.status.padEnd(16)} ${entry.packet} (${entry.header})  - ${entry.where.slice(0, 2).join(', ')}`);
    console.log(`\n## Listened to by the client, never sent by Turbo: ${listens.length}`);
    for (const entry of listens) console.log(`${entry.status.padEnd(16)} ${entry.packet} (${entry.header})  - ${entry.where.slice(0, 2).join(', ')}`);
}
