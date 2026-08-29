import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `58_user_entry_xml` (layout "Member Entry", 48x158) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserEntryLayoutProps {
    bgRegion?: UserEntryLayoutBgRegionProps;
    layout?: BoxLayout;
}

export const UserEntryLayout = ({ bgRegion, layout }: UserEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 48, height: 158, ...layout }}>
            <UserEntryLayoutBgRegion {...bgRegion} />
        </Region>
    );
};

/** Named region `extra_link_region` of UserEntryLayout - configured through the parent's `extraLinkRegion` prop. */
export interface UserEntryLayoutExtraLinkRegionProps {
    layout?: BoxLayout;
    onExtraLinkRegion?: () => void;
    srcExtraLinkIcon?: string;
}

export const UserEntryLayoutExtraLinkRegion = ({ layout, onExtraLinkRegion, srcExtraLinkIcon }: UserEntryLayoutExtraLinkRegionProps) => {
    return (
        <Region
            name="extra_link_region"
            onPointerTap={onExtraLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 12, width: 26, top: 112, height: 24, ...layout }}
        >
            <ThemeImage
                name="extra_link_icon"
                src={srcExtraLinkIcon ?? layoutImage('icons_go_to_room_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 24 }}
            />
        </Region>
    );
};

/** Named region `bg_region` of UserEntryLayout - configured through the parent's `bgRegion` prop. */
export interface UserEntryLayoutBgRegionProps {
    extraLinkRegion?: UserEntryLayoutExtraLinkRegionProps;
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const UserEntryLayoutBgRegion = ({ extraLinkRegion, layout, onBgRegion }: UserEntryLayoutBgRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bg_region"
            tooltip={t('group.members.showinfo')}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 158, ...layout }}
        >
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image_widget"
                layout={{ position: 'absolute', left: -23, width: 90, top: -15, height: 130 }}
            />
            <UserEntryLayoutExtraLinkRegion {...extraLinkRegion} />
        </Region>
    );
};
