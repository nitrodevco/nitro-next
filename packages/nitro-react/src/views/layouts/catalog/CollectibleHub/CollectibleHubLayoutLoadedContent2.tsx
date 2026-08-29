import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, TextInput, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutCollectionContent, CollectibleHubLayoutCollectionContentProps } from './CollectibleHubLayoutCollectionContent';
import { CollectibleHubLayoutNavigationContainer, CollectibleHubLayoutNavigationContainerProps } from './CollectibleHubLayoutNavigationContainer';

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent2Props {
    captionSearchPlaceholder?: string;
    collectionContent?: CollectibleHubLayoutCollectionContentProps;
    layout?: BoxLayout;
    navigationContainer?: CollectibleHubLayoutNavigationContainerProps;
    onSearchClearButton?: () => void;
    onSortSelection?: () => void;
    onWalletSelection?: () => void;
    srcSearchIcon?: string;
}

export const CollectibleHubLayoutLoadedContent2 = ({ captionSearchPlaceholder, collectionContent, layout, navigationContainer, onSearchClearButton, onSortSelection, onWalletSelection, srcSearchIcon }: CollectibleHubLayoutLoadedContent2Props) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="loaded_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Dropmenu
                variant="3"
                name="wallet_selection"
                onPointerTap={onWalletSelection}
                layout={{ position: 'absolute', left: 4, width: 184, top: 4, height: 24 }}
            >
                Collector Wallet
            </Dropmenu>
            <Dropmenu
                variant="3"
                name="sort_selection"
                onPointerTap={onSortSelection}
                layout={{ position: 'absolute', left: 4, width: 184, top: 32, height: 24 }}
            >
                Sort
            </Dropmenu>
            <Border
                variant="105"
                name="searchContainer"
                layout={{ position: 'absolute', left: 4, width: 184, top: 60, height: 24 }}
            >
                <Region
                    name="buttonContainer"
                    layout={{ position: 'absolute', left: 160, width: 24, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="search_icon"
                        src={srcSearchIcon ?? layoutImage('icons_close.png')}
                        layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 20 }}
                    />
                    <Button
                        variant="100"
                        name="search_clear_button"
                        tooltip="clear"
                        onPointerTap={onSearchClearButton}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 32 }}
                    />
                </Region>
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20 }}
                />
                <Region
                    name="search_placeholder"
                    layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionSearchPlaceholder ?? t('generic.search')}
                </Region>
            </Border>
            <CollectibleHubLayoutNavigationContainer {...navigationContainer} />
            <CollectibleHubLayoutCollectionContent {...collectionContent} />
        </Region>
    );
};
