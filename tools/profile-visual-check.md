# Profile reference and visual checks

The profile follows `ExtendedProfileWindowCtrl` and `AvatarImageWidget` from
`WIN63-202609091217-117204808`. Group contents reuse `GroupDetailsCtrl`'s existing
`GroupDetailsView`, also used by the standalone group window.

The XML was extracted from that revision's SWF. Verify these SHA-256 hashes before
substituting another extraction; similarly named layouts from another build are not interchangeable.

| Layout | SHA-256 |
|---|---|
| `new_extended_profile_xml$36220c362962d21300057f06bc2d5b88461739672` | `caa0d5728413e3349b0de0c5cd958f4d81b0bf6df0dce17bbc2fc4e5f6793bfa` |
| `no_groups_xml` | `c9e854a5060c7e805140f96177deace67bcf7a6c4a82fbe4e8ca73cf0ff92abb` |
| `group_entry_xml` | `2980719f2029cf53e36e300e08d9b128099ec416f66963e59f4296075c502811` |

## Open the actual flow first

Start Nitro, authenticate against your development server, then use **Me → My Profile**. This requests
the real profile, badge and relationship packets through the registered handlers.
The profile is available without entering a room.

Keep `renderer.color.space` at `srgb` for Flash comparisons. The previous
`display-p3` configuration changes the appearance of the same RGB artwork.
Refresh the page after changing it; the renderer reads it at startup.

## Repeatable visual states

From the repository root, with an authenticated `agent-browser` session named `nitro`
and My Profile already open:

```powershell
$fixture = node tools/profile-visual-fixture.mjs populated --base64
agent-browser --session nitro eval -b $fixture
agent-browser --session nitro screenshot populated.png
```

Use `empty`, `private`, `blocked` or `restore` in place of `populated`. The base64 form
avoids the Windows npm shim losing piped stdin. These previews replace browser state
only. Reloading or `restore` restores server-provided data. Restore before testing
server actions; the populated preview uses synthetic negative group IDs.

Populated uses the current user's badge images as group placeholders to exercise
layout and image sizes. It is not an official-Habbo screenshot baseline or a packet test.

Inspect these source contracts:

- Frame: 521×537, content margins 3/36/3/3, initially centered.
- Style-100 text with no explicit text style: `il_regular` (11px), preserving markup.
- Grey badge panel, right-aligned Change Badges link, green friend/self tick.
- Footer outer rules and column separators; centered auto-sized lists, spacing 6,
  with badge count/rank in a nested list of spacing 2.
- Avatar widget resizes around its original horizontal centre; relationship heads
  retain their bottom edge when their cropped image height changes.
- Groups: 62×60 tiles; 410×224 grey panel with shared 343×214 group details at 33/5.
- Empty groups: no empty scrollbar, caption, group illustration, description and button.
- Private profiles hide the group section; blocked profiles cover the body with the
  translucent overlay, message panel and 2× Frank image while leaving Close usable.

Compare a reference and Nitro at the same device scale and profile state. Align
window bounds before comparing pixels. Do not automatically accept a new screenshot
as a baseline: these previews support inspection, not an assertion of pixel equality.

## Socket/parser/handler regression checks

Before navigating to Nitro, install this browser initialization script using your
browser runner's `addInitScript` or CDP `Page.addScriptToEvaluateOnNewDocument`:

```js
window.__profileTestSockets = [];
window.WebSocket = class extends WebSocket {
    constructor(...args) {
        super(...args);
        window.__profileTestSockets.push(this);
    }
};
```

Authenticate normally, then execute:

```powershell
$checks = node tools/profile-packet-check.mjs --base64
agent-browser --session nitro eval -b $checks
```

The check delivers version-specific binary fixtures to the real socket receiver.
It asserts complete parser consumption, registered composers, follow-up requests,
other-user switching, rejection of stale badge/relationship responses, private and
non-opening responses, refresh gating, and block/unblock response handling.
During synchronous replay outbound messages are captured, not transmitted. Stores,
the socket send method and parser are restored in `finally`.

Run with `--known-broken-parser --base64` to reproduce the original empty parser;
the wire assertion must fail. This is a negative control, not a full old-revision run.
These checks establish client behaviour; server persistence and group actions still
require a server implementing those flows and appropriate test accounts.

## Configuration scope

The contribution preserves the repository's badge host and socket configuration.
Any development server address, ticket or badge host override belongs in the local
launch URL, never in the PR. The `srgb` renderer default is an intentional shared
rendering correction: the supplied skin bitmap RGB values are sRGB; interpreting
those values as Display P3 changes their appearance. It affects all windows, not
only profiles. Inspect existing windows as well when reviewing that change.
`image.library.questing.url` uses the official case-sensitive `Quests/` asset path
for the profile's group-list tiles.
