import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import { GroupManagementSession } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { Border, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { GroupColorGrid } from './GroupColorGrid';

export interface GroupManagementColorsStepProps {
    session: GroupManagementSession;
    editorData: IGuildEditorData;
    onPrimary: (colorId: number) => void;
    onSecondary: (colorId: number) => void;
}

/** The two halves of the guild colour swatch, drawn side by side in the preview. */
const SWATCH_LEFT = 4;
const SWATCH_RIGHT = 44;

/**
 * The colours step - `step_cont_3`. The preview's `_top` piece is the one the picked colour tints
 * (`onPrimaryColorSelected` / `onSecondaryColorSelected`); the `_btm` piece behind it is the
 * swatch's own shading and stays untinted.
 */
export const GroupManagementColorsStep = ({ session, editorData, onPrimary, onSecondary }: GroupManagementColorsStepProps) => {
    const t = useTranslation();

    const tintOf = (colorId: number, palette: typeof editorData.guildPrimaryColors) => {
        const color = palette.find(entry => entry.id === colorId)?.color;

        return (color === undefined) ? undefined : `#${color.toString(16).padStart(6, '0')}`;
    };

    return (
        <Region
            name="step_cont_3"
            layout={{ position: 'absolute', left: 0, right: 0, top: 110, height: 305, overflow: 'hidden' }}
        >
            <ThemeText
                text={t('group.edit.color.guild.color')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                name="label_guild_color"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 13, width: 92, bottom: 280 }}
            />
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 13, width: 92, top: 29, height: 46 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                >
                    <ThemeImage
                        name="guild_color_primary_color_btm"
                        src={LayoutImage('groups/group_guild_color_btm.png')}
                        layout={{ position: 'absolute', left: SWATCH_LEFT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="guild_color_primary_color_top"
                        src={LayoutImage('groups/group_guild_color_top.png')}
                        tint={tintOf(session.primaryColorId, editorData.guildPrimaryColors)}
                        layout={{ position: 'absolute', left: SWATCH_LEFT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="guild_color_secondary_color_btm"
                        src={LayoutImage('groups/group_guild_color_btm.png')}
                        layout={{ position: 'absolute', left: SWATCH_RIGHT, width: 36, top: 4, height: 30 }}
                    />
                    <ThemeImage
                        name="guild_color_secondary_color_top"
                        src={LayoutImage('groups/group_guild_color_top.png')}
                        tint={tintOf(session.secondaryColorId, editorData.guildSecondaryColors)}
                        layout={{ position: 'absolute', left: SWATCH_RIGHT, width: 36, top: 4, height: 30 }}
                    />
                </Border>
            </Border>
            <ThemeText
                text={t('group.edit.color.primary.color')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                name="label_primary"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 128, width: 142, bottom: 280 }}
            />
            <Border
                variant="3"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 128, width: 142, top: 29, height: 277 }}
            >
                <GroupColorGrid
                    colors={editorData.guildPrimaryColors}
                    selectedColorId={session.primaryColorId}
                    onSelect={onPrimary}
                    layout={{ position: 'absolute', left: 3, width: 138, top: 3, height: 273 }}
                />
            </Border>
            <ThemeText
                text={t('group.edit.color.secondary.color')}
                textStyle="u_bold"
                textOptions={{ align: 'center' }}
                name="label_secondary"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 280, width: 100, bottom: 280 }}
            />
            <Border
                variant="3"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 280, width: 96, top: 29, height: 277, overflow: 'hidden' }}
            >
                <GroupColorGrid
                    colors={editorData.guildSecondaryColors}
                    selectedColorId={session.secondaryColorId}
                    onSelect={onSecondary}
                    layout={{ position: 'absolute', left: 3, width: 94, top: 3, height: 273 }}
                />
            </Border>
        </Region>
    );
};
