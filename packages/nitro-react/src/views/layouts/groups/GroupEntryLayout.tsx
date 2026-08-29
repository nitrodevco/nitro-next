import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1197_group_entry_xml` (layout "Group Entry", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupEntryLayoutProps {
    groupEntryContainer?: GroupEntryLayoutGroupEntryContainerProps;
    layout?: BoxLayout;
}

export const GroupEntryLayout = ({ groupEntryContainer, layout }: GroupEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <GroupEntryLayoutGroupEntryContainer {...groupEntryContainer} />
        </Region>
    );
};

/** Named region `bg_region` of GroupEntryLayout - configured through the parent's `bgRegion` prop. */
export interface GroupEntryLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const GroupEntryLayoutBgRegion = ({ layout, onBgRegion }: GroupEntryLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            params={17}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60, ...layout }}
        />
    );
};

/** Named region `clear_favourite` of GroupEntryLayout - configured through the parent's `clearFavourite` prop. */
export interface GroupEntryLayoutClearFavouriteProps {
    layout?: BoxLayout;
    onClearFavourite?: () => void;
    srcIcon?: string;
}

export const GroupEntryLayoutClearFavourite = ({ layout, onClearFavourite, srcIcon }: GroupEntryLayoutClearFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clear_favourite"
            tooltip={t('group.clearfavourite')}
            params={81}
            onPointerTap={onClearFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 43, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('extended_profile_clear_favourite.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `make_favourite` of GroupEntryLayout - configured through the parent's `makeFavourite` prop. */
export interface GroupEntryLayoutMakeFavouriteProps {
    layout?: BoxLayout;
    onMakeFavourite?: () => void;
    srcIcon?: string;
}

export const GroupEntryLayoutMakeFavourite = ({ layout, onMakeFavourite, srcIcon }: GroupEntryLayoutMakeFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_favourite"
            tooltip={t('group.makefavourite')}
            params={81}
            onPointerTap={onMakeFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 43, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('extended_profile_make_favourite.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `group_entry_container` of GroupEntryLayout - configured through the parent's `groupEntryContainer` prop. */
export interface GroupEntryLayoutGroupEntryContainerProps {
    bgRegion?: GroupEntryLayoutBgRegionProps;
    clearFavourite?: GroupEntryLayoutClearFavouriteProps;
    layout?: BoxLayout;
    makeFavourite?: GroupEntryLayoutMakeFavouriteProps;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
}

export const GroupEntryLayoutGroupEntryContainer = ({ bgRegion, clearFavourite, layout, makeFavourite, srcBgSelectedBitmap, srcBgUnselectedBitmap }: GroupEntryLayoutGroupEntryContainerProps) => {
    return (
        <Region
            name="group_entry_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60, ...layout }}
        >
            <ThemeImage
                name="bg_selected_bitmap"
                params={16}
                src={srcBgSelectedBitmap ?? '${image.library.questing.url}achievement_active.png'}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <ThemeImage
                name="bg_unselected_bitmap"
                params={17}
                src={srcBgUnselectedBitmap ?? '${image.library.questing.url}achievement_inactive.png'}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="group_pic_bitmap"
                params={16}
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 11, width: 40, top: 10, height: 40 }}
            />
            <GroupEntryLayoutBgRegion {...bgRegion} />
            <GroupEntryLayoutClearFavourite {...clearFavourite} />
            <GroupEntryLayoutMakeFavourite {...makeFavourite} />
        </Region>
    );
};
