import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

import { GroupManagementWindowLayoutGroupTypeSelector, GroupManagementWindowLayoutGroupTypeSelectorProps } from './GroupManagementWindowLayoutGroupTypeSelector';

/** Named region `step_cont_5` of GroupManagementWindowLayout - configured through the parent's `stepCont5` prop. */
export interface GroupManagementWindowLayoutStepCont5Props {
    captionGuildRights?: string;
    captionGuildType?: string;
    groupTypeSelector?: GroupManagementWindowLayoutGroupTypeSelectorProps;
    layout?: BoxLayout;
    onCbMemberRights?: () => void;
    visibleStepCont5?: boolean;
}

export const GroupManagementWindowLayoutStepCont5 = ({ captionGuildRights, captionGuildType, groupTypeSelector, layout, onCbMemberRights, visibleStepCont5 }: GroupManagementWindowLayoutStepCont5Props) => {
    const t = useTranslation();

    return (
        (visibleStepCont5 ?? false) && (
            <Region
                name="step_cont_5"
                layout={{ position: 'absolute', left: 0, right: -9, top: 111, height: 360, ...layout }}
            >
                <Region
                    name="guild_type"
                    layout={{ position: 'absolute', left: 16, width: 170, bottom: 335, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildType ?? t('group.edit.settings.type.caption')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 16, width: 170, top: 29, height: 199 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 191 }}
                    >
                        <GroupManagementWindowLayoutGroupTypeSelector {...groupTypeSelector} />
                    </Border>
                </Border>
                <Region
                    name="guild_rights"
                    layout={{ position: 'absolute', left: 207, width: 170, bottom: 335, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildRights ?? t('group.edit.settings.rights.caption')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
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
                            onPointerTap={onCbMemberRights}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                        />
                        <Region layout={{ position: 'absolute', left: 25, width: 133, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('group.edit.settings.rights.members.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region layout={{ position: 'absolute', left: 5, width: 152, top: 25, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('group.edit.settings.rights.members.help')}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 152 }}
                            />
                        </Region>
                    </Border>
                </Border>
            </Region>
        )
    );
};
