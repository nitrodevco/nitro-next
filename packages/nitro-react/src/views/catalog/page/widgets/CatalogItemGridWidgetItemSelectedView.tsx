import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";
import { Border } from "#base/theme";

import { getCatalogGridItemTemplate } from "./catalogGridItemTemplate";
import { CatalogItemGridWidgetItemContentView } from "./CatalogItemGridWidgetItemContentView";

type CatalogItemGridWidgetItemViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemSelectedView = (props: CatalogItemGridWidgetItemViewProps) => {
    const { offer } = props;
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);

    if (!offer || !product) return null;

    const template = getCatalogGridItemTemplate(offer);
    const highlightStyle = {
        width: template.width,
        height: template.highlightHeight,
    };
    const highlightInnerStyle = {
        top: template.highlightInset,
        left: template.highlightInset,
        width: template.width - template.highlightInset * 2,
        height: template.highlightHeight - template.highlightInset * 2,
    };

    return (
        <div
            className="relative overflow-hidden"
            style={{ width: template.width, height: template.height }}>
            <Border
                variant="2"
                tintColor="#a1a19b"
                className="absolute left-0 top-0"
                style={highlightStyle}
            />
            <Border
                variant="3"
                tintColor="#63c5e9"
                className="absolute left-0 top-0"
                style={highlightStyle}
            />
            <Border
                variant="3"
                className="absolute"
                style={highlightInnerStyle}
            />
            <CatalogItemGridWidgetItemContentView offer={offer} iconUrl={iconUrl} />
        </div>
    );
}
