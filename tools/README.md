# Developer tools

Run commands from the repository root after `corepack yarn install`.

| Directory | Purpose |
| --- | --- |
| `tests/` | Automated Node regression tests. |
| `browser/` | Profile packet replay and visual scenarios. |
| `layout/` | Pinned source/layout verification and guides. |
| `references/` | Reviewed source manifests used by the checks. |

Keep new shared tools with their use case. Personal helpers belong in ignored
`tools/local/`; generated reports, screenshots and scratch scripts belong in
ignored `tmp/`. Commit a tool when another developer can use it with documented
prerequisites and repeatable results.

## Regression tests

```sh
corepack yarn test:tools
```

This runs the reception state/packet tests and layout-report regression tests.
The reception comparison against an extracted SWF layout explicitly skips when
that external file is unavailable; the behavioral tests still run. The layout
tests create synthetic XML in a temporary directory and invoke the real generator.

## Layout and profile checks

See [layout verification](layout/layout-reference.md) for environment variables,
pinned hashes, and report generation. The [reception guide](layout/hotel-view-reference.md)
describes its source contracts and visual states. External AS3 and official client
resources are supplied separately and are not committed.

[Profile checks](browser/profile-visual-check.md) cover packet replay and visual
fixtures. These browser expressions require an authenticated development client;
use a dedicated account. Visual fixtures do not prove server behavior.

## Barrel generation

From `packages/nitro-react`, run:

```sh
node scripts/generate-barrels.ts --check
```

Omit `--check` to regenerate barrels after adding, moving or removing modules.
Use a Node release with native TypeScript support. The check exits nonzero when
generated barrels are stale.
