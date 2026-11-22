# nitro-next

A Habbo Flash client port on Pixi v8 and React, with Yarn workspaces under `packages/`.

| Package | Responsibility |
| --- | --- |
| `nitro-api` | Shared interfaces, enums, events and utilities; no runtime state |
| `nitro-packets` | Incoming parsers, outgoing composers and header maps |
| `nitro-renderer` | Room engine, object logic, visualizations and asset loading |
| `nitro-theme` | Themed UI kit (window skins, buttons, text, layers) shared by `nitro-react` and `nitro-studio`; no app state - the app supplies bundles, config and window stacking through `configureThemeHost` |
| `nitro-react` | Client UI rendered through Pixi |
| `nitro-imager` | Avatar and group badge images over HTTP: the renderer's avatar code on Pixi's Canvas 2D renderer in Node |
| `client-module-sdk` | Types, helpers and the bundler preset for client modules |
| `nitro-studio` | Asset imports/conversion, versioned workspaces and gamedata; a separate web app in its own git repository, checked out here |

## Core contracts

- The AS3 in `scripts/habbo-as3` is the behavioral source of truth. `scripts/habbo-js`, Habbo's own
  JavaScript port, shows how it can be done in JavaScript; the AS3 wins where they differ.
  `scripts/habbo-js-resources` holds the client's bundled templates and assets. Port docblocks name
  the AS3 class/method. See [Habbo reference code](docs/development.md#habbo-reference-code).
- Match reachable behavior, configuration gates and packet contracts. Trace initialization, reset,
  mutable-value ownership and numeric units where they affect the change.
- Turbo is the development server: use its configured endpoint and Turbo-issued SSO tickets.
  Implement missing server behavior in the development Turbo checkout and check the real exchange.
- The client renders through Pixi; React DOM only mounts the canvas. Nitro Studio has its own UI
  stack and conventions; keep its documentation even if it is absent locally.
- Preserve existing work. Keep personal paths, credentials, private reference attribution and
  generated diagnostic output out of shared files and commits.

## Read for the task

Read only the guides the task touches.

- Environment, external resources, unavailable tooling: [development](docs/development.md)
- Client/server features, packet mismatches, live Turbo checks: [turbo-development](docs/turbo-development.md)
- Client stores, handlers, hooks, components, theme: [client-conventions](docs/client-conventions.md)
- A view or layout: [layout-views](docs/layout-views.md), [porting-gotchas](docs/porting-gotchas.md)
- Fonts, localization, text rendering: [text](docs/text.md)
- Bundled images, fonts, asset loading: [asset-bundles](docs/asset-bundles.md)
- Asset imports, workspace versions, gamedata: [nitro-studio](docs/nitro-studio.md)
- Parsers, composers, packet registration: [packets](docs/packets.md)
- Client modules a server's plugins ship, and their API: [client-modules](docs/client-modules.md)
- Wired definitions, setup views, stores: [wired](docs/wired.md)
- Revision updates, copied reference tables: [staying-in-step](docs/staying-in-step.md)
- Unported or partly ported features, picking work: [feature-gaps](docs/feature-gaps.md)
- What the client does that Turbo does not answer yet: [server-gaps](docs/server-gaps.md)
- Refactoring nitro-react, or code an open refactor touches: [refactoring](docs/refactoring.md)
- Room rendering, water, zoom, GPU behavior: [renderer-parity](docs/renderer-parity.md)
- The avatar or group badge imager: [imager](docs/imager.md)
- Shared test and diagnostic commands: [tools/](tools/)

## Working scope

Work from the requested outcome and its observable acceptance checks: resolve routine choices from
the code and reference contracts, and carry on through implementation and verification. Stop when
the outcome is met or a specific prerequisite is missing. A patch is not done when the request also
needs the result run and inspected.

Local edits, builds and focused tests are within existing authorization; commits, publishing and
changes to shared server data stay within the user's authorized scope. Use dedicated Turbo test
accounts and fixtures for live checks. Do not assume every script is isolated from external
systems. Preserve mixed WIP before extracting a branch.

## Verification

For code changes, run these gates on the assembled candidate:

```sh
# Repository root
npx tsc -p packages/nitro-react/tsconfig.typecheck.json --noEmit
npx tsc -p packages/nitro-theme/tsconfig.json --noEmit
npx eslint <changed-code-files>

# From packages/nitro-react
node scripts/generate-barrels.ts --check
```

Zero errors and no new warnings. Regenerate owned barrels after adding, moving or deleting modules;
never hand-edit generated exports. Follow the formatter and lint configuration, use LF, and use
Corepack for the repository-pinned Yarn.

Add checks by what changed: focused regressions for logic, live interaction for UI, GPU/fixture
checks for rendering. Never change reference hashes or approved baselines just to pass a check.
Typechecking does not establish visual parity.

Documentation-only edits: check accuracy, local links, whitespace and private information; skip
code and live-server checks unless an executable example or related code changed. Rerun a passed
check when an input changed, a failure was fixed or a new case needs proof. Report passed, failed
and unrun checks plus remaining limitations; results from mixed WIP do not prove an extracted PR works.
