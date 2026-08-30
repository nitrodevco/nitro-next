import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `search_input_border` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchInputBorderItemProps {
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
    visibleSearchInput?: boolean;
    visibleSearchPlaceholder?: boolean;
}

export const MarketPlaceOwnItemsWidgetSearchInputBorderItem = ({ captionSearchPlaceholder, layout, onCancelSearchBtn, visibleCancelSearchBtn, visibleSearchInput, visibleSearchPlaceholder }: MarketPlaceOwnItemsWidgetSearchInputBorderItemProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Border
            variant="105"
            name="search_input_border"
            layout={{ width: 160, height: 26, flexShrink: 0, ...layout }}
        >
            {(visibleSearchInput ?? true) && (
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    maxLength={40}
                    layout={{ position: 'absolute', left: 6, right: 3, top: 3, height: 19, minWidth: 151, maxWidth: 151 }}
                />
            )}
            {(visibleSearchPlaceholder ?? true) && (
                <Region
                    name="search_placeholder"
                    layout={{ position: 'absolute', left: 6, width: 82, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchPlaceholder ?? t('catalog.search')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            )}
            {(visibleCancelSearchBtn ?? false) && (
                <Region
                    name="cancel_search_btn"
                    onPointerTap={onCancelSearchBtn}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 137, width: 19, top: 3, height: 19 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_close.png')}
                        layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
                    />
                </Region>
            )}
        </Border>
    );
};
