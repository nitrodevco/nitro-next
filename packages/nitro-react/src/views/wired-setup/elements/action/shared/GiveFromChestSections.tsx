/**
 * `actiontypes/chests/§_-f1U§.buildInputs` + `finalizeBuilding` - the inputs both "give from
 * chest" boxes share: the rewarding mode radio, the amount (`ValueOrVariableSection` of merged
 * section 0, 1 and up, disabled while everything is given) and the reward popup section (its
 * text, 45 high with at most 3 lines and 200 characters, and the "show by default" checkbox).
 * A box's own section (`finalizeBuilding`'s override) comes after them, as `children`.
 */
import { ReactNode } from 'react';

import { setWiredMergedSourceType } from '#base/commands';
import { getMergedSourceOptions, getWiredRoomVariables, GIVE_FROM_CHEST_MODE_ALL, GIVE_FROM_CHEST_POPUP_HEIGHT, GIVE_FROM_CHEST_POPUP_MAX_LENGTH, GIVE_FROM_CHEST_POPUP_MAX_LINES, GiveFromChestForm, WIRED_INT_MAX, WiredElementContext, WiredElementDefinition, WiredTriggerable } from '#base/wired';

import { WiredCheckboxGroup } from '../../../kit/WiredCheckboxGroup';
import { WiredDisabled } from '../../../kit/WiredDisabled';
import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredSimpleList } from '../../../kit/WiredSimpleList';
import { WiredTextArea } from '../../../kit/WiredTextArea';
import { WiredValueOrVariableSection } from '../../../kit/WiredValueOrVariableSection';

export interface GiveFromChestSectionsProps {
    /** The box's definition, for `mergedSourceOptions(0)`. */
    definition: WiredElementDefinition<unknown>;
    form: GiveFromChestForm;
    setForm: (update: Partial<GiveFromChestForm>) => void;
    triggerable: WiredTriggerable;
    ctx: WiredElementContext;
    children?: ReactNode;
}

export const GiveFromChestSections = ({ definition, form, setForm, triggerable, ctx, children }: GiveFromChestSectionsProps) => (
    <>
        <WiredSection title="${wiredfurni.params.rewarding_mode}">
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.rewarding_mode.0}' }, { id: 1, label: '${wiredfurni.params.rewarding_mode.1}' } ]}
                selected={form.rewardingMode}
                onSelect={rewardingMode => setForm({ rewardingMode })}
            />
        </WiredSection>
        <WiredDisabled disabled={form.rewardingMode === GIVE_FROM_CHEST_MODE_ALL}>
            <WiredValueOrVariableSection
                title="${wiredfurni.params.amount_to_give}"
                sourceTypeOptions={getMergedSourceOptions(definition, form, 0, ctx)}
                min={1}
                max={WIRED_INT_MAX}
                state={form.amount}
                onChange={amount => setForm({ amount })}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                variables={getWiredRoomVariables(triggerable)}
                roomId={ctx.roomId}
            />
        </WiredDisabled>
        <WiredSection title="${wiredfurni.reward_contract.reward_popup}">
            <WiredSimpleList>
                <WiredTextArea
                    value={form.popupText}
                    onChange={popupText => setForm({ popupText })}
                    height={GIVE_FROM_CHEST_POPUP_HEIGHT}
                    maxLines={GIVE_FROM_CHEST_POPUP_MAX_LINES}
                    maxCharacters={GIVE_FROM_CHEST_POPUP_MAX_LENGTH}
                    placeholder="${wiredfurni.reward_contract.reward_popup.text.tooltip}"
                />
                <WiredCheckboxGroup
                    options={[ { label: '${wiredfurni.reward_contract.reward_popup.show_by_default}', selected: form.showPopupByDefault } ]}
                    onToggle={(id, showPopupByDefault) => setForm({ showPopupByDefault })}
                />
            </WiredSimpleList>
        </WiredSection>
        {children}
    </>
);
