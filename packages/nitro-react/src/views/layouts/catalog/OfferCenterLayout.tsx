import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1667_offer_center_xml` (layout "offer_center", 377x412) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OfferCenterLayoutProps {
    captionRewardDate?: string;
    captionRewardName?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    srcRewardIcon?: string;
}

export const OfferCenterLayout = ({ captionRewardDate, captionRewardName, layout, onClose, srcRewardIcon }: OfferCenterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('offers.center.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 377, height: 412, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={208}
                    layout={{ position: 'absolute', left: 94, width: 186, top: 9, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('offers.center.rewards.label')}
                        textStyle="text-style-u-headline-small"
                    />
                </Region>
                <Border
                    variant="0"
                    params={2064}
                    tintColor="#bbbbb4"
                    layout={{ position: 'absolute', left: 14, width: 348, top: 31, height: 336 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 10, width: 330, top: 10, height: 316 }}
                    >
                        <Region
                            name="reward_list"
                            params={2064}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Border
                                variant="0"
                                params={16}
                                layout={{ width: 313, height: 64, flexShrink: 0 }}
                            >
                                <Border
                                    variant="3"
                                    params={16}
                                    tintColor="#8bc9d9"
                                    layout={{ position: 'absolute', left: 4, width: 305, top: 4, height: 56 }}
                                >
                                    <Border
                                        variant="3"
                                        params={16}
                                        tintColor="#aadde6"
                                        layout={{ position: 'absolute', left: 3, width: 299, top: 3, height: 25 }}
                                    />
                                    <Region
                                        name="reward_date"
                                        params={16}
                                        layout={{ position: 'absolute', left: 7, width: 86, top: 15, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionRewardDate ?? '2013.01.15, 16:48'}
                                            textStyle="text-style-u-small"
                                            textOptions={{ fill: '#5f8c9f' }}
                                        />
                                    </Region>
                                    <Region
                                        name="reward_name"
                                        params={16}
                                        layout={{ position: 'absolute', left: 9, width: 80, top: 29, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionRewardName ?? 'Reward name'}
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                </Border>
                                <ThemeImage
                                    name="reward_icon"
                                    params={16}
                                    src={srcRewardIcon}
                                    layout={{ position: 'absolute', left: 211, width: 80, top: 4, height: 56 }}
                                />
                            </Border>
                        </Region>
                    </ScrollArea>
                </Border>
            </Region>
        </Frame>
    );
};
