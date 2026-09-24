import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import {
    GROUP_MANAGEMENT_VIEW_BADGE, GROUP_MANAGEMENT_VIEW_COLORS, GROUP_MANAGEMENT_VIEW_CONFIRM, GROUP_MANAGEMENT_VIEW_IDENTITY, GROUP_MANAGEMENT_VIEW_SETTINGS,
    GroupManagementSession, limitGroupManagementStep,
} from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, ButtonThick, Frame, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { GroupBadgeEditor } from './GroupBadgeEditor';
import { GroupManagementColorsStep } from './GroupManagementColorsStep';
import { GroupManagementConfirmStep } from './GroupManagementConfirmStep';
import { GroupManagementIdentityStep } from './GroupManagementIdentityStep';
import { GroupManagementSettingsStep } from './GroupManagementSettingsStep';

export interface GroupManagementViewProps {
    session: GroupManagementSession;
    step: number;
    editorData: IGuildEditorData | undefined;
    pickingLayerIndex: number | undefined;
    hasVip: boolean;
    onClose: () => void;
    onStep: (step: number) => void;
    onName: (name: string) => void;
    onDescription: (description: string) => void;
    onBaseRoom: (roomId: number) => void;
    onMembers: () => void;
    onPickPart: (layerIndex: number) => void;
    onSelectPart: (layerIndex: number, partIndex: number) => void;
    onPosition: (layerIndex: number, gridX: number, gridY: number) => void;
    onLayerColor: (layerIndex: number, colorIndex: number) => void;
    onResetBadge: () => void;
    onPrimaryColor: (colorId: number) => void;
    onSecondaryColor: (colorId: number) => void;
    onResetColors: () => void;
    onGuildType: (guildType: number) => void;
    onRightsLevel: (rightsLevel: number) => void;
    onBuy: () => void;
    onBuyClub: () => void;
}

/** `header_caption_txt` / `header_desc_txt`'s own `y`, and the offset an existing group lifts them by. */
const HEADER_CAPTION_TOP = 43;
const HEADER_DESC_TOP = 69;
const EDIT_HEADER_TEXTS_OFFSET = -20;

/** `CREATE_HEADER_BITMAP_OFFSET`: the wizard drops the step picture to make room for the step chips. */
const CREATE_HEADER_BITMAP_OFFSET = 36;

/** `STEP_TITLE_Y_OFFSET_*` and the credit icon's two positions. */
const STEP_TITLE_TOP_ACTIVE = 5;
const STEP_TITLE_TOP_INACTIVE = 9;
const STEP_CREDIT_TOP_ACTIVE = 6;
const STEP_CREDIT_TOP_INACTIVE = 10;

/**
 * The wizard's four step chips, at the `x`/`width` the layout gives each, with the label box that
 * sits over it. `art` is the bitmap pair the chip loads rather than its own number: the client
 * ships no `gcreate_3_*`, so the colours chip draws the badge chip's art.
 *
 * Each label is its own 156-wide centred box (`step_title_<n>` at x -38, 40, 115, 210), which is
 * what puts it over the middle of its chip whatever the language makes of it - the label is not
 * placed by its left edge.
 */
const STEP_TITLE_WIDTH = 156;

const STEP_CHIPS = [
    { step: GROUP_MANAGEMENT_VIEW_IDENTITY, art: 1, left: 0, width: 84, titleLeft: -38 },
    { step: GROUP_MANAGEMENT_VIEW_BADGE, art: 2, left: 77, width: 83, titleLeft: 40 },
    { step: GROUP_MANAGEMENT_VIEW_COLORS, art: 2, left: 153, width: 83, titleLeft: 115 },
    { step: GROUP_MANAGEMENT_VIEW_CONFIRM, art: 4, left: 227, width: 133, titleLeft: 210 },
];

/** The picture each step's header shows, by the file the layout names for it. */
const HEADER_PICTURES: Record<number, string> = {
    [GROUP_MANAGEMENT_VIEW_IDENTITY]: 'group_UI_identity',
    [GROUP_MANAGEMENT_VIEW_BADGE]: 'group_UI_badge',
    [GROUP_MANAGEMENT_VIEW_COLORS]: 'group_UI_colors',
    [GROUP_MANAGEMENT_VIEW_CONFIRM]: 'group_UI_ready',
    [GROUP_MANAGEMENT_VIEW_SETTINGS]: 'group_UI_ready',
};

/** The four tabs of the editor, in the order and at the widths the layout gives them. */
const EDIT_TABS = [
    { step: GROUP_MANAGEMENT_VIEW_IDENTITY, left: 0, width: 97 },
    { step: GROUP_MANAGEMENT_VIEW_BADGE, left: 97, width: 101 },
    { step: GROUP_MANAGEMENT_VIEW_COLORS, left: 198, width: 101 },
    { step: GROUP_MANAGEMENT_VIEW_SETTINGS, left: 299, width: 101 },
];

/**
 * The group management window - `group_management_window`, drawn by `GuildManagementWindowCtrl`.
 * One window in two shapes: the four-step purchase wizard of a group that does not exist yet, and
 * the four-tab editor of one that does. Which it is comes from the answer that opened it -
 * `GuildCreationInfoMessage` or `GuildEditInfoMessage` - and shows as `session.exists`.
 *
 * Only the owner sees the tabs: `refresh` hides all four for anyone else (`edit_tab_<n>.visible =
 * isOwner`) while leaving the strip itself up, so an admin editing the group gets the identity tab
 * under an empty tab strip.
 */
export const GroupManagementView = ({
    session, step, editorData, pickingLayerIndex, hasVip, onClose, onStep, onName, onDescription, onBaseRoom, onMembers,
    onPickPart, onSelectPart, onPosition, onLayerColor, onResetBadge, onPrimaryColor, onSecondaryColor, onResetColors,
    onGuildType, onRightsLevel, onBuy, onBuyClub,
}: GroupManagementViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    const captionPrefix = session.exists ? 'group.edit.tabcaption.' : 'group.create.stepcaption.';
    const descPrefix = session.exists ? 'group.edit.tabdesc.' : 'group.create.stepdesc.';
    const headerOffset = session.exists ? EDIT_HEADER_TEXTS_OFFSET : 0;

    const hasPreviousStep = step !== limitGroupManagementStep(step - 1);
    const hasNextStep = step !== limitGroupManagementStep(step + 1);

    return (
        <Frame
            variant="3"
            name="groups_main_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 392, height: 497 }}
            margins={[ 0, 33, 0, 3 ]}
        >
            <Region
                name="header_cont"
                layout={{ position: 'absolute', left: 0, right: 1, top: 0, height: 110, overflow: 'hidden' }}
            >
                <Region
                    backgroundColor="#b3b099"
                    layout={{ position: 'absolute', left: 1, right: 0, top: 0, bottom: 0 }}
                />
                {!session.exists && (
                    <Region
                        name="steps_header_cont"
                        layout={{ position: 'absolute', left: 16, right: 15, top: 5, height: 33 }}
                    >
                        {STEP_CHIPS.map(chip => (
                            <ThemeImage
                                key={chip.step}
                                name={`gcreate_${chip.step}_${(chip.step === step) ? 1 : 0}`}
                                src={`${imageLibraryUrl}guilds/gcreate_${chip.art}_${(chip.step === step) ? 1 : 0}.png`}
                                layout={{ position: 'absolute', left: chip.left, width: chip.width, top: 0, height: 33 }}
                            />
                        ))}
                        <ThemeImage
                            name="gcreate_icon_credit"
                            src={`${imageLibraryUrl}guilds/gcreate_icon_credit.png`}
                            layout={{
                                position: 'absolute',
                                left: 335,
                                width: 21,
                                top: (step === GROUP_MANAGEMENT_VIEW_CONFIRM) ? STEP_CREDIT_TOP_ACTIVE : STEP_CREDIT_TOP_INACTIVE,
                                height: 20,
                            }}
                        />
                        {STEP_CHIPS.map(chip => (
                            <ThemeText
                                key={chip.step}
                                text={t(`group.create.steplabel.${chip.step}`)}
                                textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 13, align: 'center' }}
                                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                                name={`step_title_${chip.step}`}
                                verticalAlign="top"
                                layout={{
                                    position: 'absolute',
                                    left: chip.titleLeft,
                                    width: STEP_TITLE_WIDTH,
                                    top: (chip.step === step) ? STEP_TITLE_TOP_ACTIVE : STEP_TITLE_TOP_INACTIVE,
                                }}
                            />
                        ))}
                    </Region>
                )}
                <ThemeImage
                    name={`header_pic_bitmap_step_${step}`}
                    src={`${imageLibraryUrl}guilds/${HEADER_PICTURES[step] ?? HEADER_PICTURES[GROUP_MANAGEMENT_VIEW_IDENTITY]}.png`}
                    layout={{ position: 'absolute', left: 0, width: 114, top: session.exists ? 0 : CREATE_HEADER_BITMAP_OFFSET, height: 62 }}
                />
                <ThemeText
                    text={t(`${captionPrefix}${step}`, `${captionPrefix}${step}`)}
                    textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 20 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    markup
                    clip
                    name="header_caption_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 126, right: 2, top: HEADER_CAPTION_TOP + headerOffset, height: 24 }}
                />
                <ThemeText
                    text={t(`${descPrefix}${step}`, `${descPrefix}${step}`)}
                    textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 13, wordWrap: true, wordWrapWidth: 228 }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    clip
                    name="header_desc_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 126, right: 33, top: HEADER_DESC_TOP + headerOffset, height: 40 }}
                />
                {/*
                  * `refresh`: the tab strip belongs to an existing group, and its four tabs to the
                  * owner - an admin editing the group gets the strip with nothing in it.
                  */}
                {session.exists && (
                    <TabContext
                        variant="0"
                        name="edit_guild_tab_context"
                        layout={{ position: 'absolute', left: -6, right: -5, top: 89, bottom: 0, overflow: 'hidden' }}
                    >
                        {session.isOwner && EDIT_TABS.map(tab => (
                            <TabButton
                                key={tab.step}
                                variant="0"
                                name={`edit_tab_${tab.step}`}
                                selected={step === tab.step}
                                onPointerTap={() => onStep(tab.step)}
                                layout={{ position: 'absolute', left: tab.left, width: tab.width, top: 0, height: 22 }}
                            >
                                {t(`group.edit.tab.${tab.step}`)}
                            </TabButton>
                        ))}
                    </TabContext>
                )}
            </Region>

            {(step === GROUP_MANAGEMENT_VIEW_IDENTITY) && (
                <GroupManagementIdentityStep
                    session={session}
                    onName={onName}
                    onDescription={onDescription}
                    onBaseRoom={onBaseRoom}
                    onMembers={onMembers}
                />
            )}

            {(step === GROUP_MANAGEMENT_VIEW_BADGE) && editorData && (
                <Region
                    name="step_cont_2"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 110, height: 305 }}
                >
                    <GroupBadgeEditor
                        layers={session.layers}
                        editorData={editorData}
                        pickingLayerIndex={pickingLayerIndex}
                        onPickPart={onPickPart}
                        onSelectPart={onSelectPart}
                        onPosition={onPosition}
                        onColor={onLayerColor}
                    />
                </Region>
            )}
            {(step === GROUP_MANAGEMENT_VIEW_BADGE) && session.exists && (
                <ButtonThick
                    variant="3"
                    name="reset_badge"
                    onPointerTap={onResetBadge}
                    layout={{ position: 'absolute', left: 17, width: 94, top: 245, height: 29, minWidth: 94, maxWidth: 94 }}
                >
                    {t('group.edit.reset.badge')}
                </ButtonThick>
            )}

            {(step === GROUP_MANAGEMENT_VIEW_COLORS) && editorData && (
                <GroupManagementColorsStep
                    session={session}
                    editorData={editorData}
                    onPrimary={onPrimaryColor}
                    onSecondary={onSecondaryColor}
                />
            )}
            {(step === GROUP_MANAGEMENT_VIEW_COLORS) && session.exists && (
                <ButtonThick
                    variant="3"
                    name="reset_colors"
                    onPointerTap={onResetColors}
                    layout={{ position: 'absolute', left: 15, width: 90, top: 195, height: 29, minWidth: 90, maxWidth: 90 }}
                >
                    {t('group.edit.reset.color')}
                </ButtonThick>
            )}

            {(step === GROUP_MANAGEMENT_VIEW_CONFIRM) && (
                <GroupManagementConfirmStep
                    session={session}
                    editorData={editorData}
                    hasVip={hasVip}
                    onBuyClub={onBuyClub}
                />
            )}

            {(step === GROUP_MANAGEMENT_VIEW_SETTINGS) && (
                <GroupManagementSettingsStep
                    guildType={session.guildType}
                    rightsLevel={session.rightsLevel}
                    onGuildType={onGuildType}
                    onRightsLevel={onRightsLevel}
                />
            )}

            {!session.exists && (
                <Region
                    name="footer_cont"
                    layout={{ position: 'absolute', left: 0, right: 2, bottom: 9, height: 42 }}
                >
                    {hasPreviousStep
                        ? (
                                <Region
                                    name="previous_step_link_region"
                                    onPointerTap={() => onStep(step - 1)}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18, overflow: 'hidden' }}
                                >
                                    <ThemeText
                                        text={t('group.create.previousstep')}
                                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                                        name="previous_step_link"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, top: 0 }}
                                    />
                                </Region>
                            )
                        : (
                                <Region
                                    name="cancel_link_region"
                                    onPointerTap={onClose}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                                >
                                    <ThemeText
                                        text={t('cancel')}
                                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                                        flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                                        name="cancel_link"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, top: 0 }}
                                    />
                                </Region>
                            )}
                    {hasNextStep
                        ? (
                                <ButtonThick
                                    variant="3"
                                    name="next_step_button"
                                    onPointerTap={() => onStep(step + 1)}
                                    layout={{ position: 'absolute', left: 256, width: 120, top: 13, height: 29, minWidth: 120, maxWidth: 120 }}
                                >
                                    {t('group.create.nextstep')}
                                </ButtonThick>
                            )
                        : (
                                <Border
                                    variant="0"
                                    name="buy_border"
                                    // `updateConfirmPreview`: gold while the purchase may go through, grey while it may not.
                                    tintColor={hasVip ? '#ffc300' : '#aaaaaa'}
                                    layout={{ position: 'absolute', left: 126, width: 248, top: 0, height: 39 }}
                                >
                                    <ThemeImage
                                        name="buy_credit_icon"
                                        src={`${imageLibraryUrl}guilds/gcreate_icon_credit.png`}
                                        layout={{ position: 'absolute', left: 9, width: 21, top: 11, height: 20 }}
                                    />
                                    <ThemeText
                                        text={t('group.create.confirm.buyinfo', '', { amount: `${session.costInCredits}` })}
                                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 13, wordWrap: true, wordWrapWidth: 127 }}
                                        flashFormat={{ antiAliasType: 'advanced' }}
                                        clip
                                        name="buy_txt"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 37, width: 131, top: 3, height: 34 }}
                                    />
                                    <ButtonThick
                                        variant="3"
                                        name="buy_button"
                                        disabled={!hasVip}
                                        onPointerTap={onBuy}
                                        layout={{ position: 'absolute', right: 4, width: 72, top: 5, height: 29, minWidth: 72, maxWidth: 72 }}
                                    >
                                        {t('group.create.confirm.buy')}
                                    </ButtonThick>
                                </Border>
                            )}
                </Region>
            )}
        </Frame>
    );
};
