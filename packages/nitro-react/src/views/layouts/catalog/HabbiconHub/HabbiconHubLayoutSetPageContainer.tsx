import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { HabbiconHubLayoutHeader, HabbiconHubLayoutHeaderProps } from './HabbiconHubLayoutHeader';
import { HabbiconHubLayoutSetGrid, HabbiconHubLayoutSetGridProps } from './HabbiconHubLayoutSetGrid';

/** Named region `set_page_container` of HabbiconHubLayout - configured through the parent's `setPageContainer` prop. */
export interface HabbiconHubLayoutSetPageContainerProps {
    captionRewardBuyDescription?: string;
    captionRewardBuyPrice?: string;
    captionRewardDescription?: string;
    captionRewardTitle?: string;
    header?: HabbiconHubLayoutHeaderProps;
    layout?: BoxLayout;
    onRewardActionButton?: () => void;
    onRewardBuyButton?: () => void;
    setGrid?: HabbiconHubLayoutSetGridProps;
    srcRewardHabbicon?: string;
    tintRewardHabbicon?: string;
}

export const HabbiconHubLayoutSetPageContainer = ({ captionRewardBuyDescription, captionRewardBuyPrice, captionRewardDescription, captionRewardTitle, header, layout, onRewardActionButton, onRewardBuyButton, setGrid, srcRewardHabbicon, tintRewardHabbicon }: HabbiconHubLayoutSetPageContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="set_page_container"
            layout={{ position: 'absolute', left: 160, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="10"
                name="set_page_background"
                tintColor="#f6ebd7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 98, bottom: 0 }}
            />
            <HabbiconHubLayoutHeader {...header} />
            <Region layout={{ position: 'absolute', left: 252, width: 116, top: 106, height: 232, flexDirection: 'column', gap: 9 }}>
                <Border
                    variant="3"
                    name="reward_panel"
                    tintColor="#e7d5b2"
                    layout={{ width: 116, height: 152, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 135, flexDirection: 'column', gap: 6 }}>
                        <ThemeText
                            text={captionRewardTitle ?? t('habbicon_reward.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#2b2b2b', align: 'center' }}
                            name="reward_title"
                            layout={{ width: 100, height: 17, flexShrink: 0 }}
                        />
                        <Border
                            variant="3"
                            name="reward_habbicon_frame"
                            tintColor="#f8ebd6"
                            layout={{ width: 46, height: 46, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="reward_habbicon"
                                src={srcRewardHabbicon}
                                tint={tintRewardHabbicon}
                                layout={{ position: 'absolute', left: 3, width: 40, top: 3, height: 40 }}
                            />
                        </Border>
                        <ThemeText
                            text={captionRewardDescription ?? t('habbicon_reward.description')}
                            textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                            name="reward_description"
                            verticalAlign="top"
                            layout={{ width: 100, height: 26, flexShrink: 0 }}
                        />
                        <Button
                            variant="5"
                            name="reward_action_button"
                            tintColor="#01a101"
                            onPointerTap={onRewardActionButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                        >
                            {t('habbicon_reward.claim')}
                        </Button>
                    </Region>
                </Border>
                <Border
                    variant="3"
                    name="reward_buy_container"
                    tintColor="#e7d5b2"
                    layout={{ width: 116, height: 71, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 53, flexDirection: 'column', gap: 8 }}>
                        <ThemeText
                            text={captionRewardBuyDescription ?? t('habbicon_book.buy_set')}
                            textOptions={{ fill: '#2b2b2b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                            name="reward_buy_description"
                            verticalAlign="top"
                            layout={{ width: 100, height: 17, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 122, height: 28, flexShrink: 0, flexDirection: 'row', gap: 4 }}>
                            <ThemeText
                                text={captionRewardBuyPrice ?? '0'}
                                textStyle="text-style-u-bold"
                                name="reward_buy_price"
                                layout={{ width: 10, height: 17, flexShrink: 0 }}
                            />
                            <Icon
                                variant="35"
                                name="reward_buy_currency_icon"
                                layout={{ width: 16, height: 16, flexShrink: 0 }}
                            />
                            <Button
                                variant="5"
                                name="reward_buy_button"
                                tintColor="#01a101"
                                onPointerTap={onRewardBuyButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ width: 88, height: 28, flexShrink: 0 }}
                            >
                                {t('generic.buy')}
                            </Button>
                        </Region>
                    </Region>
                </Border>
            </Region>
            <HabbiconHubLayoutSetGrid {...setGrid} />
        </Region>
    );
};
