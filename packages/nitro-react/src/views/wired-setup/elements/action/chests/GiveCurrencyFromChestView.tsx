/**
 * `actiontypes/chests/§_-9e§.buildInputs` (GIVE_CURRENCY_FROM_CHEST) - the shared `§_-f1U§`
 * sections, then the folded earnings category section with its dropdown (11 / 13).
 */
import { CHEST_EARNINGS_CATEGORIES, giveCurrencyFromChestAction, GiveCurrencyFromChestActionForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../../kit/WiredDropdown';
import { WiredSection } from '../../../kit/WiredSection';
import { GiveFromChestSections } from '../shared/GiveFromChestSections';

const CATEGORY_OPTIONS = CHEST_EARNINGS_CATEGORIES.map(id => ({ id, label: `\${wiredfurni.params.earnings_category.${id}}` }));

export const GiveCurrencyFromChestView: WiredElementView<GiveCurrencyFromChestActionForm> = ({ form, setForm, triggerable, ctx }) => (
    <GiveFromChestSections
        definition={giveCurrencyFromChestAction}
        form={form}
        setForm={setForm}
        triggerable={triggerable}
        ctx={ctx}
    >
        <WiredSection
            title="${wiredfurni.params.earnings_category}"
            collapsible
            defaultCollapsed
        >
            <WiredDropdown
                options={CATEGORY_OPTIONS}
                selected={form.earningsCategory}
                onSelect={earningsCategory => setForm({ earningsCategory })}
                caption="${wiredfurni.params.earnings_category}"
            />
        </WiredSection>
    </GiveFromChestSections>
);
