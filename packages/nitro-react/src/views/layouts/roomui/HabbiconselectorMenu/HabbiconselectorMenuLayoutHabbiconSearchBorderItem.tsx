import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `habbicon_search_border` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconSearchBorderItemProps {
    captionHabbiconSearchPlaceholder?: string;
    layout?: BoxLayout;
    onHabbiconSearchClearButton?: () => void;
    visibleHabbiconSearchClearButton?: boolean;
    visibleHabbiconSearchInput?: boolean;
    visibleHabbiconSearchPlaceholder?: boolean;
}

export const HabbiconselectorMenuLayoutHabbiconSearchBorderItem = ({ captionHabbiconSearchPlaceholder, layout, onHabbiconSearchClearButton, visibleHabbiconSearchClearButton, visibleHabbiconSearchInput, visibleHabbiconSearchPlaceholder }: HabbiconselectorMenuLayoutHabbiconSearchBorderItemProps) => {
    const t = useTranslation();
    const [ habbiconSearchInputValue, setHabbiconSearchInputValue ] = useState('');

    return (
        <Border
            variant="4"
            name="habbicon_search_border"
            layout={{ width: 122, height: 28, flexShrink: 0, ...layout }}
        >
            {(visibleHabbiconSearchInput ?? true) && (
                <TextInput
                    value={habbiconSearchInputValue}
                    onChange={setHabbiconSearchInputValue}
                    maxLength={24}
                    textColor="#333333"
                    layout={{ position: 'absolute', left: 6, right: 26, alignSelf: 'center', height: 18 }}
                />
            )}
            {(visibleHabbiconSearchPlaceholder ?? true) && (
                <ThemeText
                    text={captionHabbiconSearchPlaceholder ?? t('generic.search')}
                    textStyle="text-style-u-italic"
                    textOptions={{ fill: '#777777' }}
                    name="habbicon_search_placeholder"
                    layout={{ position: 'absolute', left: 6, right: 26, alignSelf: 'center', height: 18 }}
                />
            )}
            {(visibleHabbiconSearchClearButton ?? true) && (
                <Region
                    name="habbicon_search_clear_button"
                    onPointerTap={onHabbiconSearchClearButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 6, width: 17, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17 }}
                >
                    <ThemeImage
                        src={layoutImage('common_promo_arrow_close.png')}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                </Region>
            )}
        </Border>
    );
};
