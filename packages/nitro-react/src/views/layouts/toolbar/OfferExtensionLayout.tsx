import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1245_offer_extension_xml` (layout "offer_extension", 192x13) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OfferExtensionLayoutProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const OfferExtensionLayout = ({ itemsList, layout }: OfferExtensionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 13, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 13 }}
            >
                <Border
                    variant="9"
                    params={8388624}
                    tintColor="#686661"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 6 }}
                >
                    <Region
                        name="list"
                        params={8536080}
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

/** Row template `start_video` of OfferExtensionLayout - pass real rows through its `items…` slot. */
export interface OfferExtensionLayoutStartVideoItemProps {
    layout?: BoxLayout;
    onStartVideo?: () => void;
    visibleStartVideo?: boolean;
}

export const OfferExtensionLayoutStartVideoItem = ({ layout, onStartVideo, visibleStartVideo }: OfferExtensionLayoutStartVideoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visibleStartVideo ?? false}
            layout={{ width: 180, height: 35, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="5"
                name="start_video"
                params={17}
                tintColor="#c55541"
                onPointerTap={onStartVideo}
                layout={{ width: '100%', height: '100%' }}
            >
                <Region
                    params={262160}
                    layout={{ position: 'absolute', right: 33, width: 140, top: 7, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('offers.extension.start_video')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    params={16}
                    src={layoutImage('common_offers_icon.png')}
                    layout={{ position: 'absolute', left: 151, width: 20, top: 7, height: 21 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `check_rewards` of OfferExtensionLayout - pass real rows through its `items…` slot. */
export interface OfferExtensionLayoutCheckRewardsItemProps {
    layout?: BoxLayout;
    onCheckRewards?: () => void;
    visibleCheckRewards?: boolean;
}

export const OfferExtensionLayoutCheckRewardsItem = ({ layout, onCheckRewards, visibleCheckRewards }: OfferExtensionLayoutCheckRewardsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="check_rewards"
            params={17}
            visible={visibleCheckRewards ?? false}
            onPointerTap={onCheckRewards}
            cursor="pointer"
            layout={{ width: 180, height: 19, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                params={208}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 167, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('offers.extension.check_rewards')}
                    textStyle="text-style-il-regular-white"
                />
            </Region>
        </Region>
    );
};
