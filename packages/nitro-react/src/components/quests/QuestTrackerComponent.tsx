/**
 * Mounts the quest trackers - AS3 `QuestController._questTrackers`, one `QuestTracker` per campaign
 * chain, each docked in the toolbar's extension column after the group banner and before the room
 * event card (`attachExtension("room_group_info", ..., ["next_quest_timer", "quest_tracker", ...])`,
 * `attachExtension("room_event_info", ..., ["next_quest_timer", "quest_tracker"])`).
 */
import { useQuestsStore } from '#base/context/quests';
import { QuestTrackerView } from '#base/views/quests/QuestTrackerView';

export const QuestTrackerComponent = () => {
    const trackers = useQuestsStore(x => x.trackers);

    return (
        <>
            { Object.entries(trackers).map(([ chainCode, tracker ]) => (
                <QuestTrackerView
                    key={chainCode}
                    tracker={tracker}
                />
            )) }
        </>
    );
};
