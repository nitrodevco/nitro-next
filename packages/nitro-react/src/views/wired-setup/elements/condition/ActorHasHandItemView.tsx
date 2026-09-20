/**
 * `conditions/ActorHasHandItem.buildInputs` - the `handitem` section: the hand item dropdown
 * (`wiredfurni.tooltip.handitem` as its caption, `${handitem<code>}` per option) over the
 * `capture.handitem` button, which selects what the user's own avatar is carrying
 * (`figure_carry_object` on its room object, `captureHanditem`).
 */
import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useOwnRoomObjectId, useRoom } from '#base/context/room';
import { ActorHasHandItemConditionForm, selectActorHasHandItem, WiredElementView } from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';

export const ActorHasHandItemView: WiredElementView<ActorHasHandItemConditionForm> = ({ form, setForm }) => {
    const room = useRoom();
    const ownRoomObjectId = useOwnRoomObjectId();

    const captureHandItem = () => {
        const roomObject = room?.getRoomObject(ownRoomObjectId, RoomObjectCategoryEnum.Unit);

        if (!roomObject) return;

        const handItem = roomObject.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0;

        setForm(current => selectActorHasHandItem(current, handItem));
    };

    return (
        <WiredSection title="${wiredfurni.params.handitem}">
            <WiredSimpleList>
                <WiredDropdown
                    options={form.handItems.map(code => ({ id: code, label: `\${handitem${code}}` }))}
                    selected={form.handItem}
                    onSelect={handItem => setForm({ handItem })}
                    caption="${wiredfurni.tooltip.handitem}"
                />
                <WiredButton
                    label="${wiredfurni.params.capture.handitem}"
                    onPress={captureHandItem}
                />
            </WiredSimpleList>
        </WiredSection>
    );
};
