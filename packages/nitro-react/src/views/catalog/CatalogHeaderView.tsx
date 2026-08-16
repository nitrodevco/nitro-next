import { useCatalogSelectors, useConfigValue } from "#base/context";
import { BitmapText } from "#base/theme";

export const CatalogHeaderView = () => {
    const { activePage, activeNodes } = useCatalogSelectors();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = activePage?.localization.imageDatas[0] ?? '';
    const headerDescription = activePage?.localization.textDatas[0] ?? '';

    if (headerData && headerData.length) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    return (
        <div className="catalog-header">
            <div className="catalog-header-surface">
                <div className="catalog-header-art" style={{ backgroundImage: `url(${headerImageUrl})` }} />
                <div className="catalog-header-icon">
                    <img src={catalogIconUrl?.replace('%name%', activeNode?.icon.toString() ?? '1')} alt="" />
                </div>
                <div className="catalog-header-copy">
                    <BitmapText
                        recipe="bold-18"
                        color="#ffffff"
                        className="catalog-header-title">
                        {activeNode?.localization ?? ''}
                    </BitmapText>
                    {headerDescription.length > 0 && <span className="catalog-header-description">{headerDescription}</span>}
                </div>
            </div>
        </div>
    );
}
