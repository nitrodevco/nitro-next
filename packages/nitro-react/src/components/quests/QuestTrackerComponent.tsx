/**
 * Mounts the quest trackers - AS3 `QuestController._questTrackers`, one `QuestTracker` per campaign
 * chain, each docked in the toolbar's extension column after the group banner and the room event
 * card. Those two name the tracker's window (`quest_tracker`) in their `attachExtension` lists
 * (`"room_group_info", ..., ["next_quest_timer", "quest_tracker", "event_info_window"]` and
 * `"room_event_info", ..., ["next_quest_timer", "quest_tracker"]`), and `ExtensionView.resolveIndex`
 * puts an extension in front of the first docked window its list names, so both go over a tracker
 * whichever docks first.
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
