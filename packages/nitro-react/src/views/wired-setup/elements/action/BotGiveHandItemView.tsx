/**
 * `actiontypes/BotGiveHandItem.buildInputs` - the `bot.usage` checkbox over the bot name field
 * (shown only while ticked) in the `bot.name` section, then the hand item dropdown over the
 * "capture" button in the `handitem` section.
 *
 * `captureHanditem` reads what the editing user carries (`figure_carry_object` of their own
 * avatar's room object) and selects it, adding it to the list when it is not there.
 */
import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { useOwnRoomObjectId, useRoom } from '#base/context/room';
import { BotGiveHandItemActionForm, selectHandItemCode, WiredElementView } from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredBotNameInput } from './shared/WiredBotNameInput';

export const BotGiveHandItemView: WiredElementView<BotGiveHandItemActionForm> = ({ form, setForm }) => {
    const room = useRoom();
    const ownRoomObjectId = useOwnRoomObjectId();

    const captureHandItem = () => {
        const carried = room?.getRoomObject(ownRoomObjectId, RoomObjectCategoryEnum.Unit)?.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject);

        if (carried === undefined) return;

        setForm(current => selectHandItemCode(current, carried));
    };

    return (
        <>
            <WiredSection title="${wiredfurni.params.bot.name}">
                <WiredSimpleList>
                    <WiredCheckboxGroup
                        options={[ { label: '${wiredfurni.params.bot.usage}', selected: form.useBot } ]}
                        onToggle={(_, useBot) => setForm({ useBot })}
                    />
                    {form.useBot && (
                        <WiredBotNameInput
                            value={form.botName}
                            onChange={botName => setForm({ botName })}
                        />
                    )}
                </WiredSimpleList>
            </WiredSection>
            <WiredSection title="${wiredfurni.params.handitem}">
                <WiredSimpleList>
                    <WiredDropdown
                        options={form.handItemCodes.map(code => ({ id: code, label: `\${handitem${code}}` }))}
                        selected={form.handItem}
                        onSelect={code => setForm(current => selectHandItemCode(current, code))}
                        caption="${wiredfurni.tooltip.bot.handitem}"
                    />
                    <WiredButton
                        label="${wiredfurni.params.capture.handitem}"
                        onPress={captureHandItem}
                    />
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
