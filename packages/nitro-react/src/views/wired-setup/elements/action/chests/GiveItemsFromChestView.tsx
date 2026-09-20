/**
 * `actiontypes/chests/GiveItemsFromChest.buildInputs` (GIVE_FURNI_FROM_CHEST) - the shared
 * `§_-f1U§` sections, then the folded iteration section (`wiredfurni.params.chest_iteration_type`,
 * three options), disabled while everything is given (`onModeChange`).
 */
import { CHEST_ITERATION_TYPES, GIVE_FROM_CHEST_MODE_ALL, giveItemsFromChestAction, GiveItemsFromChestActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { GiveFromChestSections } from '../shared/GiveFromChestSections';

const ITERATION_OPTIONS = CHEST_ITERATION_TYPES.map(id => ({ id, label: `\${wiredfurni.params.chest_iteration_type.${id}}` }));

export const GiveItemsFromChestView: WiredElementView<GiveItemsFromChestActionForm> = ({ form, setForm, triggerable, ctx }) => (
    <GiveFromChestSections
        definition={giveItemsFromChestAction}
        form={form}
        setForm={setForm}
        triggerable={triggerable}
        ctx={ctx}
    >
        <WiredSection
            title="${wiredfurni.params.chest_iteration_type}"
            collapsible
            defaultCollapsed
            disabled={form.rewardingMode === GIVE_FROM_CHEST_MODE_ALL}
        >
            <WiredRadioGroup
                options={ITERATION_OPTIONS}
                selected={form.iterationMode}
                onSelect={iterationMode => setForm({ iterationMode })}
            />
        </WiredSection>
    </GiveFromChestSections>
);
