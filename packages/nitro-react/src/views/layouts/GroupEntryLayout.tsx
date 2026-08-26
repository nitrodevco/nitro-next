import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1197_group_entry_xml` (layout "Group Entry", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupEntryLayoutProps {
    layout?: BoxLayout;
}

export const GroupEntryLayout = ({ layout }: GroupEntryLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <Region
                name="group_entry_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            >
                <ThemeImage
                    name="bg_selected_bitmap"
                    params={16}
                    src="${image.library.questing.url}achievement_active.png"
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
                <ThemeImage
                    name="bg_unselected_bitmap"
                    params={17}
                    src="${image.library.questing.url}achievement_inactive.png"
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_pic_bitmap"
                    params={16}
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 11, width: 40, top: 10, height: 40 }}
                />
                <Region
                    name="bg_region"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
                <Region
                    name="clear_favourite"
                    tooltip={t('group.clearfavourite')}
                    params={81}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="icon"
                        params={16}
                        src={layoutImage('extended_profile_clear_favourite.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="make_favourite"
                    tooltip={t('group.makefavourite')}
                    params={81}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="icon"
                        params={16}
                        src={layoutImage('extended_profile_make_favourite.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
