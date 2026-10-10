/**
 * The group management window - `GuildManagementWindowCtrl`: `group_management_window`, centred. One
 * window in two shapes: the four-step purchase wizard of a group that does not exist yet, and the
 * four-tab editor of one that does (`session.exists`, from `GuildCreationInfoMessage` or
 * `GuildEditInfoMessage`).
 *
 * `refresh`:
 * - the tabs (`edit_guild_tab_context`) for an existing group, each shown to its owner only - an admin
 *   editing the group gets the strip with nothing in it; the wizard's step strip
 *   (`refreshCreateHeader`) - each step's chip lit while it is the one shown, its title 4 higher, the
 *   credit icon too on the last - its footer (cancel on the first step, previous step after; next
 *   step before the last, the buy panel on it);
 * - the step's container, its header picture (36 lower in the wizard, under the step strip), caption
 *   and description (20 higher in the editor);
 * - identity: the name and description, the base room menu (`prepareRoomSelection`: a prompt, then
 *   the user's rooms) with its warning and the create-room link while creating, the badge and member
 *   count of an existing group;
 * - the badge editor (`useGroupBadgeEditorItem`), with the reset button for an existing group;
 * - colours: the primary and secondary palettes (`ColorGridCtrl`), the swatch tinted with the picked
 *   two, the reset button for an existing group;
 * - confirm (`updateConfirmPreview`): the badge, the colours, the name, the buy button enabled (and
 *   its border gold) with a club membership, else greyed with the club panel shown;
 * - settings (`§_-W1f§`): the group type and the members' rights.
 */
import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import {
    GROUP_MANAGEMENT_VIEW_BADGE, GROUP_MANAGEMENT_VIEW_COLORS, GROUP_MANAGEMENT_VIEW_CONFIRM, GROUP_MANAGEMENT_VIEW_IDENTITY, GROUP_MANAGEMENT_VIEW_SETTINGS,
    GroupManagementSession, GUILD_RIGHTS_ADMINS, GUILD_RIGHTS_MEMBERS, limitGroupManagementStep,
} from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow, TemplateWindows, useTemplateFrame, useTemplateLibrary } from '#base/theme';

import { GroupBadgePreview } from './GroupBadgePreview';
import { groupColorItems } from './groupColorItems';
import { useGroupBadgeEditorItem } from './useGroupBadgeEditorItem';

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
    onCreateRoom: () => void;
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

const LIBRARY = 'habbo-groups-com';

/** `getStepContainer` / the header pictures: steps 1-5 (`VIEW_*`). */
const VIEWS = [ 1, 2, 3, 4, 5 ] as const;

/** The editor's tabs, `edit_tab_<view>`. */
const EDIT_TABS = [ GROUP_MANAGEMENT_VIEW_IDENTITY, GROUP_MANAGEMENT_VIEW_BADGE, GROUP_MANAGEMENT_VIEW_COLORS, GROUP_MANAGEMENT_VIEW_SETTINGS ] as const;

/** The wizard's steps, `gcreate_<step>_*` and `step_title_<step>`. */
const WIZARD_STEPS = [ 1, 2, 3, 4 ] as const;

/** `refresh` / `refreshCreateHeader`'s offsets. */
const HEADER_CAPTION_Y = 43;
const HEADER_DESC_Y = 69;
const EDIT_HEADER_TEXTS_OFFSET = -20;
const CREATE_HEADER_BITMAP_OFFSET = 36;
const STEP_TITLE_Y_ACTIVE = 5;
const STEP_TITLE_Y_INACTIVE = 9;
const STEP_CREDIT_Y_ACTIVE = 6;
const STEP_CREDIT_Y_INACTIVE = 10;

/** `updateConfirmPreview`: the buy border with and without a club membership. */
const BUY_BORDER_COLOR = 0xFFFFC300;
const BUY_BORDER_DISABLED_COLOR = 0xFFAAAAAA;

/** The settings' type radios, by `GUILD_TYPE_*`. */
const TYPE_RADIOS = [ 'rb_type_regular', 'rb_type_exclusive', 'rb_type_private' ] as const;

export const GroupManagementView = ({
    session, step, editorData, pickingLayerIndex, hasVip, onClose, onStep, onName, onDescription, onBaseRoom, onCreateRoom, onMembers,
    onPickPart, onSelectPart, onPosition, onLayerColor, onResetBadge, onPrimaryColor, onSecondaryColor, onResetColors,
    onGuildType, onRightsLevel, onBuy, onBuyClub,
}: GroupManagementViewProps) => {
    const t = useTranslation();
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const templates = useTemplateLibrary(LIBRARY);
    const frame = useTemplateFrame({ id: 'groups_main_window', centered: true, rememberPosition: false, onClose });
    const badgeEditor = useGroupBadgeEditorItem(templates, session.layers, editorData, pickingLayerIndex, { onPickPart, onSelectPart, onPosition, onColor: onLayerColor });
    const colorTemplate = templates?.[`${LIBRARY}/badge_color_item`];

    const { exists } = session;
    const hasPreviousStep = step !== limitGroupManagementStep(step - 1);
    const hasNextStep = step !== limitGroupManagementStep(step + 1);
    const stepKey = (prefix: string) => `${prefix}${step}`;
    const caption = stepKey(exists ? 'group.edit.tabcaption.' : 'group.create.stepcaption.');
    const desc = stepKey(exists ? 'group.edit.tabdesc.' : 'group.create.stepdesc.');
    const tintOf = (palette: IGuildEditorData['guildPrimaryColors'] | undefined, colorId: number) => {
        const color = palette?.find(entry => entry.id === colorId)?.color;

        return (color === undefined) ? undefined : ((0xFF000000 | color) >>> 0);
    };
    const primaryTint = tintOf(editorData?.guildPrimaryColors, session.primaryColorId);
    const secondaryTint = tintOf(editorData?.guildSecondaryColors, session.secondaryColorId);
    const badgePreview = (
        <GroupBadgePreview
            layers={session.layers}
            editorData={editorData}
        />
    );

    // `prepareRoomSelection`: the prompt, then the rooms in the order they came.
    const roomIndex = session.ownedRooms.findIndex(room => room.roomId === session.baseRoomId);
    const palette = (colors: IGuildEditorData['guildPrimaryColors'] | undefined, selectedId: number, onSelect: (colorId: number) => void) => ((colorTemplate && colors)
        ? groupColorItems(colorTemplate, colors, colors.findIndex(color => color.id === selectedId), index => onSelect(colors[index].id))
        : []);

    const shownType = (Number(session.guildType) < TYPE_RADIOS.length) ? Number(session.guildType) : 0;

    const bindings: TemplateBindings = {
        // The header.
        edit_guild_tab_context: { visible: exists },
        ...Object.fromEntries(EDIT_TABS.map(tab => [ `edit_tab_${tab}`, { visible: !exists || session.isOwner, selected: step === tab, onPointerTap: () => onStep(tab) } ])),
        steps_header_cont: { visible: !exists },
        ...Object.fromEntries(WIZARD_STEPS.flatMap(wizardStep => [
            [ `gcreate_${wizardStep}_0`, { visible: wizardStep !== step } ],
            [ `gcreate_${wizardStep}_1`, { visible: wizardStep === step } ],
        ])),
        header_caption_txt: { caption: t(caption, caption) },
        header_desc_txt: { caption: t(desc, desc) },
        ...Object.fromEntries(VIEWS.flatMap(view => [
            [ `step_cont_${view}`, { visible: view === step } ],
            [ `header_pic_bitmap_step_${view}`, { visible: view === step } ],
        ])),
        reset_badge: { visible: (step === GROUP_MANAGEMENT_VIEW_BADGE) && exists, onPointerTap: onResetBadge },
        reset_colors: { visible: (step === GROUP_MANAGEMENT_VIEW_COLORS) && exists, onPointerTap: onResetColors },

        // The wizard's footer.
        footer_cont: { visible: !exists },
        next_step_button: { visible: hasNextStep, onPointerTap: () => onStep(step + 1) },
        previous_step_link_region: { visible: hasPreviousStep, onPointerTap: () => onStep(step - 1) },
        cancel_link_region: { visible: !hasPreviousStep, onPointerTap: onClose },
        buy_border: { visible: !hasNextStep, color: hasVip ? BUY_BORDER_COLOR : BUY_BORDER_DISABLED_COLOR },
        buy_button: { disabled: !hasVip, onPointerTap: onBuy },

        // Identity.
        step_1_badge: { visible: exists },
        group_logo: { asset: (exists && session.badgeCode) ? groupBadgeUrl.replace('%badgedata%', session.badgeCode) : undefined },
        step_1_members_region: { visible: exists, onPointerTap: onMembers },
        step_1_members_txt: { caption: t('group.membercount', '', { totalMembers: String(session.membershipCount) }) },
        name_txt: { caption: session.name, onChange: onName },
        desc_txt: { caption: session.description, onChange: onDescription },
        base_label: { visible: !exists },
        base_dropmenu: {
            visible: !exists,
            options: [ t('group.edit.base.select.room', 'group.edit.base.select.room'), ...session.ownedRooms.map(room => room.roomName) ],
            selection: roomIndex + 1,
            onSelect: index => onBaseRoom((index > 0) ? (session.ownedRooms[index - 1]?.roomId ?? 0) : 0),
        },
        base_warning: { visible: !exists },
        create_room_link_region: { visible: !exists, onPointerTap: onCreateRoom },

        // The badge.
        step_cont_2: { visible: step === GROUP_MANAGEMENT_VIEW_BADGE, items: badgeEditor ? [ badgeEditor ] : [] },

        // Colours.
        guild_color_primary_color_top: primaryTint !== undefined ? { color: primaryTint } : {},
        guild_color_secondary_color_top: secondaryTint !== undefined ? { color: secondaryTint } : {},
        guild_primary_color_selector: { items: palette(editorData?.guildPrimaryColors, session.primaryColorId, onPrimaryColor) },
        guild_secondary_color_selector: { items: palette(editorData?.guildSecondaryColors, session.secondaryColorId, onSecondaryColor) },

        // Confirm.
        confirmation_caption: { caption: session.name },
        badge_preview_image: { children: badgePreview },
        badge_preview_primary_color_top: primaryTint !== undefined ? { color: primaryTint } : {},
        badge_preview_secondary_color_top: secondaryTint !== undefined ? { color: secondaryTint } : {},
        vip_required_border: { visible: !hasVip },
        vip_required_region: { onPointerTap: onBuyClub },

        // Settings.
        // `refresh`: a type with no radio of its own (large, 3 and 4) shows as regular.
        ...Object.fromEntries(TYPE_RADIOS.map((name, guildType) => [ name, { selected: shownType === guildType, onPointerTap: () => onGuildType(guildType) } ])),
        cb_member_rights: {
            selected: Number(session.rightsLevel) === GUILD_RIGHTS_MEMBERS,
            onPointerTap: () => onRightsLevel((Number(session.rightsLevel) === GUILD_RIGHTS_MEMBERS) ? GUILD_RIGHTS_ADMINS : GUILD_RIGHTS_MEMBERS),
        },
    };

    /** The placements `refresh` and `refreshCreateHeader` make. */
    const arrange = ({ find }: TemplateWindows) => {
        const textOffset = exists ? EDIT_HEADER_TEXTS_OFFSET : 0;

        for (const view of VIEWS) find(`header_pic_bitmap_step_${view}`)?.setY(exists ? 0 : CREATE_HEADER_BITMAP_OFFSET);

        find('header_caption_txt')?.setY(HEADER_CAPTION_Y + textOffset);
        find('header_desc_txt')?.setY(HEADER_DESC_Y + textOffset);

        if (exists) return;

        for (const wizardStep of WIZARD_STEPS) find(`step_title_${wizardStep}`)?.setY((wizardStep === step) ? STEP_TITLE_Y_ACTIVE : STEP_TITLE_Y_INACTIVE);

        find('gcreate_icon_credit')?.setY((step === GROUP_MANAGEMENT_VIEW_CONFIRM) ? STEP_CREDIT_Y_ACTIVE : STEP_CREDIT_Y_INACTIVE);
    };

    return (
        <TemplateWindow
            id={`${LIBRARY}/group_management_window`}
            frame={frame}
            parameters={{ 'group.create.confirm.buyinfo': { amount: String(session.costInCredits) } }}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
