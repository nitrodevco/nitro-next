import { IGuildColorData, IGuildEditorData } from '@nitrodevco/nitro-packets';

import { GroupManagementSession } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { Border, Icon, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { GroupBadgePreview } from './GroupBadgePreview';

export interface GroupManagementConfirmStepProps {
    session: GroupManagementSession;
    editorData: IGuildEditorData | undefined;
    /** `sessionDataManager.hasVip`: without it the buy button is disabled and the red panel shows. */
    hasVip: boolean;
    onBuyClub: () => void;
}

/** The two halves of the guild colour swatch, as on the colours step. */
const SWATCH_LEFT = 4;
const SWATCH_RIGHT = 44;

/**
 * The confirmation step - `step_cont_4`, filled by `updateConfirmPreview`: the badge and colours as
 * they will be bought, the group's name, and the club panel that has to be satisfied before the
 * buy button works.
 */
export const GroupManagementConfirmStep = ({ session, editorData, hasVip, onBuyClub }: GroupManagementConfirmStepProps) => {
    const t = useTranslation();

    const tintOf = (colorId: number, palette: IGuildColorData[]) => {
        const color = palette.find(entry => entry.id === colorId)?.color;

        return (color === undefined) ? undefined : `#${color.toString(16).padStart(6, '0')}`;
    };

    return (
        <Region
            name="step_cont_4"
            layout={{ position: 'absolute', left: 0, right: 3, top: 111, height: 360 }}
        >
            <ThemeText
                text={session.name}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 18, wordWrap: true, wordWrapWidth: 252 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                clip
                name="confirmation_caption"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 126, width: 256, top: 8, height: 45 }}
            />
            <ThemeText
                text={t('group.create.confirm.info')}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 13, wordWrap: true, wordWrapWidth: 256 }}
                flashFormat={{ antiAliasType: 'advanced' }}
                markup
                clip
                name="confirmation_desc"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 126, width: 260, top: 46, height: 215 }}
            />
            <ThemeText
                text={t('group.create.confirm.guildbadge')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                name="guild_badge_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 92, top: 33 }}
            />
            <Border
                variant="0"
                name="badge_border"
                layout={{ position: 'absolute', left: 15, width: 92, top: 50, height: 92 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 84 }}
                />
                <GroupBadgePreview
                    layers={session.layers}
                    editorData={editorData}
                    layout={{ position: 'absolute', left: 26, top: 26 }}
                />
            </Border>
            <ThemeText
                text={t('group.create.confirm.guildcolors')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                name="guild_colors_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 92, top: 155 }}
            />
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 15, width: 92, top: 172, height: 46 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                >
                    <ThemeImage
                        name="badge_preview_primary_color_btm"
                        src={LayoutImage('groups/group_guild_color_btm.png')}
                        layout={{ position: 'absolute', left: SWATCH_LEFT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="badge_preview_primary_color_top"
                        src={LayoutImage('groups/group_guild_color_top.png')}
                        tint={editorData && tintOf(session.primaryColorId, editorData.guildPrimaryColors)}
                        layout={{ position: 'absolute', left: SWATCH_LEFT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="badge_preview_secondary_color_btm"
                        src={LayoutImage('groups/group_guild_color_btm.png')}
                        layout={{ position: 'absolute', left: SWATCH_RIGHT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="badge_preview_secondary_color_top"
                        src={LayoutImage('groups/group_guild_color_top.png')}
                        tint={editorData && tintOf(session.secondaryColorId, editorData.guildSecondaryColors)}
                        layout={{ position: 'absolute', left: SWATCH_RIGHT, width: 36, top: 4, height: 30 }}
                    />
                </Border>
            </Border>
            {!hasVip && (
                <Border
                    variant="0"
                    name="vip_required_border"
                    tintColor="#cc0000"
                    layout={{ position: 'absolute', left: 126, width: 248, top: 253, height: 39 }}
                >
                    <Region
                        name="vip_required_region"
                        onPointerTap={onBuyClub}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 248, top: 0, height: 39 }}
                    />
                    <Icon
                        variant="14"
                        name="vip_icon"
                        layout={{ position: 'absolute', left: 14, width: 16, top: 11, height: 17 }}
                    />
                    <ThemeText
                        text={t('group.create.confirm.viprequired')}
                        textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                        name="vip_required_txt"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 38, top: 4 }}
                    />
                    <ThemeText
                        text={t('group.create.confirm.getvip')}
                        textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 12 }}
                        flashFormat={{ antiAliasType: 'advanced' }}
                        name="get_vip_txt"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 38, top: 20 }}
                    />
                </Border>
            )}
        </Region>
    );
};
