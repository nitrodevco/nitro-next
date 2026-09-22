/**
 * The offer centre's reward list - `catalog/offers/OfferCenter.showRewards` on `offer_center.xml`
 * (377 x 412, style 3 frame `#67a3bf`, content margins 1/30/1/1, width fixed at 377, centred):
 * the centred `u_headline_small` heading, and on a `#bbbbb4` style 0 border the `reward_list`,
 * one 313 x 64 row per delivered reward, newest first (`createRewardItem`: two nested style 3
 * borders, `#8bc9d9` and `#aadde6`, the row's build time in bold italic `u_small` `#5f8c9f`, the
 * reward's name in white `u_bold`, and its product icon centred in the 80 x 56 `reward_icon`).
 *
 * The icon is `HabboCatalogUtils.displayProductIcon(contentType, classId)`: a floor (`s`) or wall
 * (`i`) item's icon, an effect's `fx_icon_<id>` (`e`), or the catalogue's `icon_hc` for a club
 * product (`h`); any other type draws nothing.
 */
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { OfferReward, useOfferCenterStore } from '#base/context/offer-center';
import { useTranslation } from '#base/context/system';
import { Border, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** `displayProductIcon`'s bitmap for a reward, as an image source; `undefined` for none. */
const rewardIconSource = (reward: OfferReward): string | undefined => {
    switch (reward.contentType) {
        case 's':
            return GetRoomEngine().getFurnitureFloorIconUrl(reward.classId);
        case 'i':
            return GetRoomEngine().getFurnitureWallIconUrl(reward.classId, undefined);
        case 'e':
            return LayoutImage(`effect-icons/fx_icon_${reward.classId}.png`);
        case 'h':
            return LayoutImage('catalog/icon_hc.png');
    }

    return undefined;
};

export interface OfferCenterViewProps {
    onClose: () => void;
}

export const OfferCenterView = ({ onClose }: OfferCenterViewProps) => {
    const t = useTranslation();
    const rewards = useOfferCenterStore(x => x.rewards);

    return (
        <Frame
            variant="3"
            id="offer_center"
            caption={t('offers.center.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            centered
            onClose={onClose}
            margins={[ 1, 30, 1, 1 ]}
            layout={{ position: 'absolute', width: 377, height: 412, minWidth: 377, maxWidth: 377 }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ThemeText
                    text={t('offers.center.rewards.label')}
                    textStyle="u_headline_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, top: 9 }}
                />
                <Border
                    variant="0"
                    tintColor="#bbbbb4"
                    layout={{ position: 'absolute', left: 14, width: 348, top: 31, bottom: 14 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        variant="100"
                        layout={{ position: 'absolute', left: 10, width: 330, top: 10, bottom: 10 }}
                    >
                        <Region
                            name="reward_list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {rewards.map((reward, index) => {
                                const icon = rewardIconSource(reward);

                                return (
                                    <Border
                                        key={`${rewards.length - index}`}
                                        variant="0"
                                        layout={{ height: 64, width: 313, flexShrink: 0 }}
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
                                            <ThemeText
                                                text={reward.rowDate}
                                                textStyle="u_small"
                                                textOptions={{ fill: '#5f8c9f' }}
                                                flashFormat={{ bold: true, italic: true }}
                                                name="reward_date"
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 7, top: 15 }}
                                            />
                                            <ThemeText
                                                text={reward.name}
                                                textStyle="u_bold"
                                                textOptions={{ fill: '#ffffff' }}
                                                name="reward_name"
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 9, top: 29 }}
                                            />
                                        </Border>
                                        {icon && (
                                            <ThemeImage
                                                name="reward_icon"
                                                src={icon}
                                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                                layout={{ position: 'absolute', left: 211, width: 80, top: 4, height: 56 }}
                                            />
                                        )}
                                    </Border>
                                );
                            })}
                        </Region>
                    </ScrollArea>
                </Border>
            </Region>
        </Frame>
    );
};
