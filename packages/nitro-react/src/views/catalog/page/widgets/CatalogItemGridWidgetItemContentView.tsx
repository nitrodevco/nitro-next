import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { Image } from '#base/theme';

import { getCatalogGridItemTemplate } from './catalogGridItemTemplate';
import { CatalogItemGridWidgetItemPriceView } from './CatalogItemGridWidgetItemPriceView';

type CatalogItemGridWidgetItemContentViewProps = {
    offer: IPurchasableOffer;
    iconUrl: string;
};

export const CatalogItemGridWidgetItemContentView = (
    props: CatalogItemGridWidgetItemContentViewProps,
) => {
    const { offer, iconUrl } = props;
    const template = getCatalogGridItemTemplate(offer);

    return (
        <>
            <div
                className="absolute grid place-items-center"
                style={{
                    top: template.artwork.top,
                    left: template.artwork.left,
                    width: template.artwork.width,
                    height: template.artwork.height,
                }}>
                <Image src={iconUrl} />
            </div>
            <CatalogItemGridWidgetItemPriceView offer={offer} />
        </>
    );
};
