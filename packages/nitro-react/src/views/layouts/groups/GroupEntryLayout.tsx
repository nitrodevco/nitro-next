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

/** Named region `group_entry_container` of GroupEntryLayout - configured through the parent's `groupEntryContainer` prop. */
export interface GroupEntryLayoutGroupEntryContainerProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onClearFavourite?: () => void;
    onMakeFavourite?: () => void;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
    srcIcon?: string;
    srcIcon2?: string;
}

export const GroupEntryLayoutGroupEntryContainer = ({ layout, onBgRegion, onClearFavourite, onMakeFavourite, srcBgSelectedBitmap, srcBgUnselectedBitmap, srcIcon, srcIcon2 }: GroupEntryLayoutGroupEntryContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_entry_container"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60, ...layout }}
        >
            <ThemeImage
                name="bg_selected_bitmap"
                src={srcBgSelectedBitmap ?? '${image.library.questing.url}achievement_active.png'}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <ThemeImage
                name="bg_unselected_bitmap"
                src={srcBgUnselectedBitmap ?? '${image.library.questing.url}achievement_inactive.png'}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="group_pic_bitmap"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 11, width: 40, top: 10, height: 40 }}
            />
            <Region
                name="bg_region"
                onPointerTap={onBgRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <Region
                name="clear_favourite"
                tooltip={t('group.clearfavourite')}
                onPointerTap={onClearFavourite}
                cursor="pointer"
                layout={{ position: 'absolute', right: 43, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('extended_profile_clear_favourite.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            <Region
                name="make_favourite"
                tooltip={t('group.makefavourite')}
                onPointerTap={onMakeFavourite}
                cursor="pointer"
                layout={{ position: 'absolute', right: 43, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon2 ?? layoutImage('extended_profile_make_favourite.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
        </Region>
    );
};
