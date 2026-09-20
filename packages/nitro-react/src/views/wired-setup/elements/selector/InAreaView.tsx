/**
 * `selectors/InArea.buildInputs` (`FurniInArea`, `UsersInArea`) - the `area_selection` section:
 * the info text in the soft colour over a row of two buttons, "select" and "clear".
 *
 * The area is drawn in the room through the room's area selection manager, which the element
 * claims while its dialog is open (`onEditStart`: `activate(onAreaSelected, "highlight_brighten")`
 * and `setHighlight` with the box's area; `onEditEnd`: `deactivate`) - the effect below. "Select"
 * lets a new rectangle be dragged out and stays disabled until it is (`onSelect` /
 * `onAreaSelected`); "clear" drops the highlight, which reports an empty area. When the manager
 * is held by something else (`activate` refuses), both buttons are disabled.
 *
 * Whether the manager was claimed and whether a drag is under way live in a small external store
 * made per mount, read with `useSyncExternalStore`: the effect that claims the manager is what
 * learns the answer.
 */
import { RoomAreaSelectionManager } from '@nitrodevco/nitro-renderer';
import { useEffect, useState, useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';
import { useWiredSetupActions } from '#base/context/wired';
import { InAreaSelectorForm, WiredElementView } from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredButtonRow } from '../../kit/WiredButtonRow';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';

/** `§_-J3§` (the manager is claimed) and whether "select" is waiting for a drag. */
interface AreaSelectionStatus {
    activated: boolean;
    selecting: boolean;
}

const createAreaSelectionStatus = () => {
    let status: AreaSelectionStatus = { activated: false, selecting: false };

    const listeners = new Set<() => void>();

    return {
        get: () => status,
        set: (patch: Partial<AreaSelectionStatus>) => {
            status = { ...status, ...patch };

            listeners.forEach(listener => listener());
        },
        subscribe: (listener: () => void) => {
            listeners.add(listener);

            return () => {
                listeners.delete(listener);
            };
        },
    };
};

export const InAreaView: WiredElementView<InAreaSelectorForm> = ({ form }) => {
    const style = useWiredStyle();
    const room = useRoom();
    const [ status ] = useState(createAreaSelectionStatus);
    const { activated, selecting } = useSyncExternalStore(status.subscribe, status.get);
    // `onEditStart` highlights the area the box was opened with.
    const [ initialArea ] = useState(form);

    // The manager's callback outlives renders, so it writes the form through the store's stable action rather than `setForm`.
    const { setSetupForm } = useWiredSetupActions();

    useEffect(() => {
        if (!room) return;

        const manager = room.areaSelection;
        const onAreaSelected = (rootX: number, rootY: number, width: number, height: number) => {
            status.set({ selecting: false });
            setSetupForm({ rootX, rootY, width, height });
        };
        const claimed = manager.activate(onAreaSelected, RoomAreaSelectionManager.HIGHLIGHT_BRIGHTEN);

        if (claimed) manager.setHighlight(initialArea.rootX, initialArea.rootY, initialArea.width, initialArea.height);

        status.set({ activated: claimed, selecting: false });

        return () => {
            if (claimed) manager.deactivate();

            status.set({ activated: false, selecting: false });
        };
    }, [ room, status, initialArea, setSetupForm ]);

    const select = () => {
        status.set({ selecting: true });
        room?.areaSelection.startSelecting();
    };

    return (
        <WiredSection title="${wiredfurni.params.area_selection}">
            <WiredSimpleList>
                <WiredText
                    text="${wiredfurni.params.area_selection.info}"
                    color={style.softTextColor}
                />
                <WiredButtonRow>
                    <WiredButton
                        label="${wiredfurni.params.area_selection.select}"
                        onPress={select}
                        disabled={!activated || selecting}
                    />
                    <WiredButton
                        label="${wiredfurni.params.area_selection.clear}"
                        onPress={() => room?.areaSelection.clearHighlight()}
                        disabled={!activated}
                    />
                </WiredButtonRow>
            </WiredSimpleList>
        </WiredSection>
    );
};
