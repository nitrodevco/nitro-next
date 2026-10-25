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
  of writing that is 96 of 585 incoming and 101 of 578 outgoing. A packet counts as used when its
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
| Help, call for help and guides | Pending calls, guide sessions, chat review, the safety quiz. Reporting a user, a room, an instant message or a photo is ported (`views/help`, `helpCommands`, the navigator's room info bubble). | `Help`, `Callforhelp` |
| Talent track and the daily quest | Talent track levels, and the talent track window the hotel view's `habbotalentspromo` button asks for (`GetTalentTrack`). The hotel view's daily quest widget and element are ported. The quest list, details, tracker and completed dialog are ported (`views/quests`), community goals are the hotel view's; the achievement browser, score and standard award packets are implemented - see [achievement client](achievements.md). | `Quest`, `Talent` |
| Game centre | SnowWar (it needs the game engine), game directory, leaderboards, weekly rewards. Nothing calls `buySnowWarTokensOffer` (`commands/game-tokens/gameTokensCommands.ts`); the catalogue's game token offers are bought through `purchaseGameTokensOffer`. The staff chat command `:csmm` (`GameManager.generateChecksumMismatch`) waits on the game manager. | `Game` |
| Campaign calendar | The advent calendar and its doors, the seasonal daily offer that shares it, and the seasonal quest calendar (`seasonalcalendar.MainWindow`, fed by `SeasonalQuestsMessage`). | `Campaign`, `Catalog`, `Quest` |
| Phone number verification | `HabboPhoneNumber`'s collect window and its minimised view, behind `sms.identity.verification.enabled`. | `Gifts` |
| Interstitial ads | `AdManager`'s interstitials, behind `interstitials.2016.enabled`. | `Advertisement` |
| New user experience | The gift offer and the tutorial script. The new user flow - look, name and starter room (`OnBoardingHcFlow`) - is ported (`views/onboarding`); the room types, their pictures (`new.user.flow.room.image.url`) and the dice's looks (`new.user.flow.figures.male` / `.female`) are configuration - see Turbo's `docs/onboarding.md`. | `Nux` |
| Room competitions | The room competition window (`RoomCompetitionController`) and voting. The hotel view's competition elements ask whether the user has entered, submit a room and forward to competition rooms, and its prizes and hall of fame widgets are drawn. | `Competition`, `Navigator` |
| Name change | The avatar editor's `avatar_name_change` (`AvatarEditorNameChangeView`, behind `premium.name.change.enabled`). Its layouts (`avatar_editor_name_change`, `avatar_editor_name_change_item`) are only in the AS3's embedded assets: Habbo's JavaScript client dropped them, so the `habbo-avatar-editor-com` template bundle built from its library has neither. In Flash the window only checks a name - `select_name_button` has no handler. The own avatar menu's name change window (`NameChangeView`) is ported (`commands/user/nameChangeCommands.ts`). | `Avatar` |

## Gaps inside ported features

| Area | Gap | Where |
|---|---|---|
| Room | YouTube playback control from the server (`YoutubeControlVideoMessage`). | `FurnitureYoutubeView` |
| Room camera | Photo competitions (`PhotoCompetitionComposer`, `CompetitionStatusMessage`); taking, buying and publishing photos and room thumbnails are ported (`views/room-widgets/camera`, `RoomThumbnailCameraWidget`). | `Camera` |
| Crafting | Secret recipes (`CraftSecretComposer`, `GetCraftingRecipesAvailableComposer`). | |
| Hotel view | Every widget type and generic widget element is drawn. What their buttons open is not always there: the talents promo asks for a talent track no window shows, the Habbo Way and safety quiz promos' buttons open windows that are not ported (`showHabboWay`, `SafetyBookletController`), and nothing reopens the room competition window (`reenableRoomCompetitionWindow`). The avatar image widget has no greyed placeholder while the figure loads, and the handlers' tracking calls (`trackGoogle`, `trackEventLog`) have no receiver. What the widgets wait on from the server is under [Hotel view: Turbo and the admin panel](#hotel-view-turbo-and-the-admin-panel). | `HotelViewWidgets`, `HotelViewGenericWidget` |
| Account | Email change and status. | `Users` |

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
| `catalogpromo`, `catalogpromosmall`, `avatarimage`, `habbomoderationpromo`, `habbowaypromo`, `roomhoppernetwork` | The Habbo Way counter is the community goal's progress. `RoomNetworkOpenConnection`, the room hopper's button, has an empty handler, so the client waits in an empty room. | `landing.view.catalog.promo.target` / `.image.uri` and the promo's texts, and `landing.view.roomhopper.network.id` / `landing.view.roomhopper.image.uri`, on the Look and widgets tab. The hotel has no `landing.view.catalogpromo.*` or `landing.view.roomhoppernetwork.*` texts, so those captions show their keys. |
| `achievementcompetition_prizes`, `achievementcompetition_hall_of_fame` | The prizes are the running goal's progress; `GetCommunityGoalHallOfFame` is answered. `ForwardToACompetitionRoom`, the hall of fame's room link, has an empty handler. | Goal prizes are the Community goals tab's prize bands. |
| `dailyquest`, `habbotalentspromo`, `safetyquizpromo`, and the generic widget's daily quest, concurrent-user and competition elements | `GetDailyQuest`, `GetConcurrentUsersGoalProgress`, `GetConcurrentUsersReward`, `GetIsUserPartOfCompetition`, `ForwardToRandomCompetitionRoom`, `ForwardToASubmittableRoom` and `GetTalentTrack` have empty handlers, so these show nothing past their first state. | Editors for quests, talent tracks, the safety quiz and concurrent-user goals, once those systems exist. |

## Views not yet drawn from their Flash template

Every window whose Flash layout is in the bundles draws from it through `TemplateWindow` (see
[Layout views](layout-views.md)). A view counts here when it draws theme components and loads no
template although a layout for it exists in `scripts/habbo-js-resources`.

The chat bar is drawn from `chatinput_window_new` but keeps the client's own text field in
`chat_input`'s place, for the command completion the port adds to it.

No layout to convert to, so these stay hand-placed: the wired setup editor and the wired trading
frame (`views/wired-setup`, `views/wired-common`, `WiredTradingFrame` and the chest settings and
notification settings windows on it - Flash builds them in code from `UbuntuPresetManager`, and the
`wired_style_*` templates are already read by the wired styles) and the loading screen. In the room UI, also the room ad tooltip (built with `createWindow`), the chat command suggestions (the port's
own) and `PetPortraitView` (a picture the breeding windows draw into their bitmaps).

## Not gaps

Many unused packets are protocol the port does not need:

- **The old navigator.** Its search composers (`MyRoomsSearchComposer`, `PopularRoomsSearchComposer`,
  `RoomTextSearchComposer`, ...) and results (`GuestRoomSearchResultMessage`, `OfficialRoomsMessage`,
  `PopularRoomTagsResultMessage`, `CanCreateRoomMessage`). The client uses the new navigator.
- **The handshake and shell.** `InitDiffieHandshake`, `CompleteDiffieHandshake`, `VersionCheck`,
  `UniqueId`, `IdentityAccounts`, `RestoreClientMessage`: the port's socket speaks plaintext and
  the client is a page, not an AIR shell.
- **Tracking.** Lag warnings and performance logs. The latency pings are ported (`latencyCommands`): `:ping` and the fps counter show them.
- **Packets this revision's Flash client registers or defines but never acts on.**
  `NoSuchFlatMessage`: both navigators' `onNoSuchFlat` are empty, so there is no error to show.
  `RedeemMarketplaceOfferCreditsComposer`: `HabboCatalog.redeemSoldMarketPlaceOffers` has no
  caller, so the own-items page has no redeem button. `GiveSupplementToPetComposer`: the pet menus'
  `give_water` and `give_light` rows are never shown, so nothing raises `RWUAM_GIVE_WATER_TO_PET` or
  `RWUAM_GIVE_LIGHT_TO_PET`. `NavigatorLiftedRoomsMessage`: `NavigatorView.createSubViews` never
  creates its `LiftView`, so the promoted-rooms strip has nowhere to draw. `CanCreateRoomEventMessage`:
  nothing sends `CanCreateRoomEventMessageComposer`, so an event is only made by buying a room ad.
  `CancelEventComposer`: the event settings window's end and cancel handlers are never wired to a
  button. `GetIsOfferGiftableComposer`: `HabboCatalog.checkGiftable` has no caller, and nothing
  listens to `IsOfferGiftableMessageEvent`. `CreditVaultStatusComposer`:
  `SessionDataManager.getCreditVaultStatus` has no caller. `TradingNotOpenEventMessage`:
  `TradingModel` only logs it.
- **Packets of a later revision nothing uses.** `SetFurnitureRegionDataComposer` (nothing in
  WIN63-202610121624 sends it) and `WiredLinkOperationResultMessage` (the live hotel never opens
  the Room Linker's link window). `UpdateWiredComposer` is the base class the wired update
  composers extend, never sent itself.
- **Discord rich presence.** `HabboDiscordManager` and its settings (`SetDiscordPreferencesComposer`)
  drive the AIR shell's native `DiscordRichPresence`, which a page does not have.
- **The notification feed** (`notifications/feed`). `HabboNotifications` declares its
  `NotificationController` and reads it, but never creates one, so the feed items `IncomingMessages`
  adds behind `notification.feed.enabled` have nowhere to go (and the hotel sets the key false).
- **The inventory's rentables tab and achievement score.** `HabboInventory.mergeRentFurni` always
  returns true, so rented furni share the furni page and the `rentables` tab is never added.
  `achievements_score_container` is hidden in `inventory_xml`, and `onAchievementsScore` only sets
  its text's parameter, so the badges page never shows the score.
