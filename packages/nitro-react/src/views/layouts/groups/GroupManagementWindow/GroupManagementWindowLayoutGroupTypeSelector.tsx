import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `group_type_selector` of GroupManagementWindowLayout - configured through the parent's `groupTypeSelector` prop. */
export interface GroupManagementWindowLayoutGroupTypeSelectorProps {
    layout?: BoxLayout;
    onGrouptypeRegion0?: () => void;
    onGrouptypeRegion1?: () => void;
    onGrouptypeRegion2?: () => void;
    onRbTypeExclusive?: () => void;
    onRbTypePrivate?: () => void;
    onRbTypeRegular?: () => void;
    srcGrouptypeIcon0?: string;
    srcGrouptypeIcon1?: string;
    srcGrouptypeIcon2?: string;
}

export const GroupManagementWindowLayoutGroupTypeSelector = ({ layout, onGrouptypeRegion0, onGrouptypeRegion1, onGrouptypeRegion2, onRbTypeExclusive, onRbTypePrivate, onRbTypeRegular, srcGrouptypeIcon0, srcGrouptypeIcon1, srcGrouptypeIcon2 }: GroupManagementWindowLayoutGroupTypeSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_type_selector"
            layout={{ position: 'absolute', left: 5, width: 152, top: 5, height: 191, ...layout }}
        >
            <RadioButton
                variant="0"
                name="rb_type_regular"
                onPointerTap={onRbTypeRegular}
                layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 112, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.regular.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_0"
                tooltip={t('group.edit.settings.type.regular.help')}
                onPointerTap={onGrouptypeRegion0}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 22, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_0"
                    src={srcGrouptypeIcon0 ?? '${image.library.url}guilds/grouptype_icon_0.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 15, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.regular.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
            <RadioButton
                variant="0"
                name="rb_type_exclusive"
                onPointerTap={onRbTypeExclusive}
                layout={{ position: 'absolute', left: 0, width: 15, top: 62, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.exclusive.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_1"
                tooltip={t('group.edit.settings.type.exclusive.help')}
                onPointerTap={onGrouptypeRegion1}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 82, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_1"
                    src={srcGrouptypeIcon1 ?? '${image.library.url}guilds/grouptype_icon_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 75, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.exclusive.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
            <RadioButton
                variant="0"
                name="rb_type_private"
                onPointerTap={onRbTypePrivate}
                layout={{ position: 'absolute', left: 0, width: 15, top: 122, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 120, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.private.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_2"
                tooltip={t('group.edit.settings.type.private.help')}
                onPointerTap={onGrouptypeRegion2}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 142, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_2"
                    src={srcGrouptypeIcon2 ?? '${image.library.url}guilds/grouptype_icon_2.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 135, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.private.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
        </Region>
    );
};
