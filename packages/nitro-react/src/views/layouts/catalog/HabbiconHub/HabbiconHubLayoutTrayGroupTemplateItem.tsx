import { useTranslation } from '#base/context';
import { Border, BoxLayout, ThemeText } from '#base/theme';

import { HabbiconHubLayoutTrayGroupGrid, HabbiconHubLayoutTrayGroupGridProps } from './HabbiconHubLayoutTrayGroupGrid';

/** Row template `tray_group_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutTrayGroupTemplateItemProps {
    captionTrayGroupTitle?: string;
    layout?: BoxLayout;
    trayGroupGrid?: HabbiconHubLayoutTrayGroupGridProps;
    visibleTrayGroupGrid?: boolean;
    visibleTrayGroupTitle?: boolean;
}

export const HabbiconHubLayoutTrayGroupTemplateItem = ({ captionTrayGroupTitle, layout, trayGroupGrid, visibleTrayGroupGrid, visibleTrayGroupTitle }: HabbiconHubLayoutTrayGroupTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="10"
            name="tray_group_template"
            tintColor="#efe1c4"
            layout={{ width: 506, height: 89, flexShrink: 0, ...layout }}
        >
            {(visibleTrayGroupTitle ?? true) && (
                <ThemeText
                    text={captionTrayGroupTitle ?? t('habbicon_set_name')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                    name="tray_group_title"
                    layout={{ position: 'absolute', left: 10, width: 115, top: 7, height: 17 }}
                />
            )}
            {(visibleTrayGroupGrid ?? true) && (
                <HabbiconHubLayoutTrayGroupGrid {...trayGroupGrid} />
            )}
        </Border>
    );
};
