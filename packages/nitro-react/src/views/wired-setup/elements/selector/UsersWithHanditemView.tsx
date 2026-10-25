/**
 * `selectors/§_-l1M§.buildInputs` - the hand item dropdown and, under it, the "capture" button
 * (`HandItemSection`), which picks the item the user's own avatar is carrying (`captureHanditem`:
 * the own unit's `figure_carry_object`), adding it to the list when it is not there yet.
 */
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useOwnRoomObject } from '#base/context/room';
import { selectUsersWithHanditem, UsersWithHanditemSelectorForm, WiredElementView } from '#base/wired';

import { HandItemSection } from '../shared/HandItemSection';

export const UsersWithHanditemView: WiredElementView<UsersWithHanditemSelectorForm> = ({ form, setForm }) => {
    const ownRoomObject = useOwnRoomObject();

    const capture = () => {
        const handItem = ownRoomObject?.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0;

        setForm(current => selectUsersWithHanditem(current, handItem));
    };

    return (
        <HandItemSection
            handItems={form.handItems}
            selected={form.handItem}
            onSelect={handItem => setForm({ handItem })}
            onCapture={capture}
        />
    );
};
