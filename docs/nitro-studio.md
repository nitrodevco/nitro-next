# Nitro Studio workflow

`nitro-studio` is a hosted, multi-user web application for the assets the hotel serves: bundles,
gamedata, texts, images and the client's UI theme. It follows Habbo's hotel and client releases,
converts SWF and `.hab` libraries, and keeps versioned workspaces that each publish to a hotel. It
is separate from the client runtime's `AssetManager`, which loads textures and bundles while the
client runs.

The application is its own git repository, checked out at `packages/nitro-studio` (this repository
ignores that folder). There it stays a Yarn workspace of this repository: `@nitrodevco/nitro-api`,
`@nitrodevco/nitro-renderer` and `@nitrodevco/nitro-theme` resolve as workspace packages. Run
`yarn install` from this repository's root after checking it out, then follow its README to run it.
Preserve this workflow even when the application is not installed in the client developer's
environment. Do not assume that a missing local installation means the tool is obsolete.

## Application structure

The server is Hono; the client is React DOM, Vite and Tailwind. Accounts, workspaces, file
metadata and versions live in Postgres, file contents in a content-addressed blob store. Its
`converter/` originated from the nitro-tools converter. The README owns setup, scripts, roles and
the page map.

A workspace is laid out as the asset host serves it (`gamedata/`, `bundled/<kind>/`, `images/...`;
the Studio's `shared/layout.ts` maps each folder to its `nitro-config.json` key). Members see it at
`/cdn/<workspace>/...`; publishing sends it to the hotel.

## Gamedata and localization

- The server scans the hotel and its client releases on its own. After a client revision bump,
  open the workspace's Habbo page (Workspace > Habbo) and import what the latest scan and client
  release bring: furniture and the rest, texts, the UI theme, images, chat styles, effect icons
  and client data (the room content and placeholder libraries, default localizations, avatar
  animations and tables, the renderer's bitmaps). Then publish.
- The workspace provides external variables, external texts, default localizations and avatar
  data. Correct imported/generated text at its source instead of patching the client to compensate.
- The avatar data the renderer starts from - the client's avatar tables and the hotel's actions and
  animations - is the avatar render library's bundle, the workspace's
  `bundled/templates/habbo-avatar-render-lib.nitro` (read from `asset.bundles.templates`, with the
  avatar additions), built from its gamedata on import, edit and publish. The renderer compiles
  none of it in.
- The default localizations go out the same way: every `gamedata/DefaultLocalizations_<lang>.json`
  as `default_localizations_<lang>.txt` in the localization library's bundle,
  `bundled/templates/habbo-localization-com.nitro`, built on import and edit. The client parses
  one language of it at a time (`localization.default.language`, then `:lang <code>`).
- Keep `nitro-config.json` aligned with the workspace's external variables and generated asset URLs.
  Check the actual files served to the client as well as the workspace's source files.
- Preserve workspace-specific assets when updating from Habbo. Use the workspace's history
  (versions, compare, go back) rather than replacing its files wholesale.
- The drift checks read a workspace's `gamedata/` from disk: point `STUDIO_GAMEDATA` at a local
  copy (a published or zipped workspace). Without it they fall back to the older local-workspace
  folder (`workspacePath` in `nitro-studio.settings.json`, else `packages/nitro-studio/workspace`),
  which the hosted Studio keeps only caches in, so the gamedata checks report it missing.

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

These checks need the workspace's imported data; when it is missing they say so, and the run is
not a pass.
