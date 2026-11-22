# Achievement client

The server owns progression, awards, balances and badge entitlements. The client requests
the ordered catalog once per authenticated session, receives changes through the standard
achievement packets and sends no progress or reward claims.

The progression toolbar menu opens the Pixi browser; client links are `questengine/achievements`
or `questengine/achievements/<category>`. A catalog received without an open request opens no
window. The browser shows server categories in received order, then miscellaneous entries, then
archive. The configured new and room-controlled categories are reached through category links.
Disabled entries are hidden; room-controlled entries need their `WF_` code enabled by the current
room's Wired environment.

The window draws the quest engine's window templates (`habbo-quest-engine-com` from
`asset.bundles.templates`) as `AchievementController` builds them: `Achievements` is the window,
an `AchievementCategory` per grid tile and an `Achievement` per list slot are added to its
containers, and a `ProgressBar` to the footer and the details. `refresh`'s geometry is the
template's `arrange` (sections stacked by `moveAllChildrenToColumn(content, 0, 4)`, height
`lowest point + 45`). Tiles, category pictures (`ach_category_<code>`, `achicon_<code>`) and the
slot backgrounds are the templates' `${image.library.questing.url}` bitmaps; the bar's fill
animates with the AS3 step formula. A category of more than 24 achievements scrolls in five
columns. Selecting an achievement uses the visible entry, where AS3 indexes the unfiltered list in
`wired_games`.

The packet contracts follow AS3 `AchievementData`, `AchievementsMessageParser`,
`AchievementMessageParser` and `AchievementLevelUpData`. Limits and current points on the wire
are cumulative; the presentation subtracts `scoreAtStartOfLevel`. The reported level is the
current target until `finalLevel` is true. Earned levels and achievement score are separate.
The selected achievement fills its completed bar when the next level arrives and switches to
the latest queued update after two seconds. The catalog is built once per session: a later list
is ignored, and the server's default category applies only when the window asked for the list.
The overview (three-column category grid, total progress, score) is shown until a category is
picked; Back returns to it and clears that category's unseen entries. Unseen entries are kept for
every update to an unselected achievement; `toolbar.unseen_notification.skipped_badge_ids` only
excludes them from the toolbar count. Closing the window clears unseen entries; leaving a room
closes it. Disconnects and account changes clear the cache and pending transitions.

Hotel settings:

| Setting or asset | Purpose |
| --- | --- |
| `achievements.new` | Comma-separated badge base codes included in the new category |
| `toolbar.unseen_notification.skipped_badge_ids` | Badge substrings excluded from the unseen indicator |
| `badge.asset.url` | Badge URL template containing `%badgename%` |
| `quests.<category>.name` | Category label |
| `badge_name_<badge>` and `badge_desc_<badge>` | Badge label and description; base-code fallback is supported |
| `BadgePointLimitsEventMessage` | Description `%limit%` values for the hotel catalog |
| `currencyiconstyle.<size>.<type>` | Hotel-specific activity reward icons |

Custom achievements need their hotel badge images and texts. Standard questing assets provide
tile backgrounds and `image.library.questing.url` the `ach_category_<code>.png` tiles. AS3 has no
consumer for the notification's dialog flag, so there is no congratulations window: every
notification shows the corner item and logs `Achievements`/`Leveled` with the badge base name.
Category and achievement selection log `Category selected` and `Achievement selected`. Activity
rewards use their actual type for the currency icon. The progress text shows cumulative values,
as `ProgressBar` re-adds `scoreAtStartOfLevel`. Wallet balances still arrive through the wallet
handlers.

`registerAchievementHandlers` follows AS3 `onAchievementReceived`: a level-up notification adds
the level's badge and removes `removedBadgeCode`. A player holds one badge per achievement, so
the replaced level is always removed. The server then republishes the badge directory and worn
slots, which hand a worn level's slot to the new one and have the last word.

Run `node --test tools/achievements.test.mjs` for typed packet fixtures, cumulative offsets,
final levels, categories, links, unseen entries, session reset, room exit and transition
scheduling. `tools/fixtures/achievements.json` holds portable `[type, value]` packet fixtures for
backend and client checks. UI fixture checks do not establish pixel parity or prove a live Turbo
exchange; those require a running Turbo instance and a fresh dedicated-account SSO ticket.
