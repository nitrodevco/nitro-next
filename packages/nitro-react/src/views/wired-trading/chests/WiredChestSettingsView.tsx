/**
 * The chest settings window - Flash `chests/settings/ChestSettingsUI`, an ubuntu wired window
 * 300 wide whose sections scroll between 420 and a 2.4th of the screen:
 *
 * - access (`BorderSection`): everyone may open / everyone may donate;
 * - info: the name (30 characters) and the description (4 lines, 200 characters);
 * - appearance: the state control mode, and for a furni chest the preview mode (with its note)
 *   and the preview amount, which is disabled while the preview mode is 0;
 * - wired: a button buying the wired upgrade (`WiredChestWiredUpdateConfirmationView`), and a
 *   check mark once the chest has it - the button is disabled then.
 *
 * `onEdit` fills the form from the chest furni's data when the window opens; "ready" sends
 * `SetChestPreferences` and the window closes on `ChestPreferencesUpdateSuccess` for this chest
 * (the handler clears the request). Confirming the wired upgrade disables the button, shows the
 * mark and saves at once (`confirmUpgrade`), the flag going out as the button's disabled state.
 */
import { useState } from 'react';

import { saveWiredChestPreferences } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import {
    WIRED_CHEST_KEY_DESC, WIRED_CHEST_KEY_EVERYONE_CAN_DONATE, WIRED_CHEST_KEY_EVERYONE_CAN_OPEN, WIRED_CHEST_KEY_IS_WIRED_ENABLED, WIRED_CHEST_KEY_NAME, WIRED_CHEST_KEY_PREVIEW_AMOUNT, WIRED_CHEST_KEY_PREVIEW_MODE,
    WIRED_CHEST_KEY_STATE_CONTROL_MODE, WIRED_CHEST_TYPE_FURNI, WiredChestSettingsRequest,
} from '#base/context/wired-trading';
import { useViewportSize } from '#base/hooks';
import { WiredAlignCenter } from '#base/views/wired-setup/kit/WiredAlignCenter';
import { WiredBitmapView } from '#base/views/wired-setup/kit/WiredBitmapView';
import { WiredCheckboxGroup } from '#base/views/wired-setup/kit/WiredCheckboxGroup';
import { WiredContainerButton } from '#base/views/wired-setup/kit/WiredContainerButton';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredStaticBitmap } from '#base/views/wired-setup/kit/WiredStaticBitmap';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';
import { WiredTextArea } from '#base/views/wired-setup/kit/WiredTextArea';
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

import { WiredChestWiredUpgradeView } from './WiredChestWiredUpgradeView';

/** The `ListScrollParams` of the window. */
const SCROLL_MIN_HEIGHT = 420;
const SCROLL_SCREEN_SHARE = 2.4;
const FRAME_WIDTH = 300;

const STATE_OPTIONS = [ 0, 1, 2, 3 ].map(id => ({ id, label: `\${wiredchests.settings.appearance.state.${id}}` }));
const PREVIEW_OPTIONS = [ 0, 1, 2, 3, 4, 5, 6, 7 ].map(id => ({ id, label: `\${wiredchests.settings.appearance.preview.${id}}` }));
const PREVIEW_AMOUNT_OPTIONS = [ 1, 2, 3, 4 ].map(id => ({ id, label: String(id) }));

/** What the window edits, as `onEdit` reads it off the chest furni. */
interface ChestSettingsForm {
    name: string;
    description: string;
    everyoneCanOpen: boolean;
    everyoneCanDonate: boolean;
    stateControlMode: number;
    previewMode: number;
    previewAmount: number;
    /** `§_-3§.disabled`: the wired upgrade is bought, or its purchase was just confirmed. */
    wiredEnabled: boolean;
}

const readForm = (data: Record<string, string>, isFurniChest: boolean): ChestSettingsForm => ({
    name: data[WIRED_CHEST_KEY_NAME] ?? '',
    description: data[WIRED_CHEST_KEY_DESC] ?? '',
    everyoneCanOpen: data[WIRED_CHEST_KEY_EVERYONE_CAN_OPEN] === '1',
    everyoneCanDonate: data[WIRED_CHEST_KEY_EVERYONE_CAN_DONATE] === '1',
    stateControlMode: parseInt(data[WIRED_CHEST_KEY_STATE_CONTROL_MODE] ?? '0', 10) || 0,
    // A coin chest never sets its preview dropdowns; Flash sends what they start with, -1.
    previewMode: isFurniChest ? (parseInt(data[WIRED_CHEST_KEY_PREVIEW_MODE] ?? '0', 10) || 0) : -1,
    previewAmount: isFurniChest ? (parseInt(data[WIRED_CHEST_KEY_PREVIEW_AMOUNT] ?? '0', 10) || 0) : -1,
    wiredEnabled: data[WIRED_CHEST_KEY_IS_WIRED_ENABLED] === '1',
});

export interface WiredChestSettingsViewProps {
    request: WiredChestSettingsRequest;
    /** The chest furni's data when the window opened. */
    data: Record<string, string>;
    onClose: () => void;
}

export const WiredChestSettingsView = ({ request, data, onClose }: WiredChestSettingsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const viewport = useViewportSize();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const isFurniChest = (request.chestType === WIRED_CHEST_TYPE_FURNI);
    const [ form, setForm ] = useState<ChestSettingsForm>(() => readForm(data, isFurniChest));
    const [ wiredUpgradeOpen, setWiredUpgradeOpen ] = useState(false);
    const style = UBUNTU_WIRED_STYLE;

    const save = (next: ChestSettingsForm) => saveWiredChestPreferences(send, {
        chestId: request.chestId,
        name: next.name,
        description: next.description,
        everyoneCanOpen: next.everyoneCanOpen,
        everyoneCanDonate: next.everyoneCanDonate,
        stateControlMode: next.stateControlMode,
        previewMode: next.previewMode,
        previewAmount: next.previewAmount,
        isWiredEnabled: next.wiredEnabled,
    });

    /** `confirmUpgrade`. */
    const confirmUpgrade = () => {
        const next = { ...form, wiredEnabled: true };

        setForm(next);
        save(next);
    };

    const chestTypeName = t(isFurniChest ? 'wiredchests.furni_chest' : 'wiredchests.coin_chest');

    return (
        <>
            <WiredTradingFrame
                id="wired-chest-settings"
                title={t('wiredchests.settings.title', '', { chest_type: chestTypeName })}
                width={FRAME_WIDTH}
                scroll={{ minHeight: SCROLL_MIN_HEIGHT, maxHeight: Math.floor(viewport.height / SCROLL_SCREEN_SHARE) }}
                onClose={onClose}
                parts={[
                    <WiredSection
                        key="access"
                        title="${wiredchests.settings.access}"
                        bordered
                    >
                        <WiredCheckboxGroup
                            options={[
                                { label: '${wiredchests.settings.access.open}', selected: form.everyoneCanOpen },
                                { label: '${wiredchests.settings.access.donate}', selected: form.everyoneCanDonate },
                            ]}
                            onToggle={(id, selected) => setForm((id === 0) ? { ...form, everyoneCanOpen: selected } : { ...form, everyoneCanDonate: selected })}
                        />
                    </WiredSection>,
                    <WiredSection
                        key="info"
                        title="${wiredchests.settings.info}"
                        bordered
                    >
                        <WiredSimpleList spacing={style.sectionSpacing}>
                            <WiredSection
                                title="${wiredchests.settings.info.name}"
                                splitterVisible={false}
                            >
                                <WiredTextInput
                                    value={form.name}
                                    onChange={name => setForm({ ...form, name })}
                                    maxCharacters={30}
                                />
                            </WiredSection>
                            <WiredSection title="${wiredchests.settings.info.desc}">
                                <WiredTextArea
                                    value={form.description}
                                    onChange={description => setForm({ ...form, description })}
                                    height={64}
                                    maxLines={4}
                                    maxCharacters={200}
                                />
                            </WiredSection>
                        </WiredSimpleList>
                    </WiredSection>,
                    <WiredSection
                        key="appearance"
                        title="${wiredchests.settings.appearance}"
                        bordered
                    >
                        <WiredSimpleList spacing={style.sectionSpacing}>
                            <WiredSection
                                title="${wiredchests.settings.appearance.state}"
                                splitterVisible={false}
                            >
                                <WiredDropdown
                                    options={STATE_OPTIONS}
                                    selected={form.stateControlMode}
                                    onSelect={stateControlMode => setForm({ ...form, stateControlMode })}
                                    caption="${wiredchests.settings.appearance.state}"
                                />
                            </WiredSection>
                            {isFurniChest && (
                                <WiredSection title="${wiredchests.settings.appearance.preview}">
                                    <WiredSimpleList>
                                        <WiredDropdown
                                            options={PREVIEW_OPTIONS}
                                            selected={form.previewMode}
                                            onSelect={previewMode => setForm({ ...form, previewMode })}
                                            caption="${wiredchests.settings.appearance.preview}"
                                        />
                                        <WiredText
                                            text="${wiredchests.settings.appearance.preview.note}"
                                            halfBlend
                                        />
                                    </WiredSimpleList>
                                </WiredSection>
                            )}
                            {isFurniChest && (
                                <WiredSection
                                    title="${wiredchests.settings.appearance.preview_amount}"
                                    disabled={form.previewMode === 0}
                                >
                                    <WiredDropdown
                                        options={PREVIEW_AMOUNT_OPTIONS}
                                        selected={form.previewAmount}
                                        onSelect={previewAmount => setForm({ ...form, previewAmount })}
                                        caption="${wiredchests.settings.appearance.preview_amount}"
                                    />
                                </WiredSection>
                            )}
                        </WiredSimpleList>
                    </WiredSection>,
                    <WiredSection
                        key="wired"
                        title="${wiredchests.settings.wired}"
                        bordered
                    >
                        <WiredSimpleList
                            vertical={false}
                            centerVertically
                        >
                            <WiredContainerButton
                                onPress={() => setWiredUpgradeOpen(true)}
                                disabled={form.wiredEnabled}
                            >
                                <WiredAlignCenter>
                                    <WiredSimpleList
                                        vertical={false}
                                        centerVertically
                                        staticWidth="content"
                                    >
                                        <WiredBitmapView
                                            width={30}
                                            height={30}
                                            src={`${imageLibraryUrl}catalogue/icon_80.png`}
                                        />
                                        <WiredText
                                            text="${wiredchests.settings.wired.upgrade}"
                                            wrap={false}
                                        />
                                    </WiredSimpleList>
                                </WiredAlignCenter>
                            </WiredContainerButton>
                            {form.wiredEnabled && <WiredStaticBitmap asset="catalog/icon_checkmark_small" />}
                        </WiredSimpleList>
                    </WiredSection>,
                    <WiredTradingFooter
                        key="footer"
                        onSave={() => save(form)}
                        onCancel={onClose}
                    />,
                ]}
            />
            {wiredUpgradeOpen && (
                <WiredChestWiredUpgradeView
                    furniTypeId={request.furniTypeId}
                    isStarterChest={request.isStarterChest}
                    onBuy={confirmUpgrade}
                    onClose={() => setWiredUpgradeOpen(false)}
                />
            )}
        </>
    );
};
