import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1186_no_groups_xml` (layout "no_groups", 343x214) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NoGroupsLayoutProps {
    captionNoGroupsCaption?: string;
    captionNoGroupsInfo?: string;
    layout?: BoxLayout;
    onViewGroupsButton?: () => void;
    srcExtProfileGrouppic?: string;
    srcGroupBaseIcon?: string;
}

export const NoGroupsLayout = ({ captionNoGroupsCaption, captionNoGroupsInfo, layout, onViewGroupsButton, srcExtProfileGrouppic, srcGroupBaseIcon }: NoGroupsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 343, height: 214, ...layout }}>
            <Region
                name="no_groups_cont"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 343, top: 0, height: 214 }}
            >
                <Region
                    name="no_groups_caption"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 125, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNoGroupsCaption ?? 'No groups caption PH'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <ThemeImage
                    name="ext_profile_grouppic"
                    params={16}
                    src={srcExtProfileGrouppic ?? '${image.library.url}guilds/ext_profile_grouppic.png'}
                    layout={{ position: 'absolute', left: 15, width: 311, top: 21, height: 136 }}
                />
                <Region
                    name="no_groups_info"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 174, top: 164, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNoGroupsInfo ?? t('extendedprofile.nogroups.info')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <ContainerButton
                    variant="0"
                    name="view_groups_button"
                    params={17}
                    onPointerTap={onViewGroupsButton}
                    layout={{ position: 'absolute', left: 62, width: 216, top: 184, height: 30 }}
                >
                    <ThemeImage
                        name="group_base_icon"
                        params={16}
                        src={srcGroupBaseIcon ?? '${image.library.url}guilds/group_base_icon.png'}
                        layout={{ position: 'absolute', left: 11, width: 24, top: 7, height: 17 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 42, width: 215, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('extendedprofile.nogroups.viewgroups')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};
