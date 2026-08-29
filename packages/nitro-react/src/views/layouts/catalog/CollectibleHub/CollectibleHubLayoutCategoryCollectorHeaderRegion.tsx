import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `category_collector_header_region` of CollectibleHubLayout - configured through the parent's `categoryCollectorHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryCollectorHeaderRegionProps {
    captionCategoryInfoTransferRegionCollectorProfileDescription?: string;
    captionCollectorCollectionsHeader?: string;
    captionCollectorProfileDescription?: string;
    captionInfoDesc?: string;
    captionTransferDesc?: string;
    layout?: BoxLayout;
    onCategoryInfoDescriptionRegion?: () => void;
    onCategoryInfoHeaderRegion?: () => void;
    onCategoryInfoTransferRegion?: () => void;
    visibleCategoryInfoTransferRegionCollectorProfileDescription?: boolean;
    visibleCollectorProfileDescription?: boolean;
}

export const CollectibleHubLayoutCategoryCollectorHeaderRegion = ({ captionCategoryInfoTransferRegionCollectorProfileDescription, captionCollectorCollectionsHeader, captionCollectorProfileDescription, captionInfoDesc, captionTransferDesc, layout, onCategoryInfoDescriptionRegion, onCategoryInfoHeaderRegion, onCategoryInfoTransferRegion, visibleCategoryInfoTransferRegionCollectorProfileDescription, visibleCollectorProfileDescription }: CollectibleHubLayoutCategoryCollectorHeaderRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_collector_header_region"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 135, overflow: 'hidden', ...layout }}
        >
            <Region
                name="category_info_header_region"
                onPointerTap={onCategoryInfoHeaderRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
            >
                <Region
                    name="collector_collections_header"
                    layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCollectorCollectionsHeader ?? t('collectibles.info.title')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
            <Region
                name="category_info_description_region"
                onPointerTap={onCategoryInfoDescriptionRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 50 }}
            >
                {(visibleCollectorProfileDescription ?? false) && (
                    <Region
                        name="collector_profile_description"
                        layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                        />
                    </Region>
                )}
                <Region
                    name="info_desc"
                    layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 50, maxWidth: 480, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoDesc ?? t('collectibles.info.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                    />
                </Region>
            </Region>
            <Region
                name="category_info_transfer_region"
                onPointerTap={onCategoryInfoTransferRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 480, top: 75, height: 60 }}
            >
                {(visibleCategoryInfoTransferRegionCollectorProfileDescription ?? false) && (
                    <Region
                        name="collector_profile_description"
                        layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCategoryInfoTransferRegionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                        />
                    </Region>
                )}
                <Region
                    name="transfer_desc"
                    layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 60, maxWidth: 480, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTransferDesc ?? t('collectibles.info.trading')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
