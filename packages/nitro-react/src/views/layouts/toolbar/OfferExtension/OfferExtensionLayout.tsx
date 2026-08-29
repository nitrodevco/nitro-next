import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { OfferExtensionLayoutCheckRewardsItem } from './OfferExtensionLayoutCheckRewardsItem';
import { OfferExtensionLayoutStartVideoItem } from './OfferExtensionLayoutStartVideoItem';

/** Generated from `1245_offer_extension_xml` (layout "offer_extension", 192x13) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OfferExtensionLayoutProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const OfferExtensionLayout = ({ itemsList, layout }: OfferExtensionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 13, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 6 }}
                >
                    <Region
                        name="list"
                        layout={{ position: 'absolute', left: 3, top: 3, flexDirection: 'column' }}
                    >
                        {itemsList ?? (
                            <>
                                <OfferExtensionLayoutStartVideoItem />
                                <OfferExtensionLayoutCheckRewardsItem />
                            </>
                        )}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
