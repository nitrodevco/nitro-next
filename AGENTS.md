# nitro-next

A Habbo Flash client port using Pixi v8 and React, with Yarn workspaces under `packages/`.

| Package | Responsibility |
| --- | --- |
| `nitro-api` | Shared interfaces, enums, events and utilities; no runtime state |
| `nitro-packets` | Incoming parsers, outgoing composers and header maps |
| `nitro-renderer` | Room engine, object logic, visualizations and asset loading |
| `nitro-theme` | The themed UI components (window skins, buttons, text, layers) shared by `nitro-react` and `nitro-studio`; holds no app state - the app supplies bundles, config and window stacking through `configureThemeHost` |
| `nitro-react` | Client UI rendered through Pixi |
| `nitro-imager` | Server-side avatar and group badge images over HTTP: the renderer's avatar code on Pixi's Canvas 2D renderer in Node |
| `nitro-studio` | Asset imports/conversion, versioned workspaces and gamedata; separate web application in its own git repository, checked out here |

## Core contracts

- The AS3 in `scripts/habbo-as3` is the behavioral source of truth. Habbo's own JavaScript port in
  `scripts/habbo-js` shows how it can be done in JavaScript; the AS3 wins where they differ. The
  client's bundled templates and assets are in `scripts/habbo-js-resources`. Port docblocks name
  the AS3 class/method. See [Habbo reference code](docs/development.md#habbo-reference-code).
- Match the reachable behavior, configuration gates and packet contracts. Trace initialization,
  reset, mutable-value ownership and numeric units when they affect the change.
- Turbo is the development server. Use its configured endpoint and Turbo-issued SSO tickets.
  Implement missing server behavior in the development Turbo checkout and check the real exchange.
- The client renders through Pixi; React DOM only mounts the canvas. The Nitro Studio web app
  has its own UI stack and conventions. Keep its documentation even if it is absent locally.
- Preserve existing work. Keep personal paths, credentials, private reference attribution and
  generated diagnostic output out of shared files and commits.

## Read for the task

Use the relevant references below; a small edit does not require reading every guide.

| When changing or investigating | Reference |
| --- | --- |
| Environment, external resources or unavailable tooling | [Development setup](docs/development.md) |
| Client/server features, packet mismatches or live Turbo checks | [Nitro and Turbo development](docs/turbo-development.md) |
| Client stores, handlers, hooks, components or theme | [Client code conventions](docs/client-conventions.md) |
| A view or layout | [Layout views](docs/layout-views.md), [porting gotchas](docs/porting-gotchas.md) |
| Fonts, localization or text rendering | [Text](docs/text.md) |
| Bundled images, fonts or asset loading | [Asset bundles](docs/asset-bundles.md) |
| Asset imports, workspace versions or gamedata | [Nitro Studio](docs/nitro-studio.md) |
| Parsers, composers or packet registration | [Packets](docs/packets.md) |
| Client modules a server's plugins ship, and their API | [Client modules](docs/client-modules.md) |
| Wired definitions, setup views or stores | [Wired](docs/wired.md) |
| Revision updates or copied reference tables | [Staying in step](docs/staying-in-step.md) |
| Unported or partly ported features, and picking work | [Feature gaps](docs/feature-gaps.md) |
| What the client does that Turbo does not answer yet | [Server gaps](docs/server-gaps.md) |
| Refactoring nitro-react, or code an open refactor touches | [Refactoring backlog](docs/refactoring.md) |
| Room rendering, water, zoom or GPU behavior | [Renderer verification](docs/renderer-parity.md) |
| The avatar or group badge imager | [Imager](docs/imager.md) |
| Shared test and diagnostic commands | [Developer tools directory](tools/) |

## Working scope

Start from the requested outcome and its observable acceptance checks. Resolve routine implementation
choices using the code and reference contracts; continue through implementation and relevant
verification. Stop when the requested outcome is met, or report a specific unmet prerequisite.
An initial patch is not completion when the request also requires running and inspecting the result.

Local edits, builds and focused tests needed for the task can proceed within existing authorization.
Keep commits, publishing and changes to shared server data within the user's authorized scope.
Use dedicated Turbo test accounts and fixtures for live checks. Do not assume every script is
isolated from external systems. Preserve mixed WIP before extracting a branch.

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

Typecheck and lint must have zero errors and no new warnings. Regenerate owned barrels after
adding, moving or deleting modules; do not edit generated exports by hand. Follow the formatter
and lint configuration, use LF, and use Corepack for the repository-pinned Yarn release.

Choose additional checks by the behavior changed: focused regressions for logic, live interaction
for UI, and relevant GPU/fixture checks for rendering. Reference hashes and approved baselines
must not be changed merely to make a check pass. Typechecking does not establish visual parity.

For documentation-only edits, check accuracy, local links, whitespace and private information;
code and live-server checks are unnecessary unless an executable example or related code changed.
After a check passes, rerun it when an input changed, a failure was fixed, or a new case needs proof.
Report passed, failed and unrun checks plus remaining limitations; results from mixed WIP do not
prove an extracted PR works.
