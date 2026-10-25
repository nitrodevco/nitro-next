import { AVATAR_REQUEST_TOKENS, MAX_DANCE, MAX_EFFECT_ID, MAX_FIGURE_LENGTH, MAX_FRAME, MAX_ITEM_ID } from '../avatar/avatarRequest';
import { MAX_BADGE_LAYERS } from '../badge/groupBadgeCode';
import { MAX_FURNITURE_STATE } from '../furniture/furnitureRequest';
import { MAX_PET_PALETTE, MAX_PET_PARTS } from '../pet/petRequest';
import type { ImagerServices } from './createApp';
import { MAX_FRAME as MAX_ROOM_OBJECT_FRAME } from './readQuery';

/** A figure the examples and the try-it form start from: plain clothes every hotel has. */
const EXAMPLE_FIGURE = 'hd-180-1.hr-115-42.ch-210-66.lg-270-82.sh-290-80';

/** A blue shield with a symbol on it, centred. */
const EXAMPLE_BADGE = 'b05114s06114';

/** Examples every hotel has: the classic pets' and furniture's libraries. */
const PET_EXAMPLES: [string, string][] = [
    [ 'type=dog', 'A dog, standing' ],
    [ 'figure=0+3+ffffff', 'Its figure string, palette 3' ],
    [ 'type=cat&posture=sit&direction=4', 'A cat, sitting' ],
    [ 'figure=15+2+ffffff+2+2+-1+0+3+-1+0', 'A horse with its custom parts' ],
    [ 'type=dog&posture=mv&animate=1', 'Walking, animated' ],
    [ 'type=dog&headonly=1&size=l', 'Head only, large' ],
];

const FURNITURE_EXAMPLES: [string, string][] = [
    [ 'name=throne', 'By class name' ],
    [ 'name=rare_dragonlamp*4&state=1', 'A colour, switched on' ],
    [ 'name=rare_dragonlamp*4&state=1&animate=1', 'Its animation' ],
    [ 'name=table_plasto_4leg*1&direction=4', 'Turned' ],
    [ 'name=guitar_skull', 'A wall item' ],
    [ 'name=throne&size=s', 'Small' ],
];

const chips = (tokens: readonly string[]) => tokens.map(token => `<code>${token}</code>`).join(' ');

/**
 * The page at the imager's root (and `/habbo-imaging/`): every request it answers, with each
 * parameter's values and default, live examples drawn by the imager itself, and a form to try a
 * figure, pet, furniture or badge code. The pet and furniture sections say so when this imager has
 * them turned off, and show no examples then. The action and gesture names are read from `parseAvatarRequest`'s own
 * tables, so the page lists what is accepted. Its links and images are relative, so they work
 * under either path.
 */
export const renderIndexPage = ({ avatarFrameDelay, roomObjectFrameDelay, pets, furniture }: Pick<ImagerServices, 'avatarFrameDelay' | 'roomObjectFrameDelay' | 'pets' | 'furniture'>): string => {
    const figure = (path: string, query: string, label: string, caption: string = query) => {
        const url = `${path}?${query}`.replaceAll('&', '&amp;');

        return `
        <figure>
            <a href="${url}"><img src="${url}" alt="${label}" loading="lazy"></a>
            <figcaption>${label}<br>${caption ? `<code>${caption.replaceAll('&', '&amp;')}</code>` : 'the defaults'}</figcaption>
        </figure>`;
    };
    const example = (query: string, label: string) => figure('avatar', `figure=${EXAMPLE_FIGURE}${query}`, label, query.replace(/^&/, ''));
    const notSetUp = (what: string, settings: string) => `<p class="note">This imager draws no ${what}: it is turned on with ${settings}.</p>`;
    const frameRows = (kind: string, directions: string) => `
    <tr><td><code>size</code></td><td><code>s</code>, <code>n</code>, <code>l</code></td><td><code>n</code></td><td>Small (halved, as the zoomed-out room is), normal, or large (doubled)</td></tr>
    <tr><td><code>direction</code></td><td><code>0</code>–<code>7</code></td><td><code>2</code></td><td>Which way the ${kind} faces, as an avatar's; ${directions}</td></tr>
    <tr><td><code>frame</code> (or <code>frame_num</code>)</td><td><code>0</code>–<code>${MAX_ROOM_OBJECT_FRAME}</code></td><td><code>0</code></td><td>How many steps into its animation a still image is</td></tr>
    <tr><td><code>animate</code></td><td><code>1</code></td><td>off</td><td>The animation's loop, as a gif at the room's ${roomObjectFrameDelay} ms a step, up to 64 frames</td></tr>
    <tr><td><code>img_format</code></td><td><code>png</code>, <code>gif</code></td><td><code>png</code>; <code>gif</code> when animated</td><td>The image's format</td></tr>`;

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:,">
<title>Nitro Imager</title>
<style>
:root {
    --bg: #f6f7f9; --panel: #ffffff; --text: #1d2330; --muted: #5d6677; --line: #dfe3ea;
    --accent: #1a6fd1; --code: #eef1f6; --checker: #e9ecf1;
    color-scheme: light;
}
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #14171d; --panel: #1c2028; --text: #e6e9ef; --muted: #9aa3b4; --line: #2d3340;
        --accent: #6aa8f0; --code: #262b35; --checker: #232833;
        color-scheme: dark;
    }
}
* { box-sizing: border-box; }
body {
    margin: 0; background: var(--bg); color: var(--text);
    font: 15px/1.55 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
main { max-width: 960px; margin: 0 auto; padding: 32px 16px 64px; }
h1 { margin: 0 0 4px; font-size: 28px; }
h2 { margin: 40px 0 12px; font-size: 20px; border-bottom: 1px solid var(--line); padding-bottom: 6px; }
h3 { margin: 24px 0 8px; font-size: 16px; }
p { margin: 8px 0; }
.lead { color: var(--muted); margin-bottom: 16px; }
a { color: var(--accent); }
code {
    font: 13px/1.4 ui-monospace, SFMono-Regular, Consolas, monospace; background: var(--code);
    padding: 1px 5px; border-radius: 4px; overflow-wrap: anywhere;
}
nav { display: flex; flex-wrap: wrap; gap: 6px 16px; margin: 12px 0 0; }
.table { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; }
th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--line); }
th { font-size: 13px; color: var(--muted); font-weight: 600; }
tr:last-child td { border-bottom: 0; }
td:first-child { white-space: nowrap; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
figure {
    margin: 0; padding: 10px; background: var(--panel); border: 1px solid var(--line); border-radius: 8px;
    text-align: center; font-size: 13px;
}
figure img, .preview img {
    image-rendering: pixelated; max-width: 100%;
    background: repeating-conic-gradient(var(--checker) 0 25%, transparent 0 50%) 0 0 / 16px 16px;
}
figure img { height: 130px; object-fit: contain; }
.preview img { min-width: 80px; min-height: 80px; object-fit: contain; }
figcaption { color: var(--muted); margin-top: 6px; }
.try { display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 16px; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 16px; }
.fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
label { display: grid; gap: 3px; font-size: 13px; color: var(--muted); }
label.wide { grid-column: 1 / -1; }
input, select {
    font: inherit; color: var(--text); background: var(--bg); border: 1px solid var(--line);
    border-radius: 6px; padding: 6px 8px; min-width: 0;
}
.preview { display: grid; place-items: center; min-height: 200px; }
.url { grid-column: 1 / -1; overflow-wrap: anywhere; }
.error { color: #d14343; font-size: 13px; }
.note { padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--panel); color: var(--muted); }
@media (max-width: 640px) { .try { grid-template-columns: minmax(0, 1fr); } }
</style>
</head>
<body>
<main>
<h1>Nitro Imager</h1>
<p class="lead">Draws Habbo avatars, pets, furniture and group badges as images, with the client's own renderer.</p>
<nav>
    <a href="#avatar">Avatars</a>
    <a href="#actions">Actions and gestures</a>
    <a href="#pet">Pets</a>
    <a href="#furni">Furniture</a>
    <a href="#badge">Group badges</a>
    <a href="#try">Try it</a>
    <a href="#health">Health</a>
    <a href="#caching">Caching</a>
</nav>

<h2>Requests</h2>
<div class="table"><table>
    <tr><th>Request</th><th>Answers</th></tr>
    <tr><td><code>GET /avatar?figure=…</code></td><td>An avatar image. <code>/avatarimage</code> is the same, under the name Habbo's imager gives it.</td></tr>
    <tr><td><code>GET /pet?type=…</code></td><td>A pet image, from its figure string or its type.${pets ? '' : ' Not set up here.'}</td></tr>
    <tr><td><code>GET /furni?name=…</code></td><td>A furniture image, from its furnidata class name or id.${furniture ? '' : ' Not set up here.'}</td></tr>
    <tr><td><code>GET /badge/&lt;code&gt;.gif</code></td><td>A group badge from its code; <code>.png</code> for a png.</td></tr>
    <tr><td><code>GET /health</code></td><td>Whether it is up, and what it holds (json).</td></tr>
</table></div>
<p>Every request is answered at the root and under <code>/habbo-imaging/</code> too
(<code>/habbo-imaging/avatarimage?figure=…</code>, <code>/habbo-imaging/badge/…</code>), the paths Habbo's own
imager has, so a url built for it only needs its host changed. Every response carries
<code>Access-Control-Allow-Origin: *</code>, so a page can draw the images into a canvas.</p>

<h2 id="avatar">Avatars</h2>
<p><code>GET /avatar</code> takes Habbo's <code>avatarimage</code> parameters, and what the room draws besides.
Only <code>figure</code> is required. A value that is not one of these is answered with <code>400</code> and what
is wrong with it, never a guess.</p>
<div class="table"><table>
    <tr><th>Parameter</th><th>Values</th><th>Default</th><th>Draws</th></tr>
    <tr><td><code>figure</code></td><td><code>type-set[-colour[-colour]]</code> parts joined by dots, up to ${MAX_FIGURE_LENGTH} characters</td><td>required</td><td>The figure, as the hotel stores it: <code>hd-180-1.ch-210-66.lg-270-82</code></td></tr>
    <tr><td><code>gender</code></td><td><code>M</code>, <code>F</code></td><td><code>M</code></td><td>Which of a part's sets to draw where they differ</td></tr>
    <tr><td><code>size</code></td><td><code>s</code>, <code>n</code>, <code>l</code></td><td><code>n</code></td><td>Small (halved, as the zoomed-out room is), normal, or large (doubled)</td></tr>
    <tr><td><code>direction</code></td><td><code>0</code>–<code>7</code></td><td><code>2</code></td><td>The body's direction, clockwise from <code>0</code> facing up-right: <code>2</code> faces down-right, <code>4</code> down-left, <code>6</code> up-left</td></tr>
    <tr><td><code>head_direction</code></td><td><code>0</code>–<code>7</code></td><td><code>direction</code></td><td>The head's direction</td></tr>
    <tr><td><code>headonly</code></td><td><code>1</code></td><td>off</td><td>Only the head, cropped to it</td></tr>
    <tr><td><code>action</code></td><td>A comma list: one posture, expressions, and carry, use and sign actions (<a href="#actions">below</a>)</td><td><code>std</code></td><td>What the figure is doing: <code>sit,wav</code>, <code>wlk,crr=6</code></td></tr>
    <tr><td><code>gesture</code></td><td>One of the gestures <a href="#actions">below</a></td><td><code>std</code></td><td>The face</td></tr>
    <tr><td><code>dance</code></td><td><code>0</code>–<code>${MAX_DANCE}</code></td><td><code>0</code></td><td>A dance; <code>0</code> is none</td></tr>
    <tr><td><code>effect</code></td><td><code>0</code>–<code>${MAX_EFFECT_ID}</code></td><td><code>0</code></td><td>An avatar effect by its id; <code>0</code> is none</td></tr>
    <tr><td><code>frame</code> (or <code>frame_num</code>)</td><td><code>0</code>–<code>${MAX_FRAME}</code></td><td><code>0</code></td><td>Which frame of the animation a still image shows</td></tr>
    <tr><td><code>animate</code></td><td><code>1</code></td><td>off</td><td>Every frame, as an animated gif at the room's ${avatarFrameDelay} ms a frame</td></tr>
    <tr><td><code>img_format</code></td><td><code>png</code>, <code>gif</code></td><td><code>png</code>; <code>gif</code> when animated</td><td>The image's format. An animated image is always a gif</td></tr>
    <tr><td><code>crop</code></td><td><code>1</code></td><td>off</td><td>Cut to the figure, the space around it gone but for a 1 px transparent gap; an animation to what any of its frames shows</td></tr>
</table></div>
<p>A flag (<code>headonly</code>, <code>animate</code>, <code>crop</code>) is on when given with any value but <code>0</code> or <code>false</code>.</p>

<h3>Examples</h3>
<div class="gallery">
    ${example('', 'Standing')}
    ${example('&direction=4&head_direction=3', 'Facing left, head turned')}
    ${example('&action=wav&gesture=sml', 'Waving, smiling')}
    ${example('&action=sit,crr=6', 'Sitting, holding a drink')}
    ${example('&action=lay&gesture=eyb', 'Lying, eyes shut')}
    ${example('&action=sig=11', 'Holding up a sign')}
    ${example('&dance=1&animate=1', 'Dancing, animated')}
    ${example('&headonly=1&size=l', 'Head only, large')}
    ${example('&size=s', 'Small')}
    ${example('&crop=1', 'Cropped')}
</div>

<h2 id="actions">Actions and gestures</h2>
<div class="table"><table>
    <tr><th>Kind</th><th>Names</th><th>Use</th></tr>
    <tr><td>Posture</td><td>${chips(AVATAR_REQUEST_TOKENS.postures)}</td><td>In <code>action</code>, one at most: stand, walk (<code>wlk</code> or <code>mv</code>), sit, lay, swim, float</td></tr>
    <tr><td>Expression</td><td>${chips(AVATAR_REQUEST_TOKENS.expressions)}</td><td>In <code>action</code>, any number: <code>wav</code> is Habbo's name for <code>wave</code></td></tr>
    <tr><td>Item or sign</td><td>${chips(AVATAR_REQUEST_TOKENS.parameterActions)}</td><td>In <code>action</code>, with an id from <code>0</code> to <code>${MAX_ITEM_ID}</code>: carry (<code>crr=6</code>), drink (<code>drk=2</code>), hold up a sign (<code>sig=11</code>)</td></tr>
    <tr><td>Gesture</td><td>${chips(AVATAR_REQUEST_TOKENS.gestures)}</td><td>In <code>gesture</code>, one: smile, sad, angry, surprised, <code>spk</code> talking, <code>eyb</code> eyes shut</td></tr>
</table></div>

<h2 id="pet">Pets</h2>
<p><code>GET /pet</code> draws a pet as the room does: its library, palette, colour and custom parts, in a posture and with a
gesture it has. A pet is named by its <code>figure</code> string or by <code>type</code>. A posture, gesture or palette the
pet does not have is a <code>400</code> that lists the ones it does; a type the hotel has none of is a <code>404</code>.</p>
${pets ? '' : notSetUp('pets', '<code>IMAGER_PET_BUNDLE_URL</code>')}
<div class="table"><table>
    <tr><th>Parameter</th><th>Values</th><th>Default</th><th>Draws</th></tr>
    <tr><td><code>figure</code></td><td><code>type palette colour</code>, then the number of custom parts and each one's <code>layer part palette</code>, separated by spaces (<code>+</code> in a url); up to ${MAX_PET_PARTS} parts</td><td></td><td>The pet, as the hotel stores it: <code>15 2 ffffff 2 2 -1 0 3 -1 0</code> is a horse with two parts</td></tr>
    <tr><td><code>type</code></td><td>A pet type's number or name${pets ? ' (<a href="#pet-types">below</a>)' : ''}</td><td></td><td>Instead of <code>figure</code>, with <code>palette</code> and <code>color</code></td></tr>
    <tr><td><code>palette</code></td><td><code>0</code>–<code>${MAX_PET_PALETTE}</code>, one the pet has</td><td><code>0</code></td><td>The pet's colouring: its breed</td></tr>
    <tr><td><code>color</code></td><td>Hex</td><td><code>ffffff</code></td><td>A tint over the palette; <code>ffffff</code> is none</td></tr>
    <tr><td><code>posture</code></td><td>One the pet has: <code>std</code>, <code>sit</code>, <code>lay</code>, <code>mv</code> (walking) …</td><td>the pet's own</td><td>What it is doing</td></tr>
    <tr><td><code>gesture</code></td><td>One the pet has: <code>sml</code>, <code>agr</code>, <code>sad</code> …</td><td>none</td><td>Its face</td></tr>
    <tr><td><code>head_direction</code></td><td><code>0</code>–<code>7</code></td><td><code>direction</code></td><td>The head's direction, for a pet that turns its head</td></tr>
    <tr><td><code>headonly</code></td><td><code>1</code></td><td>off</td><td>Only the head</td></tr>
    ${frameRows('pet', 'one it cannot face is drawn the nearest way it can')}
</table></div>
${pets ? `<p id="pet-types">The hotel's pet types, by number: ${chips(pets.types.map((name, index) => `${index}&nbsp;${name}`))}</p>` : ''}
${pets
    ? `<div class="gallery">${PET_EXAMPLES.map(([ query, label ]) => figure('pet', query, label)).join('')}
</div>`
    : ''}

<h2 id="furni">Furniture</h2>
<p><code>GET /furni</code> draws a furniture item as the room does, from the hotel's furnidata and the item's library, in
the state asked for. An item the furnidata does not have, or whose library is not there, is a <code>404</code>.</p>
${furniture ? '' : notSetUp('furniture', '<code>IMAGER_FURNITURE_BUNDLE_URL</code> and <code>IMAGER_FURNIDATA_URL</code>')}
<div class="table"><table>
    <tr><th>Parameter</th><th>Values</th><th>Default</th><th>Draws</th></tr>
    <tr><td><code>name</code></td><td>The furnidata class name, with <code>*&lt;colour&gt;</code> for a coloured one</td><td></td><td>The item: <code>throne</code>, <code>rare_dragonlamp*4</code></td></tr>
    <tr><td><code>id</code></td><td>A furnidata id</td><td></td><td>Instead of <code>name</code>: a floor item's, or a wall item's with <code>wall=1</code></td></tr>
    <tr><td><code>wall</code></td><td><code>1</code></td><td>off</td><td>The <code>id</code> is a wall item's: floor and wall items are numbered apart</td></tr>
    <tr><td><code>state</code></td><td><code>0</code>–<code>${MAX_FURNITURE_STATE}</code></td><td><code>0</code></td><td>Which of its looks: a lamp on or off, a gate open or shut, and so its animation</td></tr>
    ${frameRows('item', 'a floor item turns to <code>0</code>, <code>2</code>, <code>4</code> or <code>6</code> and a wall item to <code>2</code> or <code>4</code>, as far as it has them')}
</table></div>
${furniture
    ? `<div class="gallery">${FURNITURE_EXAMPLES.map(([ query, label ]) => figure('furni', query, label)).join('')}
</div>`
    : ''}

<h2 id="badge">Group badges</h2>
<p><code>GET /badge/&lt;code&gt;.gif</code> (or <code>.png</code>) draws the badge the hotel stores for a group, the code
the client hands to <code>badge.asset.group.url</code> and <code>group.badge.url</code>. A code is up to
${MAX_BADGE_LAYERS} six-character layers run together, bottom first:</p>
<div class="table"><table>
    <tr><th>Layer</th><th>Written</th><th>Is</th></tr>
    <tr><td>Base</td><td><code>b</code> part(2) colour(2) position(1)</td><td>The badge's shape</td></tr>
    <tr><td>Symbol</td><td><code>s</code> part(2) colour(2) position(1)</td><td>A symbol laid over it, parts 1–99</td></tr>
    <tr><td>Symbol</td><td><code>t</code> (part − 100)(2) colour(2) position(1)</td><td>A symbol, parts 100–199</td></tr>
</table></div>
<p>The position is the cell of a 3×3 grid the part is centred on, <code>0</code>–<code>8</code> left to right, top to bottom:
<code>4</code> is the middle. A layer that does not read is skipped and the rest still draw;
a badge with no part that draws is a <code>404</code>.</p>
<div class="gallery">
    <figure><a href="badge/${EXAMPLE_BADGE}.gif"><img src="badge/${EXAMPLE_BADGE}.gif" alt="A group badge" loading="lazy"></a><figcaption><code>${EXAMPLE_BADGE}.gif</code></figcaption></figure>
    <figure><a href="badge/b13114s19014t04010.gif"><img src="badge/b13114s19014t04010.gif" alt="A badge of three layers" loading="lazy"></a><figcaption>A base, an <code>s</code> and a <code>t</code> symbol<br><code>b13114s19014t04010.gif</code></figcaption></figure>
</div>

<h2 id="try">Try it</h2>
<form class="try" id="avatar-form">
    <div class="fields">
        <label class="wide">figure <input name="figure" value="${EXAMPLE_FIGURE}" spellcheck="false"></label>
        <label>gender <select name="gender"><option>M</option><option>F</option></select></label>
        <label>size <select name="size"><option>n</option><option>s</option><option>l</option></select></label>
        <label>direction <input name="direction" type="number" min="0" max="7" value="2"></label>
        <label>head_direction <input name="head_direction" type="number" min="0" max="7" placeholder="as direction"></label>
        <label>action <input name="action" placeholder="sit,wav,crr=6" spellcheck="false"></label>
        <label>gesture <select name="gesture">${AVATAR_REQUEST_TOKENS.gestures.map(gesture => `<option>${gesture}</option>`).join('')}</select></label>
        <label>dance <input name="dance" type="number" min="0" max="${MAX_DANCE}" value="0"></label>
        <label>effect <input name="effect" type="number" min="0" max="${MAX_EFFECT_ID}" value="0"></label>
        <label>frame <input name="frame" type="number" min="0" max="${MAX_FRAME}" value="0"></label>
        <label>headonly <select name="headonly"><option value="">off</option><option value="1">on</option></select></label>
        <label>animate <select name="animate"><option value="">off</option><option value="1">on</option></select></label>
        <label>crop <select name="crop"><option value="">off</option><option value="1">on</option></select></label>
    </div>
    <div class="preview"><img alt="The avatar"></div>
    <p class="url"><a></a> <span class="error"></span></p>
</form>
${pets
    ? `<h3>A pet</h3>
<form class="try" id="pet-form" data-path="pet">
    <div class="fields">
        <label class="wide">figure <input name="figure" placeholder="0 3 ffffff, or leave it empty for type" spellcheck="false"></label>
        <label>type <input name="type" value="dog" spellcheck="false"></label>
        <label>palette <input name="palette" type="number" min="0" max="${MAX_PET_PALETTE}" value="0"></label>
        <label>color <input name="color" placeholder="ffffff" spellcheck="false"></label>
        <label>posture <input name="posture" placeholder="std, sit, lay, mv" spellcheck="false"></label>
        <label>gesture <input name="gesture" placeholder="sml, agr" spellcheck="false"></label>
        <label>direction <input name="direction" type="number" min="0" max="7" value="2"></label>
        <label>size <select name="size"><option>n</option><option>s</option><option>l</option></select></label>
        <label>headonly <select name="headonly"><option value="">off</option><option value="1">on</option></select></label>
        <label>animate <select name="animate"><option value="">off</option><option value="1">on</option></select></label>
    </div>
    <div class="preview"><img alt="The pet"></div>
    <p class="url"><a></a> <span class="error"></span></p>
</form>`
    : ''}
${furniture
    ? `<h3>A furniture</h3>
<form class="try" id="furni-form" data-path="furni">
    <div class="fields">
        <label class="wide">name <input name="name" value="rare_dragonlamp*4" spellcheck="false"></label>
        <label>state <input name="state" type="number" min="0" max="${MAX_FURNITURE_STATE}" value="1"></label>
        <label>direction <input name="direction" type="number" min="0" max="7" value="2"></label>
        <label>size <select name="size"><option>n</option><option>s</option><option>l</option></select></label>
        <label>animate <select name="animate"><option value="">off</option><option value="1">on</option></select></label>
    </div>
    <div class="preview"><img alt="The furniture"></div>
    <p class="url"><a></a> <span class="error"></span></p>
</form>`
    : ''}
<h3>A badge</h3>
<form class="try" id="badge-form">
    <div class="fields">
        <label class="wide">code <input name="code" value="${EXAMPLE_BADGE}" spellcheck="false"></label>
        <label>format <select name="format"><option>gif</option><option>png</option></select></label>
    </div>
    <div class="preview"><img alt="The badge"></div>
    <p class="url"><a></a> <span class="error"></span></p>
</form>

<h2 id="health">Health</h2>
<p><a href="health"><code>GET /health</code></a> answers json: <code>ok</code>, the number of images cached
(<code>cached</code>) and their size (<code>cachedBytes</code>), the avatar libraries loaded
(<code>avatarLibraries</code>), the badge table's version (<code>badgeTable</code>), how many pet types it knows
(<code>petTypes</code>) and furnidata items it has (<code>furniture</code>: <code>floor</code>, <code>wall</code>), and the process's
<code>memory</code> (<code>rss</code>, <code>heapUsed</code>, <code>external</code>, in bytes).</p>

<h2 id="caching">Caching</h2>
<div class="table"><table>
    <tr><th>Image</th><th>Cache-Control</th></tr>
    <tr><td>A complete avatar</td><td><code>public, max-age=604800</code> (a week): everything it is drawn from is in its url</td></tr>
    <tr><td>A pet or furniture</td><td><code>public, max-age=86400</code> (a day): the hotel can update its library</td></tr>
    <tr><td>A badge</td><td><code>public, max-age=3600</code> (an hour): the hotel can retune its colours</td></tr>
    <tr><td>An image missing a part</td><td><code>no-store</code>: a library that failed to load, or a set or effect that does not exist; drawn again next time</td></tr>
</table></div>
<p>The imager also keeps encoded images in memory, the least recently used dropped first. Behind a CDN, cache by the
full url, query string included.</p>
</main>
<script>
const preview = (form, url) => {
    const img = form.querySelector('.preview img');
    const link = form.querySelector('.url a');
    const error = form.querySelector('.error');

    link.href = url;
    link.textContent = new URL(url, location.href).href;
    error.textContent = '';

    fetch(url).then((response) => {
        if (response.ok) img.src = url;
        else response.text().then((text) => { error.textContent = response.status + ': ' + text; });
    }).catch(() => { error.textContent = 'The imager did not answer'; });
};

const avatarForm = document.getElementById('avatar-form');
const badgeForm = document.getElementById('badge-form');

const showAvatar = () => {
    const query = new URLSearchParams();

    for (const [ name, value ] of new FormData(avatarForm)) {
        const text = String(value).trim();

        if (text && !(name === 'dance' && text === '0') && !(name === 'effect' && text === '0') && !(name === 'frame' && text === '0') && !(name === 'gesture' && text === 'std')) query.set(name, text);
    }

    preview(avatarForm, 'avatar?' + query.toString().replace(/%2C/g, ',').replace(/%3D/g, '='));
};

/** A pet or furniture form: every field that is filled in, to its path. */
const showRoomObject = (form) => () => {
    const query = new URLSearchParams();

    for (const [ name, value ] of new FormData(form)) {
        const text = String(value).trim();

        if (text) query.set(name, text);
    }

    preview(form, form.dataset.path + '?' + query.toString().replace(/%2A/gi, '*'));
};

const showBadge = () => {
    const data = new FormData(badgeForm);

    preview(badgeForm, 'badge/' + encodeURIComponent(String(data.get('code')).trim()) + '.' + data.get('format'));
};

let timer;

const later = (show) => () => {
    clearTimeout(timer);
    timer = setTimeout(show, 300);
};

const forms = [ [ avatarForm, showAvatar ], [ badgeForm, showBadge ] ];

for (const form of document.querySelectorAll('form[data-path]')) forms.push([ form, showRoomObject(form) ]);

for (const [ form, show ] of forms) {
    form.addEventListener('input', later(show));
    form.addEventListener('submit', (event) => { event.preventDefault(); show(); });
    show();
}
</script>
</body>
</html>
`;
};
