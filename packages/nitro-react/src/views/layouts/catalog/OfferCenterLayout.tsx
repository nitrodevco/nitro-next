import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1667_offer_center_xml` (layout "offer_center", 377x412) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OfferCenterLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    rewardList?: OfferCenterLayoutRewardListProps;
}

export const OfferCenterLayout = ({ layout, onClose, rewardList }: OfferCenterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('offers.center.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 377, height: 412, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 186, top: 9, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('offers.center.rewards.label')}
                        textStyle="text-style-u-headline-small"
                    />
                </Region>
                <Border
                    variant="0"
                    tintColor="#bbbbb4"
                    layout={{ position: 'absolute', left: 14, width: 348, top: 31, bottom: 45 }}
                >
                    <OfferCenterLayoutRewardList {...rewardList} />
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `reward_list` of OfferCenterLayout - configured through the parent's `rewardList` prop. */
export interface OfferCenterLayoutRewardListProps {
    captionRewardDate?: string;
    captionRewardName?: string;
    layout?: BoxLayout;
    srcRewardIcon?: string;
    tags?: string[];
}

export const OfferCenterLayoutRewardList = ({ captionRewardDate, captionRewardName, layout, srcRewardIcon, tags }: OfferCenterLayoutRewardListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, width: 330, top: 10, bottom: 10, ...layout }}
        >
            <Region
                name="reward_list"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Border
                    variant="0"
                    layout={{ width: 313, height: 64, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#8bc9d9"
                        layout={{ position: 'absolute', left: 4, width: 305, top: 4, height: 56 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#aadde6"
                            layout={{ position: 'absolute', left: 3, width: 299, top: 3, height: 25 }}
                        />
                        <Region
                            name="reward_date"
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
                        src={srcRewardIcon}
                        layout={{ position: 'absolute', left: 211, width: 80, top: 4, height: 56 }}
                    />
                </Border>
            </Region>
        </ScrollArea>
    );
};
