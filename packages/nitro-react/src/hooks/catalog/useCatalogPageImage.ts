/**
 * The url a catalogue page's static bitmap draws - `LocalizationCatalogWidget.setElementImage` for
 * an `IStaticBitmapWrapperWindow`: the image the page's localization sends to the element
 * (`getCatalogPageImage`), under the catalogue image library (`asset.urls.catalog`, the port's
 * `image.library.catalogue.url` + name + `.gif`), or else the layout's own `asset_uri`, which
 * every catalogue layout writes under `${image.library.url}` - `layoutUri` is the part after it.
 * An element no page image goes to (`duckets_info_illustration`) passes no element name.
 */
import { CATALOG_HEADER_IMAGE, CatalogLocalizedPage, getCatalogPageImage } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';

export const useCatalogPageImage = (page: CatalogLocalizedPage, elementName: string | undefined, layoutUri: string): string => {
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const image = ((elementName !== undefined) && (elementName !== CATALOG_HEADER_IMAGE)) ? getCatalogPageImage(page, elementName) : undefined;

    return (image !== undefined) ? catalogImageUrl.replace('%name%', image) : `${imageLibraryUrl}${layoutUri}`;
};
