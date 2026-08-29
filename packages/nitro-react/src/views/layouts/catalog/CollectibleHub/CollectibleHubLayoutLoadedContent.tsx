import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { CollectibleHubLayoutCategoryFooter, CollectibleHubLayoutCategoryFooterProps } from './CollectibleHubLayoutCategoryFooter';
import { CollectibleHubLayoutFurnitureContainer, CollectibleHubLayoutFurnitureContainerProps } from './CollectibleHubLayoutFurnitureContainer';

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContentProps {
    captionMintingDescription?: string;
    captionMintingHeader?: string;
    categoryFooter?: CollectibleHubLayoutCategoryFooterProps;
    furnitureContainer?: CollectibleHubLayoutFurnitureContainerProps;
    layout?: BoxLayout;
    onCategoryMintingDescriptionRegion?: () => void;
    onCategoryNameRegion?: () => void;
}

export const CollectibleHubLayoutLoadedContent = ({ captionMintingDescription, captionMintingHeader, categoryFooter, furnitureContainer, layout, onCategoryMintingDescriptionRegion, onCategoryNameRegion }: CollectibleHubLayoutLoadedContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden', ...layout }}
        >
            <Region
                name="category_minting_header_region"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 58, overflow: 'hidden' }}
            >
                <Region
                    name="category_name_region"
                    onPointerTap={onCategoryNameRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                >
                    <Region
                        name="minting_header"
                        layout={{ position: 'absolute', left: 0, width: 130, top: 0, bottom: 0, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMintingHeader ?? t('shop.minting.info.title')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                </Region>
                <Region
                    name="category_minting_description_region"
                    layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    onPointerTap={onCategoryMintingDescriptionRegion}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionMintingDescription ?? t('shop.minting.info.description')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                    />
                </Region>
            </Region>
            <CollectibleHubLayoutFurnitureContainer {...furnitureContainer} />
            <CollectibleHubLayoutCategoryFooter {...categoryFooter} />
        </Region>
    );
};
