import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { CollectibleHubLayoutItemContainer, CollectibleHubLayoutItemContainerProps } from './CollectibleHubLayoutItemContainer';
import { CollectibleHubLayoutPreviewContainer2, CollectibleHubLayoutPreviewContainer2Props } from './CollectibleHubLayoutPreviewContainer2';

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContentProps {
    captionCollectionName?: string;
    captionProgressText?: string;
    itemContainer?: CollectibleHubLayoutItemContainerProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer2Props;
}

export const CollectibleHubLayoutCollectionContent = ({ captionCollectionName, captionProgressText, itemContainer, layout, previewContainer }: CollectibleHubLayoutCollectionContentProps) => {
    return (
        <Region
            name="collection_content"
            layout={{ position: 'absolute', left: 195, width: 290, top: 3, height: 425, ...layout }}
        >
            <Border
                variant="3"
                name="collection_header_container"
                tintColor="#cbd1d8"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            >
                <ThemeText
                    text={captionCollectionName ?? 'Collection name'}
                    name="collection_name"
                    layout={{ position: 'absolute', left: 4, width: 121, top: 4, height: 21 }}
                />
                <Region
                    name="progress_header_container"
                    layout={{ position: 'absolute', left: 248, width: 40, top: 2, height: 26, minWidth: 40, maxWidth: 40 }}
                >
                    <Border
                        variant="3"
                        name="progress_color"
                        tintColor="#00910a"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text={captionProgressText ?? '88/88'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="progress_text"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 4, height: 17 }}
                    />
                </Region>
            </Border>
            <CollectibleHubLayoutPreviewContainer2 {...previewContainer} />
            <CollectibleHubLayoutItemContainer {...itemContainer} />
        </Region>
    );
};
