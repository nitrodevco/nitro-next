import { HighScoreDataType, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoomWidget } from '#base/context';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureHighScoreView } from '#base/views/room-widgets/furniture/FurnitureHighScoreView';

import { RoomObjectMenuBubblePixi } from '../object-menu/RoomObjectMenuBubblePixi';

/**
 * A game's scoreboard. Nothing opens or closes it by hand: `FurnitureHighScoreLogic` asks for it
 * whenever the furni enters its display state and asks for it to go away in every other state,
 * so the board simply follows the game. Everything it shows is already on the object - the room
 * parsed the scores into the model when they arrived - which is why there is no packet here.
 *
 * Only one board can be up at a time, since widgets are keyed by request type. Flash had the
 * same single-window limit.
 */
export const FurnitureHighScoreWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);

    if (!request || !(furnitureData?.stuffData instanceof HighScoreDataType)) return null;

    const { scoreType, clearType, entries } = furnitureData.stuffData;

    return (
        <RoomObjectMenuBubblePixi objectData={{ objectId: request.objectId, category: request.category }}>
            <FurnitureHighScoreView
                scoreType={scoreType}
                clearType={clearType}
                entries={entries.map(entry => ({ score: entry.score, users: entry.users }))}
            />
        </RoomObjectMenuBubblePixi>
    );
};
