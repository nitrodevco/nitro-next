/**
 * The inventory's bots page - the `bots` region of `inventory_xml` (Flash `bots/BotsView`): the
 * `grid` (0,0 274x256) of `inventory_thumb_xml` thumbs and the `preview_container` (280,0 190x261)
 * with the selected bot's `bot_name`, its `preview_image` (43,24 100x150), its `bot_description` -
 * the bot's motto - and `place_button` (10,225 158x28).
 *
 * - Opening the page asks for the list unless one has arrived
 *   (`HabboInventory.checkCategoryInitilization('bots')`).
 * - `place_button` drags the bot in through the object mover, which only the room's owner may do
 *   (`BotsModel.placeItemToRoom`, whose two gates read the same flag - see
 *   `inventoryBotsCommands`).
 *
 * The page itself only shows with `inventory.bots.enabled`, which is where `InventoryView` keeps
 * the tab.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { checkBotInventoryInitialization, placeInventoryBotToRoom } from '#base/commands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { InventoryBot, useInventoryBotsActions, useInventoryStore } from '#base/context/inventory';
import { useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, InfiniteGrid, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `inventory_thumb_xml`, the same 42x42 thumb the furni grid uses. */
const THUMB_SIZE = 42;
const THUMB_COLOR = '#cccccc';

/** `BotGridItem` draws the bot's head; the preview draws it whole. */
const THUMB_DIRECTION = 2;
const PREVIEW_DIRECTION = 2;

/** `BotData.gender` is `'m'` or `'f'`, in whichever case the hotel sends. */
const getBotGender = (bot: InventoryBot): AvatarGenderType => ((bot.gender.toLowerCase() === 'f') ? AvatarGenderType.Female : AvatarGenderType.Male);

interface BotThumbProps {
    bot: InventoryBot;
    selected: boolean;
    onSelect: (botId: number) => void;
}

const BotThumb = ({ bot, selected, onSelect }: BotThumbProps) => (
    <Region
        cursor="pointer"
        onPointerDown={() => onSelect(bot.id)}
        layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
    >
        <Border
            variant="5"
            tintColor={THUMB_COLOR}
            layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
            <AvatarImage
                figure={bot.figure}
                gender={getBotGender(bot)}
                headOnly
                direction={THUMB_DIRECTION}
            />
        </Border>
        {selected && (
            <ThemeImage
                src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
            />
        )}
    </Region>
);

export const InventoryBotsView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const bots = useInventoryStore(x => x.bots);
    const selectedBotId = useInventoryStore(x => x.botSelectedId);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const { selectBot } = useInventoryBotsActions();

    useEffect(() => {
        checkBotInventoryInitialization(send);
    }, [ send ]);

    const selectedBot = bots.find(bot => bot.id === selectedBotId);

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 274, height: 256, overflow: 'hidden' }}>
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: 274, bottom: 0, flexDirection: 'column' }}>
                    <InfiniteGrid
                        items={bots}
                        itemGrid={{ width: THUMB_SIZE, height: THUMB_SIZE, spacing: 2 }}
                        getKey={bot => `bot-${bot.id}`}
                        itemRender={bot => (
                            <BotThumb
                                bot={bot}
                                selected={bot.id === selectedBotId}
                                onSelect={selectBot}
                            />
                        )}
                    />
                </Box>
            </Region>
            <Region layout={{ position: 'absolute', left: 280, top: 0, width: 190, height: 261 }}>
                {selectedBot && (
                    <>
                        <ThemeText
                            text={selectedBot.name}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 0, width: 67, height: 19 }}
                        />
                        <Box layout={{ position: 'absolute', left: 43, top: 24, width: 100, height: 150, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
                            <AvatarImage
                                figure={selectedBot.figure}
                                gender={getBotGender(selectedBot)}
                                direction={PREVIEW_DIRECTION}
                            />
                        </Box>
                        <Box layout={{ position: 'absolute', left: 0, top: 174, width: 190, height: 45, overflow: 'hidden' }}>
                            <ThemeText
                                text={selectedBot.motto}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                                verticalAlign="top"
                                layout={{ width: 190 }}
                            />
                        </Box>
                    </>
                )}
                <Button
                    variant="3"
                    name="place_button"
                    textStyle="button_shiny_regular"
                    disabled={!selectedBot || !isRoomOwner}
                    onPointerTap={() => selectedBot && placeInventoryBotToRoom(selectedBot.id)}
                    layout={{ position: 'absolute', left: 10, top: 225, width: 158, height: 28, minWidth: 158, maxWidth: 158 }}
                >
                    {t('inventory.bot.placetoroom')}
                </Button>
            </Region>
        </Region>
    );
};
