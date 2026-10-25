# Server gaps

What the client implements that the Turbo development server does not answer yet: packets the
client sends that Turbo neither parses nor handles, and messages the client listens for that
Turbo never sends. On Turbo these features do nothing, or can only be checked by injecting the
server's messages into the client. Use this list to pick server work, and to tell a missing
server answer from a client bug.

This is the opposite of [Feature gaps](feature-gaps.md), which lists what the client has not
ported. A feature can be in both lists: the server's half here, the client's there.

As of client revision `WIN63-202609091217-117204808` and Turbo revision `Revision20260909`:
15 packets sent and 52 listened to. Update the list when a gap is closed on either side.

## How the list is made

`node tools/server-gaps.mjs <turbo-cloud checkout>` (or `TURBO_ROOT=<checkout>`) prints it; add
`--json` for the raw data. It matches the two sides by header id, so names that differ between
the client and Turbo do not matter.

- **Sent by the client.** Every composer whose class name appears in nitro-react. A gap is a
  header Turbo has no parser registered for (`no parser`), or a parser whose message has no
  handler (`no handler`).
- **Listened to by the client.** Every incoming message whose class name appears in nitro-react.
  A gap is a header Turbo has no serializer registered for (`no serializer`), or a composer
  nothing in Turbo refers to outside the revision's registration, the message primitives and the
  tests (`never sent`).

Both checks are by name, not by behaviour. A packet missing from this list is wired up on both
sides, but its handler can still do less than the client expects. A composer counts as sent as
soon as anything refers to it, even a method nothing calls. The behaviour gaps the tool cannot
see are under [Known behaviour gaps](#known-behaviour-gaps).

## Sent by the client, not handled by Turbo

Every one of these has a header in Turbo but no parser registered for it.

| Area | Packets | Client |
|---|---|---|
| Recycler | `GetRecyclerStatus`, `GetRecyclerPrizes`, `RecycleItems` | `commands/catalog/catalogRecyclerCommands.ts` |
| Game tokens | `GetSnowWarGameTokensOffer`, `PurchaseSnowWarGameTokensOffer` | `commands/game-tokens/gameTokensCommands.ts`, `commands/game-center/gameCenterCommands.ts` |
| NFT collectibles | `ClaimNftClaims`, `NftStorePurchase`, `RedeemNftLootBox`, `ProgressTreasureHunt` | `commands/collectibles/collectiblesRewardClaimsCommands.ts`, `collectiblesPurchaseCommands.ts`, `collectiblesCommands.ts`, `commands/wired/wiredCommands.ts`, `useRoomFurnitureActionHandler` |
| NFT trading | `GetNftTradeInventory`, `AddNftToTrade`, `RemoveNftFromTrade` | `commands/inventory/inventoryTradingCommands.ts` |
| Wired trading | `SelfDonateItem` | `commands/wired-trading/wiredTradingCommands.ts` |

`RedeemNftLootBox` is `UnknownOutgoing_41H` in Turbo's headers: Turbo knows the id but not the
packet.

The tool also reports `TurboBugReportCapture` (21001) and `TurboClientErrorReport` (21100) here
and `TurboBugReportRequest` (21000) below as `no Turbo header`. They are not gaps: they are the
`bugreport` extension of Turbo's bug report plugin (`context/bugreport/bugReportCapture.ts`) and
the `clienterrors` extension of its client errors plugin
(`context/clienterrors/clientErrorReporter.ts`), not part of the revision, so the revision's
headers never name them.

## Listened to by the client, never sent by Turbo

`no serializer` means Turbo cannot write the message at all; `never sent` means it can, but
nothing sends it.

| Area | Messages | Turbo |
|---|---|---|
| Hotel view | `IsUserPartOfCompetition` | never sent |
| Room: spectators | `YouAreSpectator`, `YouAreNotSpectator` | never sent |
| Room: chat | `SpecialSystemChat` | no serializer |
| Room: furniture | `UseObject`, `GamePlayerValue` | never sent |
| Room: notifications | `CustomUserNotification` | never sent |
| Room: mystery boxes | `ShowMysteryBoxWait`, `CancelMysteryBoxWait`, `GotMysteryBoxPrize` | never sent |
| Room: bots | `BotSkillListUpdate` | never sent |
| Room: queue | `RoomQueueStatus` | never sent |
| Room: sound | `PlayListSongAdded` | never sent |
| Navigator | `ShowEnforceRoomCategoryDialog` | never sent |
| Inventory | `FurniListRemoveMultiple` | never sent |
| Catalogue | `FurniRentOrBuyoutOffer` | never sent |
| Recycler | `RecyclerStatus`, `RecyclerPrizes`, `RecyclerFinished` | no serializer |
| Offer centre | `OfferRewardDelivered` | never sent |
| Game tokens | `SnowWarGameTokens` | never sent |
| Game centre | `Game2GameLongData`, `Game2InArenaQueue`, `Game2UserBlocked` | never sent |
| Quests | `CitizenshipVipOfferPromoEnabled` | never sent |
| User and account | `InClientLink` (its serializer writes nothing), `EmailStatusResult`, `AccountSafetyLockStatusChange`, `AvatarEffectSelected` | never sent |
| Chat styles | `UserPurchasableChatStyleChanged` | no serializer |
| Messenger | `MiniMailNew`, `MiniMailUnreadCount` | never sent |
| Notifications | `RoomMessageNotification`, `ElementPointer` (the hint arrow), `EpicPopup` | never sent |
| Hotel status | `InfoHotelClosed`, `LoginFailedHotelClosed` | never sent |
| NFT collectibles | `CollectibleMintableItemResult`, `NftBonusItemClaimResult`, `NftRewardItemClaimResult`, `NftTransferAssetsResult` | never sent |
| NFT collectibles | `NftClaimResult`, `NftStorePurchase`, `RedeemNftLootBoxState`, `RedeemNftLootBoxResult` | no serializer |
| Trading | `TradeSilverSet`, `TradeSilverFee`, `TradingOtherNotAllowed` (never sent), `TradeNftAssets`, `TradeNftAssetInventory` (no serializer) | |
| Wired trading | `SelfDonationResult` | no serializer |

## Known behaviour gaps

Packets that both sides handle, where Turbo does less than the Flash client expects. The tool
cannot find these; add them as they are found.

- **Hotel view requests.** `GetIsUserPartOfCompetition`, `ForwardToACompetitionRoom`,
  `ForwardToRandomCompetitionRoom`, `ForwardToASubmittableRoom` and `GetTalentTrack` are parsed
  and handled by an empty handler: Turbo has no room competitions or talent tracks, so the
  reception's competition and talents elements get no answer. The daily quest, concurrent users
  and room hopper widgets are answered.
- **Mystery box keys.** `MysteryBoxKeys` is sent once at login with no box or key colour, so
  the tracker (`mysterybox.tracker.active`) never shows one, and Turbo has no mystery box furni
  to open.
- **Friend bar notifications.** Turbo sends `FriendNotification`'s room event, achievement and
  quest types, but not the game ones (3 and 4), as it has no games.
- **Post-it pads bought before Turbo kept a sheet count.** Their stuff data is empty, which Turbo
  counts as one sheet and Flash (`int("")`) shows as a count of 0.

## Checking a client feature without the server

For a message Turbo never sends, inject it into the client's socket and look at the result.
Build the frame with nitro-api's `BinaryWriter` (`int length, short header, body`) and hand it to
the game socket's `onmessage`. Read the client's own store modules from the page with
`await import('/src/context/...')`, and run the probe against a freshly started dev server: an HMR
reload splits the modules, and the page then holds two copies of each store. A composer the
client sends can be checked by wrapping the socket's `send` and reading the header at byte 4.
