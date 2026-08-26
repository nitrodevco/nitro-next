import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1245_offer_extension_xml` (layout "offer_extension", 192x13) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OfferExtensionLayoutProps {
    layout?: BoxLayout;
    onStartVideo?: () => void;
}

export const OfferExtensionLayout = ({ layout, onStartVideo }: OfferExtensionLayoutProps) => {
    const t = useTranslation();

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
                        layout={{ position: 'absolute', left: 3, width: 180, top: 3, height: 0, flexDirection: 'column' }}
                    >
                        <Region
                            visible={false}
                            layout={{ width: 180, height: 35, flexShrink: 0 }}
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
                                    layout={{ position: 'absolute', left: 7, width: 140, top: 7, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        <Region
                            name="check_rewards"
                            params={17}
                            visible={false}
                            layout={{ width: 180, height: 19, flexShrink: 0 }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', left: 7, width: 167, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('offers.extension.check_rewards')}
                                    textStyle="text-style-il-regular-white"
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
