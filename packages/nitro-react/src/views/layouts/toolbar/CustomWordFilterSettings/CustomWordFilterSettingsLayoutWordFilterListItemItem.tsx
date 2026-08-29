import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `word_filter_list_item` of CustomWordFilterSettingsLayout - pass real rows through its `items…` slot. */
export interface CustomWordFilterSettingsLayoutWordFilterListItemItemProps {
    bgRegion?: ReactNode;
    captionText?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    visibleBgRegion?: boolean;
    visibleText?: boolean;
    visibleWordFilterListItem?: boolean;
}

export const CustomWordFilterSettingsLayoutWordFilterListItemItem = ({ bgRegion, captionText, layout, onBgRegion, visibleBgRegion, visibleText, visibleWordFilterListItem }: CustomWordFilterSettingsLayoutWordFilterListItemItemProps) => {
    return (
        (visibleWordFilterListItem ?? false) && (
            <Region
                name="word_filter_list_item"
                backgroundColor="#ff00ff"
                layout={{ width: 213, height: 18, flexShrink: 0, ...layout }}
            >
                {(visibleBgRegion ?? true) && (
                    <Region
                        name="bg_region"
                        onPointerTap={onBgRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 222, top: 0, bottom: 0 }}
                    >
                        {bgRegion}
                    </Region>
                )}
                {(visibleText ?? true) && (
                    <Region
                        name="text"
                        layout={{ position: 'absolute', left: 0, width: 222, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionText ?? 'BadWord'}
                    </Region>
                )}
            </Region>
        )
    );
};
