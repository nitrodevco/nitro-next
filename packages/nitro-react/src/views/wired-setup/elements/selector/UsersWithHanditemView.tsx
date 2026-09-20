/**
 * `selectors/§_-l1M§.buildInputs` - the hand item dropdown and, under it, the "capture" button,
 * which picks the item the user's own avatar is carrying (`captureHanditem`: the own unit's
 * `figure_carry_object`), adding it to the list when it is not there yet.
 */
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useOwnRoomObject } from '#base/context/room';
import { selectUsersWithHanditem, UsersWithHanditemSelectorForm, WiredElementView } from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';

export const UsersWithHanditemView: WiredElementView<UsersWithHanditemSelectorForm> = ({ form, setForm }) => {
    const ownRoomObject = useOwnRoomObject();

    const capture = () => {
        const handItem = ownRoomObject?.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0;

        setForm(current => selectUsersWithHanditem(current, handItem));
    };

    return (
        <WiredSection title="${wiredfurni.params.handitem}">
            <WiredSimpleList>
                <WiredDropdown
                    options={form.handItems.map(id => ({ id, label: `\${handitem${id}}` }))}
                    selected={form.handItem}
                    onSelect={handItem => setForm({ handItem })}
                    caption="${wiredfurni.tooltip.handitem}"
                />
                <WiredButton
                    label="${wiredfurni.params.capture.handitem}"
                    onPress={capture}
                />
            </WiredSimpleList>
        </WiredSection>
    );
};
