# Feature gaps

What the port does not do yet, as of client revision `WIN63-202609091217-117204808`: whole
systems with no window, and gaps inside features that are otherwise ported. Use it to pick work,
and to tell a missing feature from a bug before debugging something that was never built.

This list comes from the code, not from a full audit against the Flash client, so a gap that
neither sends nor receives a packet and carries no "Not ported" note can be missing from it.
Update the list when a gap is closed or found.

## How the list is made

Three sources, each worth re-running after a revision bump or a feature port:

- **Packet coverage.** `node tools/packet-coverage.mjs` lists, by feature area, the incoming
  messages nothing in the client listens to and the outgoing composers nothing sends. At the time
  of writing that is 176 of 556 incoming and 201 of 553 outgoing. A packet counts as used when its
  class name appears in the client's source, so a registered listener that does nothing still counts.
- **The port's own notes.** Views, stores and handlers state what they leave out; search the
  client for `not ported` and `Not ported:`.
- **The drift checks.** `handlers.py` in the local drift tool (see [Staying in step](staying-in-step.md))
  names the Flash class that handles each unsubscribed packet, and `known.HANDLERS_UNHANDLED`
  gives the reason for every packet left unhandled on purpose.

Not every unused packet is a gap: see [Not gaps](#not-gaps).

The server's side is [Server gaps](server-gaps.md): what the client does that Turbo does not
answer yet.

## Whole features with no window

| Feature | What is missing | Packet areas |
|---|---|---|
| Messenger and friend bar | Conversations and their history, instant-message errors, mini mail, friend notifications, room invites, the conversation's habbicon picker (`MessengerHabbiconPicker`). The friend list is ported; its "start conversation" buttons do nothing (`FriendListSearch`, `FriendListSearchItem`). The friend bar is ported (`views/friend-bar`); Turbo only sends its room event notifications, as it has no achievements, quests or games to send the others for. | `FriendList` |
| Moderation tool | Issues, chat logs, room and user info, room visits, sanctions. No window, no store, and nothing sends its requests. | `Moderation`, `Moderator` |
| Help, call for help and guides | Reporting a user or room (the navigator's room info bubble keeps its report entry hidden until this exists), pending calls, guide sessions, chat review, the safety quiz. | `Help`, `Callforhelp` |
| Quests and talent track | Daily and seasonal quests, community goals and talent track levels. The achievement browser, score and standard award packets are implemented; see [achievement client](achievements.md). | `Quest`, `Talent` |
| Game centre | SnowWar (it needs the game engine), game directory, leaderboards, weekly rewards. `commands/gameTokensCommands.ts` has nothing that calls it. | `Game` |
| Group forums | Forum list, threads, posts, moderation, unread counts. Group info, management and profiles are ported (`GroupInfoView`'s `show_forum_link`). | `Groupforums` |
| Room camera | Taking, buying and publishing photos, thumbnails, photo competitions. The mannequin and plane code note the missing camera render (`FurnitureMannequinVisualization`, `RoomPlane`). | `Camera` |
| Campaign calendar | The advent calendar and its doors, and the seasonal daily offer that shares it. | `Campaign`, `Catalog` |
| New user experience | The gift offer, the initial room choice, the tutorial script. | `Nux` |
| Room competitions | Submitting, voting, forwarding to competition rooms. | `Competition`, `Navigator` |
| NFT wardrobe | Saved NFT outfits and their selection, silver. | `Nft` |
| Name change | `AvatarEditorNameChangeView` and the in-room name change (`AvatarEditor`). | `Avatar` |
| Avatar editor | The hot looks and effects lists (`HotLooksView`, `AvatarEditorGridViewEffects`, `effectParamsContainer`) and the `nfts` tab - nothing feeds them. | `AvatarEditor` |

## Gaps inside ported features

| Area | Gap | Where |
|---|---|---|
| Room | YouTube playback control from the server (`YoutubeControlVideoMessage`). | `FurnitureYoutubeView` |
| Pets | The breeding dialogs, and placing a pet opened from a present (it stays in the inventory). | `useInventoryPetsPage`, `FurniturePresentOpenedWidget` |
| Navigator | Reporting a room from the room info bubble, which waits on the call-for-help reporting flow (see Help above). | `NavigatorRoomInfoPopup` |
| Catalogue | The gift check (`GetIsOfferGiftableComposer`), the HC extend offer, the targeted offer's HabboMall page. | `registerTargetedOfferHandlers` |
| Crafting | Secret recipes (`CraftSecretComposer`, `GetCraftingRecipesAvailableComposer`). | |
| Badges | Requesting a badge (`RequestABadgeComposer`). | |
| Inventory | Merged rentable furni (the `rentables` tab) and a rented item's rent state and expiry, the `use_btn` and paging through an external image wall item (`showUseProductSelection`), the achievement score under the badges. | `useInventoryFurniPage`, `useInventoryBadgesPage`, `InventoryView` |
| Wired | The hover popup in the wired trade view, and the limited-edition plaque on chest item icons. | `WiredTradeView`, `WiredChestItemCell` |
| Notifications | The new-feature window, the moderation disclaimer, the notification feed. `ClubGiftSelectedEventMessage` and `PetReceivedMessage` have empty stub parsers. | `NotificationStore`, `registerAlertDialogHandlers` |
| Purse | What clicking the currency icons opens. | `PurseView` |
| Hotel view | The widget types `PORTED_LANDING_VIEW_WIDGETS` leaves out: the avatar image, the catalogue promos, daily quest, the competition prizes and hall of fame, the moderation, talents, Habbo Way and safety quiz promos, and the room hopper. The promo article draws only its first article's text, not its `promo_article` window. The generic widget leaves out its title, image, room, badge, habblet, VIP, community goal, daily quest and concurrent-user elements. The expiring page widget is not asked again when an invisible catalogue page is visited (`CATALOG_INVISIBLE_PAGE_VISITED`), the next limited rare's buttons open its page without picking the offer, and the community goal keeps `goal_info` at its layout height. What the ported widgets wait on from the server is under [Hotel view: Turbo and the admin panel](#hotel-view-turbo-and-the-admin-panel). | `HotelViewWidgets`, `HotelViewGenericWidget`, `HotelViewPromoArticleWidget` |
| Chat | Flash's chat commands other than the wired ones; the chat input sends them as chat. The chat bar's help button (`helpbutton`, shown while the pointer is over the field, opening `habbopages/chat/commands`) stays hidden. | `wiredChatCommands`, `RoomChatInputView` |
| Account | Email change and status. | `Users` |
| Hot looks, mystery box keys, user classification, element pointer | No listener or request. | |

## Hotel view: Turbo and the admin panel

The reception's widgets are configured by `landing.view.*` external variables, which Turbo's
admin panel edits on its Hotel view page (`turbo-admin/src/pages/hotel-view`). That page puts any
widget type in slots 1-5 and the fixed widgets in the bottom slot 6, and has forms for `generic`
promos, container schedules, the backgrounds and their moving objects, the shared look, and what
each fixed widget reads (its Look and widgets tab). Anything else is reachable through its All
tab, as raw JSON. Where each widget stands:

| Widget | Turbo | Admin panel |
|---|---|---|
| `expiringcatalogpage`, `expiringcatalogpagesmall` | Answers `GetCatalogPageWithEarliestExpiry` with the page that runs out first among those still to come (`catalog_page_expiries`), or an empty name. The page stays in the catalogue: an expiry only promotes it. | The Expiring pages tab: the pages and when they run out, each page's `landing.view.pageexpiry.page.<page>.header` / `.desc` texts and a preview of its `reception/catalog_teaser_<page>.png`. |
| `nextlimitedrarecountdown` | Works: the next active LTD series whose "On sale from" is still to come, from the published catalogue. | `next.limited.rare.countdown.widget.disabled` is a switch on the Look and widgets tab; the catalogue's limited section schedules the rare. |
| `communitygoal`, `communitygoalvsmode`, `communitygoalvsmodevote` | Plays the last goal started: progress (levels, the score to the next, the player's score and rank, time left, the prize bands), the hall of fame, and votes, counted once per player in a voting goal and answered with `CommunityVoteReceived`. Items bought from a goal's catalogue page (or each side's) are its points. | The Community goals tab: each goal's code, mode, dates, levels, prize bands and pages, its texts, its meter art previewed, and its standing. `landing.view.community.interactive` and `.catalog.target` are on the Look and widgets tab. |
| `promoarticle` | Answers `GetPromoArticles` with the visible articles within their dates, in order, ten at most. | The Articles tab: title, text, picture, button to a web page or client link, dates and order. |
| `bonusrare` | Runs the latest campaign started and not ended: credits bought (recorded under a receipt) or spent in the catalogue, as the campaign says, count towards it, and each target reached gives the furniture once. The widget is sent the player's progress after every count. | The Bonus rare tab: campaigns, what counts, and recording bought credits; the picture is on the Look and widgets tab. |
| Moving background objects | Nothing; they are client-side. | The Backgrounds tab, per background set: up to 20 objects, each its picture, type and that type's numbers. |
| The bottom slot | Nothing. | Slot 6 on the Slots tab, offering the fixed widgets the port draws there. |
| `catalogpromo`, `catalogpromosmall`, `avatarimage`, `habbomoderationpromo`, `habbowaypromo`, `roomhoppernetwork` | Nothing beyond the catalogue, navigator and help features they open. | Ready for when the client draws them: `landing.view.catalog.promo.target` / `.image.uri` and the promo's texts, and `landing.view.roomhopper.network.id` / `landing.view.roomhopper.image.uri`, on the Look and widgets tab. |
| `dailyquest`, `habbotalentspromo`, `safetyquizpromo`, `achievementcompetition_hall_of_fame`, `achievementcompetition_prizes` | The quest, talent track, quiz and competition handlers are empty, and there are no community goal prize packets. | Editors for quests, talent tracks, the safety quiz and goal prizes, once those systems exist. |

## Views not yet drawn from their Flash template

These windows work but are hand-placed: theme components laid out by number rather than drawn
from the Flash layout through `TemplateWindow`. Converting one means binding what its Flash code
does to the layout's named windows, as the catalogue, inventory, achievements, infostand and room
object menus already do. A view counts here when it draws theme components and loads no template;
the layouts are the library's in `scripts/flash-js-resources`.

| Area | Views | Layouts |
|---|---|---|
| Hotel view | `views/hotel-view`, except the bonus rare, expiring page, next limited rare and community goal widgets | `habbo-friend-bar-com`: `landing_view_*`, `dynamic_widget_grid`, `generic_widget`, `element_*`, `promo_article` |
| Friend list and messenger | `views/friendlist`, `views/messenger` | `habbo-friend-list-com`, `habbo-messenger-com` |
| Groups and profile | `views/groups`, `UserProfileView` | `habbo-groups-com`: `group_info_window`, `group_management_window`, `badge_editor`, `guild_members_window`, `group_created_window`, `club_required`, `new_extended_profile` |
| Collectibles, habbicons, offer centre, special items | `views/collectibles`, `views/habbicons`, `OfferCenterView`, `SpecialItemsView` | `habbo-catalog-com`: `collectible_view`, `collectible_reward`, `habbicon_view`, `habbicon_purchase_confirmation`, `offer_center`, `special_items_display` |
| Wired menu, chests and transactions | `views/wired-menu`, `views/wired-trading/chests`, `views/wired-trading/transactions` | `habbo-user-defined-room-events-com`: `wired_menu_view`, `logs_overview`, `error_info_view`, `variables_management_*`, `chest_*`, `transaction_*` |
| Inventory leftovers | `InventoryMarketplaceView`, `InventoryTradingDock` | `habbo-inventory-com` |
| Earnings | `EarningsView` | `habbo-catalog-com`: `vault_view` |
| Room UI: engraving | `FurnitureEngravingView` | `habbo-room-ui-com`: `habboween_engraving`, `lovelock_engraving`, `wildwest_engraving` |
| Purse | `ActivityPointsView` | `habbo-toolbar-com`: `purse_indicator_*` |

The chat bar is drawn from `chatinput_window_new` but keeps the client's own text field in
`chat_input`'s place, for the command completion the port adds to it.

No layout to convert to, so these stay hand-placed: the wired setup editor and the wired trading
frame (`views/wired-setup`, `views/wired-common`, `WiredTradingFrame` - Flash builds them in code
from `UbuntuPresetManager`, and the `wired_style_*` templates are already read by the wired
styles), the floor plan editor (its layout is not in the bundles), the earnings window and the
loading screen. In the room UI, also the pet picker (`FurniturePetPickerView`: Flash floats a
`use_product_menu` bubble over each pet instead of opening a window), the room ad tooltip (built
with `createWindow`), the chat command suggestions (the port's own) and `PetPortraitView` (a
picture the breeding windows draw into their bitmaps).

## Not gaps

About 40 unused packets are protocol the port does not need:

- **The old navigator.** Its search composers (`MyRoomsSearchComposer`, `PopularRoomsSearchComposer`,
  `RoomTextSearchComposer`, ...) and results (`GuestRoomSearchResultMessage`, `OfficialRoomsMessage`,
  `PopularRoomTagsResultMessage`, `CanCreateRoomMessage`). The client uses the new navigator.
- **The handshake and shell.** `InitDiffieHandshake`, `CompleteDiffieHandshake`, `VersionCheck`,
  `UniqueId`, `IdentityAccounts`, `RestoreClientMessage`: the port's socket speaks plaintext and
  the client is a page, not an AIR shell.
- **Tracking.** Latency pings, lag warnings and performance logs.
- **Packets this revision's Flash client registers or defines but never acts on.**
  `NoSuchFlatMessage`: both navigators' `onNoSuchFlat` are empty, so there is no error to show.
  `RedeemMarketplaceOfferCreditsComposer`: `HabboCatalog.redeemSoldMarketPlaceOffers` has no
  caller, so the own-items page has no redeem button. `GiveSupplementToPetComposer`: the pet menus'
  `give_water` and `give_light` rows are never shown, so nothing raises `RWUAM_GIVE_WATER_TO_PET` or
  `RWUAM_GIVE_LIGHT_TO_PET`. `NavigatorLiftedRoomsMessage`: `NavigatorView.createSubViews` never
  creates its `LiftView`, so the promoted-rooms strip has nowhere to draw. `CanCreateRoomEventMessage`:
  nothing sends `CanCreateRoomEventMessageComposer`, so an event is only made by buying a room ad.
  `CancelEventComposer`: the event settings window's end and cancel handlers are never wired to a
  button.
