/**
 * `conditions/ActorHasHandItem.buildInputs` - the `handitem` section (`HandItemSection`): the hand
 * item dropdown over the `capture.handitem` button, which selects what the user's own avatar is
 * carrying (`figure_carry_object` on its room object, `captureHanditem`).
 */
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useOwnRoomObject } from '#base/context/room';
import { ActorHasHandItemConditionForm, selectActorHasHandItem, WiredElementView } from '#base/wired';

import { HandItemSection } from '../shared/HandItemSection';

export const ActorHasHandItemView: WiredElementView<ActorHasHandItemConditionForm> = ({ form, setForm }) => {
    const ownRoomObject = useOwnRoomObject();

    const captureHandItem = () => {
        if (!ownRoomObject) return;

        const handItem = ownRoomObject.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0;

        setForm(current => selectActorHasHandItem(current, handItem));
    };

    return (
        <HandItemSection
            handItems={form.handItems}
            selected={form.handItem}
            onSelect={handItem => setForm({ handItem })}
            onCapture={captureHandItem}
        />
    );
};
