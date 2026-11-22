/**
 * Brings generated packets in from the packet tool without losing the ones that were finished
 * by hand.
 *
 * The tool writes a whole tree of composers and parsers, and a good number of them come out
 * empty because it could not read the ActionScript. Those get filled in here, against the
 * decompiled client, and marked with `PRESERVE_MARKER` - and the tool knows nothing about that,
 * so a straight copy would throw the work away. This walks both trees and copies only what is
 * safe to copy, listing everything it skipped and why.
 *
 * Dry by default; nothing is written without `--apply`. `--new-only` is the safe half of the
 * job - it brings in packets the repo does not have at all and leaves every existing one alone,
 * which is usually what is wanted after the tool learns a new message.
 *
 * Three things a path-by-path copy gets wrong, and this does not:
 *
 * - The tool moves classes between folders (`Wiredtrading/Chests` became `Vault`). A class the
 *   repo already has under another folder is listed as moved, never added a second time - two
 *   exports of one name break the barrel.
 * - A header registered to an older class name (`FigureSetIdsMessage` ->
 *   `FigureSetIdsEventMessage`) already has its packet; the tool's copy would be a shadow stub.
 * - Not every hand-finished packet carries the marker. An existing file is overwritten only
 *   when it is still an empty stub; anything with a body is listed for a diff by hand, unless
 *   `--force` says the tool's version is wanted everywhere.
 *
 * The tool's output folder is `--from <dir>`, else the `PACKET_TOOL_OUT` environment variable:
 *
 *   node scripts/sync-generated-packets.ts --from <packet tool output>
 *   node scripts/sync-generated-packets.ts --new-only --apply
 *   node scripts/sync-generated-packets.ts --from <packet tool output> --apply
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(HERE, '../src');

/** Written into every packet whose body was filled in by hand. Its presence means "do not copy". */
const PRESERVE_MARKER = 'Body filled by hand';

/**
 * The header maps are the repo's own: ids move between revisions and the repo tracks the ones
 * its server actually speaks, so they are never taken from the tool.
 */
const NEVER_COPY = [ 'IncomingHeader.ts', 'OutgoingHeader.ts', 'GetIncomingPackets.ts', 'GetOutgoingPackets.ts', 'index.ts' ];

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const newOnly = args.includes('--new-only');
const force = args.includes('--force');
const fromIndex = args.indexOf('--from');
const FROM_DIR = (fromIndex > -1) ? args[fromIndex + 1] : process.env.PACKET_TOOL_OUT;

const walk = (dir: string, found: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);

        if (statSync(path).isDirectory()) walk(path, found);
        // `.d.ts` files are the tool's own type shims, not packets.
        else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) found.push(path);
    }

    return found;
};

if (!FROM_DIR || !existsSync(FROM_DIR)) {
    console.error(FROM_DIR ? `No generated packets at ${ FROM_DIR } - pass --from <dir>.` : 'Name the packet tool\'s output: --from <dir>, or set PACKET_TOOL_OUT.');
    process.exit(1);
}

const className = (path: string) => (path.split(/[\\/]/).pop() ?? '').replace(/\.ts$/, '');

/** Where each class the repo already has lives, so a moved one is recognised by name. */
const repoClasses = new Map<string, string>();

for (const path of walk(SRC_DIR)) repoClasses.set(className(path), relative(SRC_DIR, path).split('\\').join('/'));

/** Headers the registries give to a class of another name: `FigureSetIdsMessage` -> `FigureSetIdsEventMessage`. */
const legacyNamed = new Map<string, string>();

for (const registry of [ 'GetIncomingPackets.ts', 'GetOutgoingPackets.ts' ]) {
    for (const [ , header, registered ] of readFileSync(join(SRC_DIR, registry), 'utf8').matchAll(/\[\s*\w+Header\.(\w+)\s*\]\s*:\s*(\w+)/g)) {
        if (header !== registered) legacyNamed.set(header, registered);
    }
}

/** A generated packet nobody has touched: no fields in its type, so nothing is lost by replacing it. */
const isEmptyStub = (content: string) => /Type = object;/.test(content);

/**
 * Tool helpers the repo has under another name, so a sync does not bring in a second copy of the
 * same parser: tool class -> what the repo uses instead. `wire.py`'s `reads()` tells whether two
 * parsers are the same.
 */
const REPLACED: Record<string, string> = {
    ParseItemData: 'TradingItemListParser reads both item lists with ParseArray',
    IWiredTradeItemsUpdateTradingItem: 'ITradingItemList - Flash has one TradingItemListParser, the tool repeats it per packet',
    WiredTradeItemsUpdateTradingItemParser: 'TradingItemListParser',
    IWiredTransactionLogListLog: 'IWiredTransactionLogList, named after Flash WiredTransactionLogList',
    WiredTransactionLogListLogParser: 'WiredTransactionLogListParser',
    WiredTradeInitiateEnum: 'TradeRequirementRulesType - the constants belong to TradeRequirementRules, not to the initiate packet',
    IWiredValidationErrorData: 'IWiredValidationErrorParameter, declared in WiredValidationErrorEventMessage',
    WiredValidationErrorDataParser: 'read inline by WiredValidationErrorEventMessage',
    // SnowWar: the tool cannot follow `SnowWarGameObjectData.create` / `SnowWarGameEventData.create`.
    IFuseObjectData: 'ISnowWarFuseObjectData',
    IGame2GameResult: 'declared in incoming/Data/Game2GameResultParser',
    IGame2SnowWarGameStats: 'declared in incoming/Data/Game2SnowWarGameStatsParser',
    Create: 'SnowWarGameObjectDataParser - one ISnowWarGameObjectData carries every type\'s variable vector',
    IGameObjectsData: 'GameObjectsDataParser returns ISnowWarGameObjectData[]',
    IHumanGameObjectData: 'ISnowWarGameObjectData',
    ISnowballGameObjectData: 'ISnowWarGameObjectData',
    ISnowballMachineGameObjectData: 'ISnowWarGameObjectData',
    ISnowballPileGameObjectData: 'ISnowWarGameObjectData',
    ITreeGameObjectData: 'ISnowWarGameObjectData',
    ICreateSnowballEventData: 'ISnowWarCreateSnowballEventData, in ISnowWarGameEventData',
    IHumanGetsSnowballsFromMachineEventData: 'ISnowWarHumanGetsSnowballsFromMachineEventData, in ISnowWarGameEventData',
    IHumanLeftGameEventData: 'ISnowWarHumanLeftGameEventData, in ISnowWarGameEventData',
    IHumanStartsToMakeASnowballEventData: 'ISnowWarHumanStartsToMakeASnowballEventData, in ISnowWarGameEventData',
    IHumanThrowsSnowballAtHumanEventData: 'ISnowWarHumanThrowsSnowballAtHumanEventData, in ISnowWarGameEventData',
    IHumanThrowsSnowballAtPositionEventData: 'ISnowWarHumanThrowsSnowballAtPositionEventData, in ISnowWarGameEventData',
    IMachineCreatesSnowballEventData: 'ISnowWarMachineCreatesSnowballEventData, in ISnowWarGameEventData',
    INewMoveTargetEventData: 'ISnowWarNewMoveTargetEventData, in ISnowWarGameEventData',
};

const added: string[] = [];
const replaced: string[] = [];
const updated: string[] = [];
const kept: string[] = [];
const moved: string[] = [];
const shadowed: string[] = [];
const differing: string[] = [];
let unchanged = 0;

for (const source of walk(FROM_DIR)) {
    const rel = relative(FROM_DIR, source).split('\\').join('/');

    if (NEVER_COPY.includes(rel.split('/').pop() ?? '')) continue;

    const target = join(SRC_DIR, rel);

    if (!existsSync(target)) {
        const name = className(rel);

        if (repoClasses.has(name)) {
            moved.push(`${ rel }  (repo: ${ repoClasses.get(name) })`);
            continue;
        }

        if (legacyNamed.has(name)) {
            shadowed.push(`${ rel }  (registered as ${ legacyNamed.get(name) })`);
            continue;
        }

        if (REPLACED[name]) {
            replaced.push(`${ rel }  (${ REPLACED[name] })`);
            continue;
        }

        added.push(rel);

        if (apply) {
            mkdirSync(dirname(target), { recursive: true });
            copyFileSync(source, target);
        }

        continue;
    }

    const current = readFileSync(target, 'utf8');

    // A packet finished by hand is the better of the two, whatever the tool now says.
    if (current.includes(PRESERVE_MARKER)) {
        kept.push(rel);
        continue;
    }

    if (current === readFileSync(source, 'utf8')) {
        unchanged++;
        continue;
    }

    if (!force && !isEmptyStub(current)) {
        differing.push(rel);
        continue;
    }

    updated.push(rel);

    if (apply && !newOnly) copyFileSync(source, target);
}

const list = (title: string, items: string[]) => {
    if (!items.length) return;

    console.log(`\n${ title } (${ items.length })`);

    for (const item of items) console.log(`  ${ item }`);
};

console.log(`${ apply ? 'Synced' : 'Would sync' } from ${ FROM_DIR }`);
console.log(`  unchanged: ${ unchanged }`);
console.log(`  hand-filled, left alone: ${ kept.length }`);
console.log(`  would be added: ${ added.length }`);
console.log(`  ${ newOnly ? 'differing, left alone (--new-only)' : 'would be overwritten' }: ${ updated.length }`);

list('New packets', added);

if (!newOnly) list('Overwritten', updated);

list('Moved by the tool - the repo keeps its own path', moved);
list('Header already served by an older class name - not added', shadowed);
list('The repo has this helper under another name - not added', replaced);
list('Has a body and no marker - diff by hand, or --force', differing);

if (added.length) {
    console.log('\nNew packets are not exported yet. Add to src/index.ts:');

    for (const rel of added) console.log(`export * from './${ rel.replace(/\.ts$/, '') }';`);
}

if (!apply) console.log('\nNothing was written. Re-run with --apply.');
