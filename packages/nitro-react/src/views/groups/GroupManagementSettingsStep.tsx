import { GUILD_TYPE_EXCLUSIVE, GUILD_TYPE_PRIVATE, GUILD_TYPE_REGULAR } from '@nitrodevco/nitro-packets';

import { GROUP_MANAGEMENT_VIEW_SETTINGS, GUILD_RIGHTS_ADMINS, GUILD_RIGHTS_MEMBERS } from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, CheckBox, RadioButton, Region, ThemeImage, ThemeText } from '#base/theme';

export interface GroupManagementSettingsStepProps {
    /** `GUILD_TYPE_*` - who may join. */
    guildType: number;
    /** `GUILD_RIGHTS_*` - whether plain members get room rights. */
    rightsLevel: number;
    onGuildType: (guildType: number) => void;
    onRightsLevel: (rightsLevel: number) => void;
}

/** The three type rows of `group_type_selector`, in the order the layout draws them. */
const GUILD_TYPE_ROWS = [
    { guildType: GUILD_TYPE_REGULAR, name: 'rb_type_regular', key: 'regular', top: 2, iconTop: 22, labelTop: 0, helpTop: 15 },
    { guildType: GUILD_TYPE_EXCLUSIVE, name: 'rb_type_exclusive', key: 'exclusive', top: 62, iconTop: 82, labelTop: 60, helpTop: 75 },
    { guildType: GUILD_TYPE_PRIVATE, name: 'rb_type_private', key: 'private', top: 122, iconTop: 142, labelTop: 120, helpTop: 135 },
];

/**
 * The settings tab - `step_cont_5`, driven by the guild settings controller Flash keeps beside the
 * management window. It is a tab of the editor only: the creation wizard runs to the confirm step
 * and never reaches `GROUP_MANAGEMENT_VIEW_SETTINGS`.
 */
export const GroupManagementSettingsStep = ({ guildType, rightsLevel, onGuildType, onRightsLevel }: GroupManagementSettingsStepProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Region
            name={`step_cont_${GROUP_MANAGEMENT_VIEW_SETTINGS}`}
            layout={{ position: 'absolute', left: 0, right: 3, top: 111, height: 360 }}
        >
            <ThemeText
                text={t('group.edit.settings.type.caption')}
                textStyle="u_headline_small"
                textOptions={{ align: 'center' }}
                name="guild_type"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 16, width: 170, bottom: 335 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 16, width: 170, top: 29, height: 199 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 191, overflow: 'hidden' }}
                >
                    <Region
                        name="group_type_selector"
                        layout={{ position: 'absolute', left: 5, width: 152, top: 5, height: 191 }}
                    >
                        {GUILD_TYPE_ROWS.map(row => (
                            <Region key={row.key}>
                                <RadioButton
                                    variant="0"
                                    name={row.name}
                                    selected={Number(guildType) === row.guildType}
                                    onPointerTap={() => onGuildType(row.guildType)}
                                    layout={{ position: 'absolute', left: 0, width: 15, top: row.top, height: 15 }}
                                />
                                <ThemeText
                                    text={t(`group.edit.settings.type.${row.key}.label`)}
                                    textStyle="u_bold"
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 20, width: 132, top: row.labelTop, height: 20 }}
                                />
                                <Region
                                    name={`grouptype_region_${row.guildType}`}
                                    tooltip={t(`group.edit.settings.type.${row.key}.help`)}
                                    layout={{ position: 'absolute', left: 0, width: 16, top: row.iconTop, height: 16 }}
                                >
                                    <ThemeImage
                                        name={`grouptype_icon_${row.guildType}`}
                                        src={`${imageLibraryUrl}guilds/grouptype_icon_${row.guildType}.png`}
                                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                                    />
                                </Region>
                                <ThemeText
                                    text={t(`group.edit.settings.type.${row.key}.help`)}
                                    textStyle="u_regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 128 }}
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 20, width: 132, top: row.helpTop, height: 45 }}
                                />
                            </Region>
                        ))}
                    </Region>
                </Border>
            </Border>
            <ThemeText
                text={t('group.edit.settings.rights.caption')}
                textStyle="u_headline_small"
                textOptions={{ align: 'center' }}
                name="guild_rights"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 207, width: 170, bottom: 335 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 207, width: 170, top: 29, height: 144 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 135 }}
                >
                    <CheckBox
                        variant="0"
                        name="cb_member_rights"
                        selected={Number(rightsLevel) === GUILD_RIGHTS_MEMBERS}
                        onPointerTap={() => onRightsLevel((Number(rightsLevel) === GUILD_RIGHTS_MEMBERS) ? GUILD_RIGHTS_ADMINS : GUILD_RIGHTS_MEMBERS)}
                        layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                    />
                    <ThemeText
                        text={t('group.edit.settings.rights.members.label')}
                        textStyle="u_bold"
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 25, width: 133, top: 5, height: 20 }}
                    />
                    <ThemeText
                        text={t('group.edit.settings.rights.members.help')}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 148 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 5, width: 152, top: 25, height: 100 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};
