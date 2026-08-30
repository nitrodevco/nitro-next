import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `976_avatar_info_widget_xml` (layout "avatarinfo", 129x39) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarInfoWidgetLayoutProps {
    captionName?: string;
    layout?: BoxLayout;
    onChangeNameContainer?: () => void;
    srcPenIcon?: string;
    srcRelationshipStatus?: string;
    tintPenIcon?: string;
    visibleBorder?: boolean;
}

export const AvatarInfoWidgetLayout = ({ captionName, layout, onChangeNameContainer, srcPenIcon, srcRelationshipStatus, tintPenIcon, visibleBorder }: AvatarInfoWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 129, height: 39, ...layout }}>
            {(visibleBorder ?? true) && (
                <Bubble
                    variant="5"
                    name="border"
                    tintColor="#3d3d3d"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="relationship_status"
                        src={srcRelationshipStatus}
                        layout={{ position: 'absolute', left: 2, width: 16, top: 4, height: 14 }}
                    />
                    <ThemeText
                        text={captionName ?? 'my_name_here'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="name"
                        layout={{ position: 'absolute', left: 16, top: 3, height: 16 }}
                    />
                    <Region
                        name="change_name_container"
                        onPointerTap={onChangeNameContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 123, top: 19, height: 18 }}
                    >
                        <ThemeText
                            text={t('widget.avatar.change_name')}
                            textStyle="text-style-u-italic"
                            textOptions={{ fill: '#fac200' }}
                            layout={{ position: 'absolute', left: 20, width: 106, top: 0, bottom: 0 }}
                        />
                        <ThemeImage
                            name="pen_icon"
                            src={srcPenIcon}
                            tint={tintPenIcon}
                            layout={{ position: 'absolute', left: 7, width: 12, top: 1, height: 12 }}
                        />
                    </Region>
                </Bubble>
            )}
        </Region>
    );
};
