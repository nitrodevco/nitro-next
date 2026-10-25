/**
 * The inventory's bots page - Flash `inventory/bots/BotsView` with its `BotGridItem` thumbs
 * (`inventory_thumb_xml`), on `inventory_xml`'s `bots` window: the `grid` and the
 * `preview_container` with `bot_name`, `preview_image`, `bot_description` (the motto) and
 * `place_button`.
 *
 * - `getWindowContainer` asks for the list unless one has arrived
 *   (`HabboInventory.checkCategoryInitilization('bots')`).
 * - `updateState` / `updateContainerVisibility`: the window's `loading_container` until the list has
 *   arrived, its `empty_container` while it holds nothing (`InventoryView` draws them), else `grid`
 *   and `preview_container`. With nothing selected the first bot is (`selectFirst`).
 * - A thumb (`BotGridItem`): the bot's head facing 3 (`getGridItemImage`), cropped and centred in
 *   `bitmap`, `BG_COLOR` green while the tracker names it (category 5), the `outline` while
 *   selected; a press selects it, a press that leaves the thumb drags the bot into the room.
 * - `updatePreview`: the whole bot facing 4, cropped and centred in `preview_image`; `place_button`
 *   for the room's owner - `areBotsAllowed` and `isRoomOwner` read the same field
 *   (`placeInventoryBotToRoom`).
 *
 * The page itself only shows with `inventory.bots.enabled`, which is where `InventoryView` keeps
 * the tab.
 */
import { useEffect, useRef } from 'react';

import { checkBotInventoryInitialization, placeInventoryBotToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { UnseenItemCategory, useInventoryBotsActions, useInventoryStore, useInventoryUnseenIds } from '#base/context/inventory';
import { useIsRoomOwner } from '#base/context/room';
import { TemplateItem } from '#base/theme';

import { InventoryBotImage } from './InventoryBotImage';
import { InventoryPage, InventoryPageContext, inventoryPagePath, inventoryPageState, inventoryTemplateId, inventoryThumbLook, NO_INVENTORY_PAGE } from './inventoryPage';

/** `getGridItemImage` / `updatePreview`'s directions. */
const THUMB_DIRECTION = 3;
const PREVIEW_DIRECTION = 4;

/** `inventory_thumb_xml`'s `bitmap` (40x40) and the page's `preview_image` (100x150): the picture is centred in them. */
const THUMB_SIZE = 40;
const PREVIEW_WIDTH = 100;
const PREVIEW_HEIGHT = 150;

const page = (name?: string) => inventoryPagePath('bots', name);

export const useInventoryBotsPage = ({ active, templates }: InventoryPageContext): InventoryPage => {
    const { send } = useWebSocketContext();
    const bots = useInventoryStore(x => x.bots);
    const listInitialized = useInventoryStore(x => x.botListInitialized);
    const selectedBotId = useInventoryStore(x => x.botSelectedId);
    const unseenBotIds = useInventoryUnseenIds(UnseenItemCategory.BOT);
    const isRoomOwner = useIsRoomOwner();
    const { selectBot } = useInventoryBotsActions();
    // The thumb held down, so leaving it is a drag (`BotGridItem.eventHandler`).
    const heldBot = useRef(-1);

    const selectedBot = bots.find(bot => bot.id === selectedBotId);
    const firstBotId = bots[0]?.id;

    useEffect(() => {
        if (active) checkBotInventoryInitialization(send);
    }, [ active, send ]);

    // `selectFirst`.
    useEffect(() => {
        if (active && !selectedBot && (firstBotId !== undefined)) selectBot(firstBotId);
    }, [ active, selectedBot, firstBotId, selectBot ]);

    if (!active) return NO_INVENTORY_PAGE;

    // `updateState`: 3 once the list holds something.
    const showContent = listInitialized && (bots.length > 0);

    const thumbTemplate = templates[inventoryTemplateId('inventory_thumb_xml')];
    const thumbs: TemplateItem[] = thumbTemplate
        ? bots.map(bot => ({
                key: String(bot.id),
                from: thumbTemplate,
                bindings: {
                    '': {
                        onPointerDown: () => {
                            selectBot(bot.id);
                            heldBot.current = bot.id;
                        },
                        onPointerUp: () => {
                            heldBot.current = -1;
                        },
                        // `WME_OUT` with the thumb held: `placeItemToRoom(id, true)`.
                        onPointerOut: () => {
                            if (heldBot.current !== bot.id) return;

                            heldBot.current = -1;
                            placeInventoryBotToRoom(bot.id);
                        },
                    },
                    ...inventoryThumbLook(bot.id === selectedBotId, unseenBotIds.includes(bot.id)),
                    bitmap: {
                        children: (
                            <InventoryBotImage
                                bot={bot}
                                headOnly
                                direction={THUMB_DIRECTION}
                                width={THUMB_SIZE}
                                height={THUMB_SIZE}
                            />
                        ),
                    },
                },
            }))
        : [];

    return {
        state: inventoryPageState(listInitialized, bots.length),
        bindings: {
            [page('grid')]: { visible: showContent, items: thumbs },
            [page('preview_container')]: { visible: showContent },
            [page('bot_name')]: { caption: selectedBot?.name ?? '' },
            [page('preview_image')]: {
                children: selectedBot && (
                    <InventoryBotImage
                        key={selectedBot.id}
                        bot={selectedBot}
                        headOnly={false}
                        direction={PREVIEW_DIRECTION}
                        width={PREVIEW_WIDTH}
                        height={PREVIEW_HEIGHT}
                    />
                ),
            },
            [page('bot_description')]: { caption: selectedBot?.motto ?? '' },
            [page('place_button')]: {
                disabled: !(selectedBot && isRoomOwner),
                onPointerTap: () => selectedBot && placeInventoryBotToRoom(selectedBot.id),
            },
        },
    };
};
