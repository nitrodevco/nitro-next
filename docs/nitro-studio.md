# Nitro Studio workflow

`nitro-studio` is a development web application for the assets the hotel serves: bundles,
gamedata, texts and images. It imports official Habbo assets, converts SWFs and maintains
versioned workspaces in a shared asset store. It is separate from the client runtime's
`AssetManager`, which loads textures and bundles while the client runs.

The application is its own git repository, checked out at `packages/nitro-studio` (this repository
ignores that folder). There it stays a Yarn workspace of this repository: `@nitrodevco/nitro-api` and
`@nitrodevco/nitro-renderer` resolve as workspace packages, and its relative imports of `nitro-api`,
`nitro-react` and `nitro-renderer` sources resolve against the sibling packages. Run `yarn install`
from this repository's root after checking it out. Follow its README and configured workspace
paths for installation, version history, swapping versions and merging workspaces. Preserve this
workflow even when the application is not installed in the client developer's environment.
Do not assume that a missing local installation means the tool is obsolete.

## Application structure

The application uses Hono, React DOM and Tailwind. Its `converter/` originated from the nitro-tools
converter; follow the application's README for converter-specific build and lint coverage. It imports
official assets and gamedata, and tracks workspaces and versions in a shared asset store. These
responsibilities belong to the development application, not the client runtime texture loader.

## Gamedata and localization

- Read the workspace selected in Nitro Studio's settings. Where the package is present,
  `packages/nitro-studio/workspace/gamedata` is the documented default location.
- After a client revision bump, scan Habbo assets and import Hotel data and Changed texts, and
  check the HTML client release (Changes, Habbo client; production and sandbox) so the From Habbo
  tab lists what it brings: the room content and placeholder libraries (`.hab`, converted like an
  SWF), default localizations, avatar animations and tables, chat styles and the renderer's bitmaps. An import from the sandbox is recorded as the sandbox's. The
  workspace provides external variables, external texts, default localizations and avatar data.
  Correct imported/generated text at its source instead of patching the client to compensate.
- The avatar data the renderer starts from - the client's avatar tables and the hotel's actions and
  animations - is the avatar render library's bundle, the workspace's
  `bundled/templates/habbo-avatar-render-lib.nitro` (read from `asset.bundles.templates`, with the avatar
  additions), built from its gamedata on import, edit and publish. The renderer compiles none of it in.
- Keep `nitro-config.json` aligned with the workspace's external variables and generated asset URLs.
  Check the actual files served to the client as well as the workspace's source files.
- Preserve workspace-specific assets when updating or merging official assets. Follow the asset
  manager's version and merge workflow; do not replace its workspace with an unreviewed folder copy.

## Integration contracts

The detailed checks are listed in [staying in step](staying-in-step.md):

- `studio.py`: furniture categories against Turbo entities;
  generated configuration URLs and placeholders against client consumers; showroom room data;
  custom chat-style bundle names, files, fields and ID ranges against the client loader.
- `hand_items.py`: hand-item action names, part names and sprite naming against the avatar renderer
  and the workspace's item library. Updates must preserve workspace-specific hand items.
- `served_gamedata.py`: exported and served avatar actions/animations against their source tables,
  accounting for hand-item parameters recorded by the builder.
- `config_keys.py` and `localization_keys.py`: imported workspace data against the keys the client
  and AS3 reference use.

Confirm the relevant scripts and workspace inputs are available before running these checks.
Report missing prerequisites explicitly. These contracts remain useful to developers working on
Nitro Studio even when another developer cannot run the application locally.
