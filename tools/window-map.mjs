/**
 * The window map in `template-index.json` (`tools/skin-map.mjs` writes it): which templates are the WINDOWS a
 * player sees - a template the client opens as a window of its own, or a frame Nitro draws itself - and which
 * are PARTS drawn inside them (item renderers like `badgeGridItem`, the catalogue's page layouts, widgets, list
 * rows), each window with a friendly name and an area, read from the client's source:
 *
 * - What a source file draws: the template ids it names (`'habbo-catalog-com/purse_xml'`), an asset name with
 *   its library in reach (`catalogTemplateId('badgeGridItem')`, the library named in the file or a file it
 *   imports), a template literal standing for a family (`layout_${name}`: every `layout_*` of the library),
 *   and a `<Frame id>` of Nitro's own.
 * - Which file holds which: the imports, through the barrels (`#base/theme`'s `export *`) to the file that
 *   exports the name. A file's OWNERS are the nearest files above it, by imports, that draw something.
 * - A window: a template whose root is a `frame` (Flash's window type), a frame of Nitro's own, and the main
 *   template of a file no other drawing file holds (the toolbar, the purse, the infostand: the largest
 *   template it names). Every other template a file names is a part of that file's windows, or of its
 *   owners' windows when it has none, up the imports.
 * - A window's name: its caption's text in English (`${catalog.title}` -> "Catalogue", from `--texts` or the
 *   config's `gamedata.urls.externalTexts`), else a name made from its asset; its area: the feature folder of
 *   the file that draws it, else its library.
 *
 * Templates the client never draws are `unused` (Habbo's windows not ported yet); a template drawn but owned
 * by no window is an `orphan`. Pure Node, no TypeScript: `skin-map.mjs` passes the templates it read.
 */
import fs from 'node:fs';
import path from 'node:path';

/** The areas a theme author picks a window from, in the order they are listed. */
export const WINDOW_AREAS = [ 'Catalogue', 'Navigator', 'Inventory', 'Toolbar & purse', 'Room', 'Chat', 'Friends & messenger', 'Groups', 'Wired', 'Help & moderation', 'Games', 'Hotel view', 'Loading' ];

/** A feature folder of the client's source (`views/<folder>`, `components/<folder>`) to its area. */
const FOLDER_AREAS = {
    catalog: 'Catalogue', collectibles: 'Catalogue', habbicons: 'Catalogue', 'offer-center': 'Catalogue', 'special-items': 'Catalogue', earnings: 'Catalogue', 'cursed-dragon-adoption': 'Catalogue', 'habbo-pages': 'Catalogue',
    navigator: 'Navigator',
    inventory: 'Inventory',
    toolbar: 'Toolbar & purse', purse: 'Toolbar & purse', achievements: 'Toolbar & purse', quests: 'Toolbar & purse', 'avatar-editor': 'Toolbar & purse', 'reward-track': 'Toolbar & purse', 'daily-tasks': 'Toolbar & purse', 'badge-leaderboard': 'Toolbar & purse', 'user-profile': 'Toolbar & purse',
    'room-widgets': 'Room', room: 'Room',
    chat: 'Chat',
    friendlist: 'Friends & messenger', messenger: 'Friends & messenger', 'friend-bar': 'Friends & messenger',
    groups: 'Groups', 'group-forums': 'Groups',
    'wired-common': 'Wired', 'wired-link': 'Wired', 'wired-menu': 'Wired', 'wired-setup': 'Wired', 'wired-trading': 'Wired',
    help: 'Help & moderation', moderation: 'Help & moderation', hints: 'Help & moderation', onboarding: 'Help & moderation',
    'game-center': 'Games',
    'hotel-view': 'Hotel view', campaign: 'Hotel view', notifications: 'Hotel view', system: 'Hotel view', 'client-modules': 'Hotel view',
    'loading-screen': 'Loading',
};

/** A template library to the area of its windows, where no source folder says. */
const LIBRARY_AREAS = {
    'habbo-catalog-com': 'Catalogue', 'habbo-navigator-com': 'Navigator', 'habbo-new-navigator': 'Navigator', 'habbo-inventory-com': 'Inventory',
    'habbo-toolbar-com': 'Toolbar & purse', 'habbo-quest-engine-com': 'Toolbar & purse', 'habbo-avatar-editor-com': 'Toolbar & purse',
    'habbo-room-ui-com': 'Room', 'habbo-friend-list-com': 'Friends & messenger', 'habbo-messenger-com': 'Friends & messenger', 'habbo-friend-bar-com': 'Friends & messenger',
    'habbo-groups-com': 'Groups', 'habbo-user-defined-room-events-com': 'Wired', 'habbo-help-com': 'Help & moderation', 'habbo-moderation-com': 'Help & moderation',
    'habbo-games-com': 'Games', 'habbo-notifications-com': 'Hotel view', 'habbo-window-manager-com': 'Hotel view',
};

/** Names for windows whose caption names no text (a frame of Nitro's own, a window with no title). */
const CURATED_NAMES = {
    'habbo-toolbar-com/toolbar_xml': 'Toolbar',
    'habbo-toolbar-com/purse_xml': 'Purse',
    'habbo-room-ui-com/furni_view': 'Furni info (infostand)',
    'habbo-room-ui-com/jukebox_view': 'Jukebox info (infostand)',
    'habbo-room-ui-com/songdisk_view': 'Song disk info (infostand)',
    'habbo-room-ui-com/crackable_furni_view': 'Crackable furni info (infostand)',
    'habbo-room-ui-com/user_view': 'User info (infostand)',
    'habbo-room-ui-com/bot_view': 'Bot info (infostand)',
    'habbo-room-ui-com/pet_view': 'Pet info (infostand)',
};

/**
 * Templates that are windows of their own though no frame holds them and their file names others: the
 * infostand draws one of its layouts by what is selected (`InfostandFurniView`'s `VARIANT_TEMPLATES`), each
 * a window a player sees, none a part of another.
 */
const OWN_WINDOWS = new Set([ 'habbo-room-ui-com/furni_view', 'habbo-room-ui-com/jukebox_view', 'habbo-room-ui-com/songdisk_view', 'habbo-room-ui-com/crackable_furni_view' ]);

/** The hotel's texts (`key=value` lines) from a file or an address; empty when neither gives any. */
export const readTexts = async (from) => {
    if (!from) return {};

    let text;

    try {
        text = /^https?:/i.test(from) ? await (await fetch(from)).text() : fs.readFileSync(from, 'utf8');
    } catch {
        return {};
    }

    const texts = {};

    for (const line of text.split(/\r?\n/)) {
        const at = line.indexOf('=');

        if (at > 0) texts[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }

    return texts;
};

const SOURCE = /\.(tsx?)$/;

/** Every source file of the client (not the preview host's own), by absolute path, with its text. */
const readSources = (src) => {
    const files = new Map();
    const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        const file = path.join(dir, entry.name);

        if (entry.isDirectory()) return (file !== path.join(src, 'views', 'preview')) && walk(file);

        if (SOURCE.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) files.set(file, fs.readFileSync(file, 'utf8'));
    });

    walk(src);

    return files;
};

/** The file an import names, or `undefined` for a package. */
const resolveImport = (src, from, specifier, files) => {
    let base;

    if (specifier.startsWith('#base/')) base = path.join(src, specifier.slice('#base/'.length));
    else if (specifier.startsWith('.')) base = path.resolve(path.dirname(from), specifier);
    else return undefined;

    return [ base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx') ].find(file => files.has(file));
};

const IMPORT = /\bimport\s+(type\s+)?([\s\S]*?)\s+from\s+'([^']+)'/g;
const REEXPORT = /\bexport\s+(?:\*|\{([^}]*)\})\s+from\s+'([^']+)'/g;
const DECLARED = /\bexport\s+(?:const|function|class|enum|let|interface|type|abstract class)\s+([A-Za-z0-9_$]+)/g;

/**
 * Who imports whom: each file's imported files, a barrel's names followed to the file declaring them
 * (`import { TemplateWindow } from '#base/theme'` is the file `TemplateWindow.tsx`, not every file of the barrel).
 */
const importGraph = (src, files) => {
    const declared = new Map([ ...files ].map(([ file, text ]) => [ file, new Set([ ...text.matchAll(DECLARED) ].map(match => match[1])) ]));
    const reexports = new Map([ ...files ].map(([ file, text ]) => [ file, [ ...text.matchAll(REEXPORT) ].map(match => ({ names: match[1]?.split(',').map(name => name.trim().split(/\s+as\s+/).pop()).filter(Boolean), file: resolveImport(src, file, match[2], files) })).filter(entry => entry.file) ]));

    /** The file declaring `name`, reached from `file` through its re-exports. */
    const owner = (file, name, seen = new Set()) => {
        if (seen.has(file)) return undefined;

        seen.add(file);

        if (declared.get(file)?.has(name)) return file;

        for (const entry of reexports.get(file) ?? []) {
            if (entry.names && !entry.names.includes(name)) continue;

            const found = owner(entry.file, name, seen);

            if (found) return found;
        }

        return undefined;
    };

    const imports = new Map();
    /** Per importer, the names it takes from each file (`*`: the whole file - a default or namespace import). */
    const names = new Map();

    for (const [ file, text ] of files) {
        const to = new Set();
        const taken = new Map();
        const take = (target, name) => {
            to.add(target);
            taken.set(target, new Set([ ...(taken.get(target) ?? []), name ]));
        };

        for (const match of text.matchAll(IMPORT)) {
            if (match[1]) continue;

            const target = resolveImport(src, file, match[3], files);

            if (!target) continue;

            const listed = /\{([^}]*)\}/.exec(match[2])?.[1].split(',').map(name => name.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]).filter(Boolean) ?? [];
            let whole = !listed.length;

            for (const name of listed) {
                const reached = owner(target, name);

                if (reached) take(reached, name);
                else whole = true;
            }

            if (whole) take(target, '*');
        }

        imports.set(file, to);
        names.set(file, taken);
    }

    return { imports, names };
};

/** `layout_${name}` as a pattern of asset names, `undefined` when too little of it is fixed to name a family. */
const literalPattern = (literal) => {
    const parts = literal.split(/\$\{[^}]*\}/);
    const fixed = parts.join('');

    if ((parts.length < 2) || (fixed.replace(/[^A-Za-z]/g, '').length < 4)) return undefined;

    return new RegExp(`^${parts.map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.+')}$`);
};

/** The window type a template's root is: a `frame` is a window of its own in Flash's window manager. */
const isFrame = template => template?.elements?.[0]?.tag === 'frame';

/** A template's root element, whose size is the window's. */
const rootOf = template => template.elements[0];

/**
 * The window map from the templates (by id, as the bundles give them), the client's source folder
 * (`packages/nitro-react/src`), the frames Nitro draws itself (`frame id -> styles`) and the hotel's texts.
 */
export const buildWindowMap = ({ templates, src, nitroFrames, texts }) => {
    const files = readSources(src);
    const { imports, names } = importGraph(src, files);
    const ids = Object.keys(templates);
    const byAsset = new Map();

    for (const id of ids) {
        const asset = id.slice(id.indexOf('/') + 1);

        byAsset.set(asset, [ ...(byAsset.get(asset) ?? []), id ]);
    }

    const libraries = [ ...new Set(ids.map(id => id.slice(0, id.indexOf('/')))) ];

    /** The libraries a file names, itself or through what it imports directly (`CATALOG_LIBRARY`'s file). */
    const librariesIn = (file) => {
        const found = new Set();
        const scan = text => libraries.forEach(library => text.includes(library) && found.add(library));

        scan(files.get(file));
        imports.get(file)?.forEach(each => scan(files.get(each)));

        return found;
    };

    /** What a file draws: template ids, and `frame:<id>` for a frame of Nitro's own. */
    const draws = new Map();
    /** Per drawing file, the exported declarations each is named in (`*`: outside any, the whole file's). */
    const symbols = new Map();

    for (const [ file, text ] of files) {
        const found = new Set();
        const inReach = librariesIn(file);
        const exportsAt = [ ...text.matchAll(/^export\s+(?:const|function|class)\s+([A-Za-z0-9_$]+)/gm) ].map(match => ({ at: match.index, name: match[1] }));
        const bySymbol = new Map();
        const add = (id, offset) => {
            found.add(id);
            bySymbol.set(id, new Set([ ...(bySymbol.get(id) ?? []), exportsAt.filter(entry => entry.at <= offset).pop()?.name ?? '*' ]));
        };

        for (const match of text.matchAll(/(['"`])((?:(?!\1)[^\\\n]|\\.)*)\1/g)) {
            const literal = match[2];

            if (templates[literal]) {
                add(literal, match.index);
                continue;
            }

            const slash = literal.indexOf('/');
            const library = (slash > 0) ? literal.slice(0, slash) : undefined;
            // `${LIBRARY}/friend_entry_xml`: the library a constant in reach names, the asset fixed.
            const asset = (library && libraries.includes(library)) || ((match[1] === '`') && /^\$\{[^}]*\}$/.test(library ?? '')) ? literal.slice(slash + 1) : literal;
            const pattern = (match[1] === '`') ? literalPattern(asset) : undefined;
            const candidates = pattern ? ids.filter(id => pattern.test(id.slice(id.indexOf('/') + 1))) : (byAsset.get(asset) ?? []);

            for (const id of candidates) {
                const of = id.slice(0, id.indexOf('/'));

                if ((library && libraries.includes(library)) ? (of === library) : inReach.has(of)) add(id, match.index);
            }
        }

        for (const match of text.matchAll(/<(?:Frame|WiredTradingFrame)\s[\s\S]{0,600}?\bid=(?:"([^"]+)"|\{`([^`]+)`\})/g)) {
            const id = match[1] ?? match[2].replace(/\$\{[^}]*\}/g, '*');

            if (nitroFrames[id]) add(`frame:${id}`, match.index);
        }

        if (found.size) {
            draws.set(file, found);
            symbols.set(file, bySymbol);
        }
    }

    const importedBy = new Map();

    for (const [ file, to ] of imports) to.forEach(each => importedBy.set(each, [ ...(importedBy.get(each) ?? []), file ]));

    /**
     * The nearest files above `file`, by imports, that draw something; with `only` (exported names of it),
     * the first step only through files importing one of them: a helper file's `layout_${name}` is its
     * page's, not the window's of every file importing another helper beside it.
     */
    const ownersOf = (file, only) => {
        const owners = new Set();
        const seen = new Set([ file ]);
        let level = [ file ];

        while (level.length) {
            const next = [];

            for (const at of level) {
                for (const parent of importedBy.get(at) ?? []) {
                    if (seen.has(parent)) continue;

                    const taken = names.get(parent)?.get(at);

                    if (only && (at === file) && !only.has('*') && taken && !taken.has('*') && ![ ...taken ].some(name => only.has(name))) continue;

                    seen.add(parent);

                    if (draws.has(parent)) owners.add(parent);
                    else next.push(parent);
                }
            }

            level = next;
        }

        return owners;
    };

    const owners = new Map([ ...draws.keys() ].map(file => [ file, ownersOf(file) ]));
    const relative = file => path.relative(src, file).split(path.sep).join('/');

    // The windows each file opens.
    const windowsOf = new Map();

    for (const [ file, found ] of draws) {
        const own = [ ...found ].filter(id => id.startsWith('frame:') || isFrame(templates[id]) || OWN_WINDOWS.has(id));

        // A file nothing above draws is a window of its own: its largest template, when it opens no frame.
        if (!own.length && !owners.get(file).size) {
            const size = id => rootOf(templates[id]).width * rootOf(templates[id]).height;
            const [ largest ] = [ ...found ].filter(id => templates[id]).sort((a, b) => size(b) - size(a));

            if (largest) own.push(largest);
        }

        if (own.length) windowsOf.set(file, own);
    }

    /** The windows a file's parts belong to: its own, else its owners', up the imports (`id`: the owners using what names it). */
    const partWindows = (file, id, seen = new Set()) => {
        if (windowsOf.has(file)) return windowsOf.get(file);

        if (seen.has(file)) return [];

        seen.add(file);

        const above = id ? ownersOf(file, symbols.get(file)?.get(id)) : owners.get(file);

        return [ ...new Set([ ...above ].flatMap(owner => partWindows(owner, undefined, seen))) ];
    };

    const windowId = id => (id.startsWith('frame:') ? id.slice('frame:'.length) : id);
    const windows = {};
    const firstFile = new Map();
    /** A view or a component: what draws a window, over a command or a table naming it (`clientModuleMenus`). */
    const isView = at => /^(views|components)\//.test(relative(at));

    for (const [ file, own ] of windowsOf) {
        for (const id of own) {
            if (!firstFile.has(id) || (!isView(firstFile.get(id)) && isView(file))) firstFile.set(id, file);
        }
    }

    const englishName = (id) => {
        if (CURATED_NAMES[id]) return CURATED_NAMES[id];

        const caption = templates[id]?.elements?.[0]?.caption;
        const key = caption && /^\$\{([^${}]+)\}$/.exec(caption.trim())?.[1];
        const text = key && texts[key];

        if (text) return text.replace(/<[^>]+>/g, '').replace(/%[a-z_]+%/gi, '').trim();

        const asset = id.includes('/') ? id.slice(id.indexOf('/') + 1) : id;

        return asset.replace(/_xml$/, '').replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, (match, a, b) => `${a} ${b.toLowerCase()}`).replace(/^\w/, c => c.toUpperCase()).trim();
    };

    const areaOf = (id, file) => {
        const parts = relative(file).split('/');
        const folder = (parts[0] === 'views' || parts[0] === 'components') ? ((parts[1] === 'room' && parts[2] === 'widgets' && parts[3] === 'chat') ? 'chat' : parts[1]) : undefined;

        return FOLDER_AREAS[folder] ?? LIBRARY_AREAS[id.slice(0, id.indexOf('/'))] ?? 'Hotel view';
    };

    for (const [ id, file ] of firstFile) {
        const key = windowId(id);
        const template = templates[id];
        const caption = template?.elements?.[0]?.caption;
        const captionKey = caption && /^\$\{([^${}]+)\}$/.exec(caption.trim())?.[1];

        windows[key] = {
            name: englishName(key),
            area: areaOf(id, file),
            ...(template ? { template: id } : { frame: key }),
            ...(captionKey ? { caption: captionKey } : {}),
            source: relative(file),
            parts: [],
        };
    }

    const parts = {};

    for (const [ file, found ] of draws) {
        const own = new Set(windowsOf.get(file) ?? []);

        for (const id of found) {
            if (id.startsWith('frame:') || own.has(id) || windows[id]) continue;

            for (const window of partWindows(file, id).map(windowId)) {
                if (window === id) continue;

                parts[id] = parts[id] ?? { name: englishName(id), windows: [] };

                if (!parts[id].windows.includes(window)) parts[id].windows.push(window);

                if (!windows[window].parts.includes(id)) windows[window].parts.push(id);
            }
        }
    }

    const drawn = new Set([ ...draws.values() ].flatMap(found => [ ...found ]));
    const orphans = ids.filter(id => drawn.has(id) && !windows[id] && !parts[id]).sort();
    const unused = ids.filter(id => !drawn.has(id)).sort();
    const sorted = object => Object.fromEntries(Object.entries(object).sort(([ a ], [ b ]) => a.localeCompare(b)));

    Object.values(windows).forEach(window => window.parts.sort());
    Object.values(parts).forEach(part => part.windows.sort());

    return { windows: sorted(windows), parts: sorted(parts), orphans, unused };
};
