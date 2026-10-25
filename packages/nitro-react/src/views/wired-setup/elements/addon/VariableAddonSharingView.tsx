/**
 * `addons/§_-226§.buildInputs` - the usage note and the "Categories" checkboxes, the import
 * add-on's whole form; `VariableAddonShareAddon.buildInputs` adds the "Synchronize" button under
 * them, inset by `sectionLeftRightMargin`, disabled without wired write permission
 * (`onEditInitialized`).
 */
import { synchronizeSharedAddons } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredHasWritePermission } from '#base/context/wired';
import { VARIABLE_ADDON_SHARING_CATEGORIES, VariableAddonSharingForm, WiredElementView } from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredPaddedContainer } from '../../kit/WiredPaddedContainer';
import { WiredSection } from '../../kit/WiredSection';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

interface VariableAddonSharingSectionsProps {
    usageInfo: string;
    form: VariableAddonSharingForm;
    setForm: (update: Partial<VariableAddonSharingForm>) => void;
}

const VariableAddonSharingSections = ({ usageInfo, form, setForm }: VariableAddonSharingSectionsProps) => (
    <>
        <WiredUsageInfoSection text={usageInfo} />
        <WiredSection title="${wiredfurni.params.variables.addon_sharing.categories}">
            <WiredCheckboxGroup
                options={VARIABLE_ADDON_SHARING_CATEGORIES.map((label, index) => ({ label, selected: form.categories[index] ?? false }))}
                onToggle={(id, selected) => setForm({ categories: form.categories.with(id, selected) })}
            />
        </WiredSection>
    </>
);

export const VariableAddonImportView: WiredElementView<VariableAddonSharingForm> = ({ form, setForm }) => (
    <VariableAddonSharingSections
        usageInfo="${wiredfurni.params.variables.addon_import.usage_info}"
        form={form}
        setForm={setForm}
    />
);

export const VariableAddonShareView: WiredElementView<VariableAddonSharingForm> = ({ form, setForm }) => {
    const { send } = useWebSocketContext();
    const hasWritePermission = useWiredHasWritePermission();
    const style = useWiredStyle();

    return (
        <>
            <VariableAddonSharingSections
                usageInfo="${wiredfurni.params.variables.addon_share.usage_info}"
                form={form}
                setForm={setForm}
            />
            <WiredPaddedContainer
                left={style.sectionLeftRightMargin}
                top={0}
                right={style.sectionLeftRightMargin}
                bottom={0}
            >
                <WiredButton
                    label="${wiredfurni.params.variables.addon_share.synchronize}"
                    onPress={() => synchronizeSharedAddons(send)}
                    disabled={!hasWritePermission}
                />
            </WiredPaddedContainer>
        </>
    );
};
