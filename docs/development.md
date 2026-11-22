# Development setup

From the repository root:

```sh
corepack yarn install
corepack yarn workspace @nitrodevco/nitro-react dev
```

Open the URL printed by Vite and log in through Turbo as [Nitro and Turbo
development](turbo-development.md) describes. Each developer supplies their own endpoint,
credentials and reference locations; do not commit tickets, personal paths or captured account
data.

## TypeScript 6 and 7

Two TypeScripts are installed, as Microsoft recommends while tools catch up with 7. `tsc` - the
`typecheck` scripts, CI and the gates in AGENTS.md - is TypeScript 7, the native compiler
(`@typescript/native`, an alias of `typescript@7`). The package named `typescript` is
`@typescript/typescript6`: TypeScript 7.0 ships no JavaScript API, and typescript-eslint and the
editor (`.vscode/settings.json`'s tsdk) need one. Its compiler is `tsc6`. Drop it once
typescript-eslint supports TypeScript 7 (its issue #10940, built on 7.1's API). The `tools/` tests
need neither: they load sources through `tools/load-source.mjs`, with esbuild.

## Habbo reference code

Habbo's own client is checked out locally under the repository-root `scripts/` folder. It is
git-ignored: the folders are reference material, never imported, copied into shared files or committed.

| Folder | What it is | Use it as |
| --- | --- | --- |
| `scripts/habbo-as3/` | The AS3 decompile of the Flash client, one `.as` file per class in its package (`com/sulake/...`); embedded binary assets under `_assets/`. Obfuscated names read `§_-P1n§`. | **The truth for how everything works**: methods, layouts, constants, configuration gates and packet fields. |
| `scripts/habbo-js/` | Habbo's own AS3-to-JavaScript port (`HabboAirLauncher.app.js`), reconstructed into one file per class in the same package layout. | **How it can be done in JavaScript**: a working implementation to learn from where AS3 relies on Flash. The AS3 wins where they disagree. |
| `scripts/habbo-js-resources/` | The asset bundles that ship with the client, unpacked per component (`habbo-window-manager-com/`, `habbo-catalog-com/`, ...; `local_include/` for the room content): layout and skin XML, PNGs, fonts, sounds, `text_styles_css.txt`. | The templates and images the client draws with, grouped by owning library. |

`scripts/habbo-js` and `scripts/habbo-js-resources` are produced from the release archive
(`<build>_classic-js-<hash>.asar`) by `node scripts/habbo-js-export/index.mjs <archive>`; its README
explains how the JavaScript was reconstructed. In `scripts/habbo-js`, names the reconstruction could
not recover read `unk_<hex>`, `Unknown<Base>_<hex>` or `paramN`/`localN`, and `obf_P1n` stands for
the AS3's `§_-P1n§`. To find a class, search for a string that survives in both (a layout name, a
localization key, a configuration key or an asset name).

The folders need not be the same build: `scripts/habbo-js-resources` currently comes from a newer
release than the `scripts/habbo-as3` decompile. Where an asset differs between them the AS3 wins;
the drift checks list each such asset with its reason in `known.REFERENCE_BUILD_SKEW` (see
[Staying in step](staying-in-step.md)).

## External prerequisites

| Resource | Purpose |
| --- | --- |
| [Habbo reference code](#habbo-reference-code) (`scripts/habbo-as3`, `scripts/habbo-js`, `scripts/habbo-js-resources`) | AS3 behavior, the JavaScript port and the client's bundled templates and assets |
| Hotel external variables and localization data | Feature gating, text keys and configuration values |
| Packet generator output | Candidate parser/composer bodies; validate against AS3 |
| Nitro Studio checkout and configured workspace | Import and manage hotel assets, gamedata, localization and versions; see [Nitro Studio workflow](nitro-studio.md) |
| Turbo checkout and running server | Verify packet exchanges and implement server behavior |

Paths in the topic guides are repository-relative unless specified otherwise; `src/` and `public/`
generally refer to `packages/nitro-react/`. `scripts/habbo-*` and `scripts/drift/` are at the
repository root; other `scripts/` paths are named with their package. Read a tool's supported
arguments or configuration before assigning reference paths; generators do not all support the
same environment variables.

## Tool availability

Shared test and diagnostic scripts are in the [tools directory](../tools/); the two with written
guides are `hotel-view-reference.md` and `profile-visual-check.md`. [Nitro Studio](nitro-studio.md)
documents its workflow whether or not it is checked out. Scripts and external inputs the topic
guides name (asset generation, packet synchronization, drift auditing) may be absent from a
checkout, and a package script does not guarantee its underlying generator is included: check that
the named script exists before running it, and obtain missing tooling/inputs or report that
verification was not run.

`tools/local/` is optional and not covered by `.gitignore`; keep it uncommitted. Its brief
generators and Jev helpers must not become a requirement for another developer; without them,
trace AS3 and packet contracts directly. Browser/GPU diagnostics and their runtime instrumentation
must be present together; work parked on a WIP branch is not part of a clean checkout.

Keep generated captures, reports and task notes under ignored `tmp/`. Use test fixtures without
personal information when adding shared regression tests. The code gates are in
[AGENTS.md](../AGENTS.md).

## Porting and verification notes

For a feature port, identify the reachable AS3 entry point in `scripts/habbo-as3` and the
corresponding class in `scripts/habbo-js`. Record the relevant methods, layouts, configuration and
packet contracts, then start from the nearest existing component/store/handler. Optional brief
generators and Jev can help locate gaps; AS3 and executable evidence decide behavior. Jev is not a
pixel-accuracy check.

For UI work, verify visible behavior, interaction, packet handling and state reset against Turbo.
The dev server is `yarn dev` on port 3000; packets can also be replayed against the client without
a server through the socket layer (see
[Server gaps](server-gaps.md#checking-a-client-feature-without-the-server)). Draw a new or
substantially changed window from its Flash template as [Layout views](layout-views.md) describes.
When a bubble or widget never appears, check `RoomRenderedEvent` dispatch and packet registration.
After moving modules, restart Vite if stale import URLs prevent loading. Do not claim feature
parity where downstream behavior is missing: say what depends on a subsystem that does not exist
yet ([Feature gaps](feature-gaps.md) lists them).

For LF, Corepack and shell-quoting traps on Windows, see
[porting gotchas](porting-gotchas.md#tooling).
