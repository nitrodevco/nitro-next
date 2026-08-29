import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `976_avatar_info_widget_xml` (layout "avatarinfo", 129x39) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarInfoWidgetLayoutProps {
    captionName?: string;
    changeNameContainer?: AvatarInfoWidgetLayoutChangeNameContainerProps;
    layout?: BoxLayout;
    srcRelationshipStatus?: string;
    visibleBorder?: boolean;
}

export const AvatarInfoWidgetLayout = ({ captionName, changeNameContainer, layout, srcRelationshipStatus, visibleBorder }: AvatarInfoWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 129, height: 39, ...layout }}>
            <Region
                visible={visibleBorder ?? true}
                layout={{ position: 'absolute', left: 0, width: 129, top: 0, height: 39 }}
            >
                <Bubble
                    variant="5"
                    name="border"
                    params={1}
                    tintColor="#3d3d3d"
                    layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="relationship_status"
                        params={16}
                        src={srcRelationshipStatus}
                        layout={{ position: 'absolute', left: 2, width: 16, top: 4, height: 14 }}
                    />
                    <Region
                        name="name"
                        params={4194320}
                        layout={{ position: 'absolute', left: 16, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionName ?? 'my_name_here'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <AvatarInfoWidgetLayoutChangeNameContainer {...changeNameContainer} />
                </Bubble>
            </Region>
        </Region>
    );
};

/** Named region `change_name_container` of AvatarInfoWidgetLayout - configured through the parent's `changeNameContainer` prop. */
export interface AvatarInfoWidgetLayoutChangeNameContainerProps {
    layout?: BoxLayout;
    onChangeNameContainer?: () => void;
    srcPenIcon?: string;
}

export const AvatarInfoWidgetLayoutChangeNameContainer = ({ layout, onChangeNameContainer, srcPenIcon }: AvatarInfoWidgetLayoutChangeNameContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_name_container"
            params={209}
            onPointerTap={onChangeNameContainer}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 123, top: 19, height: 18, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 106, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('widget.avatar.change_name')}
                    textStyle="text-style-u-italic"
                    textOptions={{ fill: '#fac200' }}
                />
            </Region>
            <ThemeImage
                name="pen_icon"
                params={16}
                src={srcPenIcon}
                layout={{ position: 'absolute', left: 7, width: 12, top: 1, height: 12 }}
            />
        </Region>
    );
};
