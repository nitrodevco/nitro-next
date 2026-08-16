import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors } from "#base/context";
import { useCatalogNavigation, useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";

import { getCatalogGridItemTemplate } from "./catalogGridItemTemplate";
import { CatalogItemGridWidgetItemContentView } from "./CatalogItemGridWidgetItemContentView";
import { CatalogItemGridWidgetItemSelectedView } from "./CatalogItemGridWidgetItemSelectedView";

type CatalogItemGridWidgetItemViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemView = (props: CatalogItemGridWidgetItemViewProps) => {
    const { offer } = props;
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);
    const { activeOffer } = useCatalogSelectors();
    const { selectOffer } = useCatalogNavigation();

    if (!offer || !product) return null;

    if (activeOffer === offer) return <CatalogItemGridWidgetItemSelectedView offer={offer} />;

    const template = getCatalogGridItemTemplate(offer);

    return (
        <div
            className="relative cursor-pointer overflow-hidden"
            style={{ width: template.width, height: template.height }}
            onClick={() => selectOffer(offer)}
            data-active={activeOffer === offer}>
            <CatalogItemGridWidgetItemContentView offer={offer} iconUrl={iconUrl} />
        </div>
    );
}
