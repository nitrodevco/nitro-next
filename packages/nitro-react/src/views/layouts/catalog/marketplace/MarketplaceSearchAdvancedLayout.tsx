import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1541_marketplace_search_advanced_xml` (layout "marketplace_search_simple", 360x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceSearchAdvancedLayoutProps {
    layout?: BoxLayout;
    onCombineUniquesCheckbox?: () => void;
    onSearchButton?: () => void;
    onSortDropmenu?: () => void;
}

export const MarketplaceSearchAdvancedLayout = ({ layout, onCombineUniquesCheckbox, onSearchButton, onSortDropmenu }: MarketplaceSearchAdvancedLayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');
    const [ minPriceInputValue, setMinPriceInputValue ] = useState('');
    const [ maxPriceInputValue, setMaxPriceInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 120, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="text_search_container"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 10, height: 20 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 102, top: 3, bottom: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.marketplace.search_name')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Border
                        variant="0"
                        layout={{ position: 'absolute', right: 0, width: 220, top: 0, bottom: 0 }}
                    >
                        <TextInput
                            value={searchInputValue}
                            onChange={setSearchInputValue}
                            layout={{ position: 'absolute', left: 6, right: 4, top: 2, bottom: 2 }}
                        />
                    </Border>
                </Region>
                <Region
                    name="price_container"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 35, height: 20 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 102, top: 3, bottom: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.marketplace.search_price')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Border
                        variant="0"
                        layout={{ position: 'absolute', left: 120, width: 70, top: 0, bottom: 0 }}
                    >
                        <TextInput
                            value={minPriceInputValue}
                            onChange={setMinPriceInputValue}
                            layout={{ position: 'absolute', left: 6, right: 4, top: 3, bottom: 1 }}
                        />
                    </Border>
                    <Border
                        variant="0"
                        layout={{ position: 'absolute', right: 0, width: 70, top: 0, bottom: 0 }}
                    >
                        <TextInput
                            value={maxPriceInputValue}
                            onChange={setMaxPriceInputValue}
                            layout={{ position: 'absolute', left: 6, right: 4, top: 3, bottom: 1 }}
                        />
                    </Border>
                </Region>
                <Region
                    name="sort_container"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 60, height: 24 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 102, top: 3, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.marketplace.sort_order')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Dropmenu
                        variant="3"
                        name="sort_dropmenu"
                        onPointerTap={onSortDropmenu}
                        layout={{ position: 'absolute', right: 0, width: 220, top: 0, bottom: 0 }}
                    />
                </Region>
                <CheckBox
                    variant="3"
                    name="combine_uniques_checkbox"
                    onPointerTap={onCombineUniquesCheckbox}
                    layout={{ position: 'absolute', left: 10, width: 16, top: 92, height: 15 }}
                />
                <Region layout={{ position: 'absolute', left: 29, width: 218, bottom: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('catalog.marketplace.combine_uniques')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="search_button"
                    onPointerTap={onSearchButton}
                    layout={{ position: 'absolute', right: 10, width: 100, bottom: 8, height: 22, minWidth: 100 }}
                >
                    {t('generic.search')}
                </Button>
            </Region>
        </Region>
    );
};
