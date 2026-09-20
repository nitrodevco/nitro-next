/**
 * `addons/chests/ChestItemTypeScanner.buildInputs` - the usage info, the context variable to count
 * into (no source type selector) and the scanning mode (collapsed).
 */
import { ChestItemTypeScannerAddonForm, chestItemTypeScannerFilter, getWiredRoomVariables, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../../kit/WiredChooseVariableSection';
import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredUsageInfoSection } from '../../../kit/WiredUsageInfoSection';

export const ChestItemTypeScannerView: WiredElementView<ChestItemTypeScannerAddonForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredUsageInfoSection text="${wiredfurni.params.chest_item_type_scanner.info}" />
        <WiredChooseVariableSection
            filter={chestItemTypeScannerFilter}
            state={form.picker}
            onChange={picker => setForm({ picker })}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
        <WiredSection
            title="${wiredfurni.params.chest_item_type_scanner}"
            collapsible
            defaultCollapsed
        >
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.chest_item_type_scanner.0}' }, { id: 1, label: '${wiredfurni.params.chest_item_type_scanner.1}' } ]}
                selected={form.mode}
                onSelect={mode => setForm({ mode })}
            />
        </WiredSection>
    </>
);
