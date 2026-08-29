import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1541_marketplace_search_advanced_xml` (layout "marketplace_search_simple", 360x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceSearchAdvancedLayoutProps {
    layout?: BoxLayout;
    onCombineUniquesCheckbox?: () => void;
    onSearchButton?: () => void;
    priceContainer?: MarketplaceSearchAdvancedLayoutPriceContainerProps;
    sortContainer?: MarketplaceSearchAdvancedLayoutSortContainerProps;
    textSearchContainer?: MarketplaceSearchAdvancedLayoutTextSearchContainerProps;
}

export const MarketplaceSearchAdvancedLayout = ({ layout, onCombineUniquesCheckbox, onSearchButton, priceContainer, sortContainer, textSearchContainer }: MarketplaceSearchAdvancedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 120, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 120 }}
            >
                <MarketplaceSearchAdvancedLayoutTextSearchContainer {...textSearchContainer} />
                <MarketplaceSearchAdvancedLayoutPriceContainer {...priceContainer} />
                <MarketplaceSearchAdvancedLayoutSortContainer {...sortContainer} />
                <CheckBox
                    variant="3"
                    name="combine_uniques_checkbox"
                    params={17}
                    onPointerTap={onCombineUniquesCheckbox}
                    layout={{ position: 'absolute', left: 10, width: 16, top: 92, height: 15 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 29, width: 218, top: 91, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.marketplace.combine_uniques')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="search_button"
                    params={393233}
                    onPointerTap={onSearchButton}
                    layout={{ position: 'absolute', right: 10, width: 100, top: 90, height: 22, minWidth: 100 }}
                >
                    {t('generic.search')}
                </Button>
            </Region>
        </Region>
    );
};

/** Named region `text_search_container` of MarketplaceSearchAdvancedLayout - configured through the parent's `textSearchContainer` prop. */
export interface MarketplaceSearchAdvancedLayoutTextSearchContainerProps {
    layout?: BoxLayout;
}

export const MarketplaceSearchAdvancedLayoutTextSearchContainer = ({ layout }: MarketplaceSearchAdvancedLayoutTextSearchContainerProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="text_search_container"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 340, top: 10, height: 20, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 102, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog.marketplace.search_name')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 120, width: 220, top: 0, height: 20 }}
            >
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 16 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `price_container` of MarketplaceSearchAdvancedLayout - configured through the parent's `priceContainer` prop. */
export interface MarketplaceSearchAdvancedLayoutPriceContainerProps {
    layout?: BoxLayout;
}

export const MarketplaceSearchAdvancedLayoutPriceContainer = ({ layout }: MarketplaceSearchAdvancedLayoutPriceContainerProps) => {
    const t = useTranslation();
    const [ minPriceInputValue, setMinPriceInputValue ] = useState('');
    const [ maxPriceInputValue, setMaxPriceInputValue ] = useState('');

    return (
        <Region
            name="price_container"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 340, top: 35, height: 20, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 102, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog.marketplace.search_price')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 120, width: 70, top: 0, height: 20 }}
            >
                <TextInput
                    value={minPriceInputValue}
                    onChange={setMinPriceInputValue}
                    layout={{ position: 'absolute', left: 6, width: 60, top: 3, height: 16 }}
                />
            </Border>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 270, width: 70, top: 0, height: 20 }}
            >
                <TextInput
                    value={maxPriceInputValue}
                    onChange={setMaxPriceInputValue}
                    layout={{ position: 'absolute', left: 6, width: 60, top: 3, height: 16 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `sort_container` of MarketplaceSearchAdvancedLayout - configured through the parent's `sortContainer` prop. */
export interface MarketplaceSearchAdvancedLayoutSortContainerProps {
    layout?: BoxLayout;
    onSortDropmenu?: () => void;
}

export const MarketplaceSearchAdvancedLayoutSortContainer = ({ layout, onSortDropmenu }: MarketplaceSearchAdvancedLayoutSortContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="sort_container"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 340, top: 60, height: 24, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 102, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog.marketplace.sort_order')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Dropmenu
                variant="3"
                name="sort_dropmenu"
                params={17}
                onPointerTap={onSortDropmenu}
                layout={{ position: 'absolute', left: 120, width: 220, top: 0, height: 24 }}
            />
        </Region>
    );
};
