# Packets (`nitro-packets`)

For the corresponding Turbo parsers/serializers, registration and end-to-end checks, see
[Nitro and Turbo development](turbo-development.md).

Many generated parsers and composers are empty. To complete one:

1. Read the candidate body from the corresponding path in the packet generator output directory. Keep the repo's header id;
   never copy `IncomingHeader.ts`, `OutgoingHeader.ts` or the `Get*Packets.ts` maps.
2. Put the hand-edit marker at the top of the file before changing generated code: a comment
   beginning `// Body filled by hand` (the `PRESERVE_MARKER` that
   `packages/nitro-packets/scripts/sync-generated-packets.ts` looks for), saying the generator has
   no preserve step - `// Body filled by hand from the packet generator output - the generator has
   no preserve step, so re-apply after a regeneration.` Older markers name a local path; do not
   introduce one in new comments. The marker goes on with the first hand edit, not at the
   end: renaming one `param1` is a hand edit, and 44 composers once had real names and no marker,
   so one `--apply` would have reset them all. If the sync script is unavailable, finish the parser
   against AS3 manually and report that regeneration safety was not checked.
3. Rename generic parameters (`param2`) to what they mean, using the Flash parser or
   `com/sulake/habbo/session/*` for field meanings.
4. Register the class in `GetIncomingPackets.ts` / `GetOutgoingPackets.ts` and both barrels
   (`src/index.ts`, `src/incoming|outgoing/index.ts`, sorted case-insensitively). An
   unregistered packet fails at runtime with "Invalid listener: packet <name> is not registered."
5. Incoming parsers map to typed objects (`{ userId, selectedBadges: IHabboUserBadge[] }`), with
   the interface exported from the message file unless a shared parser already defines it.

A packet class is named after its header (`IncomingHeader.CfhChatlogMessage` ->
`CfhChatlogMessage`), so that a rename in the protocol shows up as a class no header names.
When a header disappears, delete its class, its barrel lines and its registry entry together -
no commented-out registry lines, and no `class_123Composer` leftovers. `scripts/drift/packets.py`
reports classes no header names; a base class other composers extend (`UpdateWiredComposer`) is
the one legitimate exception, and it is listed in `scripts/drift/known.py`. Older classes still
carry an `Event` infix (`AchievementsEventMessage` for `AchievementsMessage`): they are
registered and in use, so rename one only together with everything that imports it.

Bringing packets in from the tool goes through `yarn sync-packets` in `packages/nitro-packets`
when its sync script is available (dry by default), never a folder copy. See
[development prerequisites](development.md). The tool's tree and the repo's have grown apart in ways a
copy gets wrong:

- The tool moves classes between folders (`Wiredtrading/Chests` -> `Vault`, `Data/` -> per-feature
  `Data/`). The repo keeps its own path; a second copy under the new path is a duplicate export.
- A header served by an older class name already has its packet. `FigureSetIdsMessage.ts` sat
  empty in `Catalog/` beside the registered `FigureSetIdsEventMessage` - a shadow stub. Before
  adding a class, look the header up in `Get*Packets.ts`.
- An existing file is only overwritten while it is still an empty stub (`Type = object`). The
  sync lists everything else that differs for a diff by hand; `--force` is for a file you have
  just read both versions of.

### The wire format is the contract

A parser that reads the wrong thing does not fail - it hands back plausible garbage, and every
field after the mistake is wrong too. `scripts/drift/wire.py` reduces each filled-in parser to
the order of its `read*` calls (helpers expanded) and each composer to the number of values it
writes, and compares them with the tool's. Its first run found fourteen packets out of step,
among them `BadgesMessage` (two ints per badge never read), `AuthenticationOKMessage` (a short
array skipped, so `identityId` was the array's length), the messenger's messages (typed content
read as a bare string) and `WiredMovementsMessage` (three of its four item layouts). Rules that
come out of that:

- Finish a packet against the Flash parser, not against an older Nitro or what the server
  happened to send. When the tool and the repo disagree, the Flash parser decides: the tool gives
  up on some loops (`HeightMapUpdateMessage`) and drops helper calls
  (`WithdrawItemsFromChestComposer`), so it is evidence, not the truth.
- What Flash reads and throws away still has to be read. `UserChangeMessage` skipped a list of
  int triples and took the badges rank from the middle of it.
- Flash reads fields that were added to a packet over time only `if (bytesAvailable)`, each with
  its own default. Read them the same way - `AccountPreferencesMessage`'s tail, the chat
  messages' `chatBubbleWidthOverride` - so an older server still parses and a newer one is not cut short.
- A field behind a flag is `readBoolean() ? readInt() : NaN`, never a bare `readInt()`.
- A composer sends every value the Flash constructor puts in its array, defaults included
  (`BuildersClubPlaceRoomItemComposer`'s trailing `false`).
- A difference that is only in the shape of the code, or where the tool is the one that is wrong,
  goes into `WIRE_DIFFERENCES` in `scripts/drift/known.py` with the reason - after reading the
  Flash parser, not instead of it.

A packet with a `TODO` or an `undefined as any` field is a generator's unfinished output: it parses
short and is registered all the same. Fifteen of those sat in the tree unnoticed because nothing
consumed them yet. Replace one with the tool's body (and the `Data/` helpers it imports) or finish
it; `packets.py` now reports any that appear. The tool's output is not lint-clean and carries
ActionScript idioms that compile and do nothing in JS (`(date as any).month`), so after bringing a
body in: run `eslint --fix`, fix what is left by hand, put the marker on, and check whether the
repo already has the helper under another name before keeping the tool's copy
(`RoomSettingsParser` is the tool's `GetGuestRoomResultDataParser`; `wire.py`'s `reads()` will tell
you whether two parsers are the same).

`nitro-api` types that mirror packets (`IUserInfo`, `IRoomUserData`) get optional fields when a
newer packet adds them, with the slice default set alongside.
