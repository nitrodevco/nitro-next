# Source-first window workflow

Run from the repository root. The existing layout generator supplies the parser,
inherited text styles, parent resize and self resize rules; this tool adds pinned
inputs and a compact report. It does not introduce a second layout engine.

```powershell
$env:NITRO_AS3_ROOT = 'C:/Habbo/reference/WIN63-202609091217-117204808/scripts-deob'
$env:NITRO_LAYOUT_ROOT = 'C:/Habbo/reference/WIN63-202609091217-117204808/layouts'
node tools/layout-reference.mjs tools/references/user-profile.json tmp/profile-reference.json
```

Read `tmp/profile-reference.json.md` first. Consult the JSON for a specific control's
full attributes, ordered source variables, colors, list settings and filters.
Keep extracted reference inputs in a durable local directory; the paths above
are examples, not required installation paths.

The command checks the configured production revision and SHA-256 of every input
before generating reports. Missing inputs or changed bytes fail without replacing
reports. It does not update hashes automatically. For a deliberate revision change,
review source differences, update the manifest, regenerate and inspect the UI again.

For each new window:

1. Add `tools/references/<window>.json` using the profile manifest's schema. Pin its
   layouts and AS3 controllers; include the matching official JS files when available.
   Each source names an environment variable holding its root, a relative path, kind,
   and SHA-256. Only `kind: layout` is parsed; other source kinds are hash-checked.
   Confirm provenance from the matching SWF/library before recording hashes.
2. Write the controller contracts and required visual states in that manifest.
   Include populated, empty and permission-dependent states where applicable.
3. Generate the report. Resolve reported gaps against AS3 and official JS before
   wiring the view. Runtime widget sizing and controller mutations need explicit
   inspection; a static XML report cannot infer them.
4. Reuse theme controls and existing shared views. Keep geometry and style choices
   traceable to a named control or documented controller mutation.
5. Render the states early. Use the real entry point and packet path first; fixtures
   can then exercise visual states. See `profile-visual-check.md` for the existing fixture.
6. Compare official and Nitro captures with matching state, locale, scale and window
   bounds. Inspect overlays/differences; never automatically approve a new baseline.
   Record screenshot paths, unresolved differences and actual checks in the handoff.

## Reference directories and safe generation

`NITRO_FLASH_RESOURCES` points to official JS component resources;
`NITRO_AS3_ROOT` overrides the old hardcoded AS3 location. Normal generation now
refuses to run when either directory is unavailable, before clearing output.

```powershell
$env:NITRO_FLASH_RESOURCES = 'X:/references/flash-js-resources'
node packages/nitro-react/scripts/generate-layout-views.ts --report 'X:/references/window.xml'
```

`--report` is read-only and also accepts XML extracted from a SWF in a `.bin` file.
Missing component resources are reported as unverified asset ownership/skin templates.
Reports retain source text variables; they do not claim those raw values are all effective
formatting overrides. The generator's existing formatting code remains authoritative.

The generator is now explicitly included by Git; proprietary reference inputs remain
excluded. Its existing repository ESLint exclusion still applies. No reference material
or screenshot baseline is bundled by this workflow.
