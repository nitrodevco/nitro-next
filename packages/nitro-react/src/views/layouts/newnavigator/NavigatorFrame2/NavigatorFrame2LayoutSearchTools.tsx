import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, TextInput, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `search_tools` of NavigatorFrame2Layout - configured through the parent's `searchTools` prop. */
export interface NavigatorFrame2LayoutSearchToolsProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    onFilterTypeDropMenu?: () => void;
    onRefreshButton?: () => void;
    srcSearchClearIcon?: string;
    visibleRefreshButtonContainer?: boolean;
}

export const NavigatorFrame2LayoutSearchTools = ({ layout, onClearSearchButton, onFilterTypeDropMenu, onRefreshButton, srcSearchClearIcon, visibleRefreshButtonContainer }: NavigatorFrame2LayoutSearchToolsProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="search_tools"
            layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 408, top: 3, height: 36, ...layout }}
        >
            <Dropmenu
                variant="4"
                name="filter_type_drop_menu"
                tooltip={t('navigator.tooltip.filter.type')}
                onPointerTap={onFilterTypeDropMenu}
                layout={{ position: 'absolute', left: 4, width: 116, top: 10, height: 24 }}
            />
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 133, width: 235, top: 10, height: 24 }}
            >
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    layout={{ position: 'absolute', left: 6, width: 235, top: 4, height: 16 }}
                />
                <Region
                    name="clear_search_button"
                    onPointerTap={onClearSearchButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20 }}
                >
                    <ThemeImage
                        name="search.clear.icon"
                        src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            </Border>
            {(visibleRefreshButtonContainer ?? false) && (
                <Region
                    name="refreshButtonContainer"
                    layout={{ position: 'absolute', left: 375, width: 25, top: 10, height: 25 }}
                >
                    <Button
                        variant="5"
                        name="refreshButton"
                        tintColor="#7cc561"
                        onPointerTap={onRefreshButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23 }}
                    />
                    <ThemeImage
                        src={layoutImage('newnavigator_refresh_search_icon.png')}
                        layout={{ position: 'absolute', left: 5, width: 17, top: 5, height: 12 }}
                    />
                </Region>
            )}
        </Region>
    );
};
