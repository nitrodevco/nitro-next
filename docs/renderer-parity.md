# Room renderer verification

Verify the behavior changed by a renderer PR against the AS3 (see
[Habbo reference code](development.md#habbo-reference-code)). For floor/wall projection and water
shore masks, start with `RoomPlane`, `FloorRasterizer`, `WallRasterizer` (the port's `FloorPlane` and
`WallPlane` are their obfuscated plane classes in `rasterizer/basic`), `FurnitureWaterAreaVisualization`
and `ShoreMaskCreatorUtility`. A passing unit test does not establish whole-client pixel parity.

## Deterministic checks

From the repository root:

```sh
node --test tools/plane-rasterizer.test.mjs tools/plane-material.test.mjs tools/water-rasterizer.test.mjs
```

Check signed shear, geometry scales 64 and 32, plane color rounding, water border traversal,
corner cuts, mask resizing and texture ownership. After changing cached render targets, check
reuse, sampling settings, instance isolation and disposal. Keep tests with the behavior they prove.

## Browser and GPU checks

Log in to Turbo as [Nitro and Turbo development](turbo-development.md) describes, in a room fixture
that contains the affected geometry and furniture. Record the client commit, Turbo revision,
renderer backend, output resolution and fixture setup.

There are no browser/GPU rendering runners on this branch (`tools/rendering/` was WIP tooling); when
one is added, its README says what it needs. Without one, report the visual check as not run.
Reopen diagnostic pages after changes to imported modules.

## Live scene checklist

- Exercise geometry 64/32/64 and display zoom changes; verify nonempty avatar and plane textures,
  correctly sized masks, sorting, clipping and pointer interaction after returning to normal zoom.
- Include stairs, raised floors and cutouts where the change affects height or coverage.
- For water, test placement, movement, rotation and pickup through Turbo. Check reciprocal neighbour
  updates, different furniture definitions, different heights and room re-entry. Client state
  overrides test rendering only, not server-generated adjacency or persistence.
- Compare matched regions at the same room geometry, output resolution and configuration. Record
  any deliberate visual difference from AS3 separately from parity results.
- If an extra render pass is introduced, measure performance separately; visual correctness does
  not establish better frame time or lower GPU memory use.

## Evidence and limits

Native AIR captures must identify their source hash, runtime/platform, stage quality and descriptor
settings. Keep reviewed expected-output fixtures separate from generated measurements. Do not
regenerate a baseline merely to make a failing check pass. Reproduction against a retained fixture
and recapturing that fixture are different checks.

Beyond the reporting [AGENTS.md](../AGENTS.md) asks for, give mismatch counts/tolerances and the
backends that were unavailable. Bitmap export/photo behavior, other material families and
large-room performance need their own checks when affected.
